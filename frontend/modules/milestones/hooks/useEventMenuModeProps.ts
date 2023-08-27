import { useContext, useMemo } from 'react';
import { LIFE_EVENTS_FLAGS } from '../constants/lifeEvents';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { IFinancialGoal } from '../goals/interfaces/FinancialGoal.interface';
import { LifeEvent } from '../interfaces/LifeEvent';
import { FinancialGoalContext } from '../goals/FinancialGoal.context';
import { LifeEventContext } from '../LifeEvent.context';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import {
    addGoalIcon,
    deleteIcon,
    disabledIconButton,
    editIcon,
    markCompleteGoalIcon,
    markNotCompleteGoalIcon,
} from '../components/LifeEventsSidePanel/LEventElementInSidePanel/LEventElementInSidePanel.style';
import { IContextualMenuItem } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';

interface IEventMenuModelProps {
    lifeEvent: LifeEvent;
    readonly?: boolean;
    toggleHideConfirmDeleteDialog: () => void;
}

interface IMenuModelProps {
    enableFinancialGoals: boolean;
    editProps: IContextualMenuItem;
    editGoalProps: IContextualMenuItem;
    completeGoalProps: IContextualMenuItem;
    removeProps: IContextualMenuItem;
    addGoalsProps: IContextualMenuItem;
    typeDisplayName: string;
}

const useEventMenuModelProps: (options: IEventMenuModelProps) => IMenuModelProps = ({ lifeEvent, readonly, toggleHideConfirmDeleteDialog }) => {
    const enableFinancialGoals = useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS);

    const { configuration, setEditDialogConfig, setOpenSidePanelCategory } = useContext(LifeEventContext);
    const { setFinancialGoalsDialog, editFinancialGoalCallback } = useContext(FinancialGoalContext);

    const { id, categoryCode, title, typeCode, date, isExternal, financialGoal } = lifeEvent;

    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const isCompleted = financialGoal?.isCompleted;
    const isCompletedGoalTranslate = isCompleted ? translate('CHANGE_GOAL_TO_INCOMPLETE') : translate('MARK_GOAL_AS_COMPLETE');

    const typeDisplayName = useMemo<string>(() => {
        const category = configuration?.categoriesMap?.[categoryCode];

        return category?.types.find(t => t.typeCode === lifeEvent.typeCode)?.typeName || '';
    }, [configuration, categoryCode, lifeEvent]);

    const openEditDialog = (isFinancialGoalEdit: boolean) => {
        isFinancialGoalEdit
            ? openFinancialGoalDialog(false)
            : setEditDialogConfig({
                  initialValue: {
                      id,
                      categoryCode,
                      typeCode,
                      title,
                      date,
                  },
                  enableEdit: true,
              });
        setOpenSidePanelCategory(0);
    };

    const openFinancialGoalDialog = (isNewGoal: boolean) => {
        setFinancialGoalsDialog({
            initialValue: {
                id,
                categoryCode,
                typeCode,
                title,
                date,
                financialGoal,
            },
            enableEdit: isNewGoal,
        });
        setOpenSidePanelCategory(0);
    };

    const updateGoalComplete = () => {
        const changeComplete = !isCompleted;
        const financialGoalComplete: IFinancialGoal = { ...financialGoal!, isCompleted: changeComplete };
        editFinancialGoalCallback(financialGoalComplete!);
        setOpenSidePanelCategory(0);
    };

    const addGoalsProps = {
        key: 'addGoal',
        text: translate('ADD_FINANCIAL_GOAL_TO_EVENT'),
        iconProps: addGoalIcon,
        onClick: () => openFinancialGoalDialog(true),
        styles: disabledIconButton,
        disabled: isExternal || readonly,
        ariaLabel: translate('ADD_FINANCIAL_GOAL_TO_EVENT'),
        title: translate('ADD_FINANCIAL_GOAL_TO_EVENT'),
    };

    const completeGoalProps = {
        key: 'completeGoal',
        text: isCompletedGoalTranslate,
        iconProps: isCompleted ? markNotCompleteGoalIcon : markCompleteGoalIcon,
        onClick: updateGoalComplete,
        styles: disabledIconButton,
        disabled: isExternal || readonly,
        ariaLabel: isCompletedGoalTranslate,
        title: isCompletedGoalTranslate,
    };

    const editProps = {
        key: 'editEvent',
        text: translate('EDIT'),
        iconProps: editIcon,
        onClick: () => {
            openEditDialog(false);
        },
        styles: disabledIconButton,
        disabled: isExternal || readonly,
        ariaLabel: translate('EDIT'),
        title: translate('EDIT'),
    };

    const editGoalProps = {
        key: 'editGoal',
        text: translate('EDIT'),
        iconProps: editIcon,
        onClick: () => {
            openEditDialog(true);
        },
        styles: disabledIconButton,
        disabled: isExternal || readonly,
        ariaLabel: translate('EDIT'),
        title: translate('EDIT'),
    };

    const removeProps = {
        key: 'remove',
        text: translate('REMOVE'),
        iconProps: deleteIcon,
        styles: disabledIconButton,
        disabled: isExternal || readonly,
        onClick: toggleHideConfirmDeleteDialog,
        ariaLabel: translate('REMOVE'),
        title: translate('REMOVE'),
    };

    return {
        enableFinancialGoals,
        editProps,
        editGoalProps,
        completeGoalProps,
        removeProps,
        addGoalsProps,
        typeDisplayName,
    };
};

export default useEventMenuModelProps;
