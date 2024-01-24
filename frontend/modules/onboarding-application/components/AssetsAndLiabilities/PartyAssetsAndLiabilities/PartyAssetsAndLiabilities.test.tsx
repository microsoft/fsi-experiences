import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { formatNumber } from '@fsi/core-components/dist/utilities/NumberUtils';
import { assetsAndLiabilitiesMock } from '../../../interfaces/mocks/IAssetsAndLiabilities.mock';
import { mockFinancialCategoriesApplicants } from '../../../interfaces/mocks/IApplicant.mock';
import PartyAssetsAndLiabilities from '.';
import assetsAndLiabilitiesStrings from '../../../assets/strings/AssetsAndLiabilities/AssetsAndLiabilities.1033.json';

describe('AssetsAndLiabilitiesWidget', () => {
    const applicantId = mockFinancialCategoriesApplicants[0].id;
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
        applicantName: mockFinancialCategoriesApplicants[0].name,
        allPartiesAssets: allPartiesAssets,
        allPartiesLiabilities: allPartiesLiabilities,
        applicantAssets: applicantAssets,
        applicantLiabilities: applicantLiabilities,
    };

    const componentToRender = <PartyAssetsAndLiabilities {...mockProps} />;

    it('Should render AssetsAndLiabilitiesWidget', () => {
        const { getByText } = render(componentToRender);
        expect(getByText(assetsAndLiabilitiesStrings.COMBINED_ASSETS)).toBeInTheDocument();
        expect(getByText(assetsAndLiabilitiesStrings.COMBINED_LIABILITIES)).toBeInTheDocument();
        expect(
            getByText(assetsAndLiabilitiesStrings.APPLICANT_TOTAL_ASSETS.replace('{{applicant}}', mockFinancialCategoriesApplicants[0].name))
        ).toBeInTheDocument();
        expect(
            getByText(assetsAndLiabilitiesStrings.APPLICANT_TOTAL_LIABILITIES.replace('{{applicant}}', mockFinancialCategoriesApplicants[0].name))
        ).toBeInTheDocument();
    });

    it('Should render AssetsAndLiabilitiesWidget - Loading', () => {
        const { getByText } = render(
            <PartyAssetsAndLiabilities
                isLoading
                applicantName={mockFinancialCategoriesApplicants[0].name}
                allPartiesAssets={allPartiesAssets}
                allPartiesLiabilities={allPartiesLiabilities}
                applicantAssets={applicantAssets}
                applicantLiabilities={applicantLiabilities}
            />
        );

        expect(getByText(commonStrings.LOADING)).toBeInTheDocument();
    });

    it('Should render AssetsAndLiabilitiesWidget - Error', () => {
        const { getByText } = render(
            <PartyAssetsAndLiabilities
                isError
                applicantName={mockFinancialCategoriesApplicants[0].name}
                allPartiesAssets={allPartiesAssets}
                allPartiesLiabilities={allPartiesLiabilities}
                applicantAssets={applicantAssets}
                applicantLiabilities={applicantLiabilities}
            />
        );

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render AssetsAndLiabilitiesWidget - Empty State', () => {
        const { getByText } = render(
            <PartyAssetsAndLiabilities
                applicantName={mockFinancialCategoriesApplicants[0].name}
                allPartiesAssets={0}
                allPartiesLiabilities={0}
                applicantAssets={0}
                applicantLiabilities={0}
                showOnlyCombinedData
            />
        );

        expect(getByText(assetsAndLiabilitiesStrings.EMPTY_STATE_PARTY_ASSETS)).toBeInTheDocument();
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
            <PartyAssetsAndLiabilities
                applicantName={mockFinancialCategoriesApplicants[0].name}
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
        const { getByRole, getByText } = render(<PartyAssetsAndLiabilities {...mockProps} hasPrivilege={jest.fn().mockReturnValue(true)} />);

        fireEvent.click(getByText(assetsAndLiabilitiesStrings.ADD_NEW_ITEM));

        expect(getByRole('menuitem', { name: 'Declared asset' }).getAttribute('aria-disabled')).toEqual('false');
        expect(getByRole('menuitem', { name: 'Declared liability' }).getAttribute('aria-disabled')).toEqual('false');
    });

    it('Should disable adding new assets and liabilities when missing privileges', () => {
        const { getByRole, getByText } = render(<PartyAssetsAndLiabilities {...mockProps} hasPrivilege={jest.fn().mockReturnValue(false)} />);

        fireEvent.click(getByText(assetsAndLiabilitiesStrings.ADD_NEW_ITEM));

        expect(getByRole('menuitem', { name: 'Declared asset' }).getAttribute('aria-disabled')).toEqual('true');
        expect(getByRole('menuitem', { name: 'Declared liability' }).getAttribute('aria-disabled')).toEqual('true');
    });
});
