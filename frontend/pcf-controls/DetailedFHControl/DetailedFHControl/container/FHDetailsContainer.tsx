import React from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { DetailedFHMain } from '@fsi/banking/components/detailedFinancialHolding';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { mergeConfigs } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { extractFinancialHoldingsFlags } from '@fsi-pcf/banking-common/financial-holding/financialHoldings';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';

export interface FHDetailsContainerProps extends PCFContainerProps {}

export const FHDetailsContainer: React.FC<FHDetailsContainerProps> = (props: FHDetailsContainerProps) => {
    const { context } = props;

    const fetcher = useFHFetcher(context);

    const contactId = extractEntityId(context.parameters?.contactId);

    const config = mergeConfigs([extractFinancialHoldingsFlags(context)]);

    return (
        <PCFContainer context={props.context} config={config}>
            <DetailedFHMain contactId={contactId} fetcher={fetcher} />
        </PCFContainer>
    );
};
