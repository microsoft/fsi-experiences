import { VERIFICATION_STATUSES } from './LoanStateMap.consts';
import { ILoanApplicationCustomer } from '../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';

export const emptyApplicantData: ILoanApplicationCustomer = {
    id: '',
    role: '',
    fullName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    isPrimary: false,
    verificationStatus: VERIFICATION_STATUSES.Unverified,
};

export const ADD_PARTY_DIALOG_ID = 'addPartyDialog';
export const REMOVE_PARTY_DIALOG_ID = 'removePartyDialog';
