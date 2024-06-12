import { CSSProperties } from 'react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { minTweleveColumns, minThreeColumns, minSixColumns, minFiveColumns, minFourColumns, minTwoColumns } from './GroupsSummaryViewComponent.const';

export const responsiveContainerStyles: CSSProperties = { display: 'flex', flexDirection: 'column' };

export const mainViewStyles = {
    root: {
        flexDirection: 'column',
        [minSixColumns]: {
            flexDirection: 'row',
        },
    },
};

const basicSeperatorStyles = {
    root: {
        padding: '0px 0px',
    },
};

export const basicVerticalSeperatorStyles = mergeStyleSets(basicSeperatorStyles, {
    root: {
        ':after': { bottom: 16 },
    },
});

export const basicHorizontalSeperatorStyles = mergeStyleSets(basicSeperatorStyles, {
    root: {
        ':before': { left: 16, right: 16 },
    },
});

export const mainViewHorizontalSeperatorStyles = mergeStyleSets(basicHorizontalSeperatorStyles, {
    root: {
        height: 1,
        marginBlockEnd: 16,
        [minTwoColumns]: {
            ':before': { left: 0, right: 0 },
        },
        [minThreeColumns]: {
            display: 'flex',
        },
        [minFiveColumns]: {
            display: 'none',
        },
    },
});

export const mainViewVerticallSeperatorStyles = mergeStyleSets(basicVerticalSeperatorStyles, {
    root: {
        marginInlineEnd: 16,
        display: 'none',
        [minThreeColumns]: {
            display: 'none',
        },
        [minFiveColumns]: {
            display: 'flex',
        },
    },
});

export const firstMainViewVerticalSeperatorStyles = mergeStyleSets(mainViewVerticallSeperatorStyles, {
    root: {
        [minFiveColumns]: {
            ':after': {
                visibility: 'hidden',
                width: 0,
            },
        },
        [minSixColumns]: {
            ':after': {
                visibility: 'initial',
                width: 1,
            },
        },
    },
});

export const annualHorizontalSeperatorStyles = mergeStyleSets(basicHorizontalSeperatorStyles, {
    root: {
        height: 1,
        marginBlock: 16,
        [minFourColumns]: { display: 'none' },
        [minSixColumns]: { display: 'flex' },
        [minTweleveColumns]: {
            display: 'none',
        },
    },
});

export const annualVerticalSeperatorStyles = mergeStyleSets(basicSeperatorStyles, {
    root: {
        display: 'none',
        marginInlineEnd: 16,
        [minFourColumns]: { display: 'flex', marginInlineEnd: 0 },
        [minSixColumns]: { display: 'none', marginInlineEnd: 16 },
        [minTweleveColumns]: {
            display: 'flex',
            ':after': {
                bottom: 16,
            },
        },
    },
});

export const columnSeperatorStyles = mergeStyleSets(basicHorizontalSeperatorStyles, {
    root: {
        display: 'none',
        height: 1,
        marginBlock: 16,
        [minFiveColumns]: { display: 'flex' },
        [minSixColumns]: { display: 'none' },
    },
});

export const annualAndHouseholdWrapper = {
    root: {
        [minFourColumns]: { flexDirection: 'row' },
        [minSixColumns]: { flexDirection: 'column' },
        [minTweleveColumns]: { flexDirection: 'row' },
    },
};

export const annualWrapper = {
    root: {
        flexDirection: 'column',
        padding: '0 16px',
        [minFourColumns]: {
            flexDirection: 'row',
            width: '50%',
        },
        [minSixColumns]: { width: 'initial' },
        [minTweleveColumns]: { padding: 0 },
    },
};

export const chartsWithoutAnnualWrapper = {
    root: {
        display: 'none',
        [minThreeColumns]: { display: 'flex', flexDirection: 'column', padding: 16, paddingBlockEnd: 0 },
        [minFiveColumns]: { flexDirection: 'row', padding: 0 },
    },
};

export const chartsWithAnnualWrapper = {
    root: {
        flexDirection: 'column',
        marginBlockStart: 16,
        [minThreeColumns]: { display: 'none' },
    },
};

export const groupDetailsWrapper = {
    root: {
        [minFourColumns]: { width: '50%' },
        [minSixColumns]: { width: 'initial' },
    },
};

export const chartRoot = { root: { justifyContent: 'space-between', flex: 1, wordBreak: 'break-all', whiteSpace: 'break-spaces' } };
