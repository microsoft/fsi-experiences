import { renderHook } from '@testing-library/react-hooks/lib/pure';
import { useMediaQueryListener } from '.';

describe('useMediaQueryListener', () => {
    const testQuery = 'screen and (min-width: 100px)';

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: query === testQuery,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it('Should return FALSE if `query` parameter is an empty string', () => {
        const { result } = renderHook(() => useMediaQueryListener(''));

        expect(result.current).toBeFalsy();
    });

    it('Should return TRUE if `query` parameter is valid and has been applied', () => {
        const { result } = renderHook(() => useMediaQueryListener(testQuery));

        expect(result.current).toBeTruthy();
    });
});
