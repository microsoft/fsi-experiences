import React from 'react';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { Stack } from '@fluentui/react/lib/Stack';
import DataBox from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import { IBoxDetails } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox.interface';
import FHDataBox from '../components/FHDataBox/FHDataBox';
import { FHDataBoxDetails } from '../components/FHDataBox';
import FinancialHoldingFields from '../../../interfaces/FHEntity/FinancialHoldingFields';
import { maxFourColumns, maxTwoColumns, maxSixColumns } from '../components/SelectedItemDetails/SIDResponsive';

const InstrumentsHeaderStyle = ({ isExtended }) => ({
    root: {
        textAlign: 'left',
        width: '25%',
        paddingBlockStart: 21,
        paddingInlineEnd: 8,
        flex: isExtended ? 0.2 : 1,
        [maxSixColumns]: {
            flex: 1,
        },
        [maxFourColumns]: {
            paddingBlockStart: 16,
        },
        [maxTwoColumns]: {
            flex: '100%',
        },
    },
});

const overdraftHeaderStyle = {
    root: {
        textAlign: 'left',
        width: '20%',
    },
};

export const drawOverdraftSections = (sections: FHDataBoxDetails[], entity?: FinancialHoldingFields) => {
    return sections.map((data, index) => {
        const styles = { root: { fontSize: FontSizes.size14, fontWeight: FontWeights.regular } };

        return (
            <Stack.Item key={index} styles={overdraftHeaderStyle}>
                <FHDataBox entity={entity} boxDetails={data} styles={styles} />
            </Stack.Item>
        );
    });
};

export const drawInstrumentsSections = (sections: IBoxDetails[], isExtended?: boolean) => {
    return sections.map((data, index) => {
        const styles = { root: { fontSize: FontSizes.size14, fontWeight: FontWeights.regular } };

        return (
            <Stack horizontal key={index} styles={InstrumentsHeaderStyle({ isExtended })}>
                <DataBox boxDetails={data} styles={styles} />
            </Stack>
        );
    });
};
