import { ILabelStyles } from '@fluentui/react/lib/components/Label/Label.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants';

export const documentDetailsSidePanelStyles: IStackStyles = {
    root: {
        height: '100%',
        width: '100%',
        paddingBlock: '4px',
        gap: 40,
        overflow: 'auto',
    },
};

export const documentDetailsTopStyles: IStackStyles = {
    root: {
        gap: 8,
    },
};

export const documentDetailsRegardingEntitiestyles: IStackStyles = {
    root: {
        '>div': {
            fontWeight: FontWeights.semibold,
        },
    },
};

export const documentDetailsTextStyle: ITextStyles = {
    root: {
        color: COLORS.darkGray140,
        fontWeight: FontWeights.regular,
        fontSize: FontSizes.size12,
        lineHeight: 16,
    },
};

export const documentDetailsBoldTextStyle: ITextStyles = {
    root: {
        color: COLORS.darkGray160,
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size12,
        lineHeight: 16,
    },
};

export const documentDetailsRexIconStyles = {
    root: {
        lineHeight: 16,
    },
};

export const fieldTypeStyles = { fieldGroup: { width: 200, lineHeight: 24 }, field: { paddingBlockEnd: 0 } };

export const labelStyles: ILabelStyles = { root: { paddingBlock: 0 } };

export const iconEditStyles = { root: { padding: 4, width: 24, height: 24 } };
