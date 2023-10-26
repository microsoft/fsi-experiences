import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FHSummaryScreen from './FHSummaryScreen';
import { getFHMock, HIDDEN_STATE_TEXT_MOCK } from './FHData.mock';
import { categoriesMetadataMock, FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';

describe('FH summary screen Widget', () => {
    let fhItems: IndictableFH[];

    beforeAll(() => {
        fhItems = getFHMock();
    });

    it('Should render summary screen on overview table', async () => {
        const { getAllByRole } = render(
            <FHSummaryScreen
                metadata={FHMetadataMock}
                entities={fhItems}
                isLoading={false}
                isError={false}
                categoriesMetadata={categoriesMetadataMock}
            />
        );

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(6);
        expect(categoryMenu[0].lastChild?.textContent).toContain('Overview');
        expect(categoryMenu[1].lastChild?.textContent).toContain('Accounts');
        expect(categoryMenu[2].lastChild?.textContent).toContain('Investments');
        expect(categoryMenu[3].lastChild?.textContent).toContain('Loans');
        expect(categoryMenu[4].lastChild?.textContent).toContain('Lines of credit');
        expect(categoryMenu[5].lastChild?.textContent).toContain('Long-term savings');
    });

    it('Should render summary screen with removed Investments and Loans', async () => {
        const categoriesMetadata = {
            msfsi_FH_Account: 200,
            msfsi_FH_Creditline: 200,
            msfsi_FH_Investment: 404,
            msfsi_FH_Loan: 404,
            msfsi_FH_Saving: 200,
        };
        const { getAllByRole } = render(
            <FHSummaryScreen metadata={FHMetadataMock} entities={fhItems} isLoading={false} isError={false} categoriesMetadata={categoriesMetadata} />
        );

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(4);
        expect(categoryMenu[0].lastChild?.textContent).toContain('Overview');
        expect(categoryMenu[1].lastChild?.textContent).toContain('Accounts');
        expect(categoryMenu[2].lastChild?.textContent).toContain('Lines of credit');
        expect(categoryMenu[3].lastChild?.textContent).toContain('Long-term savings');
    });

    it('Should render summary screen with removed Investments and hidden Loans', async () => {
        const categoriesMetadata = {
            msfsi_FH_Account: 200,
            msfsi_FH_Creditline: 200,
            msfsi_FH_Investment: 404,
            msfsi_FH_Loan: 204,
            msfsi_FH_Saving: 200,
        };
        const { getAllByRole } = render(
            <FHSummaryScreen metadata={FHMetadataMock} entities={fhItems} isLoading={false} isError={false} categoriesMetadata={categoriesMetadata} />
        );

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(4);
        expect(categoryMenu[0].lastChild?.textContent).toContain('Overview');
        expect(categoryMenu[1].lastChild?.textContent).toContain('Accounts');
        expect(categoryMenu[2].lastChild?.textContent).toContain('Lines of credit');
        expect(categoryMenu[3].lastChild?.textContent).toContain('Long-term savings');
    });

    it('Should render summary screen with forbiden Investments', async () => {
        const categoriesMetadata = {
            msfsi_FH_Account: 200,
            msfsi_FH_Creditline: 200,
            msfsi_FH_Investment: 403,
            msfsi_FH_Loan: 200,
            msfsi_FH_Saving: 200,
        };
        const { getAllByRole, getByText, getByTestId } = render(
            <FHSummaryScreen metadata={FHMetadataMock} entities={fhItems} isLoading={false} isError={false} categoriesMetadata={categoriesMetadata} />
        );

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(6);
        fireEvent.click(categoryMenu[2]!);
        expect(getByTestId(/summary-empty-state-/i)).toBeVisible();
        expect(getByText(HIDDEN_STATE_TEXT_MOCK)).toBeVisible();
        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.no_access100);
    });

    it('Should not render removed loan category', async () => {
        const currMetadata = {
            ...FHMetadataMock,
            categories: {
                optionSet: {
                    '104800000': {
                        text: 'Lines of credit',
                        value: 104800000,
                    },
                    '104800002': {
                        text: 'Investments',
                        value: 104800002,
                    },
                    '104800003': {
                        text: 'Long-term savings',
                        value: 104800003,
                    },
                    '104800004': {
                        text: 'Accounts',
                        value: 104800004,
                    },
                },
                displayName: 'Financial Holding Category',
            },
        };
        const categoriesMetadata = {
            msfsi_FH_Account: 200,
            msfsi_FH_Creditline: 200,
            msfsi_FH_Investment: 403,
            msfsi_FH_Loan: 404,
            msfsi_FH_Saving: 200,
        };
        const { getAllByRole } = render(
            <FHSummaryScreen metadata={currMetadata} entities={fhItems} isLoading={false} isError={false} categoriesMetadata={categoriesMetadata} />
        );

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(5);
        expect(categoryMenu[0].lastChild?.textContent).toContain('Overview');
        expect(categoryMenu[1].lastChild?.textContent).toContain('Accounts');
        expect(categoryMenu[2].lastChild?.textContent).toContain('Investments');
        expect(categoryMenu[3].lastChild?.textContent).toContain('Lines of credit');
        expect(categoryMenu[4].lastChild?.textContent).toContain('Long-term savings');
    });

    it('Should switch between table tab screens', async () => {
        const { getAllByRole, getByTestId } = render(
            <FHSummaryScreen
                metadata={FHMetadataMock}
                entities={fhItems}
                isLoading={false}
                isError={false}
                categoriesMetadata={categoriesMetadataMock}
            />
        );
        const categoryMenu = getAllByRole('tab');
        fireEvent.click(categoryMenu[1]!);
        expect(getByTestId(/accounts-table/i)).toBeVisible();
        fireEvent.click(categoryMenu[5]!);
        expect(getByTestId(/long-term-savings-table/i)).toBeVisible();
        fireEvent.click(categoryMenu[0]!);
        expect(getByTestId('overview-table')).toBeVisible();
    });

    it('Should render loading state', async () => {
        const { getByText, queryByTestId } = render(
            <FHSummaryScreen metadata={FHMetadataMock} entities={fhItems} isLoading={true} isError={false} />
        );
        const loadingState = queryByTestId(/loading-spinner/i);

        expect(loadingState).toBeVisible();
        expect(getByText(commonStrings.LOADING)).toBeVisible();
    });

    it('Should render error state', async () => {
        const { getByText, queryByTestId } = render(
            <FHSummaryScreen metadata={FHMetadataMock} entities={fhItems} isLoading={false} isError={true} />
        );
        const errorState = queryByTestId('error-state');

        expect(errorState).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.error100);
    });

    it('Should render summary screen when there are customized categories', async () => {
        const currMetadata = {
            ...FHMetadataMock,
            types: {
                optionSet: {
                    ...FHMetadataMock.types.optionSet,
                    '104800015': {
                        text: 'new type',
                        value: 104800015,
                    },
                },
                displayName: 'Financial Holding Type',
            },
        };

        const { getAllByRole } = render(
            <FHSummaryScreen
                metadata={currMetadata}
                entities={fhItems}
                isLoading={false}
                isError={false}
                categoriesMetadata={categoriesMetadataMock}
            />
        );

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(6);
        expect(categoryMenu[0].lastChild?.textContent).toContain('Overview');
        expect(categoryMenu[1].lastChild?.textContent).toContain('Accounts');
        expect(categoryMenu[2].lastChild?.textContent).toContain('Investments');
        expect(categoryMenu[3].lastChild?.textContent).toContain('Loans');
        expect(categoryMenu[4].lastChild?.textContent).toContain('Lines of credit');
        expect(categoryMenu[5].lastChild?.textContent).toContain('Long-term savings');
    });
});
