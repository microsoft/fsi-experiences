import React, { FC, useContext, useMemo } from 'react';
import { useBoolean } from '@fluentui/react-hooks/lib/useBoolean';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { IconButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { LifeEventContext } from '../../../LifeEvent.context';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useIndicators } from '../../../hooks/useIndicators';
import FocusIndicator from '../../../components/LifeEventIndicators/FocusIndicator';
import BirthdateLabel from '../../../components/LifeEventsSidePanel/BirthdateLabel/BirthdateLabel';
import DialogEvent from '@fsi/core-components/dist/components/atoms/DialogEvent/DialogEvent';
import { LifeEvent } from '../../../interfaces/LifeEvent';
import { FinancialGoalContext } from '../../FinancialGoal.context';
import { dialogModalStyle } from '@fsi/core-components/dist/components/atoms/DialogEvent/DialogEvent.style';
import { disabledIconButton, optionsIcon } from '../../../components/LifeEventsSidePanel/LEventElementInSidePanel/LEventElementInSidePanel.style';
import useEventMenuModelProps from '../../../hooks/useEventMenuModeProps';
import { relativeGoalDateString } from '../../../utilities/LifeEventsUtils';
import { width230Style } from './FGoalElementInSidePanel.style';
import FinancialGoalSidePanel from '../FinancialGoalSidePanel/FinancialGoalSidePanel';

export interface IFGoalElementInSidePanelProps {
    lifeEvent: LifeEvent;
    index: number;
    readonly?: boolean;
    hideModifyButtons?: boolean;
}

const FGoalElementInSidePanel: FC<IFGoalElementInSidePanelProps> = ({ lifeEvent, index, readonly, hideModifyButtons }) => {
    const { categoryCode, isExternal, financialGoal } = lifeEvent;
    const { id, targetDate, targetName, targetValue } = financialGoal!;

    const { configuration, setOpenSidePanelCategory } = useContext(LifeEventContext);
    const { deleteFinancialGoalCallback } = useContext(FinancialGoalContext);
    const [hideConfirmDeleteDialog, { toggle: toggleHideConfirmDeleteDialog }] = useBoolean(true);
    const { editGoalProps, completeGoalProps, removeProps, typeDisplayName } = useEventMenuModelProps({
        lifeEvent,
        readonly,
        toggleHideConfirmDeleteDialog,
    });

    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const { isNew, isFocused } = useIndicators(lifeEvent, configuration);

    const dialogContentProps = {
        type: DialogType.normal,
        title: translate('REMOVE_GOAL_TITLE'),
        closeButtonAriaLabel: translate('LIFE_EVENT_DIALOG_CLOSE'),
        subText: translate('REMOVE_GOAL_MESSAGE'),
    };

    const financialGoalDialogUniqueId: string = useId(lifeEvent.id);

    const modalProps = React.useMemo(
        () => ({
            titleAriaId: financialGoalDialogUniqueId,
            isBlocking: false,
            styles: dialogModalStyle,
        }),
        [financialGoalDialogUniqueId]
    );

    const menuProps = useMemo(
        () => ({
            items: [editGoalProps, completeGoalProps, removeProps],
        }),
        [editGoalProps, completeGoalProps, removeProps]
    );

    const deleteDialogConfirmed = () => {
        toggleHideConfirmDeleteDialog();
        setOpenSidePanelCategory(0);
        return deleteFinancialGoalCallback(id, categoryCode);
    };

    return (
        <Stack.Item order={index} data-testid="life-events-side-panel-financial-goal-element">
            <Stack.Item grow={1}>
                <Stack horizontal>
                    <Stack.Item grow={1} styles={width230Style}>
                        <Stack tokens={{ childrenGap: 0 }}>
                            <Stack horizontal horizontalAlign="space-between">
                                <FinancialGoalSidePanel
                                    lifeEvent={lifeEvent}
                                    relativeDateString={relativeGoalDateString(financialGoal!, translate)}
                                    isExternal={!!isExternal}
                                    type={typeDisplayName}
                                    isNew={isNew}
                                />
                                {!hideModifyButtons && (
                                    <Stack horizontal verticalAlign="start">
                                        <IconButton
                                            iconProps={optionsIcon}
                                            styles={disabledIconButton}
                                            disabled={isExternal || readonly}
                                            menuProps={menuProps}
                                            onRenderMenuIcon={() => <div />}
                                            data-testid={`financial-goals-action-button-${targetName}-${targetValue}`}
                                            ariaLabel={translate('GOAL_OPTIONS')}
                                        />
                                    </Stack>
                                )}
                            </Stack>
                            {isFocused && (
                                <Stack tokens={{ childrenGap: 4 }} horizontal>
                                    <Stack styles={{ root: { paddingTop: 5 } }}>
                                        <FocusIndicator hide={false} />
                                    </Stack>
                                    <BirthdateLabel date={targetDate} />
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

export default FGoalElementInSidePanel;
