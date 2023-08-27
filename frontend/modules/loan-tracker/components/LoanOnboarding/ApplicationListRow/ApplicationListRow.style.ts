import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes, FontWeights, IStyle, mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CommunicationColors, NeutralColors } from '@fluentui/react/lib/Theme';
import { css } from '@fluentui/react/lib/Utilities';

const ApplicationStatusStyles_Width = '32px';
const ApplicationLoanInfoWrapperStyles_MaxWidth = '85px';

export const ApplicationListRowStyles = (themePrimary: string, isSelected?: boolean, styles?: IStyle): IStackStyles =>
    mergeStyleSets(
        {
            root: {
                paddingLeft: '17px',
                cursor: 'pointer',
                borderLeft: `4px solid ${isSelected ? themePrimary : 'transparent'}`,
                backgroundColor: isSelected ? CommunicationColors.tint40 : 'inherit',
                borderBottom: `1px solid ${NeutralColors.gray40}`,
                selectors: {
                    ':hover': {
                        backgroundColor: NeutralColors.gray10,
                    },
                },
            },
        },
        styles
    );

export const ApplicationStatusStyles = mergeStyles({
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: `${ApplicationStatusStyles_Width}`,
    height: '16px',
    marginLeft: 'auto !important',
    padding: '0px 18px 0 2px',
    fontSize: FontSizes.size16,
    lineHeight: '16px',
    textAlign: 'center',
    color: NeutralColors.gray130,
});

export const ApplicationLoanInfoStyles = mergeStyles({ textAlign: 'start' });

export const ApplicationLoanInfoWrapperStyles = css(
    ApplicationLoanInfoStyles,
    mergeStyles({
        width: '100%',
        maxWidth: `${ApplicationLoanInfoWrapperStyles_MaxWidth}`,
        margin: '10px 0px',
        textAlign: 'start',
        '& > *': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    })
);

export const ApplicantWrapperStyles = css(
    ApplicationLoanInfoStyles,
    mergeStyles({
        width: '100%',
        maxWidth: `calc(100% - ${ApplicationStatusStyles_Width} - ${ApplicationLoanInfoWrapperStyles_MaxWidth})`,
        padding: '0px 6px',
        boxSizing: 'border-box',
    })
);

export const ApplicantStyles = (isSelected?: boolean): IStackStyles =>
    mergeStyleSets({
        root: {},
        primaryText: {
            fontWeight: isSelected ? FontWeights.semibold : 'inherit',
            '@media screen and (max-width: 319px)': {
                display: 'none',
            },
        },
    });

export const ApplicationLoanTitleStyles = css(
    mergeStyles({
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size14,
        lineHeight: '20px',
    }),
    ApplicationLoanInfoStyles
);

export const ApplicationLoanTypeStyles = css(
    mergeStyles({
        fontSize: FontSizes.size12,
        lineHeight: '16px',
    }),
    ApplicationLoanInfoStyles
);
