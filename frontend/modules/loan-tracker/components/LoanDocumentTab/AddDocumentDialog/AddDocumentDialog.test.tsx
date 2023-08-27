import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddDocumentDialog from './AddDocumentDialog';
import { applicantsMock, customDocumentsMock } from '../../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import commonLocalizationStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';

describe('AddDocumentDialog', () => {
    let dialogProps;

    beforeEach(() => {
        dialogProps = {
            title: 'Add new Document',
            applicants: applicantsMock,
            customDocuments: customDocumentsMock,
            isOpen: true,
        };
    });

    it('Should NOT be rendered in DOM', () => {
        const modifiedDialogProps = { ...dialogProps, isOpen: undefined };
        const { queryByRole } = render(<AddDocumentDialog {...modifiedDialogProps} />);
        const addDocumentDialog = queryByRole('dialog');
        expect(addDocumentDialog).toBeNull();
    });

    it('Should be rendered in DOM, and be visible', () => {
        const { queryByRole } = render(<AddDocumentDialog {...dialogProps} />);
        const addDocumentDialog = queryByRole('dialog');
        expect(addDocumentDialog).toBeInTheDocument();
    });

    it('Should call onDismiss handler, when Close button (X icon) is pressed', () => {
        const onDismissMock = jest.fn();
        const { getByTitle } = render(<AddDocumentDialog {...dialogProps} onDismiss={onDismissMock} />);

        const closeBtn = getByTitle(commonLocalizationStrings.CLOSE);

        fireEvent.click(closeBtn);

        expect(onDismissMock).toHaveBeenCalled();
    });

    it('Should call onCancel handler, when Cancel button is pressed', () => {
        const onCancelMockHandler = jest.fn();

        const { getByTestId } = render(<AddDocumentDialog {...dialogProps} onCancel={onCancelMockHandler} />);

        const cancelBtn = getByTestId('cancelBtn');

        fireEvent.click(cancelBtn);

        expect(onCancelMockHandler).toHaveBeenCalled();
    });

    it('Should call onAdd handler, when Add button is pressed', async () => {
        const onAddMockHandler = jest.fn();
        const dropdownOptionTitle = dialogProps.customDocuments[0].name;
        const { getByTestId } = render(<AddDocumentDialog {...dialogProps} onAdd={onAddMockHandler} />);

        const documentTypesDropdown = getByTestId('documentTypesDropdown');

        fireEvent.click(documentTypesDropdown);

        const dropdownOptionButton = await screen.queryByTitle(dropdownOptionTitle)!;

        fireEvent.click(dropdownOptionButton);

        const acceptBtn = getByTestId('acceptBtn');

        fireEvent.click(acceptBtn);

        expect(onAddMockHandler).toHaveBeenCalled();
    });

    it('Should call onAdd handler, with correct parameters', async () => {
        const onAddMockHandler = jest.fn();
        const dropdownOptionTitle = dialogProps.customDocuments[0].name;
        const applicantObj = dialogProps.applicants[0];
        const documentTypeObj = dialogProps.customDocuments[0];
        const { getByTestId } = render(<AddDocumentDialog {...dialogProps} onAdd={onAddMockHandler} />);

        const documentTypesDropdown = getByTestId('documentTypesDropdown');

        fireEvent.click(documentTypesDropdown);

        const dropdownOptionButton = await screen.queryByTitle(dropdownOptionTitle)!;

        fireEvent.click(dropdownOptionButton);

        const acceptBtn = getByTestId('acceptBtn');

        fireEvent.click(acceptBtn);

        expect(onAddMockHandler).toHaveBeenCalledWith(applicantObj, documentTypeObj);
    });

    it('Should have preselected value in applicantsDropdown', () => {
        const { getByText } = render(<AddDocumentDialog {...dialogProps} />);

        expect(getByText(commonLocalizationStrings.PRIMARY_APPLICANT)).toBeInTheDocument();
    });

    it('Should NOT have preselected value in applicantsDropdown when applicants is empty', () => {
        const changedProps = { ...dialogProps, applicants: [] };
        const { getByTestId } = render(<AddDocumentDialog {...changedProps} />);

        const applicantsDropdown = getByTestId('applicantsDropdown');

        const preselectedOption = applicantsDropdown.querySelector('[id$="option"]');

        expect(preselectedOption).not.toHaveAttribute('aria-posinset');
    });

    it('Should choose an applicant from applicantsDropdown', () => {
        const dropdownOptionTitle = dialogProps.applicants[1].role;

        const { getByTestId, getByText } = render(<AddDocumentDialog {...dialogProps} />);

        const applicantsDropdown = getByTestId('applicantsDropdown');
        fireEvent.click(applicantsDropdown);

        const dropdownOptionButton = getByText(dropdownOptionTitle)!;
        fireEvent.click(dropdownOptionButton);

        const selectedOption = applicantsDropdown.querySelector('[id$="option"]');
        expect(getByText(dropdownOptionTitle)).toBeInTheDocument();
    });
});
