import { Stack, IStackStyles } from '@fluentui/react/lib/components/Stack';
import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/components/Text';
import { currencyStyles, lastUpdatedStyles, nameStyles, rootStyles, typeStyles, valueStyles } from './FinancialHoldingCard.style';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import CaretPerformance from '@fsi/core-components/dist/components/atoms/CaretPerformance';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IFinancialHoldingCard } from './FinancialHoldingCard.interface';

interface IFHFinancialHoldingCardProps extends IFinancialHoldingCard {
    onClick?: () => void;
    styles?: IStackStyles;
}

const FinancialHoldingCard: FC<IFHFinancialHoldingCardProps> = ({
    name,
    type,
    value,
    currencyId,
    performance,
    lastUpdated,
    timeFrame,
    onClick,
    styles = rootStyles,
}) => {
    const translate = useTranslation();

    return (
        <Stack data-is-focusable data-testid="fh-card-view" styles={styles} tokens={{ childrenGap: 8 }} onClick={onClick}>
            <Stack tokens={{ childrenGap: 2 }}>
                <Text className="fh-card-view-title" styles={nameStyles}>
                    {name}
                </Text>
                <Text styles={typeStyles}>{type}</Text>
            </Stack>
            <Stack horizontal horizontalAlign="space-between" tokens={{ childrenGap: 4 }}>
                <Currency numberStyles={valueStyles} currencyStyles={currencyStyles} fricationDigits={2} value={value} currencyId={currencyId} />
                {performance !== undefined && <CaretPerformance value={performance} timeFrame={timeFrame} />}
            </Stack>
            {lastUpdated && <Text styles={lastUpdatedStyles}>{translate('LAST_UPDATED', { lastUpdated: lastUpdated.toLocaleDateString() })}</Text>}
        </Stack>
    );
};

export default FinancialHoldingCard;
