import useResponsiveContainer, { RESIZE_WIDTH_THRESHOLD, useStableWidth } from './useResponsiveContainer';
import { renderHook } from '@testing-library/react-hooks';
let resizeDetector;

jest.mock('react-resize-detector', () => {
    resizeDetector = jest.fn();
    return {
        useResizeDetector: resizeDetector,
    };
});
describe('useResponsiveContainer', () => {
    describe('testing useResponsiveContainer', () => {
        it('should have no width', () => {
            resizeDetector.mockReturnValue({});
            const { result } = renderHook(() => useResponsiveContainer('mock'));

            expect(result.current.columns).toEqual(0);
        });

        it('should have width and height', () => {
            resizeDetector.mockReturnValue({ width: 4, height: 2 });
            const { result } = renderHook(() => useResponsiveContainer('mock', 4));

            expect(result.current.width).toEqual(4);
            expect(result.current.height).toEqual(2);
        });

        it('should change width when resized more than threshold', () => {
            resizeDetector.mockReturnValue({ width: 4, height: 2 });
            const { result, rerender } = renderHook(() => useResponsiveContainer('mock', 4));
            expect(result.current.width).toEqual(4);
            expect(result.current.height).toEqual(2);

            resizeDetector.mockReturnValue({ width: 4 + RESIZE_WIDTH_THRESHOLD, height: 2 });
            rerender(() => useResponsiveContainer('mock', 4));
            expect(result.current.width).toEqual(4 + RESIZE_WIDTH_THRESHOLD);
            expect(result.current.height).toEqual(2);
        });

        it('should not change width when resized less than threshold', () => {
            resizeDetector.mockReturnValue({ width: 4, height: 2 });
            const { result, rerender } = renderHook(() => useResponsiveContainer('mock', 4));
            expect(result.current.width).toEqual(4);
            expect(result.current.height).toEqual(2);

            resizeDetector.mockReturnValue({ width: 4 + RESIZE_WIDTH_THRESHOLD - 1, height: 2 });
            rerender(() => useResponsiveContainer('mock', 4));
            expect(result.current.width).toEqual(4);
            expect(result.current.height).toEqual(2);
        });
    });

    describe('testing useStableWidth', () => {
        it('should get the same width when not enabled', () => {
            const { result, rerender } = renderHook((width: number | undefined) => useStableWidth(width, false), {
                initialProps: 4,
            });
            expect(result.current).toEqual(4);

            rerender(5);
            expect(result.current).toEqual(5);
        });

        it('should not change width when difference is smaller threshold', () => {
            const { result, rerender } = renderHook((width: number | undefined) => useStableWidth(width, true), {
                initialProps: 4,
            });
            expect(result.current).toEqual(4);

            rerender(4 + RESIZE_WIDTH_THRESHOLD - 1);
            expect(result.current).toEqual(4);
        });

        it('should change width when difference is bigger than threshold', () => {
            const { result, rerender } = renderHook((width: number | undefined) => useStableWidth(width, true), {
                initialProps: 4,
            });
            expect(result.current).toEqual(4);

            rerender(4 + RESIZE_WIDTH_THRESHOLD);
            expect(result.current).toEqual(4 + RESIZE_WIDTH_THRESHOLD);
        });

        it('should change width when new width is smaller than the old one', async () => {
            const { result, rerender } = renderHook((width: number | undefined) => useStableWidth(width, true), {
                initialProps: 4,
            });
            expect(result.current).toEqual(4);

            rerender(3);
            expect(result.current).toEqual(3);
        });
    });
});
