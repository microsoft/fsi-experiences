import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT } from '../../../constants/StyleSelectors.consts';
import { summaryDataStyles } from '../../../styles/Common.style';

export const loanApplicationIconStyle = {
    fontSize: '20px',
    color: COLORS.white,
};

export const loanApplicationIconContainer = (background: string): IStackStyles => ({
    root: {
        background,
        borderRadius: '4px',
        width: '40px',
        height: '40px',
    },
});

export const loanDataContainerStyles: IStackStyles = mergeStyleSets(summaryDataStyles, {
    root: {
        [MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT]: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        },
        '& .loan-data-divider': {
            [MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT]: {
                display: 'none',
                ':nth-child(4n+2)': {
                    display: 'block',
                    gridColumn: '1/-1',
                },
            },
        },
    },
});

export const loanDataMainSectionStyle = {
    root: {
        [MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT]: {
            gridColumn: '1/-1',
        },
    },
};

export const mainTextStyle = {
    root: {
        fontSize: FontSizes.size20,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
        maxWidth: '100%',
    },
};

export const typeTextStyle = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
};

export const categoryTextStyle = {
    root: {
        fontSize: FontSizes.size14,
        color: NeutralColors.gray130,
        paddingTop: 6,
    },
};

export const mainSectionInfoStyles = {
    root: {
        maxWidth: '100%',
    },
};

export const mainDataBoxTokens = {
    childrenGap: '2px',
};

export const mainStackTokens = {
    childrenGap: 20,
};

export const mainDataStackTokens = {
    childrenGap: 12,
};
