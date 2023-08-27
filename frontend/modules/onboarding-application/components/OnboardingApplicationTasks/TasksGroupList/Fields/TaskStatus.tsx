import React, { ReactElement, FC, useCallback, useMemo } from 'react';
import { IDropdownOption, IDropdownStyleProps, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { dropdownStyles, optionStyles, statusStylesMapper } from './TaskStatus.style';
import {
    TaskStateType,
    TaskStatusType,
    TaskStatus as TaskStatusConst,
    STATUS_TRANSLATION,
    STATUS_TO_STATE,
} from '../../../../constants/Fields.const';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import { FormDropdown } from '@fsi/core-components/dist/components/containers/FormDropdown/FormDropdown';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService';
import { NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService';
import { ONBOARDING_APPLICATION_TASKS } from '../../../../constants/namespaces.const';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import { useId } from '@fluentui/react-hooks';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

interface ITasksStatusProps {
    status: number;
    updateTaskStatus: (updatedStatus: TaskStatusType, updatedState: TaskStateType) => Promise<void>;
    isDisabled?: boolean;
    id?: string;
    styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
    label?: string;
    labelId?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
}

const TaskStatus: FC<ITasksStatusProps> = ({
    status,
    updateTaskStatus,
    isDisabled,
    styles,
    label,
    labelId,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    id,
}) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const loggerService = useLoggerService();
    const methods = useForm();

    const taskStatusDropdownID = useId('taskStatusID', id);
    const dropdownLabelID = labelId || `${taskStatusDropdownID}-label`;

    const onClickDropdown = useCallback(
        e => {
            e.stopPropagation();
            loggerService.logInteractionOrAction({ uniqueName: 'Click on task status' });
        },
        [loggerService]
    );

    const onRenderTitle = (options?: IDropdownOption[]): ReactElement => {
        const option = options![0];
        return <OverflowText styles={statusStylesMapper[option.key]} text={translate(option.text)} />;
    };

    const onRenderOption = (option?: IDropdownOption): ReactElement => {
        return <OverflowText styles={optionStyles} text={translate(option!.text)} />;
    };

    const onChange = useCallback(
        option => {
            if (option.key === status) return;
            updateTaskStatus(option.key, option.data.taskState);
        },
        [status, updateTaskStatus]
    );

    const options: IDropdownOption[] = useMemo(
        () => [
            {
                key: TaskStatusConst.Pending,
                text: translate(STATUS_TRANSLATION[TaskStatusConst.Pending]),
                data: { taskState: STATUS_TO_STATE[TaskStatusConst.Pending] },
            },
            {
                key: TaskStatusConst.Done,
                text: translate(STATUS_TRANSLATION[TaskStatusConst.Done]),
                data: { taskState: STATUS_TO_STATE[TaskStatusConst.Done] },
            },
        ],
        [translate]
    );

    const canceledOption: IDropdownOption[] = [
        {
            key: TaskStatusConst.Canceled,
            text: translate(STATUS_TRANSLATION[TaskStatusConst.Canceled]),
            data: { taskState: STATUS_TO_STATE[TaskStatusConst.Canceled] },
        },
    ];

    const defaultAriaLabel = !label && !ariaLabel && !ariaLabelledBy ? translate('TASK_STATUS') : undefined;
    let ariaLabelledByValue = label ? dropdownLabelID : ariaLabelledBy;

    if (label && ariaLabelledBy) {
        ariaLabelledByValue = `${dropdownLabelID} ${ariaLabelledBy}`;
    }

    if (label && ariaLabel) {
        ariaLabelledByValue = ariaLabelledBy;
    }

    const isTaskStatusCanceled = status === TaskStatusConst.Canceled;

    return (
        <FormProvider {...methods}>
            <FormDropdown
                onClick={onClickDropdown}
                name="task-status-dropdown"
                onRenderTitle={onRenderTitle}
                onRenderOption={onRenderOption}
                options={isTaskStatusCanceled ? canceledOption : options}
                styles={dropdownStyles({ status, disabled: isDisabled || isTaskStatusCanceled, styles })}
                defaultValue={status}
                onChange={onChange}
                disabled={isDisabled || isTaskStatusCanceled}
                id={taskStatusDropdownID}
                label={label}
                labelId={dropdownLabelID}
                ariaLabel={ariaLabel || defaultAriaLabel}
                aria-labelledby={ariaLabelledByValue}
                aria-describedby={ariaDescribedBy}
            />
        </FormProvider>
    );
};

export default TaskStatus;
