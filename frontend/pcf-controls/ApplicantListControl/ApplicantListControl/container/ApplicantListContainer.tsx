import React from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import ApplicantListWrapper, { IApplicantListProps } from '@fsi/onboarding-application/components/ApplicantList/ApplicantList';
import { PCFApplicantListFetcher } from '../fetchers/PCFApplicantListFetcher';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export interface ListContainerProps extends PCFContainerProps, Omit<IApplicantListProps, 'fetcher'> {
    selectedApplicant: string;
}

const defaultContainerStyles = { display: 'flex', height: '100%' };

export const ApplicantListContainer: React.FC<ListContainerProps> = ({
    context,
    selectedApplicant,
    onChangeApplicant,
    containerStyle = defaultContainerStyles,
    onSyncAppState,
    applicationId,
    taskDefinitionId,
}: ListContainerProps) => {
    const loggerService = usePCFLoggerService();
    const fetcher = new PCFApplicantListFetcher(context, loggerService);

    return (
        context && (
            <PCFContainer containerStyle={containerStyle} context={context} withCurrencies={false}>
                <ApplicantListWrapper
                    fetcher={fetcher}
                    selectedApplicant={selectedApplicant}
                    onChangeApplicant={onChangeApplicant}
                    onSyncAppState={onSyncAppState}
                    applicationId={applicationId}
                    taskDefinitionId={taskDefinitionId}
                />
            </PCFContainer>
        )
    );
};
export default ApplicantListContainer;
