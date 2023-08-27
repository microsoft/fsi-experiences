import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '../../../constants/Colors';

export const UploadDocumentStyles = mergeStyleSets({
    root: {},
    label: {
        padding: '5px 12px',
        borderBottom: `1px solid ${NeutralColors.gray130}`,
        minWidth: '320px',
        maxWidth: '320px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    icon: {
        fontSize: FontSizes.size16,
        color: COLORS.dynamicPrimary,
    },
});

export const ActionsTokens = {
    childrenGap: 30,
};

export const UploadDocumentTokens = {
    childrenGap: 8,
};
