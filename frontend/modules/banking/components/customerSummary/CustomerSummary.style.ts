import { IStackStyles } from '@fluentui/react/lib/Stack';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { baseCardStyle, rootSummaryView } from '@fsi/core-components/dist/styles/Common.style';
import { createClassSelectorRange, DEFAULT_COLUMN_WIDTH } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';
import { SUMMARY_RESPONSIVE_CONTAINER } from './CustomerSummary.const';

const minSevenColumns = createClassSelectorRange(7, 12, SUMMARY_RESPONSIVE_CONTAINER);
const minElevenColumns = createClassSelectorRange(11, 12, SUMMARY_RESPONSIVE_CONTAINER);

export const lifeEventsBoxStyle = {
    root: {
        ...baseCardStyle,
    },
};

export const primaryHouseholdBoxStyle: IStackStyles = {
    root: {
        ...baseCardStyle,
        maxWidth: '100%',
        flex: 1,
        [minSevenColumns]: {
            minWidth: DEFAULT_COLUMN_WIDTH * 4 + 1,
        },
    },
};

export const fhSummaryBoxStyle = {
    root: {
        ...baseCardStyle,
        flex: 1,
        minWidth: 250,
        maxWidth: '100%',
    },
};

export const cardsBoxStyle: IStackStyles = {
    root: {
        ...baseCardStyle,
    },
};

export const leftBoxStyles: IStackStyles = { root: { flex: 1, flexShrink: 0, minWidth: 250, gap: 16 } };

export const rightBoxStyles: IStackStyles = { root: { flex: 4, flexShrink: 0, minWidth: 250, gap: 16, maxWidth: '100%' } };

export const middleBoxStyles: IStackStyles = {
    root: {
        gap: 16,
        flexWrap: 'wrap',
        flexDirection: 'column',
        [minElevenColumns]: {
            flexDirection: 'row',
        },
    },
};

export const rootSummaryStyles: IStackStyles = mergeStyleSets(rootSummaryView, {
    root: {
        flexDirection: 'column',
        gap: 16,
        flexWrap: 'wrap',
        [minSevenColumns]: {
            flexDirection: 'row',
        },
    },
});
