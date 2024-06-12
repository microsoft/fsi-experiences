import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import { Text } from '@fluentui/react/lib/Text';
import renderBalance from '../renderBalance';
import { getCardInstruments } from '../utils';
import { fhCompactTextStyles, fhGroupNameStyles } from './renderFhName.style';

const renderFhName =
    ({ columns, isSubtitle, isBalance, fhPickLists, contactId, showDescription }) =>
    (groupHolding: IGroupFinancialHolding) => {
        if (!groupHolding) {
            return '';
        }
        const holdingInstrumentFhNameStyle = getCardInstruments({ groupHolding, contactId }).length > 0 ? { paddingLeft: 22 } : undefined;

        return (
            <Stack tokens={{ childrenGap: 8 }}>
                <Text styles={fhGroupNameStyles} style={holdingInstrumentFhNameStyle} data-testid="group-detailed-holdings-row-name">
                    {groupHolding.name}
                </Text>
                {showDescription && groupHolding.description && (
                    <Text style={holdingInstrumentFhNameStyle} data-testid="group-detailed-holdings-description" styles={fhCompactTextStyles}>
                        {groupHolding.description}
                    </Text>
                )}
                {isSubtitle && (
                    <Text style={holdingInstrumentFhNameStyle} data-testid="group-detailed-holdings-type-subtitle" styles={fhCompactTextStyles}>
                        {fhPickLists.fhTypeTypes.get(groupHolding.type)}
                    </Text>
                )}
                {isBalance && <Stack style={holdingInstrumentFhNameStyle}>{renderBalance({ columns, isStart: true })(groupHolding)}</Stack>}
            </Stack>
        );
    };

export default renderFhName;
