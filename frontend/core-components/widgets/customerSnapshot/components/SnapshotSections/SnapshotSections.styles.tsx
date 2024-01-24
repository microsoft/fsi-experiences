import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { minFiveColumns, minSixColumns, minFourColumns, minEightColumns, minTenColumns } from '../../consts/reponsive.consts';

export const separatorStyles = { root: { padding: 0, height: 1 } };

export const separatorHorizontalStyles = mergeStyleSets(separatorStyles, {
    root: {
        marginBlockStart: '16px !important',
        [minSixColumns]: {
            display: 'none',
        },
    },
});

export const separatorVerticalStyles = { root: { margin: '0 24px !important', padding: 0, display: 'none', [minSixColumns]: { display: 'flex' } } };

export const sectionSeparatorStyles = {
    root: {
        padding: 0,
        height: 1,
        marginBlockEnd: 8,
        '&:last-child': {
            display: 'none',
        },
    },
};

export const rootContentStyles = (fieldsLength): IStackStyles => {
    const ceiledLengthTwoColumns = Math.ceil(fieldsLength / 2);

    const ceiledLengthThreeColumns = Math.ceil(fieldsLength / 3);

    const ceiledLengthFourColumns = Math.ceil(fieldsLength / 4);

    const ceiledLengthFiveColumns = Math.ceil(fieldsLength / 5);

    return {
        root: {
            display: 'grid',
            gridGap: '16px',
            flex: 1,
            [minFourColumns]: {
                '.section-seperator': {
                    display: 'none',
                },
                gridAutoFlow: 'column',
                gridTemplateRows: `repeat(${ceiledLengthTwoColumns},1fr)`,
            },
            [minFiveColumns]: {
                gridTemplateRows: `repeat(${ceiledLengthThreeColumns},1fr)`,
            },
            [minSixColumns]: {
                marginTop: '0 !important',
            },
            [minEightColumns]: {
                gridTemplateRows: `repeat(${ceiledLengthFourColumns},1fr)`,
            },
            [minTenColumns]: {
                gridTemplateRows: `repeat(${ceiledLengthFiveColumns},1fr)`,
            },
        },
    };
};
