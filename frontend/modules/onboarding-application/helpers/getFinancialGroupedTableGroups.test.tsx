import { getFinancialGroupedTableGroups } from './getFinancialGroupedTableGroups';

describe('getFinancialGroupedTableGroups', () => {
    const mockProps = {
        key: 'groupKey',
        name: 'groupName',
        total: 50,
        count: 10,
    };

    it('Should return calculated value', () => {
        const result = getFinancialGroupedTableGroups(mockProps);

        expect(result).toEqual([
            {
                key: `group-${mockProps.key}-key`,
                name: mockProps.name,
                ariaLabel: mockProps.name,
                total: mockProps.total,
                startIndex: 0,
                count: mockProps.count,
                level: 0,
            },
        ]);
    });
});
