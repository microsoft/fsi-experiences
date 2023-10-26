import { toCurrency } from './CurrencyUtils';

describe('test currency utils', () => {
    it('toCurrency should return NA when not value exists', () => {
        const result = toCurrency(undefined);

        expect(result).toEqual('N/A');
    });

    it('toCurrency should return 0 when not value is 0', () => {
        const result = toCurrency(0);

        expect(result).toEqual('$0');
    });

    it('toCurrency should return 1,000 when not value is 1000', () => {
        const result = toCurrency(1000);

        expect(result).toEqual('$1,000');
    });

    it('toCurrency should return compacted mode', () => {
        const result = toCurrency(1000, true);

        expect(result).toEqual('$1K');
    });

    it('toCurrency should return compacted mode event when flag is down', () => {
        const result = toCurrency(10000000, false);

        expect(result).toEqual('$10M');
    });

    it('toCurrency should ignore compact and styling when style flag is down', () => {
        const result = toCurrency(1000, true, false);

        expect(result).toEqual('1,000');
    });

    it('toCurrency should use decimal unit', () => {
        const result = toCurrency(1000, false, true, undefined, 'decimal');

        expect(result).toEqual('1,000');
    });

    it('toCurrency should use german localization', () => {
        const result = toCurrency(1000, false, true, 'de-DE', 'decimal');

        expect(result).toEqual('1.000');
    });

    it('toCurrency should use euro currency', () => {
        const result = toCurrency(1000, false, true, undefined, undefined, 'EUR');

        expect(result).toEqual('€1,000');
    });
});
