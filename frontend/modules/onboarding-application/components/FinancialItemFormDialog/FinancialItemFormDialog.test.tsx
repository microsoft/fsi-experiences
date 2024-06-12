import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import financialItemFormDialog from './FinancialItemFormDialog';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import financialCategoryStrings from '../../assets/strings/FinancialCategoriesFormFields/FinancialCategoriesFormFields.1033.json';
import { ApplicantFinancialItemCategories } from '../../constants/FinancialCategories.const';

jest.mock('@fsi/core-components/dist/hooks/useDebounce/useDebounce', () => ({
    useDebounce: fn => fn,
}));

jest.useFakeTimers();
const ProvidedFinancialItemFormDialog = ProviderWrapper(financialItemFormDialog);

describe('FinancialItemFormDialog', () => {
    const mockProps = {
        onSubmit: jest.fn(),
        onCancel: jest.fn(),
        category: ApplicantFinancialItemCategories.ASSET,
        item: {
            customerId: '',
            id: '',
            name: '',
            value: 0,
            description: '',
            type: '',
            currencyId: '',
        },
        itemTypeOptions: [],
        isOpen: true,
    };

    it('should render add form by default', () => {
        const { getByText } = render(<ProvidedFinancialItemFormDialog {...mockProps} />);

        expect(getByText(financialCategoryStrings.ASSET_ADD_TITLE)).toBeInTheDocument();
    });

    it('should render edit form', () => {
        const { getByText } = render(<ProvidedFinancialItemFormDialog {...mockProps} item={{ ...mockProps, id: '1' }} />);

        expect(getByText(financialCategoryStrings.ASSET_UPDATE_TITLE)).toBeInTheDocument();
    });

    it('should render add form with itemTypeOptions', async () => {
        const customProps = {
            ...mockProps,
            itemTypeOptions: [
                {
                    key: 104800000,
                    text: 'AUTOMOBILES',
                },
                {
                    key: 104800001,
                    text: 'BOAT_OR_VESSEL',
                },
                {
                    key: 104800002,
                    text: 'BOND',
                },
            ],
        };

        const { getByLabelText, getAllByText } = render(<ProvidedFinancialItemFormDialog {...customProps} />);

        const dropdownField = getByLabelText(financialCategoryStrings.ASSET_FIELDS_TYPE_LABEL);

        fireEvent.click(dropdownField);

        const dropdownOptionsButtons = await getAllByText((content, element) => {
            return element?.classList.contains('ms-Dropdown-item')!;
        });

        expect(dropdownOptionsButtons.length).toEqual(customProps.itemTypeOptions.length);
    });

    it('should call `onSubmit` function', async () => {
        const customProps = {
            ...mockProps,
            itemTypeOptions: [
                {
                    key: 104800000,
                    text: 'AUTOMOBILES',
                },
                {
                    key: 104800001,
                    text: 'BOAT_OR_VESSEL',
                },
                {
                    key: 104800002,
                    text: 'BOND',
                },
            ],
            onSubmit: jest.fn().mockImplementation(() => Promise.resolve('success')),
        };
        const { getByLabelText, getAllByText, getByTestId } = render(<ProvidedFinancialItemFormDialog {...customProps} />);

        const dropdownField = getByLabelText(financialCategoryStrings.ASSET_FIELDS_TYPE_LABEL);
        fireEvent.click(dropdownField);

        const dropdownOptionsButtons = await getAllByText((content, element) => {
            return element?.classList.contains('ms-Dropdown-item')!;
        });

        const nameField = getByTestId('description');
        const valueField = getByTestId('balance');
        const submitButton = getByTestId('acceptBtn');

        await act(async () => {
            await fireEvent.click(dropdownOptionsButtons[0]);
            await fireEvent.change(nameField, { target: { value: 'test' } });
            await fireEvent.change(valueField, { target: { value: 100 } });
            await fireEvent.click(submitButton);
        });

        expect(customProps.onSubmit).toBeCalled();
        expect(customProps.onSubmit).toHaveBeenCalledWith({
            customerId: mockProps.item.customerId,
            id: mockProps.item.id,
            description: 'test',
            value: 100,
            currencyId: mockProps.item.currencyId,
            name: 'test',
            type: customProps.itemTypeOptions[0].key,
        });
    });

    it('should not call `onSubmit` function when type is empty', async () => {
        const customProps = {
            ...mockProps,
        };
        const { getByText, getByTestId } = render(<ProvidedFinancialItemFormDialog {...customProps} />);

        const nameField = getByTestId('description');
        const valueField = getByTestId('balance');
        const submitButton = getByTestId('acceptBtn');

        await act(async () => {
            await fireEvent.change(nameField, { target: { value: 'test' } });
            await fireEvent.change(valueField, { target: { value: 100 } });
            await fireEvent.click(submitButton);
        });

        expect(customProps.onSubmit).not.toBeCalled();
        expect(submitButton).toBeDisabled();
    });

    it('should not call `onSubmit` function when name is empty', async () => {
        const customProps = {
            ...mockProps,
            item: {
                ...mockProps.item,
                type: 104800000,
            },
        };
        const { getByText, getByTestId } = render(<ProvidedFinancialItemFormDialog {...customProps} />);

        const valueField = getByTestId('balance');
        const submitButton = getByTestId('acceptBtn');

        await act(async () => {
            await fireEvent.change(valueField, { target: { value: 100 } });
            await fireEvent.click(submitButton);
        });

        expect(customProps.onSubmit).not.toBeCalled();
    });

    it('should not call `onSubmit` function when value is empty', async () => {
        const customProps = {
            ...mockProps,
            type: 104800000,
        };
        const { getByText, getByTestId } = render(<ProvidedFinancialItemFormDialog {...customProps} />);

        const nameField = getByTestId('description');
        const submitButton = getByTestId('acceptBtn');

        await act(async () => {
            await fireEvent.change(nameField, { target: { value: 'test' } });
            await fireEvent.click(submitButton);
        });

        expect(customProps.onSubmit).not.toBeCalled();
        expect(submitButton).toBeDisabled();
    });

    it('should not call `onSubmit` function when value is invalid', async () => {
        const customProps = {
            ...mockProps,
            type: 104800000,
        };
        const { getByTestId } = render(<ProvidedFinancialItemFormDialog {...customProps} />);

        const nameField = getByTestId('description');
        const valueField = getByTestId('balance');
        const submitButton = getByTestId('acceptBtn');

        await act(async () => {
            await fireEvent.change(nameField, { target: { value: 'test' } });
            await fireEvent.change(valueField, { target: { value: 'invalid' } });
            await fireEvent.click(submitButton);
        });

        expect(customProps.onSubmit).not.toBeCalled();
    });

    afterEach(() => {
        mockProps.onSubmit.mockClear();
    });
});
