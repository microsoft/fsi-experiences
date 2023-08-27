export const DEFAULT_COLUMN_PREFIX = 'fsi';
export const DEFAULT_COLUMN_WIDTH = 160;

export const createClassName = (columns: number, prefix: string = DEFAULT_COLUMN_PREFIX): string => `${prefix}-col-${columns}`;

export const createClassSelectorRange = (from: number, to: number = from, prefix: string = DEFAULT_COLUMN_PREFIX): string => {
    const classList: string[] = [];

    for (let i = from; i <= to; i++) {
        classList.push(`.${createClassName(i, prefix)} &`);
    }
    return classList.join(', ');
};

export const getNumOfColumnsByWidth = (width: number, columnWidth: number) => {
    return Math.min(Math.ceil(width / columnWidth), 12);
};
