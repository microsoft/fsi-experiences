import React, { Component } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { Separator } from '@fluentui/react/lib/Separator';
import { Icon } from '@fluentui/react/lib/Icon';
import { InstrumentHeaderProps, InstrumentSubTitleProps, instrumentTypeToFields } from '../../../../../constants/FHValueMaps';
import {
    headerStackStyle,
    instrumentHeaderTitleStyle,
    instrumentMainStackStyle,
    instrumentSubHeaderStyle,
    instrumentSeparatorStyle,
    instrumentTagStackTokens,
    INSTRUMENT_MAIN_TAG_TOKENS,
    headerRoot,
    rowWrapperStyles,
    instrumentsWrapperStyles,
    footerWrapper,
} from './SIDInstrument.style';
import { SIDFooterDataBox } from '../SIDFooterDataBox/SIDFooterDataBox';
import { drawInstrumentsSections } from '../../../utilities/SIDUtility';
import { ISIDInstrumentProps } from './SIDInstrument.interface';
import { FHDataBoxDetails } from '../../FHDataBox';
import FinancialHoldingFields from '../../../../../interfaces/FHEntity/FinancialHoldingFields';

export class SIDInstrument extends Component<ISIDInstrumentProps> {
    constructor(props) {
        super(props);
    }

    subHeader(values: InstrumentSubTitleProps) {
        if (values.name) {
            return (
                <Stack.Item>
                    <Stack horizontal tokens={instrumentTagStackTokens} style={instrumentSubHeaderStyle} verticalAlign="center">
                        <Icon
                            iconName={values.icon}
                            style={{ color: values.color, fontSize: values.size, paddingTop: '1px', width: '16px' }}
                            data-testid={`card-status-icon-${values.icon}`}
                        />
                        <Stack.Item>
                            <span>
                                {values.text} • {values.type} • {values.name}
                            </span>
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            );
        }
        return (
            <Stack.Item>
                <span style={instrumentSubHeaderStyle}>{values.text}</span>
            </Stack.Item>
        );
    }

    renderHeader(header: InstrumentHeaderProps) {
        if (!header) {
            return '';
        }
        const { isExtended } = this.props;

        return (
            <Stack horizontal styles={headerRoot}>
                <Stack.Item styles={headerStackStyle({ isExtended })}>
                    <Stack tokens={instrumentTagStackTokens}>
                        <Stack.Item>
                            <div style={instrumentHeaderTitleStyle as React.CSSProperties} title={header.title}>
                                {header.title}
                            </div>
                        </Stack.Item>
                        {this.subHeader(header.subTitle)}
                    </Stack>
                </Stack.Item>
                <Stack styles={instrumentsWrapperStyles({ isExtended })} horizontal>
                    {drawInstrumentsSections([header.leftMainValue, header.rightMainValue], isExtended)}
                </Stack>
            </Stack>
        );
    }

    renderRows(list: FHDataBoxDetails[][] | undefined, entity?: FinancialHoldingFields) {
        if (!list) {
            return '';
        }

        return list.map((rowList, mainIndex) => {
            const rowMap = rowList.map((item, index) => (
                <SIDFooterDataBox entity={entity} key={index} boxDetails={item} fontSize={FontSizes.size14} isExtended={this.props.isExtended} />
            ));

            return (
                <Stack.Item styles={rowWrapperStyles({ flex: mainIndex })} align="auto" key={mainIndex}>
                    <Stack wrap horizontal>
                        {rowMap}
                    </Stack>
                </Stack.Item>
            );
        });
    }

    render() {
        const { instrument, metadata, isExtended } = this.props;
        const instrumentHeaderFields = instrumentTypeToFields(instrument, metadata)[instrument.financialHoldingInstrumentType || 0]
            ?.header as InstrumentHeaderProps;
        const instrumentFooterFields = instrumentTypeToFields(instrument, metadata)[instrument.financialHoldingInstrumentType || 0]?.footer;
        const footer = this.renderRows(instrumentFooterFields, this.props.entity);
        const header = this.renderHeader(instrumentHeaderFields);

        return (
            <Stack styles={instrumentMainStackStyle} tokens={INSTRUMENT_MAIN_TAG_TOKENS} data-testid={'non-overdraft-instrument-section'}>
                <Stack.Item>{header}</Stack.Item>
                <Stack.Item align="auto">
                    <Separator styles={instrumentSeparatorStyle} />
                </Stack.Item>
                <Stack styles={footerWrapper({ isExtended })}>{footer}</Stack>
            </Stack>
        );
    }
}
