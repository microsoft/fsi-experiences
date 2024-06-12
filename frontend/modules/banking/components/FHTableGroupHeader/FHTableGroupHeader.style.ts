import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { COLORS } from '@fsi/core-components/constants/Colors';
import { FontWeights } from '@fluentui/react';

export const groupHeaderStyle = {
    root: {
        fontSize: FontSizes.size16,
        boxShadow: `inset 0px -1px 0px ${COLORS.lightGray}`,
    },
};
export const groupHeaderTextStyle = {
    root: {
        padding: '0px 8px',
        lineHeight: '18px',
        fontSize: FontSizes.size16,
    },
};

export const groupIconStyle = {
    root: {
        display: 'flex',
        paddingTop: '2px',
        fontSize: FontSizes.size16,
    },
};

export const groupExpandIconStyle = {
    root: {
        display: 'flex',
        padding: '16px 6px',
        fontSize: FontSizes.size16,
        cursor: 'pointer',
        userSelect: 'none',
    },
};

export const iconStyle = { fontSize: FontSizes.size16 };

export const headerStyle = { fontWeight: FontWeights.semibold as number, color: COLORS.darkGray160 };

export const iconProps = (isCollapsed: boolean) => ({
    iconName: 'ChevronRightMed',
    color: NeutralColors.gray130,
    styles: {
        root: {
            color: NeutralColors.gray130,
            transformOrigin: '50% 50%',
            transition: 'transform 0.1s linear 0s',
            transform: `rotate(${isCollapsed ? '0deg' : '90deg'})`,
        },
    },
});
