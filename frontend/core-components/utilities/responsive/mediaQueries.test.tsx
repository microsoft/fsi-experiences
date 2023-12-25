import { maxFiveCloumns } from './mediaQueries';
import { DEFAULT_COLUMN_WIDTH } from './ResponsiveUtil';

describe('mediaQueries', () => {
    it('should check width of mediaQueries', () => {
        expect(maxFiveCloumns).toEqual(`@media(max-width: ${DEFAULT_COLUMN_WIDTH * 5}px)`);
    });
});
