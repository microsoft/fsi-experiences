import { ISeparatorStyles } from '@fluentui/react/lib/components/Separator';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { maxSixColumns } from './SIDMain.const';

const separatorCommonStyles = {
    root: {
        height: 1,
        padding: '16px',
        marginInline: '0px',
    },
};

export const SEPARATOR_DARK_GRAY_STYLES = mergeStyleSets(separatorCommonStyles, {
    root: {
        '&:before': {
            opacity: 0.5,
            backgroundColor: NeutralColors.gray120,
        },
    },
});

export const SEPARATOR_GREY_STYLES = mergeStyleSets(separatorCommonStyles, {
    root: {
        '&:before': {
            backgroundColor: COLORS.lightGray,
        },
    },
});

export const itemAlignmentsStackTokens = {
    padding: 10,
};

export const sidMainStackItemStyles = {
    root: {
        width: '100%',
        padding: '24px 24px 0px 24px',
        height: '100%',
    },
};

export const chartVerticalSeparatorStyles = { root: { paddingInline: '24px', [maxSixColumns]: { display: 'none' } } };

export const chartHorizontalSeparatorStyles: ISeparatorStyles = mergeStyleSets(SEPARATOR_GREY_STYLES, {
    root: {
        display: 'none',
        [maxSixColumns]: {
            display: 'flex',
        },
    },
    content: { display: 'none' },
});

export const sidMainRoot = ({ isChartEnabled }) => ({
    root: {
        flex: 4,
        maxWidth: isChartEnabled ? 800 : 'none',
        [maxSixColumns]: {
            maxWidth: 'none',
        },
    },
});

export const infoRootStyles = { root: { [maxSixColumns]: { flexDirection: 'column' } } };

export const chartRoot = {
    root: {
        flex: 1,
        alignSelf: 'center',
        [maxSixColumns]: {
            alignSelf: 'auto',
            paddingBlockStart: '8px',
        },
    },
};

export const pieChartStyles = {
    legendStyles: { root: { alignSelf: 'flex-start', flexWrap: 'wrap' } },
    chartStyles: {},
};
