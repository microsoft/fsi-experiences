import React, { FC, useMemo } from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Dialog } from '@fluentui/react/lib/Dialog';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { DialogFooter } from '@fluentui/react/lib/Dialog';
import { Label } from '@fluentui/react/lib/components/Label/Label';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { editEventModalStyle, labelStyles } from './EditEventDialog.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { LifeEvent } from '../../interfaces';
import { ILifeEventConfigurations } from '../../interfaces/Configuration';
import { LifeEventCategory } from '../../interfaces/Category';
import useEventForm from '../../hooks/useEventForm';
import SelectEvent from './SelectEvent/SelectEvent';
import RelativeDatePicker from '../RelativeDatePicker';
import { additionalInfoTextLimit } from '../../constants/EditEventDialog.consts';

export interface EditEventDialogProps {
    onDialogDismiss: () => void;
    visible: boolean;
    initialValue?: Partial<LifeEvent>;
    onSave: (lifeEvent: LifeEvent) => Promise<string>;
    configuration: ILifeEventConfigurations;
    categoriesCollection: LifeEventCategory[];
}

const modalProps = {
    isBlocking: true,
    styles: editEventModalStyle,
};

const root = { childrenGap: 24 };
const sectionTokens = { childrenGap: 8 };

const EditEventDialog: FC<EditEventDialogProps> = (props: EditEventDialogProps) => {
    const { initialValue, onDialogDismiss, onSave, visible, categoriesCollection, configuration } = props;

    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const {
        relativeDateRadioOptions,
        relativeDateOptions,
        state,
        isNew,
        hideCategory,
        hideType,
        categoryOptions,
        typeOptions,
        onCategoryOptionsChanged,
        onTypeOptionsChanged,
        onChangeTitleFieldValue,
        onRelativeDateChange,
        onRelativeRadioChange,
        onRelativeAmountChange,
        handleSave,
        onSelectedDate,
        saveButtonDisabled,
        isOtherCategory,
        minDate,
        maxDate,
    } = useEventForm({ initialValue, visible, translate, configuration, categoriesCollection, onSave });

    const { selectedCategoryCode, selectedType, selectedDate, additionalInfo, relativeDateAmount, relativeDateSelected, relativeDateSelectedRadio } =
        state;

    const dialogContentProps = useMemo(
        () => ({
            type: DialogType.normal,
            title: selectedCategoryCode !== 0 ? configuration.categoriesMap[selectedCategoryCode]?.name : translate('CREATE_EVENT'),
        }),
        [translate]
    );

    const submitBtnText = !isNew && initialValue?.id ? translate('EDIT_LIFE_EVENT_BUTTON_LABEL') : translate('CREATE');
    const description = isOtherCategory ? 'DESCRIBE_EVENT' : 'ADD_OPTIONAL_DETAILS';
    const addInformationId = useId('additional-information');

    return (
        <Dialog
            data-testid="life-events-edit-dialog"
            hidden={!visible}
            onDismiss={onDialogDismiss}
            dialogContentProps={dialogContentProps}
            modalProps={modalProps}
        >
            <Stack tokens={root}>
                <SelectEvent
                    categoryOptions={categoryOptions}
                    hideCategory={hideCategory}
                    onCategoryOptionsChanged={onCategoryOptionsChanged}
                    onTypeOptionsChanged={onTypeOptionsChanged}
                    selectedCategoryCode={selectedCategoryCode}
                    selectedType={selectedType}
                    typeOptions={typeOptions}
                    hideType={hideType}
                />
                <Stack tokens={sectionTokens}>
                    <Label id={addInformationId} styles={labelStyles}>
                        {translate(description)}
                    </Label>
                    <TextField
                        aria-labelledby={addInformationId}
                        value={additionalInfo}
                        required={isOtherCategory}
                        onChange={onChangeTitleFieldValue}
                        placeholder={translate('EVENT_NOTES')}
                        title={translate('EVENT_NOTES')}
                        errorMessage={
                            additionalInfo.length > additionalInfoTextLimit
                                ? translate('ADDITIONAL_INFO_LIMIT_ERROR', { limit: additionalInfoTextLimit })
                                : undefined
                        }
                    />
                </Stack>
                <RelativeDatePicker
                    onSelectedDate={onSelectedDate}
                    onRelativeAmountChange={onRelativeAmountChange}
                    onRelativeDateChange={onRelativeDateChange}
                    onRelativeRadioChange={onRelativeRadioChange}
                    relativeDateOptions={relativeDateOptions}
                    relativeDateRadioOptions={relativeDateRadioOptions}
                    relativeDateSelectedRadio={relativeDateSelectedRadio}
                    relativeDateAmount={relativeDateAmount}
                    relativeDateSelected={relativeDateSelected}
                    selectedDate={selectedDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    financialGoalFutureOnly={false}
                />
                <DialogFooter>
                    <PrimaryButton data-testid="add-event-dialog" onClick={handleSave} disabled={saveButtonDisabled} text={submitBtnText} />
                    <DefaultButton onClick={onDialogDismiss} text={translate('LIFE_EVENT_CANCEL_BUTTON_LABEL')} />
                </DialogFooter>
            </Stack>
        </Dialog>
    );
};

export default EditEventDialog;
