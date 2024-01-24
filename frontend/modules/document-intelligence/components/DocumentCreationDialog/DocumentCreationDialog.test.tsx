import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DocumentCreationDialog from './DocumentCreationDialog';
import * as regardingEntitiesMock from '../../interfaces/mocks/RegardingData.mock';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { IDocumentCreationDialogProps } from './DocumentCreationDialog.interface';

describe('DocumentCreationDialog', () => {
    let dialogProps: IDocumentCreationDialogProps;

    const onAdd = jest.fn();
    const onCancel = jest.fn();
    const onDismiss = jest.fn();
    beforeEach(() => {
        dialogProps = {
            isError: false,
            isLoading: false,
            regardingEntities: Object.values(regardingEntitiesMock),
            regardingDisplayName: 'Contact',
            documentDefinitions: [
                { id: 'def1', name: 'def1 name', description: 'def1 description', type: 100001 },
                { id: 'def2', name: 'def2 name', description: 'def2 description', type: 100002 },
            ],
            isOpen: true,
            onAdd,
            onCancel,
            onDismiss,
            showDescription: false,
            header: 'Add new document request',
        };
    });

    it('Should NOT be rendered in DOM', () => {
        const modifiedDialogProps = { ...dialogProps, isOpen: undefined };
        const { queryByRole } = render(<DocumentCreationDialog {...modifiedDialogProps} />);
        const dialog = queryByRole('dialog');
        expect(dialog).toBeNull();
    });

    it('Should be rendered in DOM, and be visible', () => {
        const { queryByRole, getByText } = render(<DocumentCreationDialog {...dialogProps} />);
        const dialog = queryByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(getByText(dialogProps.header)).toBeInTheDocument();
    });

    it('Should call onDismiss handler, when Close button (X icon) is pressed', () => {
        const onDismissMock = jest.fn();
        const { getByTitle } = render(<DocumentCreationDialog {...dialogProps} onDismiss={onDismissMock} />);

        const closeBtn = getByTitle(commonStrings.CLOSE);

        fireEvent.click(closeBtn);

        expect(onDismissMock).toHaveBeenCalled();
    });

    it('Should call onCancel handler, when Cancel button is pressed', () => {
        const onCancelMockHandler = jest.fn();

        const { getByTestId } = render(<DocumentCreationDialog {...dialogProps} onCancel={onCancelMockHandler} />);

        const cancelBtn = getByTestId('cancelBtn');

        fireEvent.click(cancelBtn);

        expect(onCancelMockHandler).toHaveBeenCalled();
    });

    it('Should call onAdd handler, with correct parameters, and description', async () => {
        const onAddMockHandler = jest.fn();
        const regarding = regardingEntitiesMock.coOwnerRegardingMock;
        const checkedRegarding = [{ ...regarding }];

        const documentDefinition = dialogProps.documentDefinitions[0];
        const dropdownOptionRole = regarding.role;
        const dropdownOptionName = regarding.name;
        const { getByLabelText, getByDisplayValue, getByTestId, getByPlaceholderText } = render(
            <DocumentCreationDialog
                {...dialogProps}
                regardingEntities={...checkedRegarding}
                documentDefinitions={[documentDefinition]}
                onAdd={onAddMockHandler}
                showDescription
            />
        );

        const DOWN_ARROW = { keyCode: 40 };
        fireEvent.keyDown(getByTestId('regardingEntitiesDropdown'), DOWN_ARROW);
        const regardingDropdownButton = await getByDisplayValue(`${dropdownOptionName} (${dropdownOptionRole})`);
        fireEvent.click(regardingDropdownButton);

        const documentTypesDropdown = getByTestId('documentTypesDropdown');
        fireEvent.click(documentTypesDropdown);
        const dropdownOptionButton = await getByLabelText(diStrings.DOCUMENT_TYPE);
        fireEvent.click(dropdownOptionButton);

        expect(getByTestId('description-field-di')).toBeInTheDocument();
        const description = 'Edited Aug 11';
        fireEvent.change(getByPlaceholderText(diStrings.BRIEF_DESCRIPTION), { target: { value: description } });

        const acceptBtn = getByTestId('acceptBtn');
        fireEvent.click(acceptBtn);

        expect(onAddMockHandler).toHaveBeenCalledWith({ regarding, documentDefinition, description });
    });

    it('Should call onAdd handler, with correct parameters, only one regarding and one document - default', async () => {
        const onAddMockHandler = jest.fn();
        const regarding = regardingEntitiesMock.coOwnerRegardingMock;
        const checkedRegarding = [{ ...regarding }];
        const documentDefinition = dialogProps.documentDefinitions[0];
        const { getByTestId } = render(
            <DocumentCreationDialog
                {...dialogProps}
                regardingEntities={...checkedRegarding}
                onAdd={onAddMockHandler}
                documentDefinitions={[documentDefinition]}
            />
        );

        const acceptBtn = getByTestId('acceptBtn');

        fireEvent.click(acceptBtn);
        expect(onAddMockHandler).toHaveBeenCalledWith({ regarding, documentDefinition });
    });
});
