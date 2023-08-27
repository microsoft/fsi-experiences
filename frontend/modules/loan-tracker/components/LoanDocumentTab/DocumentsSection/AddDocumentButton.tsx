import React, { FC, useRef } from 'react';
import { ActionButton, IButton } from '@fluentui/react/lib/Button';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { addButtonStyles } from '../AddDocumentDialog/AddDocumentDialog.style';

export const AddDocumentButton: FC<{ addDocument: (sectionRef: IButton | null) => void; addDocumentDisabled?: boolean }> = ({
    addDocumentDisabled,
    addDocument,
}) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);

    const buttonRef = useRef(null);

    return (
        <ActionButton
            componentRef={buttonRef}
            iconProps={{ iconName: 'Add' }}
            data-testid="add-button"
            onClick={() => addDocument(buttonRef.current)}
            disabled={addDocumentDisabled}
            styles={addButtonStyles}
        >
            {translate('LOAN_APP_ADD_NEW_DOCUMENT')}
        </ActionButton>
    );
};

export default AddDocumentButton;
