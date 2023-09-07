import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { ICardFooterProps } from './BankingCardFooter.interface';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { BANKING_CARDS_STATUS } from '../../../constants/FHValueMaps';
import DateTime from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import { daysDueCondition, isDateExpired } from '@fsi/core-components/dist/utilities/TimeUtils';
import { cardsGrey12Text, cards10LeftText, cards10RightText, redDot, cardFooterHorizontalTokens } from './BankingCardFooter.style';

export const CardFooter: FC<ICardFooterProps> = ({ isActive, equalStatus, cardStatus, embossingName, cardExpiry }) => {
    const translate = useTranslation(namespaces.CARDS);
    const isStatusActive = equalStatus(BANKING_CARDS_STATUS.Active);
    const isExpiringSoon = (isStatusActive && daysDueCondition(cardExpiry)) || equalStatus(BANKING_CARDS_STATUS.ExpiresSoon);

    const status = useMemo(() => {
        if (isStatusActive && isDateExpired(cardExpiry)) {
            return translate('EXPIRED');
        }

        if (isStatusActive && isExpiringSoon) {
            return translate('EXPIRES_SOON');
        }

        return cardStatus;
    }, [isStatusActive, cardExpiry, isExpiringSoon, cardStatus, translate]);

    return (
        <Stack data-testid="card-wrapper-footer">
            <Stack.Item styles={cards10LeftText} data-testid="card-wrapper-footer-status">
                <Stack horizontal tokens={cardFooterHorizontalTokens} verticalAlign="center">
                    {(!isActive || isExpiringSoon) && <span style={redDot as React.CSSProperties}></span>}
                    <Stack.Item styles={cards10LeftText}>{status}</Stack.Item>
                    <DateTime quickFormat={DateTimePredefinedFormat.ShortMonthYear} date={cardExpiry} styles={cards10RightText} />
                </Stack>
            </Stack.Item>
            <Stack.Item data-testid="banking-card-embossing-name" align="start" styles={cardsGrey12Text}>
                {embossingName}
            </Stack.Item>
        </Stack>
    );
};
