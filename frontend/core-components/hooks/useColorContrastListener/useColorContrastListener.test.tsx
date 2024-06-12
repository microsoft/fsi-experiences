import { renderHook } from '@testing-library/react-hooks/lib/pure';
import { useColorContrastListener } from '.';

describe('useColorContrastListener', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it('Should return FALSE if `high contrast / color contrast` is not applied', () => {
        const { result } = renderHook(() => useColorContrastListener());

        expect(result.current).toBeFalsy();
    });
});
