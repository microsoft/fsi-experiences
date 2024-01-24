import { createClassSelectorRange } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';
import { DOCUMENT_INTL_CLASS_PREFIX } from '../../constants/DocumentIntelligence.const';

export const cardsWrapper = {
    root: {
        display: 'grid',
        columnGap: '16px',
        rowGap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, 300px)',
        paddingInline: 0,
        paddingBlock: 10,
        margin: 0,
        [createClassSelectorRange(1, 3, DOCUMENT_INTL_CLASS_PREFIX)]: {
            gridTemplateColumns: '100%',
        },
    },
};

export const documentListStyle = {
    root: {
        height: '100%',
    },
};
