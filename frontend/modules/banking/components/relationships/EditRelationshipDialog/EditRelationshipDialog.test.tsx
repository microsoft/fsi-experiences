import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import { getRelationshipsMock } from '../../../interfaces/Relationships/mocks/IRelationship.mock';
import getRelationshipsContextMock from './../MockRelationshipContext';
import relationshipsTexts from '@fsi/core-components/dist/assets/strings/Relationship/Relationship.1033.json';
import commonTexts from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { RelationshipsContext } from '../context';
import EditRelationshipDialog from './EditRelationshipDialog';

const RelationhipContextMock = getRelationshipsContextMock();
RelationhipContextMock.value.getContacts = jest.fn().mockImplementation(() => [
    {
        fullName: 'Ronaldo',
    },
    {
        fullName: 'Messi',
    },
]);

const setClickedRelationship = jest.fn().mockImplementation((relationship: IRelationship) => (clickedRelationship = relationship));

let initialValue: Partial<IRelationship>,
    visible: boolean,
    onDialogDismiss,
    saveRelationship,
    clickedRelationship: Partial<IRelationship>,
    footerParams;

jest.mock('./EditRelationshipDialogFooter', () => params => {
    footerParams = params;
    return <div data-testid="relationship-dialog-footer" />;
});

describe('relationship edit dialog component', () => {
    beforeEach(() => {
        clickedRelationship = getRelationshipsMock()[0];
        initialValue = clickedRelationship;
        visible = true;
    });

    beforeAll(() => {
        onDialogDismiss = jest.fn();
        saveRelationship = jest.fn();
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.unmock('./EditRelationshipDialogFooter');
    });

    afterEach(() => {
        footerParams = undefined;
    });

    it('Should render relationship edit dialog', () => {
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('relationship-dialog')).toBeInTheDocument();
        expect(getByTestId('relationship-dialog-footer')).toBeInTheDocument();
    });

    it('Should not render relationship edit dialog', () => {
        visible = false;
        const { queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(queryByTestId('relationship-dialog')).toBeNull();
        expect(queryByTestId('relationship-dialog-footer')).toBeNull();
    });

    it('Should cancel edit dialog', () => {
        render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        act(() => footerParams.onCancel());
        expect(onDialogDismiss).toHaveBeenCalledTimes(1);
    });

    it('Should save edit dialog', () => {
        render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        act(() => footerParams.onSubmit());
        expect(saveRelationship).toHaveBeenCalledTimes(1);
    });

    it('Should render add relationship dialog', () => {
        initialValue = {};
        const { getByText, getAllByRole } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={undefined}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(footerParams.isNew).toBe(true);
        const input = getAllByRole('combobox');
        expect(input[0]).toHaveValue('');
        expect(input[1]).toHaveValue('');
    });

    it('Should render edit relationship dialog', () => {
        const { getByText, getAllByRole } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(footerParams.isNew).toBe(false);
        expect(getByText(clickedRelationship?.contactTo?.fullName || '')).toBeInTheDocument();
        const typeName = RelationhipContextMock.value.relationshipTypes.get(clickedRelationship?.relationshipType || 0) || '';
        expect(getByText(clickedRelationship?.contactTo?.fullName || '')).toBeInTheDocument();
        const button = getAllByRole('combobox')[0] as HTMLInputElement;
        expect(button.value).toBe(typeName);
    });

    it('Should show type options', async () => {
        const typeName = 'Lawyer';
        const { getByPlaceholderText, queryAllByRole, getByRole } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        fireEvent.click(getByPlaceholderText(commonTexts.SELECT_OPTION));
        expect(queryAllByRole('option')).toHaveLength(RelationhipContextMock.value.relationshipTypes.size);
        fireEvent.click(getByRole('option', { name: typeName }));
        expect(queryAllByRole('combobox')[0]).toHaveValue(RelationhipContextMock.value.relationshipTypes.get(104800002));
    });

    it('Should remove tag', async () => {
        const { container } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    initialValue={initialValue}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        waitFor(() => {
            const deleteButton = container.querySelector("i[data-icon-name='Cancel']") as Element;
            expect(deleteButton).toBeInTheDocument();
            fireEvent.click(deleteButton);
            expect(setClickedRelationship).toBeCalledWith({ contactTo: undefined });
        });
    });

    it('Should get contacts', async () => {
        const { getByTestId, getByText } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    clickedRelationship={undefined}
                    initialValue={undefined}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        fireEvent.change(getByTestId('member-picker-input'), { target: { value: 'Ronaldo' } });
        waitFor(() => {
            expect(RelationhipContextMock.value.getContacts).toBeCalled();
            expect(getByText('Ronaldo')).toBeInTheDocument();
            fireEvent.click(getByText('Ronaldo'));
            expect(setClickedRelationship).toBeCalled();
        });
    });

    it('Should not select autocomplete', async () => {
        const { getByTestId, getByText } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    clickedRelationship={undefined}
                    initialValue={undefined}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        fireEvent.change(getByTestId('member-picker-input'), { target: { value: 'Ronaldo' } });
        waitFor(() => {
            expect(RelationhipContextMock.value.getContacts).toBeCalled();
            expect(getByText('Ronaldo')).toBeInTheDocument();
            fireEvent.click(getByText(relationshipsTexts.CREATE_RELATIONSHIP));
            expect(setClickedRelationship).not.toBeCalled();
        });
    });

    it('Should call onRoleOptionsChanged', async () => {
        const { getByPlaceholderText, getByText } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <EditRelationshipDialog
                    clickedRelationship={undefined}
                    initialValue={undefined}
                    visible={visible}
                    onDialogDismiss={onDialogDismiss}
                    saveRelationship={saveRelationship}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );
        fireEvent.click(getByPlaceholderText('Select an option'));
        fireEvent.click(getByText('Lawyer'));

        expect(setClickedRelationship).toBeCalled();
    });
});
