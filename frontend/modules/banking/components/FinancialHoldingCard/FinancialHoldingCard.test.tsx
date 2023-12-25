import React from 'react';
import { render } from '@testing-library/react';
import { mockFinancialHoldingCards } from '../../constants/FinancialHoldingCard';
import FinancialHoldingCard from './FinancialHoldingCard';

describe('FinancialHoldingCard', () => {
    it('Should render FinancialHoldingCard', async () => {
        const { getByTestId, getByText } = render(<FinancialHoldingCard {...mockFinancialHoldingCards[0]} />);

        expect(getByTestId('fh-card-view')).toBeInTheDocument();
        expect(getByText(mockFinancialHoldingCards[0].name)).toBeInTheDocument();
        expect(getByText(mockFinancialHoldingCards[0].type || '')).toBeInTheDocument();
        expect(getByTestId('currency-wrapper')).toBeInTheDocument();
        expect(getByTestId('caret-performance-CaretSolidUp')).toBeInTheDocument();
    });
});
