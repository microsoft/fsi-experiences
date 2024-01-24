export const toCurrency = (value, compact = false, isStyled = true, localization = 'en-US', style = 'currency', currency = 'USD') => {
    if (value !== 0 && !value) {
        return 'N/A';
    }
    let formatStyle;
    const isCompact = compact || (Math.abs(Math.round(value)) + '').length > 7;

    if (isStyled) {
        formatStyle = {
            style,
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            notation: isCompact ? 'compact' : 'standard',
        };
    }

    const formatter = Intl.NumberFormat(localization, formatStyle);
    return formatter.format(Math.round(value));
};
