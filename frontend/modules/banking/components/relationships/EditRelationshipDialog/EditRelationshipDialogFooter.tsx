import React, { FC } from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { DialogFooter } from '@fluentui/react/lib/Dialog';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { footerStyles } from './EditRelationshipDialogFooter.style';

export interface EditRelationshipDialogFooterProps {
    onSubmit: () => void;
    onCancel: () => void;
    isSubmitDisabled: boolean;
    isNew: boolean;
}

export const EditRelationshipDialogFooter: FC<EditRelationshipDialogFooterProps> = props => {
    const { onSubmit, onCancel, isSubmitDisabled, isNew } = props;
    const translate = useTranslation(namespaces.RELATIONSHIP);

    return (
        <Stack.Item data-testid={'relationship-dialog-footer'}>
            <DialogFooter styles={footerStyles}>
                <PrimaryButton
                    onClick={onSubmit}
                    disabled={isSubmitDisabled}
                    text={!isNew ? translate('SAVE') : translate('RELATIONSHIP_ADD_SUBMIT_TEXT')}
                />
                <DefaultButton onClick={onCancel} text={translate('CANCEL')} />
            </DialogFooter>
        </Stack.Item>
    );
};

export default EditRelationshipDialogFooter;
