import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { PcfGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/PcfGroupsFetcher';
import contextService from '@fsi/pcf-common/services/ContextService';
import { MockGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/MockGroupsFetcher';
import { GroupsAndRelationshipsApp } from '@fsi/banking/components/groups/GroupsAndRelationshipsApp';
import { GroupsSummaryViewComponent } from '@fsi/banking/components/summaryGroup/GroupsSummaryViewComponent';
import MockRelationshipsFetcher from '@fsi-pcf/banking-common/relationships/fetchers/MockRelationshipsFetcher';
import PcfRelationshipFetcher from '@fsi-pcf/banking-common/relationships/fetchers/PcfRelationshipFetcher';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { mergeConfigs } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { extractFinancialHoldingsFlags } from '@fsi-pcf/banking-common/financial-holding/financialHoldings';

export interface GroupsContainerProps extends PCFContainerProps {
    isSummaryViewContainer?: boolean;
}

export const GroupsContainer: React.FC<GroupsContainerProps> = (props: GroupsContainerProps) => {
    const { context } = props;

    const groupsFetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockGroupsFetcher() : new PcfGroupsFetcher(context);
    }, [context]);
    const relationshipsFetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockRelationshipsFetcher() : new PcfRelationshipFetcher(context);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);

    const config = mergeConfigs([extractFinancialHoldingsFlags(context)]);

    return context ? (
        <PCFContainer context={props.context} config={config}>
            {props.isSummaryViewContainer ? (
                <GroupsSummaryViewComponent contactId={contactId} fetcher={groupsFetcher} />
            ) : (
                <GroupsAndRelationshipsApp contactId={contactId} groupsFetcher={groupsFetcher} relationshipsFetcher={relationshipsFetcher} />
            )}
        </PCFContainer>
    ) : null;
};
