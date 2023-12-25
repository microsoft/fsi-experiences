import React, { FC } from 'react';
import { useId } from '@fluentui/react-hooks';
import { OverflowText } from '@fsi/core-components/dist/components';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { Icon } from '@fluentui/react';
import { Link } from '@fluentui/react/lib/components/Link/Link';
import { overflowTextStyles, taskWithActionWrapperStyles, iconTaskWithNavigationClass, taskWithActionStyles } from './TaskWithAction.style';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ONBOARDING_APPLICATION_TASKS } from '../../../../constants/namespaces.const';
import { ITaskDefinitionBasicFields, useTaskDefinitionDetails } from '../../../../hooks/useTaskDefinitionDetails';
import { IRelatedParty, ITask } from '../../../../interfaces/ITask';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';

interface ITaskWithAction {
    item: ITask;
}

const TaskWithAction: FC<ITaskWithAction> = ({ item: { taskDefinition, relatedParty } }) => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const translate = useTranslation(ONBOARDING_APPLICATION_TASKS);
    const srTaskWithActionDescriptionID = useId('srTaskWithActionDescription');

    const getTaskDefinitionDetails = useTaskDefinitionDetails(ONBOARDING_APPLICATION_TASKS);
    const { parentheticalAssociatedName } = getTaskDefinitionDetails({
        taskDefinition: taskDefinition as any as ITaskDefinitionBasicFields,
        applicant: relatedParty as IRelatedParty,
    });

    const taskName = taskDefinition.name;
    const onClick = taskDefinition.taskNavigation?.action;

    const linkStyles = onClick && taskWithActionStyles(themePrimary);

    const onLinkClick = e => {
        e.preventDefault();
        onClick!();
    };

    return (
        <div style={taskWithActionWrapperStyles}>
            {linkStyles ? (
                <>
                    <Link
                        href="#"
                        onClick={onLinkClick}
                        styles={linkStyles}
                        aria-label={translate('TASK_NAME_ARIA_LABEL', { taskName, associatedName: parentheticalAssociatedName })}
                        aria-describedby={srTaskWithActionDescriptionID}
                        data-is-focusable="false"
                    >
                        <OverflowText text={taskName} styles={overflowTextStyles} overflowModeSelf>
                            <span data-is-focusable="true">{taskName}</span>
                        </OverflowText>
                        <Icon className={iconTaskWithNavigationClass} iconName={'MiniExpand'} aria-hidden="true" />
                    </Link>
                    <ScreenReaderText id={srTaskWithActionDescriptionID}>{translate('TASK_NAME_ARIA_DESCRIPTION')}</ScreenReaderText>
                </>
            ) : (
                <OverflowText text={taskName} styles={overflowTextStyles} overflowModeSelf />
            )}
        </div>
    );
};

export default TaskWithAction;
