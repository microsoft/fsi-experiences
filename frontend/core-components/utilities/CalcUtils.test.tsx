import { creditCardMask, getHighestIndicator, toRate } from './CalcUtils';

describe('CalcUtils', () => {
    describe('****', () => {
        it('should mask numbers with *', () => {
            expect(creditCardMask('0547845671327567')).toEqual('**** **** **** 7567');
        });

        it('should mask numbers with custom mask character', () => {
            expect(creditCardMask('0547845671317567', '$')).toEqual('$$$$ $$$$ $$$$ 7567');
        });

        it('should mask 12 digit credit card', () => {
            expect(creditCardMask('845613217567')).toEqual('**** **** **** 7567');
        });

        it('should mask 2 digit credit card', () => {
            expect(creditCardMask('84')).toEqual('**** **** **** 84');
        });

        it('should mask partially masked numbers', () => {
            expect(creditCardMask('********71327567')).toEqual('**** **** **** 7567');
        });

        it('should mask partially masked numbers with 8 digit', () => {
            expect(creditCardMask('****7567')).toEqual('**** **** **** 7567');
        });

        it('should mask partially masked numbers with 8 digit 2', () => {
            expect(creditCardMask('****7567')).toEqual('**** **** **** 7567');
        });
    });

    describe('toRate', () => {
        it('should add % to numeric value', () => {
            expect(toRate(100)).toEqual('100%');
            expect(toRate(75)).toEqual('75%');
        });

        it('should add % to zero value', () => {
            expect(toRate(0)).toEqual('0%');
        });

        it('should return N/A to nullish values', () => {
            expect(toRate(undefined)).toEqual('N/A');
        });

        it('should return N/A for NaN value', () => {
            expect(toRate(parseInt('sg23'))).toEqual('N/A');
        });
    });

    describe('check indicator', () => {
        it('should return the greater indicator', () => {
            expect(getHighestIndicator(100, 200)).toEqual(200);
        });
        it('second indicator is undefined, should return the first indicator', () => {
            expect(getHighestIndicator(100, undefined)).toEqual(100);
        });
        it('first indicator is undefined, should return the second indicator', () => {
            expect(getHighestIndicator(undefined, 100)).toEqual(100);
        });
    });
});
