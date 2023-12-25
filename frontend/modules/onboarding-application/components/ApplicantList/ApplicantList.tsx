import React, { FC } from 'react';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import SelectionList from '../SelectionList/SelectionList';
import { useEffect } from 'react';
import { getWidgetStylesByStates } from './ApplicantList.style';
import { IApplicantListFetcher } from '../../interfaces/IApplicantListFetcher';
import { useApplicantListData } from '../../hooks/useApplicantListData';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { APPLICANT_LIST_NAMESPACE } from '../../constants/namespaces.const';
import { useBPF } from '../../hooks/useBPF';
import { NotificationContainerWrapper } from '../NotificationContainerWrapper/NotificationContainerWrapper';
import { ErrorImageSize } from '@fsi/core-components/dist/components/containers/ErrorState';
import { useTaskPrivilege } from '../../hooks/useTaskPrivilege';

export interface IApplicantListProps {
    fetcher: IApplicantListFetcher;
    applicationId?: string;
    taskDefinitionId?: string;
    selectedApplicant: string;
    onChangeApplicant: (guid: string) => void;
    onSyncAppState: (appState: { isLoading: boolean; isError: boolean }) => void;
}

export const ApplicantList: FC<IApplicantListProps> = ({
    fetcher,
    onChangeApplicant,
    selectedApplicant,
    onSyncAppState,
    applicationId = '',
    taskDefinitionId,
}) => {
    const { applicants, isLoading, isError, errorMessage } = useApplicantListData({ fetcher, applicationId, taskDefinitionId });
    const { bpfStage: processStage } = useBPF({ fetcher });
    const { canEditTasks } = useTaskPrivilege(fetcher);

    const hasSelectedApplicant = selectedApplicant && applicants?.find(applicant => applicant.id === selectedApplicant);

    const translate = useTranslation(APPLICANT_LIST_NAMESPACE);

    useEffect(() => {
        if (!applicants?.length || hasSelectedApplicant) return;

        onChangeApplicant(applicants[0].id);
    }, [applicants, onChangeApplicant, hasSelectedApplicant]);

    useEffect(() => {
        onSyncAppState({ isLoading, isError });
    }, [isLoading, isError, onSyncAppState]);

    const hasNoApplicants = !applicants || !applicants.length;
    const emptyProps = hasNoApplicants
        ? {
              title: translate('NO_DATA'),
              icon: IMAGE_SRC.emptyState100,
              subtitle: translate('NO_DATA_DESC'),
              iconSize: 100,
          }
        : undefined;
    const widgetStyles = getWidgetStylesByStates(isLoading || isError || hasNoApplicants);

    const errorProps = errorMessage
        ? { title: translate(errorMessage), subtitle: translate(`${errorMessage}_DESC`), iconSize: 100 as ErrorImageSize }
        : undefined;

    return (
        <Widget
            isLoading={isLoading}
            styles={widgetStyles}
            name="applicant-list-container"
            isError={isError}
            emptyProps={emptyProps}
            errorProps={errorProps}
        >
            <SelectionList
                applicants={applicants}
                value={selectedApplicant}
                onChange={item => onChangeApplicant(item.id)}
                processStage={processStage}
                disableTaskUpdate={!canEditTasks}
            />
        </Widget>
    );
};

export const ApplicantListWrapper = props => {
    return (
        <NotificationContainerWrapper>
            <ApplicantList {...props} />
        </NotificationContainerWrapper>
    );
};

export default ApplicantListWrapper;
