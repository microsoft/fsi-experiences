import { ApplicantFinancialItemCategories } from '../constants/FinancialCategories.const';
import { getCategorizedFinancialItems } from './getCategorizedFinancialItems';

describe('getCategorizedFinancialItems', () => {
    const items = [{ value: 10 }, { value: 20 }];
    const category = ApplicantFinancialItemCategories.ASSET;

    it('Should return categorized items', () => {
        const result = getCategorizedFinancialItems({ items, category });

        expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({ value: 10, category }), expect.objectContaining({ value: 20, category })])
        );
    });

    it('Should return categorized items with negative values', () => {
        const result = getCategorizedFinancialItems({ items, category, setNegativeValues: true });

        expect(result).toEqual(
            expect.arrayContaining([expect.objectContaining({ value: -10, category }), expect.objectContaining({ value: -20, category })])
        );
    });

    it('Should return empty array when items parameter is undefined', () => {
        const result = getCategorizedFinancialItems({ items: undefined, category });

        expect(result).toEqual([]);
    });
});
