import React, { FC, useContext, useMemo } from 'react';
import { useBoolean } from '@fluentui/react-hooks/lib/useBoolean';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { IconButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';
import { LifeEventContext } from '../../../LifeEvent.context';
import { dialogModalStyle } from '@fsi/core-components/dist/components/atoms/DialogEvent/DialogEvent.style';
import {
    dateStyle as dateStyles,
    detailsStyle as detailsStyles,
    optionsIcon,
    disabledIconButton,
    externalTagStyle,
    titleStyle,
    goalTogetherWithEventStyle,
} from './LEventElementInSidePanel.style';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useIndicators } from '../../../hooks/useIndicators';
import { LifeEvent } from '../../../interfaces';
import FocusIndicator from '../../LifeEventIndicators/FocusIndicator';
import { DateTime } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import BirthdateLabel from '../BirthdateLabel';
import DialogEvent from '@fsi/core-components/dist/components/atoms/DialogEvent/DialogEvent';
import FGoalElementInSidePanel from '../../../goals/components/FGoalElementInSidePanel';
import { FinancialGoalContext } from '../../../goals/FinancialGoal.context';
import useEventMenuModelProps from '../../../hooks/useEventMenuModeProps';
import { goalSameDateAsEvent } from '../../../utilities';

export interface ILEventElementInSidePanelProps {
    lifeEvent: LifeEvent;
    index: number;
    readonly?: boolean;
    hideModifyButtons?: boolean;
}

const LEventElementInSidePanel: FC<ILEventElementInSidePanelProps> = ({ lifeEvent, index, readonly, hideModifyButtons }) => {
    const { id, categoryCode, title, date, isExternal, financialGoal } = lifeEvent;
    const { configuration, deleteLifeEventCallback, setOpenSidePanelCategory } = useContext(LifeEventContext);
    const { deleteFinancialGoalCallback } = useContext(FinancialGoalContext);
    const [hideConfirmDeleteDialog, { toggle: toggleHideConfirmDeleteDialog }] = useBoolean(true);

    const { enableFinancialGoals, editProps, removeProps, addGoalsProps, typeDisplayName } = useEventMenuModelProps({
        lifeEvent,
        readonly,
        toggleHideConfirmDeleteDialog,
    });

    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const dialogContentProps = {
        type: DialogType.normal,
        title: financialGoal ? translate('REMOVE_EVENT_AND_GOAL_TITLE') : translate('REMOVE_EVENT_TITLE'),
        closeButtonAriaLabel: translate('LIFE_EVENT_DIALOG_CLOSE'),
        subText: financialGoal ? translate('REMOVE_EVENT_AND_GOAL_MESSAGE') : translate('REMOVE_EVENT_TEXT'),
    };

    const lifeEventDialogUniqueId: string = useId(id);

    const dialogTitleId: string = useId(dialogContentProps.title);

    const modalProps = React.useMemo(
        () => ({
            titleAriaId: lifeEventDialogUniqueId,
            isBlocking: false,
            styles: dialogModalStyle,
        }),
        [lifeEventDialogUniqueId, dialogTitleId]
    );

    const deleteDialogConfirmed = async () => {
        toggleHideConfirmDeleteDialog();
        setOpenSidePanelCategory(0);
        if (enableFinancialGoals && financialGoal?.id) {
            await deleteFinancialGoalCallback(financialGoal.id, categoryCode);
        }
        return deleteLifeEventCallback(lifeEvent.id, categoryCode);
    };

    const { isFocused } = useIndicators(lifeEvent, configuration);

    const menuProps = useMemo(
        () => ({
            items: enableFinancialGoals && !financialGoal?.id ? [editProps, addGoalsProps, removeProps] : [editProps, removeProps],
        }),
        [lifeEventDialogUniqueId, dialogTitleId]
    );

    return (
        <Stack.Item order={index} data-testid="life-events-side-panel-element">
            <Stack.Item grow={1}>
                <Stack horizontal>
                    <Stack.Item grow={1} styles={{ root: { width: '230px' } }}>
                        <Stack tokens={{ childrenGap: 8 }}>
                            <Stack horizontal horizontalAlign="space-between">
                                <Stack>
                                    <Stack tokens={{ childrenGap: 6 }} verticalAlign="center" horizontal>
                                        <Label style={titleStyle}>{typeDisplayName}</Label>
                                    </Stack>
                                    <DateTime styles={dateStyles} date={date} />
                                    <Label styles={detailsStyles}>{title}</Label>
                                    {isExternal && <Label style={externalTagStyle}>{translate('EXTERNAL_SOURCE')}</Label>}
                                </Stack>
                                {!hideModifyButtons && (
                                    <Stack horizontal verticalAlign="start">
                                        <IconButton
                                            iconProps={optionsIcon}
                                            styles={disabledIconButton}
                                            disabled={isExternal || readonly}
                                            menuProps={menuProps}
                                            onRenderMenuIcon={() => <div />}
                                            data-testid={`life-events-action-button-${typeDisplayName}-${!!financialGoal}`}
                                            ariaLabel={translate('EVENT_OPTIONS', { type: typeDisplayName })}
                                        />
                                    </Stack>
                                )}
                            </Stack>
                            {isFocused && (
                                <Stack tokens={{ childrenGap: 4 }} horizontal>
                                    <Stack styles={{ root: { paddingTop: 5 } }}>
                                        <FocusIndicator hide={false} />
                                    </Stack>
                                    <BirthdateLabel date={date} />
                                </Stack>
                            )}
                            {goalSameDateAsEvent(lifeEvent) && (
                                <Stack styles={goalTogetherWithEventStyle}>
                                    <FGoalElementInSidePanel
                                        lifeEvent={lifeEvent}
                                        index={index}
                                        readonly={readonly}
                                        hideModifyButtons={hideModifyButtons}
                                    />
                                </Stack>
                            )}
                        </Stack>
                    </Stack.Item>
                </Stack>
            </Stack.Item>

            <DialogEvent
                visible={!hideConfirmDeleteDialog}
                dialogContentProps={dialogContentProps}
                actionOnClick={deleteDialogConfirmed}
                modalProps={modalProps}
                onDialogDismiss={toggleHideConfirmDeleteDialog}
                actionButtonName={translate('LIFE_EVENT_DELETE_BUTTON_LABEL')}
                cancelActionButtonName={translate('CANCEL')}
            />
        </Stack.Item>
    );
};

export default LEventElementInSidePanel;
