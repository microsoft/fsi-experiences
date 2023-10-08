import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import contextService from '@fsi/pcf-common/services/ContextService';
import { MockGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/MockGroupsFetcher';
import { PcfGroupsFetcher } from '@fsi-pcf/banking-common/groups/fetchers/PcfGroupsFetcher';
import { GroupsSummaryViewComponent } from '@fsi/banking/components/summaryGroup/GroupsSummaryViewComponent';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface MainHouseholdContainerProps extends PCFContainerProps {}

export const MainHouseholdContainer: React.FC<MainHouseholdContainerProps> = (props: MainHouseholdContainerProps) => {
    const { context } = props;
    const loggerService = usePCFLoggerService();

    const fetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockGroupsFetcher() : new PcfGroupsFetcher(context, loggerService);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);

    return context ? (
        <PCFContainer context={props.context}>
            <GroupsSummaryViewComponent fetcher={fetcher} contactId={contactId} />
        </PCFContainer>
    ) : null;
};
