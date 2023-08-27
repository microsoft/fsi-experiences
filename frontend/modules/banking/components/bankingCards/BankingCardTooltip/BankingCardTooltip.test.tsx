import React from 'react';
import { render, within, screen } from '@testing-library/react';
import BankingCardTooltip from './BankingCardTooltip';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';

const testField = (fieldLabel: string, fieldValue: string, currency = '') => {
    expect(screen.getByText(fieldLabel)).toBeVisible();
    expect(within(screen.getByTestId(`databox-container-${fieldLabel}`)).getByText(fieldValue)).toBeVisible();
    expect(within(screen.getByTestId(`databox-container-${fieldLabel}`)).getByText(currency)).toBeVisible();
};

describe('BankingCardTooltip', () => {
    // eslint-disable-next-line jest/expect-expect
    it('should render card tooltip', () => {
        render(
            <BankingCardTooltip
                embossingName="full name"
                currencyId={'USD'}
                purchasingLimit={15000}
                withdrawalLimit={2000}
                metadata={FHMetadataMock}
            />
        );

        testField(FHMetadataMock.fhiEmbossingName.displayName, 'full name');
        testField(FHMetadataMock.fhiPurchasingLimit.displayName, '15,000', 'USD');
        testField(FHMetadataMock.fhiWithdrawalLimit.displayName, '2,000', 'USD');
    });

    it('should not throw when metadata is undefined', () => {
        expect(() =>
            render(<BankingCardTooltip embossingName="full name" currencyId={'USD'} purchasingLimit={15000} withdrawalLimit={2000} />)
        ).not.toThrow();
    });
});
