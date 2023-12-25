import { useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { OverflowText } from "@fsi/core-components/dist/components";
import ScreenReaderText from "@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText";
import { useTranslation } from "@fsi/core-components/dist/context/hooks/useTranslation";
import useBrowserCommunication from "@fsi/core-components/hooks/useBrowserCommunication";
import React, { FC } from 'react';
import { ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL } from "../../../constants/namespaces.const";
import { ICONS_CLASS_SUFFIX } from "../TasksProgressOverviewList/TasksProgressOverviewList.const";
import { ITasksProgressOverviewListItemProps } from "../TasksProgressOverviewList/TasksProgressOverviewList.interface";
import { textOverflowStyles, wrapperSeeAllTasks } from './TaskProgressOverviewListItem.style';

export const TasksProgressOverviewListItem: FC<ITasksProgressOverviewListItemProps> = ({ title, text, srText, iconName, iconStatus, styles }) => {
    const translate = useTranslation(ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL);

    const { postMessage: postRedirectTabMessage } = useBrowserCommunication('open-tab-channel');
    const srLabelTextID = useId('SR-TaskProgressOverviewList');

    const onClick = () => {
        postRedirectTabMessage({
            tabName: 'tab_tasks',
            fieldName: 'msfsi_selectedtasksgroupplaceholder',
            fieldValue: title,
        });
    };

    return (
        <Stack as="li" role="listitem" className={styles.listItem as string}>
            <Stack className={styles.contentContainer as string}>
                <Stack as="h3" className={styles.listItemTitle as string}>
                    <OverflowText text={title} overflowModeSelf />
                </Stack>
                {srText}
                <span className={styles.listItemText as string} aria-hidden="true">
                    <OverflowText text={text} overflowModeSelf />
                </span>
                <FontIcon
                    iconName={iconName}
                    className={`progress-bar-icon ${styles.listItemIcon as string}`}
                    data-status={iconStatus}
                    aria-hidden="true"
                />
                <DefaultButton className={`see-all-tasks-button ${styles.listItemIcon as string}`} styles={wrapperSeeAllTasks} onClick={onClick}>
                    <OverflowText text={translate('SEE_ALL_TASKS')} styles={textOverflowStyles} overflowModeSelf />
                    <ScreenReaderText id={srLabelTextID}>{`${title}`}</ScreenReaderText>
                    <FontIcon iconName={ICONS_CLASS_SUFFIX.NEXT} data-status={iconStatus} aria-hidden="true" />
                </DefaultButton>
            </Stack>
        </Stack>
    );
};