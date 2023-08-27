import React from 'react';
import BankingCardsMain from '../../components/bankingCards/BankingCardsMain/BankingCardsMain';
import useFHCardsData from '../../hooks/financialHoldings/useFHCardsData';
import { IFHCardsFetcher } from '../../interfaces/IFHCardsFetcher';

export interface BankingCardsProps {
    fetcher: IFHCardsFetcher;
    contactId: string;
}

const BankingCards: React.FC<BankingCardsProps> = props => {
    const { fetcher, contactId } = props;
    const { entities = new Map(), isError, isLoading, metadata, hasAccess } = useFHCardsData({ fetcher, contactId });

    return <BankingCardsMain entities={entities} isError={isError} isLoading={isLoading} metadata={metadata} hasAccess={hasAccess} />;
};
export default BankingCards;
