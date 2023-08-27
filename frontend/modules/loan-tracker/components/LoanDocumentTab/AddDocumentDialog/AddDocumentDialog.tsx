import { Dropdown } from '@fsi/core-components/dist/components/atoms/Dropdown';
import React, { ReactElement, FC, useEffect, useMemo, useState } from 'react';
import { Dialog } from '@fsi/core-components/dist/components/containers/Dialog';
import { IAddDocumentDialogProps, ICustomDropdownOption } from './AddDocumentDialog.interface';
import { addButtonStyles, dropdownTopStyles } from './AddDocumentDialog.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { findByID, renderEmphasizedOption } from '../../../helpers/loanDocumentHelper/loanDocumentHelper';
import { APPLICANT_FIELD_NAME, DOCUMENT_TYPE_FIELD_NAME } from './AddDocumentDialog.const';
import sortBy from 'lodash/sortBy';

/* istanbul ignore next */
function onRenderOption(option?: IDropdownOption): ReactElement | null {
    return renderEmphasizedOption(option);
}

/* istanbul ignore next */
function onRenderTitle(options?: IDropdownOption[]): ReactElement | null {
    return renderEmphasizedOption(options?.[0]);
}

export const AddDocumentDialog: FC<IAddDocumentDialogProps> = props => {
    const { applicants, customDocuments, isOpen = false, title, addButtonText, onAdd, onCancel, onDismiss } = props;
    const [applicantID, setApplicantID] = useState('');
    const [documentTypeID, setDocumentTypeID] = useState('');

    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);

    const primaryApplicant = useMemo(() => {
        return applicants.find(applicant => {
            return applicant.isPrimary;
        });
    }, [applicants]);

    useEffect(() => {
        setDocumentTypeID('');
        setApplicantID(primaryApplicant?.id || '');
    }, [primaryApplicant, isOpen]);

    function onAddButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        const applicant = findByID(applicants, applicantID)!;
        const customDocument = findByID(customDocuments, documentTypeID)!;
        onAdd(applicant, customDocument);
    }

    function onDropdownChange(item: IDropdownOption, e: React.FormEvent<HTMLDivElement>) {
        const itemName = (item as ICustomDropdownOption).name;
        const id = item!.key?.toString();

        if (itemName === APPLICANT_FIELD_NAME) {
            setApplicantID(id);
        } else {
            setDocumentTypeID(id);
        }
    }

    const applicantsOptions = useMemo(() => {
        const sortedApplicants = sortBy(applicants, applicant => !applicant.isPrimary);
        return sortedApplicants.map(applicant => {
            const role = applicant.isPrimary ? translate('PRIMARY_APPLICANT') : applicant.role;
            return { key: applicant.id, text: `${role} - ${applicant.name}`, name: APPLICANT_FIELD_NAME };
        });
    }, [applicants]);

    const documentTypesOptions = useMemo(() => {
        return customDocuments.map(documentType => {
            return { key: documentType.id, text: documentType.name, name: DOCUMENT_TYPE_FIELD_NAME };
        });
    }, [customDocuments]);

    const applicantTranslatedText = translate('APPLICANT');
    const documentTypeTranslatedText = translate('ADD_DOCUMENT_DIALOG_DOCUMENT_TYPE_LABEL');
    const isEnabled = !!(applicantID && documentTypeID);
    const defaultSelectedApplicantsKey = primaryApplicant?.id;

    return (
        <Dialog
            {...props}
            hidden={!isOpen}
            minWidth={319}
            maxWidth={410}
            title={title || translate('ADD_DOCUMENT_DIALOG_ADD_NEW_DOCUMENT_TITLE')}
            acceptButtonText={addButtonText || translate('ADD')}
            acceptButtonProps={{
                disabled: !isEnabled,
                styles: addButtonStyles,
            }}
            onAccept={onAddButtonClick}
            onCancel={onCancel}
            onDismiss={onDismiss}
        >
            <Dropdown
                options={applicantsOptions}
                required
                ariaLabel={applicantTranslatedText}
                placeholder={applicantTranslatedText}
                styles={dropdownTopStyles}
                defaultSelectedKey={defaultSelectedApplicantsKey}
                onChange={onDropdownChange}
                onRenderOption={onRenderOption}
                onRenderTitle={onRenderTitle}
                data-testid="applicantsDropdown"
                selectedKey={applicantID}
            />
            <Dropdown
                options={documentTypesOptions}
                required
                ariaLabel={documentTypeTranslatedText}
                placeholder={documentTypeTranslatedText}
                onChange={onDropdownChange}
                data-testid="documentTypesDropdown"
                selectedKey={documentTypeID}
            />
        </Dialog>
    );
};

export default AddDocumentDialog;
