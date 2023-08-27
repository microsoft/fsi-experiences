import React, { FC } from 'react';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import BankingCardsRow from '../BankingCardsRow/BankingCardsRow';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { cardsEmptyStateStyles } from './BankingCardsContent.style';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { FHMetadata, FinancialHoldingFields } from '../../../interfaces/FHEntity';

interface IBankingCardsContentProps {
    isLoading: boolean;
    isError: boolean;
    hasAccess?: boolean;
    entities?: Map<string, FinancialHoldingFields>;
    metadata?: FHMetadata;
    cardsNumber: number;
    carouselIndex: number;
}

const BankingCardsContent: FC<IBankingCardsContentProps> = ({ isLoading, isError, hasAccess, entities, metadata, cardsNumber, carouselIndex }) => {
    const translate = useTranslation(namespaces.CARDS);

    if (isError || !entities) {
        return (
            <div style={{ height: '160px' }}>
                <ErrorState iconSize={48} styles={cardsEmptyStateStyles} />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div style={{ padding: '15px 0px' }}>
                <Loading />
            </div>
        );
    }

    if (hasAccess === false) {
        return (
            <div style={{ height: '160px' }}>
                <ErrorState
                    {...{
                        title: translate('CUSTOMER_INFORMATION_RESTRICTED'),
                        subtitle: '',
                        icon: IMAGE_SRC.no_access48,
                        isErrorState: false,
                        iconSize: 100,
                        styles: cardsEmptyStateStyles,
                    }}
                />
            </div>
        );
    }

    return <BankingCardsRow financialHoldings={entities} cardsNumber={cardsNumber} focusedIndex={carouselIndex} metadata={metadata} />;
};

export default BankingCardsContent;
