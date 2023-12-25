import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { FontWeights } from '@fluentui/react/lib/Styling';
import { MEDIA_QUERY_HIGH_CONTRAST } from '../../../styles/Common.style';

export const headerBox = {
    root: {
        display: 'flex',
        height: '40px',
        [MEDIA_QUERY_HIGH_CONTRAST]: {
            padding: '2px', // otherwise focus outline is clipped
        },
    },
};

export const titleStringStyles = {
    root: {
        paddingBlock: '10px',
        paddingInline: '16px 5px',
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        textAlign: 'start',
    },
};

export const contentStackStyles = { root: { flexBasis: '100%' } };

export const getTitleWrapperStyles = (isHidden?: boolean): any => {
    return {
        root: {
            overflow: 'hidden',
            ...(isHidden && { position: 'fixed', clip: 'rect(1px, 1px, 1px, 1px)', width: '1px', height: '1px', whiteSpace: 'nowrap' }),
        },
    };
};
