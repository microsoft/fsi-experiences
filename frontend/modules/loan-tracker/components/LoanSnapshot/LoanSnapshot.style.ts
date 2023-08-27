import { IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { baseCardStyle, leftSideBoxStyle, rootSummaryView } from '@fsi/core-components/dist/styles/Common.style';

export const stackTokenMargins: IStackTokens = { childrenGap: '15px' };

export const LoanInformationPrimaryApplicantStackStyles = {
    root: {
        '@media screen and (max-width: 800px)': {
            flexFlow: 'column',
            gap: '15px',
        },
        ['& > *:last-child']: {
            '@media screen and (max-width: 800px)': {
                margin: 0,
            },
        },
    },
};

export const baseCardWrapperStyles = mergeStyleSets({
    root: [baseCardStyle, leftSideBoxStyle.root],
});

export const primaryInformationStyles = mergeStyleSets({
    root: [
        baseCardWrapperStyles.root,
        {
            flexBasis: '20%',
            minWidth: '210px',
        },
    ],
});

export const summaryViewStackStyle = mergeStyleSets({
    root: [
        rootSummaryView.root,
        {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            '@media screen and (min-width: 600px)': {
                gridTemplateColumns: 'repeat(auto-fit, minmax(470px, 1fr))',
            },
            gap: '15px',
            padding: 'min(16px, 1.5vw)',
        },
    ],
});
