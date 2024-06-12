import React, { FC, useContext, useEffect, useMemo, useCallback, useState } from 'react';
import { Dialog } from '@fluentui/react/lib/Dialog';
import { DialogType } from '@fluentui/react/lib/Dialog';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { IComboBoxOption, IComboBoxProps } from '@fluentui/react/lib/ComboBox';
import { IBasePickerProps, IBasePickerSuggestionsProps } from '@fluentui/react/lib/components/pickers/BasePicker.types';
import { BasePicker } from '@fluentui/react/lib/components/pickers/BasePicker';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import renderSuggestionsItems from './renderers/renderSuggestionsItem';
import { RelationshipsContext } from '../context/RelationshipsContext';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';
import EditRelationshipDialogFooter from './EditRelationshipDialogFooter';
import { EditRelationshipDialogProps } from './EditRelationshipDialog.interface';
import { IPickerItemProps } from '@fluentui/react/lib/components/pickers/PickerItem.types';
import { ITagItemProps } from '@fluentui/react/lib/components/pickers/TagPicker/TagPicker.types';
import { TagItem } from '@fluentui/react/lib/components/pickers/TagPicker/TagItem';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { editEventModalStyle, headerStyles } from './EditRelationshipDialog.styles';
import { Label } from '@fluentui/react/lib/components/Label/Label';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { ICalloutProps } from '@fluentui/react/lib/components/Callout/Callout.types';

interface IMemberPickerProps extends IBasePickerProps<IAbbreviatedContact> {}
class MemberPicker extends BasePicker<IAbbreviatedContact, IMemberPickerProps> {}

const modalProps = {
    isBlocking: true,
    styles: editEventModalStyle,
};

const toTagItemProps = (itemProps: IPickerItemProps<IAbbreviatedContact>): ITagItemProps => ({
    index: itemProps.index,
    item: {
        key: itemProps.item.contactId,
        name: itemProps.item.fullName,
    },
});

const getTextFromItem = (persona: IAbbreviatedContact): string => persona.fullName;

export const EditRelationshipDialog: FC<EditRelationshipDialogProps> = props => {
    //This key is to force remount because fluent behaviour see: https://dev.azure.com/dynamicscrm/Solutions/_workitems/edit/2576077/
    const [uniqueKey, setKey] = useState(0);
    const { initialValue, visible, onDialogDismiss, saveRelationship, clickedRelationship, setClickedRelationship } = props;
    const relationshipsContext = useContext(RelationshipsContext);
    const translate = useTranslation(namespaces.RELATIONSHIP);

    const pickerId = useId('contact-picker');

    useEffect(() => {
        if (visible && initialValue?.id) {
            refreshDialogValues(initialValue.id);
        }
    }, [visible]);

    const refreshDialogValues = async (id: string) => {
        const relationship = await relationshipsContext.fetchRelationshipById(id);
        setClickedRelationship({ ...clickedRelationship, relationshipType: relationship?.relationshipType, contactTo: relationship?.contactTo });
    };

    const isNew = !initialValue?.id;

    const relationshipTypeOptions: IComboBoxOption[] = useMemo(
        () =>
            Array.from(relationshipsContext.relationshipTypes.entries()).map(entry => {
                return {
                    key: entry[0],
                    text: entry[1],
                };
            }),
        [relationshipsContext.relationshipTypes]
    );

    const dialogContentProps = {
        type: DialogType.normal,
        title: translate('RELATIONSHIP_ADD_SUBMIT_TEXT'),
    };

    const onRoleOptionsChanged: IComboBoxProps['onChange'] = useCallback(
        (event, option) => {
            const selectedType = option?.key as number;
            setClickedRelationship({ ...clickedRelationship, relationshipType: selectedType });

            return selectedType;
        },
        [clickedRelationship, setClickedRelationship]
    );

    const handleSave = useCallback(() => {
        onDialogDismiss();
        saveRelationship(clickedRelationship);
    }, [onDialogDismiss, saveRelationship, clickedRelationship]);

    const saveButtonDisabled = useMemo(() => {
        const relationshipType = clickedRelationship?.relationshipType;
        const contactTo = clickedRelationship?.contactTo;
        if (!relationshipType || !contactTo) {
            return true;
        }

        return false;
    }, [clickedRelationship]);

    const onFilterChanged = useCallback(
        (filterText: string): Promise<IAbbreviatedContact[]> => relationshipsContext.getContacts(filterText),
        [relationshipsContext.getContacts]
    );

    const suggestionProps: IBasePickerSuggestionsProps = {
        suggestionsHeaderText: translate('SUGGESTED_PEOPLE'),
        noResultsFoundText: translate('NO_RESULT_FOUND'),
    };

    const onContactAdd = useCallback((item: IAbbreviatedContact | undefined) => {
        setClickedRelationship(prevState => ({ ...prevState, contactTo: item }));

        return null;
    }, []);

    const onRemoveItem = useCallback(() => {
        setClickedRelationship(prevState => ({ ...prevState, contactTo: undefined }));
    }, []);

    const onRenderItemMember = (itemProps: IPickerItemProps<IAbbreviatedContact>) => (
        <TagItem {...toTagItemProps(itemProps)} removeButtonAriaLabel={translate('REMOVE')} onRemoveItem={onRemoveItem}>
            {itemProps.item.fullName}
        </TagItem>
    );

    const selectedItems = useMemo(() => (clickedRelationship?.contactTo ? [clickedRelationship.contactTo] : []), [clickedRelationship]);

    const pickerInputProps = {
        placeholder: translate('RELATIONSHIPS_SEARCH_PLACEHOLDER'),
        'aria-required': true,
        id: pickerId,
        'data-testid': 'member-picker-input',
    };

    /*istanbul ignore next */
    const pickerCalloutProps: ICalloutProps = {
        styles: headerStyles,
        onDismiss: () => {
            setKey(prevKey => prevKey + 1);
        },
    };

    return (
        <Dialog hidden={!visible} onDismiss={onDialogDismiss} dialogContentProps={dialogContentProps} modalProps={modalProps}>
            <Stack tokens={{ childrenGap: '20px' }} data-testid="relationship-dialog">
                <Stack.Item>
                    <Label required htmlFor={pickerId}>
                        {translate('CONTACT_NAME')}
                    </Label>
                    <MemberPicker
                        onResolveSuggestions={onFilterChanged}
                        getTextFromItem={getTextFromItem}
                        pickerCalloutProps={pickerCalloutProps}
                        pickerSuggestionsProps={suggestionProps}
                        onRenderSuggestionsItem={renderSuggestionsItems}
                        onItemSelected={onContactAdd}
                        onRenderItem={onRenderItemMember}
                        className={'ms-PeoplePicker'}
                        key={uniqueKey}
                        inputProps={pickerInputProps}
                        resolveDelay={300}
                        itemLimit={1}
                        selectedItems={selectedItems}
                    />
                </Stack.Item>
                <Stack.Item>
                    <ComboBox
                        required
                        label={translate('RELATIONSHIP_ROLE_PLACEHOLDER')}
                        placeholder={translate('SELECT_OPTION')}
                        autoComplete="on"
                        selectedKey={clickedRelationship?.relationshipType}
                        options={relationshipTypeOptions}
                        onChange={onRoleOptionsChanged}
                    />
                </Stack.Item>
                <EditRelationshipDialogFooter onSubmit={handleSave} onCancel={onDialogDismiss} isSubmitDisabled={saveButtonDisabled} isNew={isNew} />
            </Stack>
        </Dialog>
    );
};

export default EditRelationshipDialog;
