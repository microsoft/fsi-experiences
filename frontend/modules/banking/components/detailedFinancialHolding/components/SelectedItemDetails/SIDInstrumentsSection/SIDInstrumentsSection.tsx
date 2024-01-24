import React, { Component } from 'react';
import { FH_INSTRUMENT_NAME_TO_TYPE, FH_INSTRUMENT_TYPE_ORDER } from '../../../../../constants/FHValueMaps';
import { SIDOverdraftInstrument } from '../SIDOverdraftInstrument/SIDOverdraftInstrument';
import { SIDInstrument } from '../SIDInstrument/SIDInstrument';
import { FinancialInstrumentFields } from '../../../../../interfaces/FHEntity';
import { sidInstrumentTopPadding } from './SIDInstrumentsSection.style';
import { ISIDInstrumentsSectionProps } from './SIDInstrumentsSection.interface';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { FSI_INSTRUMENT_RESPONSIVE_CLASS } from '../SIDResponsive';
import { Stack } from '@fluentui/react/lib/components/Stack';

export class SIDInstrumentsSection extends Component<ISIDInstrumentsSectionProps> {
    constructor(props) {
        super(props);
    }

    renderInstruments(list: FinancialInstrumentFields[]) {
        const sortedList = list.sort((a, b) => {
            const aTypeVal = a.financialHoldingInstrumentType || 0;
            const bTypeVal = b.financialHoldingInstrumentType || 0;
            return FH_INSTRUMENT_TYPE_ORDER[aTypeVal] - FH_INSTRUMENT_TYPE_ORDER[bTypeVal];
        });

        return sortedList.map((instrument, index) => {
            if (!instrument.financialHoldingInstrumentType) {
                return '';
            }

            if (instrument.financialHoldingInstrumentType === FH_INSTRUMENT_NAME_TO_TYPE['overdraft']) {
                return <SIDOverdraftInstrument metadata={this.props.metadata} entity={this.props.entity} key={index} instrument={instrument} />;
            }
            return (
                <SIDInstrument
                    isExtended={this.props.isExtended}
                    metadata={this.props.metadata}
                    entity={this.props.entity}
                    key={index}
                    instrument={instrument}
                />
            );
        });
    }

    render() {
        if (!this.props.data) {
            return '';
        }

        return (
            <ResponsiveContainer classPrefix={FSI_INSTRUMENT_RESPONSIVE_CLASS}>
                {this.props.data.length > 0 && !this.props.isExtended ? <Stack styles={sidInstrumentTopPadding} /> : ''}
                {this.renderInstruments(this.props.data)}
            </ResponsiveContainer>
        );
    }
}

export default SIDInstrumentsSection;
