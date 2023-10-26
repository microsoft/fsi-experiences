import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FinancialHoldingList from './FinancialHoldingList';
import { mockFinancialHoldingCards } from '../../../../constants/FinancialHoldingCard';
import fhStrings from '@fsi/core-components/dist/assets/strings/FinancialHoldings/FinancialHoldings.1033.json';

describe('FinancialHoldingList', () => {
    it('Should render FinancialHoldingList', async () => {
        const onChange = jest.fn();
        const { getAllByTestId } = render(
            <FinancialHoldingList items={mockFinancialHoldingCards} onChange={onChange} selectedId={mockFinancialHoldingCards[0].id} />
        );
        fireEvent.click(getAllByTestId('fh-card-view')[1]);
        expect(onChange).toBeCalled();
        expect(getAllByTestId('fh-card-view')).toHaveLength(3);
    });

    it('Should render FinancialHoldingList - empty state', async () => {
        const { getByTestId } = render(<FinancialHoldingList items={[]} onChange={() => {}} selectedId={mockFinancialHoldingCards[0].id} />);

        expect(getByTestId('empty-state')).toBeInTheDocument();
    });

    it('Should render FinancialHoldingList - restricted state', async () => {
        const { getByText } = render(
            <FinancialHoldingList isRestricted items={[]} onChange={() => {}} selectedId={mockFinancialHoldingCards[0].id} />
        );

        expect(getByText(fhStrings.CUSTOMER_INFORMATION_RESTRICTED)).toBeInTheDocument();
    });

    it('Should render FinancialHoldingList - error state', async () => {
        const { getByTestId } = render(<FinancialHoldingList items={[]} onChange={() => {}} selectedId={mockFinancialHoldingCards[0].id} isError />);

        expect(getByTestId('error-state')).toBeInTheDocument();
    });

    it('Should render FinancialHoldingList - loading state', async () => {
        const { getByTestId } = render(
            <FinancialHoldingList items={[]} onChange={() => {}} selectedId={mockFinancialHoldingCards[0].id} isLoading />
        );

        expect(getByTestId('loading-spinner')).toBeInTheDocument();
    });
});
