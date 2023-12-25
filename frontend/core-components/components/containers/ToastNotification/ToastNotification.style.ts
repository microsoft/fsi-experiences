import { IMessageBarStyles } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import { FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS, SystemColors } from '../../../constants/Colors';
import { fadeInAnimation } from '../../../styles/Animations.style';
import { MEDIA_QUERY_HIGH_CONTRAST } from '../../../styles/Common.style';

export const popupStyles: IMessageBarStyles = {
    root: {
        animationName: fadeInAnimation,
        animationDuration: '0.3s',
        position: 'absolute',
        insetInline: 0,
        insetBlockEnd: 60,
        width: 'fit-content',
        maxWidth: '700px',
        minHeight: 54,
        margin: '0 auto',
        paddingBlock: '5px',
        alignItems: 'center',
        justifyContent: 'center',
        background: COLORS.white,
        boxShadow: '0px 4.8px 14.4px rgba(0, 0, 0, 0.18), 0px 25.6px 57.6px rgba(0, 0, 0, 0.22)',
        [MEDIA_QUERY_HIGH_CONTRAST]: {
            background: SystemColors.canvas,
        },
        borderRadius: '4px',
        paddingInline: '8px',
    },
    content: {
        alignItems: 'center',
    },
    iconContainer: {
        marginBlock: '10px 8px',
        marginInline: '12px 0',
    },
    text: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginBlock: 0,
    },
    innerText: {
        fontSize: 16,
        lineHeight: 'normal',
        fontWeight: FontWeights.regular,
        color: COLORS.darkGray160,
        whiteSpace: 'normal',
        [MEDIA_QUERY_HIGH_CONTRAST]: {
            color: SystemColors.text,
        },
    },
};
