import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { maxFourColumns, maxNineColumns, maxSixColumns } from '../SIDResponsive';

export const INSTRUMENT_MAIN_TAG_TOKENS = {
    padding: '0px 0px 0px 10px',
};

export const instrumentSeparatorStyle = {
    root: {
        height: 1,
        padding: '16px 0',
        '&:before': {
            backgroundColor: NeutralColors.gray30,
        },
    },
};

export const instrumentTagStackTokens = {
    childrenGap: 5,
};

export const instrumentSubHeaderStyle = {
    fontSize: FontSizes.size14,
    color: COLORS.primaryTagText,
    alignItems: 'flex-start',
};

export const instrumentHeaderTitleStyle = {
    fontSize: FontSizes.size24,
    fontWeight: FontWeights.semibold,
    color: COLORS.primaryTagText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

export const instrumentMainStackStyle = {
    root: {
        padding: '16px 24px',
        margin: '10px 0px',
        background: NeutralColors.gray10,
        width: '100%',
        borderRadius: '8px',
    },
};

export const headerRoot = {
    root: {
        [maxFourColumns]: {
            flexDirection: 'column',
        },
    },
};

export const rowWrapperStyles = ({ flex }) => ({
    root: {
        flex: flex + 3,
        [maxSixColumns]: {
            flex: 1,
        },
    },
});

export const headerStackStyle = ({ isExtended }) => ({
    root: {
        textAlign: 'left',
        flex: 2,
    },
});

export const instrumentsWrapperStyles = ({ isExtended }) => ({
    root: {
        flex: isExtended ? 5 : 2,
        ...(isExtended
            ? {
                  [maxNineColumns]: { flex: 5 },
                  [maxSixColumns]: {
                      flex: 2,
                  },
              }
            : {}),
        flexWrap: 'wrap',
    },
});

export const footerWrapper = ({ isExtended }) => ({
    root: {
        flexDirection: isExtended ? 'row' : 'column',
        [maxSixColumns]: {
            flexDirection: 'column',
        },
    },
});
