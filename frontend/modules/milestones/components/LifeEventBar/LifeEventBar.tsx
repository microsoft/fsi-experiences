import React, { FC, useCallback, useContext, useRef } from 'react';
import { LifeEventContext } from '../../LifeEvent.context';
import { lifeEventBarContentStyles, rootLifeEventBar } from './LifeEventBar.style';
import { LifeEvent } from '../../interfaces/LifeEvent';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';
import Header from './Header';
import Content from './Content';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { IFinancialGoal } from '../../goals/interfaces/FinancialGoal.interface';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { LIFE_EVENTS_FLAGS } from '../../constants/lifeEvents';
import { FinancialGoalContext } from '../../goals/FinancialGoal.context';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';

export const LifeEventBar: FC = () => {
    const addEventRef = useRef<HTMLButtonElement>(null);
    const {
        categoriesCollection,
        configuration,
        setEditDialogConfig,
        editDialogConfig,
        setOpenSidePanelCategory,
        addLifeEventCallback,
        editLifeEventCallback,
        loading,
        hideModifyButtons,
        readonly,
    } = useContext(LifeEventContext);

    const { setFinancialGoalsDialog, editFinancialGoalsDialog, addFinancialGoalCallback, editFinancialGoalCallback, setPopUp, editPopUp } =
        useContext(FinancialGoalContext);
    const loggerService = useLoggerService();
    const enableFinancialGoals = useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS);

    const handleAddEventButtonClicked = useCallback(() => {
        loggerService.logInteractionOrAction({
            uniqueName: 'Add button clicked',
        });
        setEditDialogConfig({
            initialValue: {},
        });
    }, [setEditDialogConfig, loggerService]);

    const handleCategoryClicked = useCallback(
        (code: number) => {
            loggerService.logInteractionOrAction({ uniqueName: 'Category clicked' });
            setOpenSidePanelCategory(code);
        },
        [setOpenSidePanelCategory, loggerService]
    );

    const handleCloseEditDialog = useCallback(() => {
        loggerService.logInteractionOrAction({
            uniqueName: 'Close dialog clicked',
        });
        setEditDialogConfig(undefined);
        addEventRef.current?.focus();
    }, [setEditDialogConfig, loggerService]);

    const handleAddFinancialGoalButtonClicked = useCallback(
        lifeEvent => {
            setFinancialGoalsDialog({
                initialValue: { ...lifeEvent },
            });
        },
        [setFinancialGoalsDialog]
    );

    const handleCloseFinancialGoalsDialog = useCallback(() => {
        setFinancialGoalsDialog(undefined);
    }, [setFinancialGoalsDialog]);

    const onSave = async lifeEvent => {
        const generatedId = await onDialogSave(lifeEvent);
        if (enableFinancialGoals) {
            const newLifeEvent = { ...lifeEvent, id: generatedId };
            handleAddFinancialGoalButtonClicked(newLifeEvent);
        }
        if (editDialogConfig?.enableEdit || editFinancialGoalsDialog) {
            handleCloseFinancialGoalsDialog();
        }
        addEventRef.current?.focus();
        return generatedId;
    };

    const onFinancialGoalDialogSetComplete = useCallback(
        async (lifeEvent: LifeEvent) => {
            const changeComplete = !lifeEvent.financialGoal?.isCompleted;
            const financialGoalsData: IFinancialGoal = { ...lifeEvent.financialGoal!, isCompleted: changeComplete };
            const editedLifeEvent: LifeEvent = {
                ...lifeEvent,
                financialGoal: financialGoalsData,
            };
            editLifeEventCallback(editedLifeEvent);
        },
        [editLifeEventCallback]
    );

    const onFinancialGoalDialogSave = useCallback(
        async (lifeEvent: LifeEvent) => {
            if (!lifeEvent.financialGoal?.id) {
                const newFinancialGoalId = await addFinancialGoalCallback(lifeEvent);
                const financialGoalsData: IFinancialGoal = { ...lifeEvent.financialGoal!, id: newFinancialGoalId, lifeEventId: lifeEvent.id };
                const editedLifeEvent: LifeEvent = {
                    ...lifeEvent,
                    financialGoal: financialGoalsData,
                };
                onFinancialGoalDialogSetComplete(lifeEvent);
                editLifeEventCallback(editedLifeEvent);
                handleCloseEditDialog();
                return lifeEvent.id;
            }
            onFinancialGoalDialogSetComplete(lifeEvent);
            editFinancialGoalCallback(lifeEvent.financialGoal);
            handleCloseEditDialog();

            return lifeEvent.id;
        },
        [addFinancialGoalCallback, editFinancialGoalCallback, editLifeEventCallback, handleCloseEditDialog, onFinancialGoalDialogSetComplete]
    );
    const onDialogSave = useCallback(
        async (lifeEvent: LifeEvent) => {
            if (enableFinancialGoals && lifeEvent.financialGoal) {
                return onFinancialGoalDialogSave(lifeEvent);
            }
            if (!lifeEvent.id) {
                const lifeEventId = await addLifeEventCallback(lifeEvent);
                handleCloseEditDialog();
                return lifeEventId;
            }
            editLifeEventCallback(lifeEvent);
            handleCloseEditDialog();

            return lifeEvent.id;
        },
        [addLifeEventCallback, editLifeEventCallback, enableFinancialGoals, handleCloseEditDialog, onFinancialGoalDialogSave]
    );

    const allowAdd = (!!categoriesCollection?.length || loading !== LoadingState.Error) && !readonly;
    const styles = mergeStyleSets(lifeEventBarContentStyles);
    const categoriesCollectionLength = categoriesCollection?.length;

    return (
        <div style={rootLifeEventBar}>
            <Header
                addButtonEnabled={allowAdd}
                hideModifyButtons={hideModifyButtons}
                handleAddEventButtonClicked={handleAddEventButtonClicked}
                addEventRef={addEventRef}
            />
            <FocusZone role="list" className={`${styles.root} ${categoriesCollectionLength === 0 && 'empty'}`}>
                <Content
                    categoriesCollection={categoriesCollection}
                    configuration={configuration}
                    editDialogConfig={editDialogConfig}
                    handleCategoryClicked={handleCategoryClicked}
                    handleCloseEditDialog={handleCloseEditDialog}
                    loading={loading}
                    onSave={onSave}
                    hideModifyButtons={hideModifyButtons}
                    readonly={readonly}
                    handleCloseFinancialGoalsDialog={handleCloseFinancialGoalsDialog}
                    editFinancialGoalsDialog={editFinancialGoalsDialog}
                    editPopUp={!!editPopUp}
                    setPopUp={setPopUp}
                />
            </FocusZone>
        </div>
    );
};
