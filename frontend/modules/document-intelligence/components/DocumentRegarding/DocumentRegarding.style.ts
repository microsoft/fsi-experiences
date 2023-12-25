import { IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { ITooltipHostStyles } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { FontSizes } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const documentRegardingStyles: ITooltipHostStyles = {
    root: {
        fontSize: FontSizes.size12,
        fontWeight: 400,
        color: COLORS.darkGray160,
    },
};
export const regardingRoleStyles: ITooltipHostStyles = { root: { fontWeight: 400, color: COLORS.lightGray130, fontSize: FontSizes.size12 } };

export const documentRegardingTokens: IStackTokens = { childrenGap: 4 };
