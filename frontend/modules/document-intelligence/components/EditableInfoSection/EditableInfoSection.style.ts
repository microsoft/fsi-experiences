import { FontSizes, FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';

const commonHeaderStyles = {
    marginBlock: '0px',
    fontWeight: FontWeights.semibold,
    color: NeutralColors.gray160,
    marginInlineEnd: '4px',
};

export const sectionHeaderStyles = {
    ...commonHeaderStyles,
    fontSize: FontSizes.size14,
    lineHeight: FontSizes.size20,
};

export const subHeaderStyles = {
    ...commonHeaderStyles,
    fontSize: FontSizes.size12,
    lineHeight: FontSizes.size16,
};

export const tooltipStyles = {
    root: {
        padding: '8px',
        fontSize: FontSizes.size12,
        maxWidth: 350,
        lineHeight: FontSizes.size16,
    },
};

export const iconStyles = {
    root: { fontSize: FontSizes.size12, width: '16px', height: '16px' },
};

export const cancelBtnProps = {
    iconName: 'cancel',
    styles: iconStyles,
};

export const saveBtnProps = {
    iconName: 'accept',
    styles: iconStyles,
};

export const editBtnProps = {
    iconName: 'edit',
    styles: iconStyles,
};

export const resetBtnProps = {
    iconName: 'reply',
    styles: iconStyles,
};

export const dividerStyles = { root: { marginBlock: '10px' } };
