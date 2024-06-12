import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { ITooltipHostStyles } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/theme';
import { FinancialItemActionsGroupBtnClassName } from './FinancialItemActionsGroupBtn/FinancialItemActionsGroupBtn.const';

const rowBorderStyle = `1px solid ${NeutralColors.gray20}`;

export const wrapperStyles: any = {
    root: {
        display: 'flex',
        overflow: 'auto',
        flex: '1',
        '@media screen and (min-width: 380px)': {
            overflowX: 'hidden',
        },
    },
};

export const detailsListStyles: any = {
    root: {
        flex: 1,
        overflow: 'visible',
        '.ms-GroupHeader': {
            borderBlockEnd: rowBorderStyle,
        },
        '.ms-GroupHeader-dropIcon': {
            // otherwise it causes overflow in FireFox
            display: 'none',
        },
        contentWrapper: {
            // when focus is on the menu itself, button still be visible, thus `:not([data-menu-is-open])`
            [`& .${FinancialItemActionsGroupBtnClassName}:not([data-menu-is-open])`]: {
                // we use `opacity` so we could focus a button after a dialog is closed
                opacity: '0',
            },
            '& .ms-DetailsRow': {
                selectors: {
                    ':hover': {
                        backgroundColor: NeutralColors.gray10,
                        [`.${FinancialItemActionsGroupBtnClassName}`]: {
                            // we use `opacity` so we could focus a button after a dialog is closed
                            opacity: '1',
                        },
                    },
                    ':focus-within': {
                        backgroundColor: NeutralColors.gray10,
                        [`.${FinancialItemActionsGroupBtnClassName}`]: {
                            // we use `opacity` so we could focus a button after a dialog is closed
                            opacity: '1',
                        },
                    },
                },
            },
            ['& .ms-DetailsRow-cell']: {
                display: 'flex',
                alignItems: 'center',
                paddingBlock: '5px',
            },
            ['& .ms-DetailsRow-cell > *']: {
                minWidth: 0, // allows items to shrink and apply text-overflow: ellipsis
            },
        },
    },
};

export const detailsHeaderStyles = {
    root: {
        paddingTop: 0, // overrides Fluent UI default style
        borderBlockStart: rowBorderStyle,
        '& > .ms-DetailsHeader-cell': {
            display: 'inline-flex',
            overflow: 'hidden',
            textOverflow: 'initial',
        },
        '& > .ms-DetailsHeader-cell:not(:first-child)': {
            paddingInlineEnd: '18px',
        },
    },
};

const headerBaseTextStyles: ITextStyles = {
    root: {
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size14,
        color: NeutralColors.gray160,
    },
};

export const getDetailsHeaderTextStyles: any = (alignToEnd: boolean) => {
    return mergeStyleSets(headerBaseTextStyles, {
        root: {
            marginInlineStart: alignToEnd && 'auto',
        },
    });
};

export const groupHeaderTitleWrapperStyles = { root: { maxWidth: 'min(320px, 100%)' } };

export const groupHeaderTitleStyles: any = mergeStyleSets(headerBaseTextStyles, {
    root: {
        paddingInlineStart: '11px',
    },
});

export const detailsHeaderCurrencyCodeStyles = {
    root: {
        ['&[data-testid]']: {
            display: 'inline-flex',
            marginInlineStart: '5px',
        },
        color: 'inherit',
    },
};

export const getColumnTextStyles = ({ isBlack }: { isBlack: boolean }): ITooltipHostStyles => ({
    root: {
        fontSize: FontSizes.size14,
        color: isBlack ? NeutralColors.gray160 : NeutralColors.gray130,
    },
});

export const columnSmallTextStyles = {
    root: { fontSize: FontSizes.size12, color: NeutralColors.gray130 },
};

export const currencyBaseStyles = {
    root: { flexGrow: 1 },
    inner: {
        flexWrap: 'nowrap',
        justifyContent: 'end',
        paddingInlineEnd: '11px',
    },
};

export const currencyCodeStyles = {
    root: {
        fontSize: FontSizes.size14,
        color: NeutralColors.gray160,
    },
};

export const currencyNumberStyles = {
    root: {
        fontSize: FontSizes.size14,
        color: NeutralColors.gray160,
    },
};

export const groupFooterStyles = {
    root: {
        paddingBlock: '14px',
        paddingInline: '47px 8px',
        borderBlockEnd: `1px solid ${NeutralColors.gray20}`,
    },
};

export const groupFooterTextStyles = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
};

export const groupFooterCurrencyNumberStyles = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
};

export const loadingSpinnerWrapperStyles = { root: { padding: 40 } };

export const visuallyHiddenTextStyle: any = {
    root: {
        width: '1px',
        height: '1px',
        clipPath: 'inset(100%)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
};
