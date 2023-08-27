import { formatNumber, isNumber } from './NumberUtils';

describe('test number utils', () => {
    it('formatNumber should return 0 when not value is 0', () => {
        const result = formatNumber(0);

        expect(result).toEqual('0');
    });

    it('formatNumber should return 1,000 when not value is 1000', () => {
        const result = formatNumber(1000);

        expect(result).toEqual('1,000');
    });

    it('formatNumber should return compacted mode', () => {
        const result = formatNumber(1000, 'en-US', true);

        expect(result).toEqual('1K');
    });

    it('formatNumber should use currency unit', () => {
        const result = formatNumber(1000, 'en-US', false, { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

        expect(result).toEqual('$1,000');
    });

    it('formatNumber should use german localization', () => {
        const result = formatNumber(1000, 'de-DE');

        expect(result).toEqual('1.000');
    });

    it('formatNumber should use euro currency', () => {
        const result = formatNumber(1000, 'en-US', false, { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 });

        expect(result).toEqual('€1,000');
    });

    it('formatNumber should show up to 2 digit after the decimal point', () => {
        const result = formatNumber(1000.3474, 'en-US', false, { maximumFractionDigits: 2 });

        expect(result).toEqual('1,000.35');
    });

    it('formatNumber should show no less than 2 digit after the decimal point', () => {
        const result = formatNumber(1000, 'en-US', false, { minimumFractionDigits: 2 });

        expect(result).toEqual('1,000.00');
    });

    it('isNumber should return true when value is a number', () => {
        const result = isNumber(50);

        expect(result).toBeTruthy();
    });

    it('isNumber should return true when value is a string and can be converted to a number', () => {
        const result = isNumber('15');

        expect(result).toBeTruthy();
    });

    it('isNumber should return false when value is not a number', () => {
        const result = isNumber([]);

        expect(result).toBeFalsy();
    });
});
