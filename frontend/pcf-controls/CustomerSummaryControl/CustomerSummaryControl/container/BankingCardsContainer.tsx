import React, { useMemo } from 'react';
import BankingCards from '@fsi/banking/components/bankingCards';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { FHCardsFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/FHCardsFetcher';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface BankingCardsContainerProps extends PCFContainerProps { }

export const BankingCardsContainer: React.FC<BankingCardsContainerProps> = (props: BankingCardsContainerProps) => {
    const { context } = props;

    const loggerService = usePCFLoggerService();
    const fetcher = useMemo(() => {
        return new FHCardsFetcher(context, loggerService);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);

    return context ? (
        <PCFContainer context={props.context}>
            <BankingCards fetcher={fetcher} contactId={contactId} />
        </PCFContainer>
    ) : null;
};
