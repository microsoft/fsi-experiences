import { getAgeInYears, isDateExpired, isDateValid } from './TimeUtils';
import differenceInYears from 'date-fns/differenceInYears';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

jest.mock('date-fns/differenceInYears');

const mockDifferenceInYears = differenceInYears as jest.MockedFunction<typeof differenceInYears>;

describe('TimeUtils', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('isDateValid', () => {
        it('should fail for non Date type', () => {
            expect(isDateValid(undefined)).toBeFalsy();
        });

        it('should fail for non exiting date', () => {
            expect(isDateValid(new Date('31-02-2021'))).toBeFalsy();
        });

        it('should fail for bad Date', () => {
            expect(isDateValid(new Date('asd'))).toBeFalsy();
        });

        it('should return true for valid date', () => {
            expect(isDateValid(new Date())).toBeTruthy();
        });
    });

    describe('getAgeInYears', () => {
        it('should return undefined for missing date', () => {
            expect(getAgeInYears(undefined)).toBeUndefined();
        });

        it('should return undefined for invalid date', () => {
            expect(getAgeInYears(new Date('13-13-2013'))).toBeUndefined();
        });

        it('should return differenceInYears', () => {
            mockDifferenceInYears.mockReturnValueOnce(42);
            expect(getAgeInYears(new Date('01-01-2013'))).toEqual(42);
        });
    });

    describe('isDateExpired', () => {
        it('should return false for missing date', () => {
            expect(isDateExpired(undefined)).toBeFalsy();
        });

        it('should return false if the date is today', () => {
            expect(isDateExpired(new Date())).toBeFalsy();
        });

        it('should return false if the date is after today', () => {
            expect(isDateExpired(addDays(Date.now(), 1))).toBeFalsy();
        });

        it('should return true if the date before today', () => {
            expect(isDateExpired(subDays(Date.now(), 1))).toBeTruthy();
        });
    });
});
