import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { PCFLifeEventsFetcher } from '../fetchers/PCFLifeEventsFetcher';
import contextService from '@fsi/pcf-common/services/ContextService';
import { MockGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/MockGroupsFetcher';
import { MockLifeEventsFetcher } from '@fsi/milestones/interfaces/mocks/MockLifeEventsFetcher';
import { CustomerSnapshotFetcher } from '@fsi/pcf-common/data-layer/customerSnapshot/CustomerSnapshotFetcher';
import { PcfGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/PcfGroupsFetcher';
import { FHCardsFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/FHCardsFetcher';
import CustomerSummary from '@fsi/banking/components/CustomerSummary';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { extractContextualFlags, mergeConfigs } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { extractLifeEventsConfig } from './LifeEventsContainer';
import { extractFinancialHoldingsFlags } from '@fsi-pcf/banking-common/financial-holding/financialHoldings';
import * as MockCustomerSnapshotFetcher from '@fsi/core-components/dist/dataLayerInterface/service/mocks/MockCustomerSnapshotFetcher';
import { KEY_OBSERVATIONS_FLAGS, KEY_OBSERVATIONS_FLAGS_DEFAULTS } from '@fsi/core-components/dist/constants/features';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';

export interface CustomerSummaryProps extends PCFContainerProps {}

const defaultSnapshotFormID = '75c78db3-068f-ec11-b400-0022480988ea';
export const extractCustomerSnapshotConfig = context => ({
    flags: extractContextualFlags(context, Object.values(KEY_OBSERVATIONS_FLAGS), KEY_OBSERVATIONS_FLAGS_DEFAULTS),
});

export const CustomerSummaryContainer: React.FC<CustomerSummaryProps> = (props: CustomerSummaryProps) => {
    const { context } = props;

    const lifeEventsFetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockLifeEventsFetcher() : new PCFLifeEventsFetcher(context);
    }, [context]);

    const pcfGroupsFetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockGroupsFetcher() : new PcfGroupsFetcher(context);
    }, [context]);

    const customerSnapshotFetcher = useMemo(() => {
        return contextService.isTestMode()
            ? new MockCustomerSnapshotFetcher.MockCustomerSnapshotFetcher()
            : new CustomerSnapshotFetcher(context, 'contactid');
    }, [context]);

    const fhFetcher = useFHFetcher(context);

    const fhCardsFetcher = useMemo(() => {
        return new FHCardsFetcher(context);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);
    const config = mergeConfigs([extractCustomerSnapshotConfig(context), extractLifeEventsConfig(context), extractFinancialHoldingsFlags(context)]);

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
