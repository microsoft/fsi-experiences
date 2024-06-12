import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import getRelationshipsContextMock from './../MockRelationshipContext';
import { RelationshipsContext } from '../context';
import EditRelationshipDialogFooter from './EditRelationshipDialogFooter';
import commonTexts from '@fsi/core-components/dist/assets/strings/common/common.1033.json';

const RelationhipContextMock = getRelationshipsContextMock();

describe('relationship dialog footer component', () => {
    let onSubmit: () => void, onCancel: () => void, isSubmitDisabled: boolean, isNew: boolean;

    beforeEach(() => {
        isSubmitDisabled = false;
        isNew = false;
    });

    beforeAll(() => {
        onSubmit = jest.fn();
        onCancel = jest.fn();
    });

    it('Should render dialog footer', () => {
        const { getByTestId, getByText } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialogFooter onCancel={onCancel} onSubmit={onSubmit} isSubmitDisabled={isSubmitDisabled} isNew={isNew} />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('relationship-dialog-footer')).toBeVisible();
        expect(getByText(commonTexts.SAVE)).toBeVisible();
    });

    it('Should render dialog footer for adding a relationship', () => {
        isNew = true;
        const { getByTestId, getByText } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialogFooter onCancel={onCancel} onSubmit={onSubmit} isSubmitDisabled={isSubmitDisabled} isNew={isNew} />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('relationship-dialog-footer')).toBeVisible();
        expect(getByText('Add relationship')).toBeVisible();
    });

    it('Should submit dialog footer', () => {
        const { getAllByRole } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialogFooter onCancel={onCancel} onSubmit={onSubmit} isSubmitDisabled={isSubmitDisabled} isNew={isNew} />
            </RelationshipsContext.Provider>
        );

        const buttons = getAllByRole('button');
        const submitButton = buttons[0];
        fireEvent.click(submitButton);
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('Should cancel dialog footer', () => {
        const { getAllByRole } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialogFooter onCancel={onCancel} onSubmit={onSubmit} isSubmitDisabled={isSubmitDisabled} isNew={isNew} />
            </RelationshipsContext.Provider>
        );

        const buttons = getAllByRole('button');
        const cancelButton = buttons[1];
        fireEvent.click(cancelButton);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('Should not submit dialog footer', () => {
        isSubmitDisabled = true;
        const { getAllByRole } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialogFooter onCancel={onCancel} onSubmit={onSubmit} isSubmitDisabled={isSubmitDisabled} isNew={isNew} />
            </RelationshipsContext.Provider>
        );

        const buttons = getAllByRole('button');
        const submitButton = buttons[0];
        expect(submitButton).toHaveClass('is-disabled');
    });
});
