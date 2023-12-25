export const getIndicatorStyles = (size: number, color: string) => ({
    root: {
        textAlign: 'center',
        verticalAlign: 'middle',
        height: size,
        width: size,
        display: 'inline-flex',
        justifyContent: 'center',
        cursor: 'default',
        i: {
            color: color,
            fontSize: size,
            textAlign: 'center',
            verticalAlign: 'middle',
            margin: 0,
        },
    },
    rootFocused: {
        '&.indicator-icon-button:focus::after': {
            inset: '0px',
            outlineWidth: '2px',
        },
    },
});

export const tooltipHostStyle = {
    root: {
        display: 'inline-block',
        cursor: 'default',
        lineHeight: '14px',
    },
};
