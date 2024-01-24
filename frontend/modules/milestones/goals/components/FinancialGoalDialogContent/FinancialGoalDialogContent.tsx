import React, { FC } from 'react';
import { Dialog, DialogFooter, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ILifeEventConfigurations } from '../../../interfaces/Configuration';
import useEventForm from '../../../hooks/useEventForm';
import { Checkbox, Separator, Stack } from '@fluentui/react';
import RelativeDatePicker from '../../../components/RelativeDatePicker/RelativeDatePicker';
import { editEventModalStyle, separatorStyles } from './FinancialGoalDialogContent.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import FinancialGoalTargetValues from '../FinancialGoalNameAndTarget';
import { currentDate } from '../../../constants/EditEventDialog.consts';
import min from 'date-fns/min';
import { LifeEvent } from '../../../interfaces';
import { LifeEventCategory } from '../../../interfaces/Category';

export interface FinancialGoalDialogContentProps {
    configuration: ILifeEventConfigurations;
    categoriesCollection: LifeEventCategory[];
    visible: boolean;
    initialValue?: Partial<LifeEvent>;
    onDialogDismiss: () => void;
    onSave: (lifeEvent: LifeEvent) => void;
    dialogFinancialGoalProps: IDialogContentProps;
    categoryName: string;
    isEditDialog: boolean;
}

const modalProps = {
    isBlocking: true,
    styles: editEventModalStyle,
};

const root = { childrenGap: 24 };

const FinancialGoalDialogContent: FC<FinancialGoalDialogContentProps> = ({
    configuration,
    categoriesCollection,
    visible,
    initialValue,
    onDialogDismiss,
    onSave,
    dialogFinancialGoalProps,
    categoryName,
    isEditDialog,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const {
        relativeDateRadioOptions,
        relativeDateOptions,
        state,
        onRelativeDateChange,
        onRelativeRadioChange,
        onRelativeAmountChange,
        handleSave,
        onSelectedDateFinancialGoal,
        saveButtonDisabledFinancialGoal,
        maxDate,
        onChangeFinancialGoalName,
        onChangeFinancialGoalTargetAmount,
        onChangeFinancialGoalComplete,
    } = useEventForm({ initialValue, visible, translate, configuration, categoriesCollection, onSave, isFinancialGoalUpdate: true });

    const { relativeDateAmount, relativeDateSelected, relativeDateSelectedRadio, stateFinancialGoals } = state;

    const titleFinancialGoalDialogNew = translate('ADD_FINANCIAL_GOAL_TO_CATEGORY', { category: categoryName });
    const titleFinancialGoalDialogEdit = translate('EDIT_FINANCIAL_GOAL', { goal: initialValue?.financialGoal?.targetName || '' });

    const titleFinancialGoalDialog = isEditDialog ? titleFinancialGoalDialogEdit : titleFinancialGoalDialogNew;

    const dialogContentProps = {
        type: DialogType.normal,
        title: titleFinancialGoalDialog,
        closeButtonAriaLabel: dialogFinancialGoalProps.closeButtonAriaLabel,
    };

    const minDateOfGoal = stateFinancialGoals.financialGoalCompleted ? initialValue?.financialGoal?.targetDate! : currentDate;
    const minTargetDateToPick = initialValue?.date ? min([initialValue?.date, minDateOfGoal]) : currentDate;

    const checkBoxLabel = stateFinancialGoals.financialGoalCompleted ? translate('GOAL_COMPLETED') : translate('MARK_GOAL_AS_COMPLETE');

    return (
        <Dialog
            data-testid="financial-goal-edit-dialog"
            hidden={!visible}
            onDismiss={onDialogDismiss}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
        >
            <Stack>{dialogFinancialGoalProps.subText}</Stack>
            <Separator styles={separatorStyles} />
            <Stack tokens={root}>
                <FinancialGoalTargetValues
                    onChangeFinancialGoalName={onChangeFinancialGoalName}
                    onChangeFinancialGoalTargetAmount={onChangeFinancialGoalTargetAmount}
                    stateFinancialGoals={stateFinancialGoals}
                    disabled={stateFinancialGoals.financialGoalCompleted}
                />
                <RelativeDatePicker
                    onSelectedDate={onSelectedDateFinancialGoal}
                    onRelativeAmountChange={onRelativeAmountChange}
                    onRelativeDateChange={onRelativeDateChange}
                    onRelativeRadioChange={onRelativeRadioChange}
                    relativeDateOptions={relativeDateOptions}
                    relativeDateRadioOptions={relativeDateRadioOptions}
                    relativeDateSelectedRadio={relativeDateSelectedRadio}
                    relativeDateAmount={relativeDateAmount}
                    relativeDateSelected={relativeDateSelected}
                    selectedDate={stateFinancialGoals.financialGoalTargetDate}
                    minDate={minTargetDateToPick}
                    maxDate={maxDate}
                    financialGoalFutureOnly
                    disabled={stateFinancialGoals.financialGoalCompleted}
                />
                {isEditDialog && (
                    <Checkbox label={checkBoxLabel} onChange={onChangeFinancialGoalComplete} checked={stateFinancialGoals.financialGoalCompleted} />
                )}
                <DialogFooter>
                    <PrimaryButton
                        data-testid="add-financial-goal-dialog"
                        onClick={handleSave}
                        disabled={saveButtonDisabledFinancialGoal}
                        text={isEditDialog ? translate('SAVE') : translate('ADD')}
                        ariaLabel={translate('ADD')}
                    />
                    <DefaultButton onClick={onDialogDismiss} text={translate('LIFE_EVENT_CANCEL_BUTTON_LABEL')} />
                </DialogFooter>
            </Stack>
        </Dialog>
    );
};

export default FinancialGoalDialogContent;
