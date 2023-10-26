import { FHCardsFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/FHCardsFetcher';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';
import { extractFinancialHoldingsFlags } from '@fsi-pcf/banking-common/financial-holding/financialHoldings';
import { MockGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/MockGroupsFetcher';
import { PcfGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/PcfGroupsFetcher';
import CustomerSummary from '@fsi/banking/components/CustomerSummary';
import * as MockCustomerSnapshotFetcher from '@fsi/core-components/dist/dataLayerInterface/service/mocks/MockCustomerSnapshotFetcher';
import { MockLifeEventsFetcher } from '@fsi/milestones/interfaces/mocks/MockLifeEventsFetcher';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { CustomerSnapshotFetcher } from '@fsi/pcf-common/data-layer/customerSnapshot/CustomerSnapshotFetcher';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';
import contextService from '@fsi/pcf-common/services/ContextService';
import { mergeConfigs } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import React, { useMemo } from 'react';
import { PCFLifeEventsFetcher } from '../fetchers/PCFLifeEventsFetcher';
import { extractLifeEventsConfig } from './LifeEventsContainer';

export interface CustomerSummaryProps extends PCFContainerProps { }

const defaultSnapshotFormID = '75c78db3-068f-ec11-b400-0022480988ea';

export const CustomerSummaryContainer: React.FC<CustomerSummaryProps> = (props: CustomerSummaryProps) => {
    const { context } = props;

    const loggerService = usePCFLoggerService();

    const lifeEventsFetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockLifeEventsFetcher() : new PCFLifeEventsFetcher(context, loggerService);
    }, [context]);

    const pcfGroupsFetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockGroupsFetcher() : new PcfGroupsFetcher(context, loggerService);
    }, [context]);

    const customerSnapshotFetcher = useMemo(() => {
        return contextService.isTestMode()
            ? new MockCustomerSnapshotFetcher.MockCustomerSnapshotFetcher()
            : new CustomerSnapshotFetcher(context, 'contactid', loggerService);
    }, [context]);

    const fhFetcher = useFHFetcher(context);

    const fhCardsFetcher = useMemo(() => {
        return new FHCardsFetcher(context, loggerService);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);
    const config = mergeConfigs([extractLifeEventsConfig(context), extractFinancialHoldingsFlags(context)]);

    return context && contactId ? (
        <PCFContainer context={props.context} config={config}>
            <CustomerSummary
                customerSnapshotFetcher={customerSnapshotFetcher}
                formId={context.parameters?.formId?.raw || defaultSnapshotFormID}
                contactId={contactId}
                lifeEventsFetcher={lifeEventsFetcher}
                fhFetcher={fhFetcher}
                fhCardsFetcher={fhCardsFetcher}
                pcfGroupsFetcher={pcfGroupsFetcher}
            />
        </PCFContainer>
    ) : (
        <div>Missing Contact Info</div>
    );
};
export default CustomerSummaryContainer;
