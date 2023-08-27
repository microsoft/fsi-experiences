import React, { useState, useMemo, FC } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Stack } from '@fluentui/react/lib/Stack';
import { ActionButton } from '@fluentui/react/lib/Button';
import {
    buttonLeftItemStyle,
    buttonRightItemStyle,
    buttonStyle,
    CARD_WIDTH,
    DEFAULT_WIDTH,
    HORIZONTAL_PADDING,
    PADDING_BETWEEN_CARDS,
    withIconClassNames,
} from '../BankingCards.style';
import { SectionHeader } from '@fsi/core-components/dist/components/atoms/SectionHeader/SectionHeader';
import { BankingCardsMainProps } from './BankingCardsMain.interface';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import BankingCardsContent from '../BankingCardsContent';
import { useResizeDetector } from 'react-resize-detector';

const countCards = (entities: Map<string, any>) => {
    let count = 0;

    /* istanbul ignore if */
    if (!entities) {
        return count;
    }

    entities.forEach(FH => {
        count += FH.financialInstruments.length;
    });
    return count;
};

const rootStyle = { width: '100% !important' };

const BankingCardsMain: FC<BankingCardsMainProps> = ({ entities, isError, isLoading, metadata, hasAccess }) => {
    const { ref, width } = useResizeDetector({ handleHeight: false });
    const [carouselIndex, setCarouselIndex] = useState(0);
    const translate = useTranslation(namespaces.CARDS);
    const translateCommon = useTranslation();
    const containerWidth = width || DEFAULT_WIDTH;
    const cardsNumber = useMemo(() => {
        return countCards(entities);
    }, [entities]);

    const title = translate('CARDS', { cardNumbers: cardsNumber > 0 ? `(${cardsNumber})` : '' });

    const barrierLeft = carouselIndex === 0;
    const maxCardsFitInContainer = Math.floor((containerWidth - HORIZONTAL_PADDING - PADDING_BETWEEN_CARDS * (cardsNumber - 1)) / CARD_WIDTH) || 1;
    const barrierRight = cardsNumber - carouselIndex > maxCardsFitInContainer;
    const onLeftClick = () => setCarouselIndex(prevState => prevState - 1);
    const onRightClick = () => setCarouselIndex(prevState => prevState + 1);

    return (
        <div ref={ref} style={rootStyle}>
            <SectionHeader titleString={title}>
                <Stack horizontal>
                    <Stack.Item styles={buttonLeftItemStyle}>
                        <ActionButton
                            ariaLabel={translateCommon('LEFT')}
                            allowDisabledFocus
                            styles={buttonStyle}
                            onClick={onLeftClick}
                            disabled={barrierLeft}
                            data-testid={`left-click-button`}
                        >
                            <Icon
                                iconName="chevronleft"
                                className={barrierLeft ? withIconClassNames.GreyIconUnclickable : withIconClassNames.GreyIconClickable}
                            />
                        </ActionButton>
                    </Stack.Item>
                    <Stack.Item styles={buttonRightItemStyle}>
                        <ActionButton
                            ariaLabel={translateCommon('RIGHT')}
                            allowDisabledFocus
                            styles={buttonStyle}
                            onClick={onRightClick}
                            disabled={!barrierRight}
                            data-testid={`right-click-button`}
                        >
                            <Icon
                                iconName="chevronright"
                                className={barrierRight ? withIconClassNames.GreyIconClickable : withIconClassNames.GreyIconUnclickable}
                            />
                        </ActionButton>
                    </Stack.Item>
                </Stack>
            </SectionHeader>
            <BankingCardsContent
                cardsNumber={cardsNumber}
                carouselIndex={carouselIndex}
                hasAccess={hasAccess}
                isError={isError}
                isLoading={isLoading}
                entities={entities}
                metadata={metadata}
            />
        </div>
    );
};

export default BankingCardsMain;
