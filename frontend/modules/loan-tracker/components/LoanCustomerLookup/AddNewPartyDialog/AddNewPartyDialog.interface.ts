import { IFormDialogProps } from '@fsi/core-components/dist/components/containers/FormDialog/FormDialog.interface';
import { ILoanApplicationCustomer } from '../../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';

export interface IAddNewPartyDialogProps extends Omit<IFormDialogProps, 'onSubmit' | 'errorProps' | 'loadingProps'> {
    roles: Array<{ key: string | number; text: string }>;
    isOpen?: boolean;
    onSubmitMutationFunc: (newAppicantData: ILoanApplicationCustomer) => Promise<void>;
}
