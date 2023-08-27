import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const modalContentStyles = mergeStyleSets({
    container: {
        minWidth: 'min(100% - 25px, 760px)',
        width: '50%',
        height: '90%',
        maxHeight: '100%', // overrides default FluentUI styles
        '.ms-Modal-scrollableContent': {
            height: '100%',
        },
        '@media(max-width: 1280px)': {
            width: '100%',
        },
        '@media(max-width: 1000px)': {
            height: '98%',
        },
        '@media(max-width: 500px)': {
            marginBlockEnd: '4px',
        },
    },
});

export const rootStyles = { root: { height: '100%', background: COLORS.loanTrackerBackground } };

export const seperatorStyles = {
    root: {
        height: 1,
        margin: 0,
        padding: 0,
        '::before': {
            backgroundColor: NeutralColors.gray30,
        },
    },
};

export const MAX_MB_FILE_SIZE = 5;
