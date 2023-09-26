import React, { useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { BANKING_CARDS_STATUS, BANKING_CARDS_TYPE } from '../../../constants/FHValueMaps';
import { creditCardMask } from '@fsi/core-components/dist/utilities/CalcUtils';
import { isDateExpired } from '@fsi/core-components/dist/utilities/TimeUtils';
import {
    cards14Text,
    cardsHeader,
    cardStackTokens,
    cardsGrey12Text,
    getBankingCardClassNames,
    bankingCardStyles,
    cardIndicatorButtonStyles,
} from './BankingCard.style';
import { IBankingCardProps, IBankingCardStyleProps, IBankingCardStyles } from './BankingCard.interface';
import { styled } from '@fluentui/react/lib/Utilities';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { getOptionSetText } from '../../../utilities/EntityMetadata';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import BankingCardTooltip from '../../../components/bankingCards/BankingCardTooltip/BankingCardTooltip';
import { CardFooter } from '../BankingCardFooter';

const isCardStatusActive = (status: number) => status === BANKING_CARDS_STATUS.Active;
const isCardStatusExpiresSoon = (status: number) => status === BANKING_CARDS_STATUS.ExpiresSoon;
const isCardActive = (status: number, expiryDate: Date | undefined) =>
    (isCardStatusActive(status) && !isDateExpired(expiryDate)) || isCardStatusExpiresSoon(status);

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
                    fhiStatus={fhiStatus}
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
