import React from 'react';
import FHSummary from '@fsi/banking/components/summaryFH/FHSummary';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { mergeConfigs } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { extractFinancialHoldingsFlags } from '@fsi-pcf/banking-common/financial-holding/financialHoldings';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';

export interface FHSummaryContainerProps extends PCFContainerProps {}

export const FHSummaryContainer: React.FC<FHSummaryContainerProps> = (props: FHSummaryContainerProps) => {
    const { context } = props;

    const fetcher = useFHFetcher(context);

    const contactId = extractEntityId(context.parameters?.contactId);

    const config = mergeConfigs([extractFinancialHoldingsFlags(context)]);

    return context ? (
        <PCFContainer context={props.context} config={config}>
            <FHSummary fetcher={fetcher} contactId={contactId} />
        </PCFContainer>
    ) : null;
};
