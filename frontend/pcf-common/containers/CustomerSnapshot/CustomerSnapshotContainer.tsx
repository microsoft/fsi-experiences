import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '../PCFContainer';
import contextService from '../../services/ContextService';
import { MockCustomerSnapshotFetcher } from '@fsi/core-components/dist/dataLayerInterface/service/mocks/MockCustomerSnapshotFetcher';
import { extractEntityId } from '../../utilities/extractEntityId';
import CustomerSnapshot from '@fsi/core-components/dist/widgets/customerSnapshot/CustomerSnapshot';
import { ENTITY_SNAPSHOT_FLAGS, ENTITY_SNAPSHOT_FLAGS_DEFAULTS } from '@fsi/core-components/dist/constants/features/entitySnapshot';
import { CustomerSnapshotFetcher } from '../../data-layer/customerSnapshot/CustomerSnapshotFetcher';
import { extractContextualFlags } from '../../utilities/extractContextualConfig';
import { usePCFLoggerService } from '../../hooks/usePCFLoggerService';

export const extractEntitySnapshotConfig = context => ({
    flags: extractContextualFlags(context, Object.values(ENTITY_SNAPSHOT_FLAGS), ENTITY_SNAPSHOT_FLAGS_DEFAULTS),
});
export interface CustomerSnapshotContainerProps extends PCFContainerProps {
    linkToEntityField?: string | null;
}

export const CustomerSnapshotContainer: React.FC<CustomerSnapshotContainerProps> = (props: CustomerSnapshotContainerProps) => {
    const { context, linkToEntityField } = props;
    const loggerService = usePCFLoggerService();
    
    // need to inject the logger 
    const fetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockCustomerSnapshotFetcher() : new CustomerSnapshotFetcher(context, linkToEntityField || '', loggerService);
    }, [context, linkToEntityField]);

    const entityId = extractEntityId(context.parameters?.entityId || context.parameters?.contactId);

    const config = extractEntitySnapshotConfig(context);

    return (
        context && (
            <PCFContainer context={context} config={config}>
                <CustomerSnapshot entityId={entityId} fetcher={fetcher} formId={context.parameters?.formId?.raw} />
            </PCFContainer>
        )
    );
};
export default CustomerSnapshotContainer;
