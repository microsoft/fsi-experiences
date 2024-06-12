import { CSSProperties } from 'react';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { ICheckboxStyles } from '@fluentui/react/lib/components/Checkbox/Checkbox.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { detailsListStyles } from '@fsi/core-components/dist/styles/DetailsList.style';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';

export const instrumentsIconStyle: CSSProperties = {
    textAlign: 'center',
    color: COLORS.stepCircleBackground,
    height: '100%',
    display: 'block',
    fontSize: FontSizes.size16,
    padding: '3px 0px 0px 0px',
};

export const fhValueTextStyles = { root: { fontSize: FontSizes.size14, fontWeight: FontWeights.semibold, verticalAlign: 'middle' } };

export const detailedGroupHoldingStyles: IStackStyles = {
    root: {
        position: 'relative',
        '.ms-DetailsRow-cell': {
            display: 'flex',
        },
    },
};

export const selectAllCheckboxStyles: ICheckboxStyles = {
    root: { position: 'absolute', zIndex: 1, top: 10, left: '8px', backgroundColor: COLORS.white },
};

export const detailedGroupHoldingListStyles: IStackStyles = { root: { position: 'relative' } };

export const balanceColumnStyles = mergeStyleSets({
    root: {
        '.ms-DetailsRow-cell': {
            textAlign: 'right',
        },
    },
});

export const detailedMembersGroupHoldingsStyles = mergeStyleSets(detailsListStyles, {
    root: {
        '.ms-DetailsHeader-cell:first-child': {
            cursor: 'pointer',
        },
        '.ms-DetailsHeader-cell.is-empty:first-child': {
            marginRight: 35,
            cursor: 'default',
        },
        '.ms-DetailsHeader': {
            paddingTop: 0,
        },
    },
});
