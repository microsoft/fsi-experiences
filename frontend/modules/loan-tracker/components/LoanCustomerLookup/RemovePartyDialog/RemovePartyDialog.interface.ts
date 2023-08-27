import { IFormDialogProps } from '@fsi/core-components/dist/components/containers/FormDialog/FormDialog.interface';
import { ILoanApplicationCustomer } from '../../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';

export interface IRemovePartyDialogProps extends Omit<IFormDialogProps, 'onSubmit' | 'errorProps' | 'loadingProps'> {
    isOpen?: boolean;
    onSubmitMutationFunc: (applicantId: string) => Promise<void>;
    applicantToRemove: ILoanApplicationCustomer;
}
