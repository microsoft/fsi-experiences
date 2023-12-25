import React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { FHOverviewTable, IFHOverviewTableProps } from './FHOverviewTable';
import { getFHMock, INDICATOR_TO_MESSAGE_MOCK } from './FHData.mock';
import { categoriesMetadataMock, FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';
describe('FHOverviewTable', () => {
    let fhItems: IndictableFH[] = getFHMock();

    const defaultProps: IFHOverviewTableProps = {
        indictableFHItems: fhItems,
        typesOptionSet: FHMetadataMock.types.optionSet,
        categoryOptionSet: FHMetadataMock.categories.optionSet,
        categoriesMetadata: categoriesMetadataMock,
    };

    beforeEach(() => {
        fhItems = getFHMock();
    });

    it('Should render overview table with active FH types', async () => {
        const { getByText, getAllByTestId, queryAllByTestId } = render(<FHOverviewTable {...defaultProps} />);

        expect(getByText('Accounts')).toBeVisible();
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('Loans')).toBeVisible();
        expect(getByText('Lines of credit')).toBeVisible();
        expect(getByText('Long-term savings')).toBeVisible();

        expect(getByText('4,444')).toBeVisible();
        expect(getByText('1,234')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();
        expect(getByText('1,000')).toBeVisible();
        expect(getByText('20,555')).toBeVisible();

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(0);

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(5);
        expect(activeTypes[0]).toContainHTML('Accounts');
        expect(activeTypes[1]).toContainHTML('Investments');
        expect(activeTypes[2]).toContainHTML('Loans');
        expect(activeTypes[3]).toContainHTML('Lines of credit');
        expect(activeTypes[4]).toContainHTML('Long-term savings');
    });

    it('Should render overview table with active FH types - compact', async () => {
        const { getByText, getAllByTestId, queryAllByTestId, debug } = render(<FHOverviewTable isCompact {...defaultProps} />);
        expect(getByText('Accounts')).toBeVisible();
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('Loans')).toBeVisible();
        expect(getByText('Lines of credit')).toBeVisible();
        expect(getByText('Long-term savings')).toBeVisible();

        expect(getByText('4,444')).toBeVisible();
        expect(getByText('1,234')).toBeVisible();
        expect(getByText('7,245')).toBeVisible();
        expect(getByText('1,000')).toBeVisible();
        expect(getByText('20,555')).toBeVisible();

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(0);

        const activeTypes = getAllByTestId('summary-cell-name');
        expect(activeTypes).toHaveLength(5);
        expect(activeTypes[0]).toContainHTML('Accounts');
        expect(activeTypes[1]).toContainHTML('Investments');
        expect(activeTypes[2]).toContainHTML('Loans');
        expect(activeTypes[3]).toContainHTML('Lines of credit');
        expect(activeTypes[4]).toContainHTML('Long-term savings');
    });

    it('Should render overview table with active and non active FH types', async () => {
        const testFHItems = fhItems.filter(
            item => ![FH_NAME_TO_CATEGORY_MAP.Investments, FH_NAME_TO_CATEGORY_MAP.Credit, FH_NAME_TO_CATEGORY_MAP.Saving].includes(item.category)
        );

        const testProps: IFHOverviewTableProps = {
            ...defaultProps,
            indictableFHItems: testFHItems,
        };

        const { getByText, getAllByTestId, queryAllByTestId, getByTestId } = render(<FHOverviewTable {...testProps} />);
        expect(getByText('Accounts')).toBeVisible();
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('Loans')).toBeVisible();
        expect(getByText('Lines of credit')).toBeVisible();
        expect(getByText('Long-term savings')).toBeVisible();
        const table = getByTestId('overview-table-inner');
        expect(within(table).getByText('4,444')).toBeVisible();
        expect(within(table).getByText('7,245')).toBeVisible();

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(3);
        expect(nonActiveTypes[0]).toContainHTML('Investments');
        expect(nonActiveTypes[1]).toContainHTML('Lines of credit');
        expect(nonActiveTypes[2]).toContainHTML('Long-term savings');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(2);
        expect(activeTypes[0]).toContainHTML('Accounts');
        expect(activeTypes[1]).toContainHTML('Loans');
    });

    it('Should render overview table with bad category', async () => {
        fhItems.forEach((value, key) => {
            if (value.category === FH_NAME_TO_CATEGORY_MAP['Loans']) {
                value.category = 1;
            }
        });

        const testProps: IFHOverviewTableProps = {
            ...defaultProps,
            indictableFHItems: fhItems,
        };
        const { getAllByTestId, queryAllByTestId } = render(<FHOverviewTable {...testProps} />);

        const nonActiveTypes = queryAllByTestId(/blue-icon-inactive/i);
        expect(nonActiveTypes).toHaveLength(1);
        expect(nonActiveTypes[0]).toContainHTML('Loans');

        const activeTypes = getAllByTestId(/blue-icon-active-/i);
        expect(activeTypes).toHaveLength(4);
        expect(activeTypes[0]).toContainHTML('Accounts');
        expect(activeTypes[1]).toContainHTML('Investments');
        expect(activeTypes[2]).toContainHTML('Lines of credit');
        expect(activeTypes[3]).toContainHTML('Long-term savings');
    });

    it('Should render overview table with assets liabillities graph', async () => {
        const { getAllByTestId } = render(
            <FHOverviewTable
                typesOptionSet={FHMetadataMock.types.optionSet}
                categoryOptionSet={FHMetadataMock.categories.optionSet}
                indictableFHItems={fhItems}
            />
        );

        const assetLiabillitiesGraph = getAllByTestId(/assets-liabillities-/i);
        expect(assetLiabillitiesGraph).toBeTruthy();
    });

    it('Should render overview table with indicators', async () => {
        const { queryByText, getByText, queryAllByTestId } = render(<FHOverviewTable {...defaultProps} />);
        const indicatorWrapper = queryAllByTestId(/indicator-icon-/i);

        expect(indicatorWrapper).toBeTruthy();
        expect(queryByText(INDICATOR_TO_MESSAGE_MOCK['Credit Outstanding Balance'])).toBeNull();
        expect(queryByText(INDICATOR_TO_MESSAGE_MOCK['Account Blocked Amount'])).toBeNull();
        expect(queryByText(INDICATOR_TO_MESSAGE_MOCK['Savings Blocked'])).toBeNull();

        fireEvent.mouseOver(indicatorWrapper[0]!);
        await waitFor(() => {
            expect(getByText(INDICATOR_TO_MESSAGE_MOCK['Account Blocked Amount'])).toBeInTheDocument();
        });

        fireEvent.mouseOver(indicatorWrapper[1]!);
        await waitFor(() => {
            expect(getByText(INDICATOR_TO_MESSAGE_MOCK['Credit Outstanding Balance'])).toBeInTheDocument();
        });

        fireEvent.mouseOver(indicatorWrapper[2]!);
        await waitFor(() => {
            expect(getByText(INDICATOR_TO_MESSAGE_MOCK['Savings Blocked'])).toBeInTheDocument();
        });
    });

    it('Should render overview table with forbidden categories', async () => {
        const testProps: IFHOverviewTableProps = {
            ...defaultProps,
            categoriesMetadata: {
                msfsi_FH_Account: 403,
                msfsi_FH_Creditline: 403,
                msfsi_FH_Investment: 200,
                msfsi_FH_Loan: 200,
                msfsi_FH_Saving: 200,
            },
        };

        const { getByText, getAllByTestId, queryAllByTestId, getByTestId } = render(<FHOverviewTable {...testProps} />);
        expect(getByText('Accounts')).toBeVisible();
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('Loans')).toBeVisible();
        expect(getByText('Lines of credit')).toBeVisible();
        expect(getByText('Long-term savings')).toBeVisible();

        const hiddenIcons = getAllByTestId(/indicator-icon-lock/);
        expect(hiddenIcons.length).toEqual(2);
    });

    it('Should render overview table with hidden categories', async () => {
        const testProps: IFHOverviewTableProps = {
            ...defaultProps,
            categoriesMetadata: {
                msfsi_FH_Account: 204,
                msfsi_FH_Creditline: 204,
                msfsi_FH_Investment: 200,
                msfsi_FH_Loan: 200,
                msfsi_FH_Saving: 200,
            },
        };

        const { getByText, getAllByTestId, queryAllByTestId, getByTestId } = render(<FHOverviewTable {...testProps} />);
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('Loans')).toBeVisible();
        expect(getByText('Long-term savings')).toBeVisible();
    });

    it('Should render overview table when there are customized categories', async () => {
        const testProps: IFHOverviewTableProps = {
            ...defaultProps,
            categoryOptionSet: {
                ...FHMetadataMock.categories.optionSet,
                '104800005': {
                    text: 'New category',
                    value: 104800005,
                },
                '104800006': {
                    text: 'New category 2',
                    value: 104800006,
                },
            },
        };

        const { getByText } = render(<FHOverviewTable {...testProps} />);
        expect(getByText('Accounts')).toBeVisible();
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('Loans')).toBeVisible();
        expect(getByText('Lines of credit')).toBeVisible();
        expect(getByText('Long-term savings')).toBeVisible();
    });
});
