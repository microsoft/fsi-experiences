import { renderHook } from '@testing-library/react-hooks/lib/pure';
import { useDebounce } from './useDebounce';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

jest.useFakeTimers();

describe('useDebounce', () => {
    it('should call the function', () => {
        const mockFn = jest.fn();
        const { result } = renderHook(() => useDebounce(mockFn, [], 1000));
        expect(result.current).toBe(mockFn);
    });
});
