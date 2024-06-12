import { MutableRefObject, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { createClassName, DEFAULT_COLUMN_WIDTH, getNumOfColumnsByWidth } from '../../utilities/responsive/ResponsiveUtil';

export interface ContainerProperties {
    width?: number;
    height?: number;
    className?: string;
    ref?: MutableRefObject<null>;
    columns: number;
}
export const RESIZE_WIDTH_THRESHOLD = 20;

export const useStableWidth = (width: number | undefined, enabled?: boolean) => {
    const currentWidth = useRef(width);

    if (width && (!currentWidth.current || width <= currentWidth.current || width - currentWidth.current >= RESIZE_WIDTH_THRESHOLD)) {
        currentWidth.current = width;
        return width;
    }

    return enabled ? currentWidth.current : width;
};

const useResponsiveContainer = (prefix: string, columnWidth: number = DEFAULT_COLUMN_WIDTH): ContainerProperties => {
    const { width: actualWidth, height, ref } = useResizeDetector();
    // ignore small changes in width(when scroll is added and removed from the page)
    const width = useStableWidth(actualWidth, true);

    if (!width) {
        return {
            ref,
            columns: 0,
        };
    }
    const columns = getNumOfColumnsByWidth(width, columnWidth);

    return {
        width,
        height,
        ref,
        className: createClassName(columns, prefix),
        columns,
    };
};

export default useResponsiveContainer;
