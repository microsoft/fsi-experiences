export const formatNumber = (value: number, localization = 'en-US', isCompact = false, moreOptions?: Intl.NumberFormatOptions) => {
    const formatOptions = {
        notation: (isCompact ? 'compact' : 'standard') as any,
        ...moreOptions,
    };

    const formatter = Intl.NumberFormat(localization, formatOptions);
    return formatter.format(value);
};

export const isNumber = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
