import { assetsAndLiabilitiesMock } from '../interfaces/mocks/IAssetsAndLiabilities.mock';
import { calculateFinancialValues } from './calculateFinancialValues';

describe('calculateFinancialValues', () => {
    const mockProps = assetsAndLiabilitiesMock.liabilities;
    const customerId = '1';

    it('Should return calculated values', () => {
        const result = calculateFinancialValues(mockProps, customerId);

        expect(result).toEqual({
            total: mockProps.reduce((acc, item) => acc + item.value, 0),
            applicantTotal: mockProps.filter(item => item.customerId === customerId).reduce((acc, item) => item.value + acc, 0),
        });
    });

    it('Should return object with default values, when no array passed', () => {
        const result = calculateFinancialValues(undefined as any);

        expect(result).toEqual({ total: 0, applicantTotal: 0 });
    });

    it('Should return applicantTotal: 0, when applicantId parameter is undefined', () => {
        const result = calculateFinancialValues(mockProps);

        expect(result).toEqual({
            total: mockProps.reduce((acc, item) => acc + item.value, 0),
            applicantTotal: 0,
        });
    });
});
