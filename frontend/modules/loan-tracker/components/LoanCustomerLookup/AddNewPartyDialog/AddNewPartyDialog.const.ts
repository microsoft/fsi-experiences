import { UseFormProps } from 'react-hook-form/dist/types/form';
import { addNewPartyFormDialogContentStyles, addNewPartyFormDialogFooterStyles, addNewPartyFormDialogStyles } from './AddNewPartyDialog.style';

export const addNewPartyFormDialogModalProps = { styles: addNewPartyFormDialogStyles };

export const addNewPartyFormDialogContentProps = { styles: addNewPartyFormDialogContentStyles };

export const addNewPartyFormDialogFooterProps = { styles: addNewPartyFormDialogFooterStyles };

export const formDialogFormProps = { mode: 'onChange', reValidateMode: 'onBlur' } as UseFormProps;

export const fieldIDPrefix = 'addNewPartyDialogField_';
