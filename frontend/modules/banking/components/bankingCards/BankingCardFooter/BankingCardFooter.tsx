import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { ICardFooterProps } from './BankingCardFooter.interface';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { BANKING_CARDS_STATUS } from '../../../constants/FHValueMaps';
import DateTime from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import { daysDueCondition, isDateExpired } from '@fsi/core-components/dist/utilities/TimeUtils';
import { cardsGrey12Text, cards10LeftText, cards10RightText, cardFooterHorizontalTokens, getRedDotClass } from './BankingCardFooter.style';

export const CardFooter: FC<ICardFooterProps> = ({ isActive, cardStatus, fhiStatus, embossingName, cardExpiry }) => {
    const equalStatus = (status: number) => status === fhiStatus;
    const translate = useTranslation(namespaces.CARDS);
    const isStatusActive = equalStatus(BANKING_CARDS_STATUS.Active);
    const isExpiringSoon = (isStatusActive && daysDueCondition(cardExpiry)) || equalStatus(BANKING_CARDS_STATUS.ExpiresSoon);

    const status = () => {
        if (isStatusActive && isDateExpired(cardExpiry)) {
            return translate('EXPIRED');
        }

        if (isStatusActive && isExpiringSoon) {
            return translate('EXPIRES_SOON');
        }

        return cardStatus;
    };
    const redDotClass = getRedDotClass();
    return (
        <Stack data-testid="card-wrapper-footer">
            <Stack.Item styles={cards10LeftText} data-testid="card-wrapper-footer-status">
                <Stack horizontal tokens={cardFooterHorizontalTokens} verticalAlign="center">
                    {(!isActive || isExpiringSoon) && <span className={redDotClass}></span>}
                    <Stack.Item styles={cards10LeftText}>{status()}</Stack.Item>
                    <DateTime quickFormat={DateTimePredefinedFormat.ShortMonthYear} date={cardExpiry} styles={cards10RightText} />
                </Stack>
            </Stack.Item>
            <Stack.Item data-testid="banking-card-embossing-name" align="start" styles={cardsGrey12Text}>
                {embossingName}
            </Stack.Item>
        </Stack>
    );
};
