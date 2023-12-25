import { generateThemePalette } from './ThemeGenerator';

const fsiColors = {
    primaryColor: '#FF00FF',
};
describe('ThemeGenerator', () => {
    it('Should create theme palette from fsi color', async () => {
        expect(generateThemePalette(fsiColors)).toEqual(
            expect.objectContaining({
                themePrimary: fsiColors.primaryColor,
            })
        );
    });

    it('Should return undefined for invalid color', async () => {
        expect(generateThemePalette({ primaryColor: '@' })).not.toBeDefined();
    });
});
