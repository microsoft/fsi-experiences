import { IStackStyles } from '@fluentui/react/lib/components/Stack';
import { minFourColumns, minSevenColumns } from '../../consts/reponsive.consts';

export const contentTokens = { childrenGap: 2 };

const getRootResponsiveStyles = indicatorsLength => {
    if (indicatorsLength > 4) {
        return {
            [minSevenColumns]: {
                '.indicator': {
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    width: 'calc(20% - 26px)',
                },
            },
        };
    }
    return {
        [minSevenColumns]: {
            '.indicator': {
                flex: 1,
            },
        },
    };
};

const getHorizontalSeparatorStyles = indicatorsLength => {
    const commonCss = {
        ':nth-child(even)': {
            display: 'none',
        },
    };

    if (indicatorsLength > 4) {
        return {
            [minSevenColumns]: {
                ...commonCss,
                margin: '0 16px',
                padding: 0,
                display: 'none',
                ':nth-child(5n)': {
                    display: 'inline',
                    width: '100%',
                },
            },
        };
    }

    return {
        [minSevenColumns]: {
            ...commonCss,
            display: 'none',
        },
    };
};

export const rootContentStyles = indicatorsLength => ({
    root: {
        padding: '16px',
        '.indicator-wrapper:not(:first-child)': {
            paddingTop: 16,
        },
        [minFourColumns]: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            '.indicator': {
                width: 'calc(50% - 16px)',
            },
        },
        ...getRootResponsiveStyles(indicatorsLength),
    },
});

export const horizontalSeparatorStyles = indicatorsLength => ({
    root: {
        padding: 0,
        height: 1,
        display: 'flex',
        margin: '16px 0px !important',
        [minFourColumns]: {
            display: 'none',
            ':nth-child(even)': {
                display: 'inline',
                width: '100%',
            },
        },
        ...getHorizontalSeparatorStyles(indicatorsLength),

        ':last-child': {
            display: 'none !important',
        },
    },
});

export const verticalSeparatorStyles = {
    root: {
        display: 'none',
        margin: '0 16px',
        padding: 0,
        [minFourColumns]: {
            display: 'flex',
            margin: '0 16px',
            padding: 0,
            ':nth-last-child(2)': {
                display: 'none',
            },
            ':nth-child(odd)': {
                display: 'none',
            },
        },
        [minSevenColumns]: {
            ':nth-child(odd)': {
                display: 'flex',
            },
            ':nth-child(14n)': {
                display: 'none',
            },
            ':nth-last-child(2)': {
                display: 'none !important',
            },
        },
    },
};
