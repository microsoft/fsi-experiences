import React from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import InvestmentsPortfolios from '@fsi/banking/components/InvestmentsPortfolios';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';

export interface InvestmentsPortfoliosContainerProps extends PCFContainerProps {}

export const InvestmentsPortfoliosContainer: React.FC<InvestmentsPortfoliosContainerProps> = props => {
    const { context } = props;

    const fetcher = useFHFetcher(context);

    const contactId = extractEntityId(context.parameters?.contactId);

    return context ? (
        <PCFContainer context={props.context}>
            <InvestmentsPortfolios fetcher={fetcher} contactId={contactId} />
        </PCFContainer>
    ) : null;
};
