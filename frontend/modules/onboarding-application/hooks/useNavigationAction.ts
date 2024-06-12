import { TaskNavigationTypes } from '../constants/TaskNavigationTypes.const';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import { ITask } from '../interfaces/ITask';
import { useCallback } from 'react';

const APPLICANT_LIST_PLACEHOLDER = 'msfsi_applicantlistplaceholder';

export function useNavigationAction({ fetcher }) {
    const { postMessage: postOpenTabMessage } = useBrowserCommunication('open-tab-channel');
    const loggerService = useLoggerService();

    return useCallback(
        (task: ITask) => {
            const { type, details, taskForm } = task.taskDefinition.taskNavigation!;
            const fieldValue = task.relatedParty?.id && task.taskDefinition.id ? `${task.relatedParty.id},${task.taskDefinition.id}` : '';
            const actionByType: { [type: number]: (() => void) | undefined } = {
                [TaskNavigationTypes.OpenATab]:
                    details &&
                    (() =>
                        postOpenTabMessage({
                            tabName: details,
                            fieldName: APPLICANT_LIST_PLACEHOLDER,
                            fieldValue: fieldValue,
                        })),
                [TaskNavigationTypes.ReviewAForm]: taskForm && (() => fetcher.openForm(taskForm)),
            };

            const action = actionByType[type];

            return action
                ? () => {
                      loggerService.logInteractionOrAction({ uniqueName: 'Click on task name' });
                      action();
                  }
                : undefined;
        },
        [fetcher, loggerService, postOpenTabMessage]
    );
}
