import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import RemoveFinancialItemDialog from './RemoveFinancialItemDialog';
import ProviderWrapper from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { ApplicantFinancialItemCategories } from '../../constants/FinancialCategories.const';

const ProvidedFinancialItemRemoveFormDialog = ProviderWrapper(RemoveFinancialItemDialog);

describe('RemoveFinancialItemDialog', () => {
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
        itemIndex: 0,
        isOpen: true,
    };

    it('should render category list after loading', () => {
        const { container } = render(<ProvidedFinancialItemRemoveFormDialog {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should not render if item is not valid', () => {
        const { container } = render(<ProvidedFinancialItemRemoveFormDialog {...mockProps} item={null as any} />);

        expect(container.children.length).toEqual(0);
    });

    it('should call `onSubmit` function', async () => {
        const customProps = {
            ...mockProps,
            onSubmit: jest.fn().mockImplementation(() => Promise.resolve('success')),
        };
        const { getByTestId } = render(<ProvidedFinancialItemRemoveFormDialog {...customProps} />);

        const submitButton = getByTestId('acceptBtn');

        await act(async () => {
            await fireEvent.click(submitButton);
        });

        expect(customProps.onSubmit).toBeCalled();
        expect(customProps.onSubmit).toHaveBeenCalledWith(mockProps.item, mockProps.itemIndex);
    });
});
