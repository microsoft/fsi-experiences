import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { BANKING_CARDS_STATUS, BANKING_CARDS_TYPE } from '../../../constants/FHValueMaps';
import { creditCardMask } from '@fsi/core-components/dist/utilities/CalcUtils';
import { daysDueCondition, isDateExpired } from '@fsi/core-components/dist/utilities/TimeUtils';
import {
    cards14Text,
    cardsHeader,
    cardStackTokens,
    cardsGrey12Text,
    cards10LeftText,
    cards10RightText,
    redDot,
    getBankingCardClassNames,
    bankingCardStyles,
    cardIndicatorButtonStyles,
} from './BankingCard.style';
import { IBankingCardProps, IBankingCardStyleProps, IBankingCardStyles } from './BankingCard.interface';
import { styled } from '@fluentui/react/lib/Utilities';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import DateTime from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import { getOptionSetText } from '../../../utilities/EntityMetadata';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import BankingCardTooltip from '../../../components/bankingCards/BankingCardTooltip/BankingCardTooltip';

const isCardStatusActive = (status: number) => status === BANKING_CARDS_STATUS.Active;
const isCardStatusExpiresSoon = (status: number) => status === BANKING_CARDS_STATUS.ExpiresSoon;
const isCardActive = (status: number, expiryDate: Date | undefined) =>
    (isCardStatusActive(status) && !isDateExpired(expiryDate)) || isCardStatusExpiresSoon(status);

interface ICardFooter {
    cardStatus: string;
    isActive: boolean;
    equalStatus: (number) => boolean;
    role: string;
    cardExpiry: Date | undefined;
    embossingName?: string;
}

const cardFooterHorizontalTokens = { childrenGap: 4 };

const CardFooter: FC<ICardFooter> = ({ isActive, equalStatus, cardStatus, embossingName, cardExpiry }) => {
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
    }, [isStatusActive, isExpiringSoon, cardExpiry]);

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

const BankingCardBase: React.FunctionComponent<IBankingCardProps> = props => {
    const translate = useTranslation(namespaces.CARDS);

    if (!props.cardInfo) {
        return <></>;
    }

    const { styles, theme, fhRole, metadata, index = 0, currencyId } = props;

    const {
        fhiStatus = 0,
        fhiCardType = 0,
        fsiProductName,
        fhiCardNumber,
        fhiExpiryDate,
        fsiCardNetwork,
        fhiEmbossingName,
        fhiWithdrawalLimit,
        fhiPurchasingLimit,
    } = props.cardInfo;

    const cardType = getOptionSetText(fhiCardType, metadata?.fhiCardType);
    const status = getOptionSetText(fhiStatus, metadata?.fhiStatus);
    const role = getOptionSetText(fhRole, metadata?.role);
    const isActive = isCardActive(fhiStatus, fhiExpiryDate);
    const equalStatus = (status: number) => status === fhiStatus;

    const classNames = getBankingCardClassNames(styles, {
        active: isActive,
        isCredit: fhiCardType === BANKING_CARDS_TYPE.Credit,
        theme: theme!,
    });

    const cardTooltipProps = useMemo(() => {
        return {
            content: (
                <BankingCardTooltip
                    embossingName={fhiEmbossingName}
                    withdrawalLimit={fhiWithdrawalLimit}
                    purchasingLimit={fhiPurchasingLimit}
                    currencyId={currencyId}
                    metadata={metadata}
                />
            ),
            directionalHint: DirectionalHint.topCenter,
        };
    }, [fhiEmbossingName, metadata]);

    return (
        <div data-testid={`card-wrapper-${fhiCardType}`} className={`${classNames.root} ${`banking-card-${isActive ? 'active' : 'inactive'}`}`}>
            <Stack tokens={cardStackTokens} verticalFill verticalAlign="space-between">
                <Stack>
                    <Stack horizontal horizontalAlign="space-between">
                        <Stack.Item styles={cardsHeader} data-testid="card-wrapper-header">
                            {(fsiCardNetwork || '').toLowerCase()}
                        </Stack.Item>
                        <Indicator
                            size={12}
                            iconName="info"
                            tooltipProps={cardTooltipProps}
                            iconAriaLabel={translate('BANKING_CARD_DETAILS', { index: index + 1 })}
                            buttonStyles={isActive ? cardIndicatorButtonStyles : {}}
                            color={isActive ? COLORS.white : COLORS.darkGray140}
                        />
                    </Stack>
                    <Stack.Item styles={cardsGrey12Text} data-testid="card-wrapper-product">
                        {cardType} {fsiProductName ? `• ${fsiProductName}` : ''}
                    </Stack.Item>
                    <Stack.Item styles={cards14Text} data-testid="card-wrapper-number">
                        {creditCardMask(fhiCardNumber || '')}
                    </Stack.Item>
                </Stack>
                <CardFooter
                    embossingName={fhiEmbossingName}
                    isActive={isActive}
                    equalStatus={equalStatus}
                    cardStatus={status}
                    role={role}
                    cardExpiry={fhiExpiryDate}
                />
            </Stack>
        </div>
    );
};

const BankingCard = styled<IBankingCardProps, IBankingCardStyleProps, IBankingCardStyles>(BankingCardBase, bankingCardStyles);

export default BankingCard;
