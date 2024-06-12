import React from 'react';
import { render } from '@testing-library/react';
import onRenderCompactRow from './onRenderCompatRow';
import financialStrings from '@fsi/core-components/dist/assets/strings/FinancialHoldings/FinancialHoldings.1033.json';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

const item = {
    name: 'Abigail Lewis Account (Sample) (Checking)',
    directDebit: true,
    standingOrder: true,
    card: true,
    overDraft: true,
    sum: 4226.14,
};

const WrappedComponent = () => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    return <div>{onRenderCompactRow(item, translate)}</div>;
};

describe('onRenderCompactRow', () => {
    it('should render onRenderCompactRow', () => {
        const { getByText } = render(<WrappedComponent />);
        expect(getByText(financialStrings.DEBIT_CARD)).toBeInTheDocument();
        expect(getByText(financialStrings.STANDING_ORDER)).toBeInTheDocument();
        expect(getByText(financialStrings.DIRECT_DEBIT)).toBeInTheDocument();
        expect(getByText(financialStrings.OVERDRAFT)).toBeInTheDocument();
    });
});
