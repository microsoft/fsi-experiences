import React, { Component } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { instrumentTypeToFields, OverdraftHeaderProps } from '../../../../../constants/FHValueMaps';
import { drawOverdraftSections } from '../../../utilities/SIDUtility';
import { instrumentMainStackStyle, INSTRUMENT_MAIN_TAG_TOKENS } from '../SIDInstrument/SIDInstrument.style';
import { ISIDOverdraftInstrumentProps } from './SIDOverdraftInstrument.interface';
import { overdraftHeaderStyle, overdraftStackStyle } from './SIDOverdraftInstrument.style';
import FinancialHoldingFields from '../../../../../interfaces/FHEntity/FinancialHoldingFields';

export class SIDOverdraftInstrument extends Component<ISIDOverdraftInstrumentProps> {
    constructor(props) {
        super(props);
    }

    renderOverDraft(header: OverdraftHeaderProps, entity?: FinancialHoldingFields) {
        if (!header) {
            return '';
        }

        return (
            <Stack horizontal>
                <Stack.Item styles={overdraftStackStyle}>
                    <div style={overdraftHeaderStyle as React.CSSProperties} title={header.title}>
                        {header.title}
                    </div>
                </Stack.Item>
                {drawOverdraftSections([header.leftMainValue, header.middleMainValue, header.rightMainValue], entity)}
            </Stack>
        );
    }

    render() {
        const { instrument, metadata } = this.props;
        const instrumentHeaderFields = instrumentTypeToFields(instrument, metadata)[instrument.financialHoldingInstrumentType || 0]
            ?.header as OverdraftHeaderProps;
        const header = this.renderOverDraft(instrumentHeaderFields, this.props.entity);
        return (
            <Stack styles={instrumentMainStackStyle} tokens={INSTRUMENT_MAIN_TAG_TOKENS} data-testid={'overdraft-instrument-section'}>
                <Stack.Item>{header}</Stack.Item>
            </Stack>
        );
    }
}
