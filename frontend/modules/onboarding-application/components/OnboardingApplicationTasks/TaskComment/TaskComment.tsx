import React, { FC, useEffect, useState } from 'react';
import { useId } from '@fluentui/react-hooks';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import useFormatDate, { getDateFormatOption } from '@fsi/core-components/dist/context/hooks/useFormatDate';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import { ONBOARDING_APPLICATION_TASKS } from '../../../constants/namespaces.const';
import { IRelatedParty, ITask } from '../../../interfaces/ITask';
import { TaskCommentCallout } from '../TaskCommentCallout';
import { textFieldReadModeStyles, wrapperCommentStyles } from './TaskComment.style';
import { EDITABLE_TEXT_FIELD_TEST_ID } from './TaskComment.const';
import { ITaskDefinitionBasicFields, useTaskDefinitionDetails } from '../../../hooks/useTaskDefinitionDetails';

export interface ITaskCommentProps {
    task: ITask;
    readOnly?: boolean;
}

const dateFormat = getDateFormatOption(DateTimePredefinedFormat.DefaultDate);
const hoursFormat = getDateFormatOption(DateTimePredefinedFormat.HoursMinutes);

const TaskComment: FC<ITaskCommentProps> = ({ task, readOnly }) => {
    const { id, comment, commentModifiedOn, commentModifiedBy, updateComment, taskDefinition, relatedParty } = task;
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);

    const getTaskDefinitionDetails = useTaskDefinitionDetails(ONBOARDING_APPLICATION_TASKS);
    const { parentheticalAssociatedName } = getTaskDefinitionDetails({
        taskDefinition: taskDefinition as any as ITaskDefinitionBasicFields,
        applicant: relatedParty as IRelatedParty,
    });

    const taskCommentWrapperID = useId(`editable-comment-${id}`);
    const srEditInfoTextID = useId('srEditInfoText');
    const formatDate = useFormatDate(dateFormat);
    const [calloutVisible, setCalloutVisible] = useState(false);
    const [newComment, setNewComment] = useState(comment);

    useEffect(() => {
        if (comment !== newComment) {
            setNewComment(comment);
        }
    }, [comment]);

    const enableCallout = calloutVisible && comment;

    const modifiedOnDate = commentModifiedOn && new Date(commentModifiedOn);

    const modifiedAt = formatDate(modifiedOnDate, hoursFormat);
    const modifiedOn = formatDate(modifiedOnDate);

    const modifiedByScreenReaderInfoText =
        commentModifiedBy && modifiedAt && modifiedOn
            ? translate('TASK_COMMENT_MODIFIED_BY_SR_TEXT', { modifiedBy: commentModifiedBy, modifiedAt: modifiedAt, modifiedOn: modifiedOn })
            : '';

    return (
        <Stack
            id={taskCommentWrapperID}
            styles={wrapperCommentStyles}
            data-testid="comment-per-task"
            onMouseOver={() => setCalloutVisible(true)}
            onMouseLeave={() => setCalloutVisible(false)}
        >
            <TextField
                className="editable-text-field"
                data-testid={EDITABLE_TEXT_FIELD_TEST_ID}
                placeholder={translate('ENTER_COMMENT')}
                aria-describedby={srEditInfoTextID}
                ariaLabel={translate('TASK_COMMENT_ARIA_LABEL', {
                    taskDefinition: taskDefinition.name,
                    associatedName: parentheticalAssociatedName,
                })}
                id={id}
                value={newComment}
                onChange={(e, newValue) => setNewComment(newValue)}
                onFocus={() => {
                    setCalloutVisible(true);
                }}
                onBlur={e => {
                    setCalloutVisible(false);
                    if (comment !== newComment) {
                        updateComment(newComment!);
                    }
                }}
                type="text"
                readOnly={readOnly}
                styles={textFieldReadModeStyles}
            />
            <ScreenReaderText id={srEditInfoTextID}>{modifiedByScreenReaderInfoText}</ScreenReaderText>
            {enableCallout && (
                <TaskCommentCallout
                    content={comment!}
                    target={`#${taskCommentWrapperID}`}
                    modifiedOn={commentModifiedOn}
                    modifiedBy={commentModifiedBy}
                />
            )}
        </Stack>
    );
};

export default TaskComment;
