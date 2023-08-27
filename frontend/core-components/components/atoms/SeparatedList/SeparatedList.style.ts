import { ISeparatorStyles } from '@fluentui/react';
import { minFourColumns, minSevenColumns } from './SeparatedList.const';

export const contentTokens = { childrenGap: 2 };

const getRootResponsiveStyles = itemsLength => {
    if (itemsLength > 3) {
        return {
            [minSevenColumns]: {
                '.item': {
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    width: 'calc(33% - 26px)',
                },
            },
        };
    }
    return {
        [minSevenColumns]: {
            '.item': {
                flex: 1,
            },
        },
    };
};

const getHorizontalSeparatorStyles = itemsLength => {
    const commonCss = {
        ':nth-child(even)': {
            display: 'none',
        },
    };

    if (itemsLength > 3) {
        return {
            [minSevenColumns]: {
                ...commonCss,
                margin: '0 16px',
                padding: 0,
                display: 'none',
                ':nth-child(9n)': {
                    width: '100%',
                    display: 'inline-block',
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

export const rootContentStyles = itemsLength => ({
    root: {
        padding: '16px',
        [minFourColumns]: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            '.item': {
                width: 'calc(50% - 16px)',
            },
        },
        ...getRootResponsiveStyles(itemsLength),
    },
});

export const horizontalSeparatorStyles = (itemsLength): ISeparatorStyles => ({
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
        ...getHorizontalSeparatorStyles(itemsLength),

        ':last-child': {
            display: 'none !important',
        },
    },
    content: { padding: 0 },
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
            ':nth-child(8n)': {
                display: 'none',
            },
            ':nth-last-child(2)': {
                display: 'none !important',
            },
        },
    },
};
