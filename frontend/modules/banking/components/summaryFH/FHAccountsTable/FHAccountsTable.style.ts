import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { fhSummaryTableStyle } from '../summaryFHConstants';

export const detailsListStyles = mergeStyleSets(fhSummaryTableStyle, {
    contentWrapper: {
        '.ms-DetailsRow-cell': { padding: 0, paddingBlock: 11 },
    },
});
