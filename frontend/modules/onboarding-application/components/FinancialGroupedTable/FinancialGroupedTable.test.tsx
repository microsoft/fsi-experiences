import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { render } from '@testing-library/react';
import React from 'react';
import financialCategoriesStrings from '../../assets/strings/FinancialCategoriesFormFields/FinancialCategoriesFormFields.1033.json';
import assetsAndLiabilitiesStrings from '../../assets/strings/AssetsAndLiabilities/AssetsAndLiabilities.1033.json';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/FinancialCategories.const';
import FinancialGroupedTable from './FinancialGroupedTable';

describe('FinancialGroupedTable', () => {
    const itemsFirstGroup = [
        {
            id: '1',
            name: 'some name 1',
            typeFormattedValue: 'type 1',
            description: 'description 1',
            value: 50,
            category: CATEGORIES.INCOME,
        },
        { id: '2', name: 'some name 2', typeFormattedValue: 'type 2', description: 'description 2', value: 100, category: CATEGORIES.INCOME },
    ];

    const itemsSecondGroup = [
        { id: '3', name: 'some name 3', typeFormattedValue: 'type 3', description: 'description 3', value: 300, category: CATEGORIES.LIABILITY },
        { id: '4', name: 'some name 4', typeFormattedValue: 'type 4', description: 'description 4', value: 700, category: CATEGORIES.LIABILITY },
    ];

    const mockData = {
        groups: [
            { key: 'firstGroupKey', name: 'first group', total: 150, startIndex: 0, count: itemsFirstGroup.length },
            { key: 'secondGroupKey', name: 'second group', total: 1000, startIndex: itemsFirstGroup.length, count: itemsSecondGroup.length },
        ],
        data: [...itemsFirstGroup, ...itemsSecondGroup],
        actionsRenderer: jest.fn(),
    };

    const getByTextMatcher = stringToFind => {
        return (content, node) => {
            const hasText = node => node.textContent === stringToFind;
            const nodeHasText = hasText(node);
            const childrenDontHaveText = Array.from(node!.children).every(child => !hasText(child));

            return nodeHasText && childrenDontHaveText;
        };
    };

    it('Should render FinancialGroupedTable', () => {
        const { getByText } = render(<FinancialGroupedTable {...mockData} />);

        expect(getByText(getByTextMatcher(`${mockData.groups[0].name} (${itemsFirstGroup.length})`))).toBeInTheDocument();

        expect(getByText(getByTextMatcher(`${mockData.groups[1].name} (${itemsSecondGroup.length})`))).toBeInTheDocument();
    });

    it('Should render FinancialGroupedTable - Loading', () => {
        const { getByText } = render(<FinancialGroupedTable isLoading {...mockData} />);

        expect(getByText(commonStrings.CONNECTING_WITH_DATA)).toBeInTheDocument();
    });

    it('Should render FinancialGroupedTable - Error', () => {
        const { getByText } = render(<FinancialGroupedTable isError {...mockData} />);

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render Assets and Liabilities FinancialGroupedTable - Empty State', () => {
        const { getByText } = render(
            <FinancialGroupedTable
                groups={undefined as any}
                data={undefined as any}
                actionsRenderer={jest.fn()}
                ariaLabelForTable={assetsAndLiabilitiesStrings.ASSETS_AND_LIABILITIES_SECTION_NAME}
            />
        );

        expect(getByText(financialCategoriesStrings.EMPTY_STATE_TABLE_ASSETS_AND_LIABILITIES)).toBeInTheDocument();
    });

    it('Should render FinancialGroupedTable - with one of the groups being empty', () => {
        mockData.groups[0].count = 0;
        const { getByText } = render(<FinancialGroupedTable {...mockData} data={[...itemsSecondGroup]} />);

        expect(getByText(getByTextMatcher(`${mockData.groups[0].name} (0)`))).toBeInTheDocument();
    });
});
