import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import PartyAssetsLiabilities from './PartyAssetsLiabilities';
import { mockLoanCustomers } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import partyAssetsAndLiabilities from '@fsi/core-components/dist/assets/strings/PartyAssetsAndLiabilities/PartyAssetsAndLiabilities.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';
import { assetsAndLiabilitiesMock } from '../../interfaces/ILoanFinancialCategory/mocks/ILoanAssetsAndLiabilities.mocks';
import loanCustomerLookupControlStrings from '@fsi/core-components/dist/assets/strings/LoanCustomerLookupControl/LoanCustomerLookupControl.1033.json';

describe('PartyAssetsLiabilities', () => {
    const applicantId = mockLoanCustomers[0].id;
    const allPartiesAssets = assetsAndLiabilitiesMock.assets.reduce((prevValue, currValue) => prevValue + currValue.value, 0) || 0;
    const allPartiesLiabilities = assetsAndLiabilitiesMock.liabilities.reduce((prevValue, currValue) => prevValue + currValue.value, 0) || 0;
    const applicantAssets = assetsAndLiabilitiesMock.assets.reduce(
        (prevValue, currValue) => (currValue.customerId === applicantId ? prevValue + currValue.value : prevValue),
        0
    );
    const applicantLiabilities = assetsAndLiabilitiesMock.liabilities.reduce(
        (prevValue, currValue) => (currValue.customerId === applicantId ? prevValue + currValue.value : prevValue),
        0
    );

    const mockProps = {
        applicantName: mockLoanCustomers[0].fullName,
        allPartiesAssets: allPartiesAssets,
        allPartiesLiabilities: allPartiesLiabilities,
        applicantAssets: applicantAssets,
        applicantLiabilities: applicantLiabilities,
    };

    const componentToRender = <PartyAssetsLiabilities {...mockProps} />;

    it('Should render PartyAssetsLiabilities', () => {
        const { getByText } = render(componentToRender);
        expect(getByText(partyAssetsAndLiabilities.COMBINED_ASSETS)).toBeInTheDocument();
        expect(getByText(partyAssetsAndLiabilities.COMBINED_LIABILITIES)).toBeInTheDocument();
        expect(
            getByText(partyAssetsAndLiabilities.APPLICANT_TOTAL_ASSETS.replace('{{applicant}}', mockLoanCustomers[0].fullName))
        ).toBeInTheDocument();
        expect(
            getByText(partyAssetsAndLiabilities.APPLICANT_TOTAL_LIABILITIES.replace('{{applicant}}', mockLoanCustomers[0].fullName))
        ).toBeInTheDocument();
    });

    it('Should render PartyAssetsLiabilities - Loading', () => {
        const { getByText } = render(
            <PartyAssetsLiabilities
                isLoading
                applicantName={mockLoanCustomers[0].fullName}
                allPartiesAssets={allPartiesAssets}
                allPartiesLiabilities={allPartiesLiabilities}
                applicantAssets={applicantAssets}
                applicantLiabilities={applicantLiabilities}
            />
        );

        expect(getByText(commonStrings.LOADING)).toBeInTheDocument();
    });

    it('Should render PartyAssetsLiabilities - Error', () => {
        const { getByText } = render(
            <PartyAssetsLiabilities
                isError
                applicantName={mockLoanCustomers[0].fullName}
                allPartiesAssets={allPartiesAssets}
                allPartiesLiabilities={allPartiesLiabilities}
                applicantAssets={applicantAssets}
                applicantLiabilities={applicantLiabilities}
            />
        );

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render PartyAssetsLiabilities - Empty State', () => {
        const { getByText } = render(
            <PartyAssetsLiabilities
                applicantName={mockLoanCustomers[0].fullName}
                allPartiesAssets={0}
                allPartiesLiabilities={0}
                applicantAssets={0}
                applicantLiabilities={0}
            />
        );

        expect(getByText(partyAssetsAndLiabilities.EMPTY_STATE_PARTY_ASSETS)).toBeInTheDocument();
    });

    it('Checking if sum of assets and liabilities is being displayed', () => {
        const { getAllByText } = render(componentToRender);
        // one for screen readers and another to be displayed along with the chart
        const allPartiesAssetsElems = getAllByText(formatNumber(allPartiesAssets));
        const allPartiesLiabilitiesElems = getAllByText(formatNumber(allPartiesLiabilities));

        allPartiesAssetsElems.forEach(elem => expect(elem).toBeInTheDocument());
        allPartiesLiabilitiesElems.forEach(elem => expect(elem).toBeInTheDocument());
    });

    it('Checking if sum of assets and liabilities of applicant is being displayed', () => {
        const { getAllByText } = render(componentToRender);
        // one for screen readers and another to be displayed along with the chart
        const applicantAssetsElems = getAllByText(formatNumber(applicantAssets));
        const applicantLiabilitiesElems = getAllByText(formatNumber(applicantLiabilities));

        applicantAssetsElems.forEach(elem => expect(elem).toBeInTheDocument());
        applicantLiabilitiesElems.forEach(elem => expect(elem).toBeInTheDocument());
    });

    it('Should NOT display applicant assets and liabilities if showOnlyCombinedData is set', () => {
        const { queryByTestId } = render(
            <PartyAssetsLiabilities
                applicantName={mockLoanCustomers[0].fullName}
                allPartiesAssets={allPartiesAssets}
                allPartiesLiabilities={allPartiesLiabilities}
                applicantAssets={applicantAssets}
                applicantLiabilities={applicantLiabilities}
                showOnlyCombinedData
            />
        );
        expect(queryByTestId('applicant-total-assets-text')).toBeNull();
        expect(queryByTestId('applicant-total-liabilities-text')).toBeNull();
    });

    it('Should enable adding new assets and liabilities', () => {
        const { getByRole, getByText } = render(<PartyAssetsLiabilities {...mockProps} hasPrivilege={jest.fn().mockReturnValue(true)} />);

        fireEvent.click(getByText(loanCustomerLookupControlStrings.ADD_NEW_ITEM));

        expect(getByRole('menuitem', { name: 'Declared asset' }).getAttribute('aria-disabled')).toEqual('false');
        expect(getByRole('menuitem', { name: 'Declared liability' }).getAttribute('aria-disabled')).toEqual('false');
    });

    it('Should disable adding new assets and liabilities when missing privileges', () => {
        const { getByRole, getByText } = render(<PartyAssetsLiabilities {...mockProps} hasPrivilege={jest.fn().mockReturnValue(false)} />);

        fireEvent.click(getByText(loanCustomerLookupControlStrings.ADD_NEW_ITEM));

        expect(getByRole('menuitem', { name: 'Declared asset' }).getAttribute('aria-disabled')).toEqual('true');
        expect(getByRole('menuitem', { name: 'Declared liability' }).getAttribute('aria-disabled')).toEqual('true');
    });
});
