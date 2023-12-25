import React, { ReactElement, FC, useMemo, useState, useEffect, useCallback } from 'react';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { Dialog } from '@fsi/core-components/dist/components/containers/Dialog/Dialog';
import { IDocumentCreationDialogProps, IRegardingDropdownOption, IDocumentDefinitionDropdownOption } from './DocumentCreationDialog.interface';
import { comboBoxStyles, descriptionStyle, dialogStyle } from './DocumentCreationDialog.style';
import { renderEmphasizedOption } from '@fsi/core-components/dist/utilities/DropdownUtils';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { descriptionFieldTextLimit, DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/components/TextField';
import { ComboBox } from '@fluentui/react/lib/components/ComboBox/ComboBox';
import { IComboBoxOption } from '@fluentui/react/lib/components/ComboBox/ComboBox.types';

/* istanbul ignore next */
const onRenderOption = (option?: IDropdownOption): ReactElement | null => {
    return renderEmphasizedOption(option);
};

/* istanbul ignore next */
const shouldFilterByName = (item: IDropdownOption, inputSelected: String): boolean => {
    return inputSelected && item.text.toLowerCase().indexOf(inputSelected.toLowerCase()) !== -1;
};

export const DocumentCreationDialog: FC<IDocumentCreationDialogProps> = props => {
    const {
        regardingEntities,
        documentDefinitions,
        regardingDisplayName,
        isOpen = false,
        onAdd,
        onCancel,
        onDismiss,
        isError,
        isLoading,
        showDescription,
        header,
    } = props;
    const translate = useTranslation(DI_NAMESPACE);
    const [selectedRegarding, setSelectedRegarding] = useState<IRegardingDropdownOption>();
    const [selectedDocDefinition, setSelectedDocDefinition] = useState<IDocumentDefinitionDropdownOption>();
    const [description, setDescription] = useState<string>();
    const [inputRegardingSearch, setInputRegardingSearch] = useState<string>();
    const [inputDocumentSearch, setInputDocumentSearch] = useState<string>();

    const handleDescription = event => {
        setDescription(event.target.value);
    };

    const onAddButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedRegarding && selectedDocDefinition) {
            onAdd({ regarding: selectedRegarding.data!, documentDefinition: selectedDocDefinition.data!, description });
        }
    };

    const filteredOptions = useCallback((listToFilter, inputSelected) => {
        return inputSelected
            ? listToFilter.filter((item: any) => {
                  return item && shouldFilterByName(item, inputSelected);
              })
            : listToFilter;
    }, []);

    const regardingEntitiesOptions = useMemo<IRegardingDropdownOption[]>(() => {
        const regardingOptions = regardingEntities.map(regarding => {
            const role = regarding.isPrimary ? translate('PRIMARY_APPLICANT') : regarding.role;
            return { key: regarding.id, text: role ? `${regarding.name} (${role})` : regarding.name, data: regarding };
        });
        return filteredOptions(regardingOptions, inputRegardingSearch);
    }, [regardingEntities, filteredOptions, inputRegardingSearch]);

    const documentTypesOptions = useMemo<IDocumentDefinitionDropdownOption[]>(() => {
        const documentOptions = documentDefinitions.map(documentType => {
            return { key: documentType.id, text: documentType.name, data: documentType };
        });
        return filteredOptions(documentOptions, inputDocumentSearch);
    }, [documentDefinitions, filteredOptions, inputDocumentSearch]);

    useEffect(() => {
        if (regardingEntitiesOptions?.length === 1) {
            setSelectedRegarding(regardingEntitiesOptions[0]);
        }
        if (documentTypesOptions?.length === 1) {
            setSelectedDocDefinition(documentTypesOptions[0]);
        }
    }, [regardingEntitiesOptions, documentTypesOptions]);

    const regardingTranslatedText = regardingDisplayName || translate('DOCUMENT_REGARDING_SELECTION');
    const documentTypeTranslatedText = translate('DOCUMENT_TYPE_SELECTION');
    const documentDescriptionTranslatedText = translate('BRIEF_DESCRIPTION');

    const errorMessageDescription =
        description && description.length === descriptionFieldTextLimit ? translate('MAX_LENGTH', { length: descriptionFieldTextLimit }) : undefined;

    const isEnabled = !!(selectedRegarding && selectedDocDefinition && !errorMessageDescription);

    /* istanbul ignore next */
    const onInput = (event, setInput) => {
        setInput(event.target.value);
    };

    /* istanbul ignore next */
    const onChangeRegarding = option => {
        setSelectedRegarding(option || regardingEntitiesOptions[0]);
        return setInputRegardingSearch('');
    };

    /* istanbul ignore next */
    const onChangeDocumentDefinition = option => {
        setSelectedDocDefinition(option || documentTypesOptions[0]);
        return setInputDocumentSearch('');
    };

    const autoComplete = (options: IComboBoxOption[]) => {
        return options.length === 1 ? 'on' : 'off';
    };

    return (
        <Dialog
            hidden={!isOpen}
            minWidth={493}
            maxWidth={400}
            title={header}
            acceptButtonText={translate('ADD')}
            acceptButtonProps={{
                disabled: !isEnabled,
            }}
            onAccept={onAddButtonClick}
            onCancel={onCancel}
            onDismiss={onDismiss}
            styles={dialogStyle}
        >
            <Widget isError={isError} isLoading={isLoading} errorIconSize={48}>
                <ComboBox
                    inputMode="search"
                    options={regardingEntitiesOptions}
                    useComboBoxAsMenuWidth
                    autoComplete={autoComplete(regardingEntitiesOptions)}
                    allowFreeform
                    required
                    ariaLabel={regardingTranslatedText}
                    placeholder={regardingTranslatedText}
                    onChange={(e, option) => {
                        onChangeRegarding(option);
                    }}
                    onInput={event => {
                        return onInput(event, setInputRegardingSearch);
                    }}
                    onRenderOption={onRenderOption}
                    data-testid="regardingEntitiesDropdown"
                    selectedKey={selectedRegarding?.key}
                    label={regardingTranslatedText}
                    styles={comboBoxStyles}
                ></ComboBox>
                <ComboBox
                    inputMode="search"
                    options={documentTypesOptions}
                    useComboBoxAsMenuWidth
                    autoComplete={autoComplete(documentTypesOptions)}
                    allowFreeform
                    required
                    ariaLabel={documentTypeTranslatedText}
                    placeholder={documentTypeTranslatedText}
                    onChange={(e, option) => {
                        onChangeDocumentDefinition(option);
                    }}
                    onInput={event => {
                        return onInput(event, setInputDocumentSearch);
                    }}
                    onRenderOption={onRenderOption}
                    data-testid="documentTypesDropdown"
                    selectedKey={selectedDocDefinition?.key}
                    label={translate('DOCUMENT_TYPE')}
                    styles={comboBoxStyles}
                ></ComboBox>
                {showDescription && (
                    <>
                        <Label data-testid="description-field-di" styles={descriptionStyle}>
                            {translate('DESCRIPTION')}
                        </Label>
                        <TextField
                            aria-labelledby={documentDescriptionTranslatedText}
                            placeholder={documentDescriptionTranslatedText}
                            styles={descriptionStyle}
                            onChange={handleDescription}
                            errorMessage={errorMessageDescription}
                            value={description}
                            maxLength={descriptionFieldTextLimit}
                        />
                    </>
                )}
            </Widget>
        </Dialog>
    );
};

export default DocumentCreationDialog;
