import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import ArchiveApplicationDialog from './ArchiveApplicationDialog';
import queueStrings from './../../assets/strings/Queue/Queue.1033.json';
import { queueItemsMock } from '../../interfaces/mocks/Queue.mock';

describe('ArchiveApplicationDialog', () => {
    const archiveReasonsMock = {
        '1': 'Irrelevant information',
        '2': 'Applicant has a better option ',
        '3': 'Applicant does not satisfy with the loan terms',
        '4': 'Cannot reach the primary applicant',
        '5': 'Bank refuse to handle this application',
        '6': 'Other',
    };
    const mockProps = {
        onCancel: jest.fn(),
        onDismiss: jest.fn(),
        onMoveToArchive: jest.fn(),
        isOpen: true,
        archiveReasons: archiveReasonsMock,
        itemName: '',
    };
    const renderArchiveDialog = async mockProps => {
        return render(
            <ArchiveApplicationDialog
                onCancel={mockProps.onCancel}
                onDismiss={mockProps.onDismiss}
                onMoveToArchive={mockProps.onMoveToArchive}
                isOpen={mockProps.isOpen}
                archiveReasons={mockProps.archiveReasons}
                itemName={mockProps.itemName}
            />,
            {
                wrapper: QueryClientWrapper,
            }
        );
    };

    it('should render category list after loading', async () => {
        const component = await renderArchiveDialog(mockProps);

        const { container } = component;
        expect(container).toBeInTheDocument();
    });

    it('should render list with reasons', async () => {
        const component = await renderArchiveDialog(mockProps);
        const { getByTestId } = component;

        expect(getByTestId('reasons-list')).toBeInTheDocument();
    });

    it('should set selected reason to empty string when there are no archive reasons', async () => {
        const customProps = { ...mockProps, archiveReasons: {} };

        const component = await renderArchiveDialog(customProps);
        const { queryByRole } = component;
        const selectedOption = queryByRole('option');

        expect(selectedOption).toBeNull();
    });

    it('should choose first reason by default', async () => {
        const component = await renderArchiveDialog(mockProps);
        const { getByText } = component;

        expect(getByText(archiveReasonsMock[1])).toBeInTheDocument();
    });

    it('should show reasons in the list', async () => {
        const component = await renderArchiveDialog(mockProps);
        const { getByTestId, getAllByRole } = component;

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        // Removing first element because the first element is the selected element and it also has the role "option"
        const options = getAllByRole('option');

        expect(options).toHaveLength(Object.keys(archiveReasonsMock).length);
    });

    it('should show comment field if Other reason was chosen', async () => {
        const component = await renderArchiveDialog(mockProps);

        const { getByTestId, getByText } = component;

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        const otherReason = getByText(archiveReasonsMock[6]);
        fireEvent.click(otherReason);
        expect(getByTestId('comment-field')).toBeInTheDocument();
    });

    it('should change comment when there is a value', async () => {
        const component = await renderArchiveDialog(mockProps);

        const { getByTestId, getByText } = component;

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        const otherReason = getByText(archiveReasonsMock[6]);
        fireEvent.click(otherReason);

        const newValue = 'test';
        const commentField = getByTestId('comment-field');
        fireEvent.change(commentField, { target: { value: newValue } });
        expect(commentField).toHaveValue(newValue);
    });

    it('should change comment to empty when no value', async () => {
        const component = await renderArchiveDialog(mockProps);

        const { getByTestId, getByText } = component;

        const reasonList = getByTestId('reasons-list');
        fireEvent.click(reasonList);

        const otherReason = getByText(archiveReasonsMock[6]);
        fireEvent.click(otherReason);

        const commentField = getByTestId('comment-field');
        fireEvent.change(commentField, { target: { value: undefined } });
        expect(commentField).toHaveValue('');
    });

    it('should call moveToArchive method', async () => {
        const customProps = { ...mockProps, onMoveToArchive: jest.fn().mockImplementation(() => Promise.reject()) };

        const component = await renderArchiveDialog(customProps);

        const { getByText } = component;

        const moveToArchiveButton = getByText(queueStrings.ARCHIVE_APPLICATION_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(customProps.onMoveToArchive).toBeCalled());
    });

    it('should show error dialog', async () => {
        const customProps = { ...mockProps, onMoveToArchive: jest.fn().mockImplementation(() => Promise.reject()) };

        const component = await renderArchiveDialog(customProps);

        const { getByTestId, getByText } = component;

        const moveToArchiveButton = getByText(queueStrings.ARCHIVE_APPLICATION_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(getByTestId('dialog-error-text')).toBeInTheDocument());
        const errorText = getByText(queueStrings.ARCHIVE_APPLICATION_DIALOG_ERROR_TEXT.replace('{{itemName}}', ''));
        await waitFor(() => expect(errorText).toBeInTheDocument());
    });

    it('should show error dialog with the selected application name', async () => {
        const customProps = {
            ...mockProps,
            itemName: queueItemsMock[0].itemName,
            onMoveToArchive: jest.fn().mockImplementation(() => Promise.reject()),
        };

        const component = await renderArchiveDialog(customProps);

        const selectedApplication = queueItemsMock[0];

        const { getByTestId, getByText } = component;

        const moveToArchiveButton = getByText(queueStrings.ARCHIVE_APPLICATION_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(getByTestId('dialog-error-text')).toBeInTheDocument());

        const errorText = getByText(queueStrings.ARCHIVE_APPLICATION_DIALOG_ERROR_TEXT.replace('{{itemName}}', selectedApplication.itemName || ''));
        await waitFor(() => expect(errorText).toBeInTheDocument());
    });

    it('should show loading dialog', async () => {
        const component = await renderArchiveDialog(mockProps);

        const { getByTestId, getByText } = component;

        const moveToArchiveButton = getByText(queueStrings.ARCHIVE_APPLICATION_DIALOG_MOVE_TO_ARCHIVE_BUTTON);
        fireEvent.click(moveToArchiveButton);

        await waitFor(() => expect(getByTestId('spinner')).toBeInTheDocument());
    });
});
