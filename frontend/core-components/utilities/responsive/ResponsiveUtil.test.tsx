import { createClassSelectorRange, createClassName, getNumOfColumnsByWidth, DEFAULT_COLUMN_PREFIX } from './ResponsiveUtil';

describe('ResponsiveUtil', () => {
    describe('createClassName', () => {
        it('should return class name based on number of columns and prefix', () => {
            expect(createClassName(3, 'test')).toEqual('test-col-3');
        });
    });

    describe('createClassSelectorRange', () => {
        it('should create single class selector with default prefix', () => {
            expect(createClassSelectorRange(3)).toEqual(`.${DEFAULT_COLUMN_PREFIX}-col-3 &`);
        });

        it('should create range class selector', () => {
            expect(createClassSelectorRange(3, 6, 'test')).toEqual('.test-col-3 &, .test-col-4 &, .test-col-5 &, .test-col-6 &');
        });
    });

    describe('getNumOfColumnsByWidth', () => {
        const COLUMN_WIDTH = 160;

        it('should return 3 columns when width is pixel above 2 columns', () => {
            expect(getNumOfColumnsByWidth(COLUMN_WIDTH * 2 + 1, COLUMN_WIDTH)).toEqual(3);
        });

        it('should return 2 columns when width is pixel below 2 columns', () => {
            expect(getNumOfColumnsByWidth(COLUMN_WIDTH * 2 - 1, COLUMN_WIDTH)).toEqual(2);
        });

        it('should return 12 columns when as max num of columns', () => {
            expect(getNumOfColumnsByWidth(COLUMN_WIDTH * 14, COLUMN_WIDTH)).toEqual(12);
        });

        it('should return 1 columns for 1px width', () => {
            expect(getNumOfColumnsByWidth(1, COLUMN_WIDTH)).toEqual(1);
        });
    });
});
