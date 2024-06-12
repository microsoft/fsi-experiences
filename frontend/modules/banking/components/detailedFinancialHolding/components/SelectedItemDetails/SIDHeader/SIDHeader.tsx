import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import FHIndicatorMessageBar from '../../FHIndicatorMessageBar/FHIndicatorMessageBar';
import { ISIDHeaderProps } from './SIDHeader.interface';
import {
    headerContentStyle,
    headerNameStyle,
    headerPaddingBasedOnIndicatorMessage,
    headerTagStackTokens,
    idHeaderStyle,
    idLabelStyle,
    headerTagStyle,
    headerDescriptionStyle,
} from './SIDHeader.style';
import { CategoryHeaderProps, InvestmentHeaderProps, LoanHeaderProps } from '../../../utilities/SIDComponentStructure';
import Tag from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import ContactList from '../../../../../components/containers/ContactList/ContactList';

const renderId = (headerProps: CategoryHeaderProps) => {
    const { idValue, idLabel } = headerProps;
    if (!idValue) {
        return <div style={{ height: '19px' }}></div>;
    }

    return (
        <Stack horizontal wrap horizontalAlign="end" data-testid={`header-id-area-${idValue}`}>
            <Stack.Item>
                <div style={{ ...idHeaderStyle, ...idLabelStyle } as React.CSSProperties}>{idLabel}</div>
            </Stack.Item>
            <Stack.Item>
                <div style={idHeaderStyle as React.CSSProperties}>{idValue}</div>
            </Stack.Item>
        </Stack>
    );
};

export const SIDHeader: FC<ISIDHeaderProps> = props => {
    const { data, indicators, name, category, type, contacts, contactsRole, customersLoadingState, description } = props;

    const riskValue = data && (data as LoanHeaderProps).risk;
    const timeValue = data && (data as InvestmentHeaderProps).time;

    const indicatorArr = indicators;
    const indicator = indicatorArr && indicatorArr[0];

    if (!data) {
        return <></>;
    }

    return (
        <>
            <FHIndicatorMessageBar indicator={indicator} show={true} />
            <Stack horizontal style={headerPaddingBasedOnIndicatorMessage(indicator)}>
                <Stack.Item grow={1} align="auto" styles={headerNameStyle} data-testid={'header-name-area'}>
                    <span>{name}</span>
                </Stack.Item>
                <Stack.Item>{renderId(data)}</Stack.Item>
            </Stack>
            <Stack.Item align="stretch">
                <Stack tokens={headerTagStackTokens}>
                    <Stack styles={headerContentStyle}>
                        <Stack horizontal tokens={{ childrenGap: 8 }}>
                            <Stack>{category}</Stack>
                            <Stack>•</Stack>
                            <Stack>{type}</Stack>
                        </Stack>
                        {timeValue ? <Tag text={`${timeValue}`} styles={headerTagStyle} /> : ''}
                        {riskValue ? <Tag text={`${riskValue}`} styles={headerTagStyle} /> : ''}
                    </Stack>
                </Stack>
            </Stack.Item>
            {description && (
                <Stack.Item data-testid="fh-header-description" align="stretch" styles={headerDescriptionStyle}>
                    {description}
                </Stack.Item>
            )}
            <Stack.Item data-testid="contacts-card">
                <ContactList contacts={contacts} roleMetaData={contactsRole} customersLoadingState={customersLoadingState} />
            </Stack.Item>
        </>
    );
};

export default SIDHeader;
