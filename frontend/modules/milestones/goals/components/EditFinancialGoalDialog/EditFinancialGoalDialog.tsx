import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { LifeEvent, LifeEventCategory } from '../../../interfaces';
import useEventForm from '../../../hooks/useEventForm';
import DialogEvent from '@fsi/core-components/dist/components/atoms/DialogEvent/DialogEvent';
import FinancialGoalDialogContent from '../FinancialGoalDialogContent/FinancialGoalDialogContent';
import { defaultDatePattern } from '@fsi/core-components/dist/components';
import { useDateFormattingInfo } from '@fsi/core-components/dist/context/hooks/useDateFormattingInfo';
import { isDateValid } from '@fsi/core-components/dist/utilities/TimeUtils';
import format from 'date-fns/format';
import { ILifeEventConfigurations } from '../../../interfaces/Configuration';

export interface EditFinancialGoalDialogProps {
    configuration: ILifeEventConfigurations;
    categoriesCollection: LifeEventCategory[];
    visible: boolean;
    initialValue?: Partial<LifeEvent>;
    onDialogDismiss: () => void;
    onSave: (lifeEvent: LifeEvent) => void;
    editPopUp: boolean;
    setPopUp: (config?: boolean) => void;
    isNewGoal?: boolean;
}

const modalProps = {
    isBlocking: true,
};

const EditFinancialGoalDialog: FC<EditFinancialGoalDialogProps> = ({
    configuration,
    categoriesCollection,
    visible,
    initialValue,
    onDialogDismiss,
    onSave,
    editPopUp,
    setPopUp,
    isNewGoal,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const { isNew, state, typeOptions } = useEventForm({
        initialValue,
        visible,
        translate,
        configuration,
        categoriesCollection,
        onSave,
        isFinancialGoalUpdate: true,
    });
    const { selectedCategoryCode, selectedType } = state;

    const typeName = useMemo(() => typeOptions.find(t => t.key === selectedType)?.text || '', [selectedType, typeOptions]);

    const categoryName = configuration.categoriesMap[selectedCategoryCode]?.name.toLowerCase() || '';

    const dateFormatting = useDateFormattingInfo();
    const datePattern = dateFormatting?.shortDatePattern || defaultDatePattern;
    const formatDate = useCallback(
        (date?: Date) => {
            return date && isDateValid(date) ? format(date, datePattern) : '';
        },
        [datePattern]
    );

    const dialogFinancialGoalProps = {
        type: DialogType.normal,
        title: translate('FINANCIAL_CATEGORY_CREATED', { category: categoryName }),
        closeButtonAriaLabel: translate('LIFE_EVENT_DIALOG_CLOSE'),
        subText: translate('INFORMATION_FINANCIAL_GOAL', { type: typeName, date: formatDate(initialValue?.date) }),
    };

    const isNewDialog = !!isNewGoal || !!(!isNew && initialValue?.modified_on);

    useEffect(() => {
        setPopUp(!isNewDialog);
    }, [isNewDialog, setPopUp]);

    return (
        <>
            <DialogEvent
                visible={visible && isNewDialog}
                dialogContentProps={dialogFinancialGoalProps}
                actionOnClick={setPopUp}
                onDialogDismiss={onDialogDismiss}
                modalProps={modalProps}
                actionButtonName={translate('ADD_FINANCIAL_GOAL')}
                cancelActionButtonName={translate('DONE')}
            />
            <FinancialGoalDialogContent
                configuration={configuration}
                initialValue={initialValue}
                categoriesCollection={categoriesCollection}
                visible={isNewGoal || editPopUp}
                onDialogDismiss={onDialogDismiss}
                onSave={onSave}
                dialogFinancialGoalProps={dialogFinancialGoalProps}
                categoryName={categoryName}
                data-testid="financial-goal-dialog"
                isEditDialog={!isNewDialog}
            />
        </>
    );
};

export default EditFinancialGoalDialog;
