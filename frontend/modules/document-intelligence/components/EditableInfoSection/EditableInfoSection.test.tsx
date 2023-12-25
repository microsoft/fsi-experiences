import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { EditableInfoSection } from './EditableInfoSection';
import { act } from 'react-dom/test-utils';

const fields = [
    {
        displayName: 'Consumption start date',
        value: '2020-01-01',
        labelTagProps: {
            text: '80% confidence',
        },
        required: true,
        placeholder: 'Consumption start date',
        id: 'startDate',
    },
    {
        displayName: 'Consumption end date',
        value: '2020-01-01',
        required: true,
        placeholder: 'Consumption end date',
        id: 'endDate',
    },
];

describe('EditableInfoSection', () => {
    const mockProps = {
        fields,
        header: {
            title: 'Extraction information',
        },
        editMode: false,
        toggleEditMode: jest.fn(),
        onReset: jest.fn(),
        onSave: jest.fn(() => Promise.resolve()),
    };

    it('should render successfully without tooltip', () => {
        const { container, getByText, queryByTestId } = render(<EditableInfoSection {...mockProps} />);
        expect(container).toBeInTheDocument();
        expect(getByText('Extraction information')).toBeInTheDocument();
        expect(queryByTestId('info-callout-icon')).toBeNull();
    });

    it('should render subHeader', () => {
        const mockHeader = {
            ...mockProps.header,
            subHeader: {
                title: 'collection name',
                tagText: '90%',
            },
        };
        const { container, getByText } = render(<EditableInfoSection {...mockProps} header={mockHeader} />);
        expect(container).toBeInTheDocument();
        expect(getByText(mockHeader.subHeader.title)).toBeInTheDocument();
        expect(getByText(mockHeader.subHeader.tagText)).toBeInTheDocument();
    });

    it('should render tooltip', () => {
        const mockHeader = {
            ...mockProps.header,
            infoCallout: {
                content: 'This is a tooltip',
                ariaLabel: 'More information',
            },
        };
        const { queryByTestId, queryByText } = render(<EditableInfoSection {...mockProps} header={mockHeader} />);

        expect(queryByTestId('info-callout-icon')).toBeTruthy();
        expect(queryByText('This is a tooltip')).toBeNull();

        const btn = queryByTestId('info-callout-icon');

        act(() => {
            fireEvent.click(btn as Element);
        });

        expect(queryByText('This is a tooltip')).toBeTruthy();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it('should render reset and cancel button when editMode is true', async () => {
        const { queryByTestId } = render(<EditableInfoSection {...mockProps} editMode />);
        expect(queryByTestId('reset-btn')).toBeTruthy();
        expect(queryByTestId('cancel-btn')).toBeTruthy();
        expect(queryByTestId('submit-btn')?.getAttribute('aria-label')).toEqual('Save');

        await act(async () => {
            await fireEvent.click(queryByTestId('reset-btn') as Element);
        });

        expect(mockProps.onReset).toHaveBeenCalled();

        act(() => {
            fireEvent.click(queryByTestId('cancel-btn') as Element);
        });

        await waitFor(() => expect(mockProps.toggleEditMode).toHaveBeenCalled());

        act(() => {
            fireEvent.click(queryByTestId('submit-btn') as Element);
        });

        expect(mockProps.onSave).toHaveBeenCalled();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it('should render enabled edit button when editMode is false', () => {
        const { queryByTestId } = render(<EditableInfoSection {...mockProps} styles={{ root: {}, header: {} }} />);
        expect(queryByTestId('reset-btn')).toBeNull();
        expect(queryByTestId('cancel-btn')).toBeNull();
        expect(queryByTestId('submit-btn')?.getAttribute('aria-label')).toEqual('Edit');

        const editButton = queryByTestId('submit-btn');
        expect(editButton?.getAttribute('aria-label')).toEqual('Edit');
        expect(editButton).toBeEnabled();

        act(() => {
            fireEvent.click(queryByTestId('submit-btn') as Element);
        });

        expect(mockProps.toggleEditMode).toHaveBeenCalled();
    });

    it('should render with id', () => {
        const { container } = render(<EditableInfoSection {...mockProps} sectionId="test-id" />);
        expect(container.querySelector('#test-id')).toBeTruthy();
    });

    it('should render disabled edit button when all fields are read only', () => {
        const readOnlyFieldsProps = {
            ...mockProps,
            fields: [{ ...fields[0], readOnly: true }],
        };
        const { container, queryByTestId } = render(<EditableInfoSection {...readOnlyFieldsProps} />);
        expect(container).toBeInTheDocument();
        const editButton = queryByTestId('submit-btn');
        expect(editButton?.getAttribute('aria-label')).toEqual('Edit');
        expect(editButton).toBeDisabled();
    });

    it('should disabled read only fields in edit mode', () => {
        const fieldsProps = [{ ...mockProps.fields[0], readOnly: true }, mockProps.fields[1]];
        const { getAllByTestId } = render(<EditableInfoSection {...mockProps} editMode fields={fieldsProps} />);
        const fields = getAllByTestId('editable-text');
        expect(fields[0]).toBeDisabled();
        expect(fields[1]).toBeEnabled();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
