import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC, useMemo, ReactElement } from 'react';
import BankingCard from '../BankingCard/BankingCard';
import { CARD_MARGINS, CARD_WIDTH, PADDING_BETWEEN_CARDS } from '../BankingCards.style';
import { FinancialHoldingFields, FinancialInstrumentFields } from '../../../interfaces/FHEntity';
import { BANKING_CARDS_STATUS, CARD_STATUS_ORDER } from '../../../constants/FHValueMaps';
import BankingCardsEmptyState from '../BankingCardsEmptyState/BankingCardsEmptyState';
import { BankingCardsRowProps } from './BankingCardsRow.interface';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { cardLine, cardStyle } from './BankingCardsRow.style';

const cardLineElements = {
    childrenGap: PADDING_BETWEEN_CARDS,
};

/* istanbul ignore next */
const calcSortValues = (tuple: [FinancialHoldingFields, FinancialInstrumentFields]) => {
    //A card is expired (Not Active) when diffDays is -1. The bank changes the new state of Status so we can sort by Status and then by date.
    const expiryDate = tuple[1].fhiExpiryDate || new Date();
    if (tuple[1].fhiStatus === BANKING_CARDS_STATUS.Active) {
        const diffTime = Math.abs(expiryDate.getTime() - new Date().getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return 4 + diffDays;
    }
    return CARD_STATUS_ORDER[tuple[1].fhiStatus || 'undefined'];
};

const BankingCardsRow: FC<BankingCardsRowProps> = props => {
    const { focusedIndex, financialHoldings, metadata } = props;
    const translate = useTranslation(namespaces.CARDS);

    const left = focusedIndex * (CARD_MARGINS + CARD_WIDTH);

    const innerCardStyles = useMemo(
        () => ({
            root: {
                transition: 'all 0.5s',
                transform: `translateX(-${left}px)`,
            },
        }),
        [left]
    );

    const cards = useMemo(() => {
        const instruments: [FinancialHoldingFields, FinancialInstrumentFields][] = [];
        financialHoldings.forEach(fh => {
            fh.financialInstruments.forEach(fhi => {
                instruments.push([fh, fhi]);
            });
        });
        const instrumentsSorted = instruments.sort((a, b) => calcSortValues(a) - calcSortValues(b));

        const rowMap: ReactElement[] = instrumentsSorted.map(([fh, instrument], index) => {
            const cardStyles = index === instruments.length - 1 ? cardStyle : {};

            return (
                <Stack.Item role="listitem" key={index} styles={cardStyles} data-testid="cardRow-item">
                    <BankingCard cardInfo={instrument} fhRole={fh.role} metadata={metadata} index={index} currencyId={fh.currencyId} />
                </Stack.Item>
            );
        });

        return rowMap;
    }, [financialHoldings, metadata]);

    return (
        <Stack styles={cardLine} data-testid={`card-row-${props.cardsNumber}`}>
            {props.cardsNumber ? (
                <Stack role="list" tokens={cardLineElements} horizontal styles={innerCardStyles}>
                    {cards}
                </Stack>
            ) : (
                <BankingCardsEmptyState text={translate('NO_OWNED_CARDS')} />
            )}
        </Stack>
    );
};

export default BankingCardsRow;
