import { ACTIVE_STATUS_CODES, STATES } from '../../../constants/LoanStateMap.consts';
import { LoanInformationMetadata } from '../ILoanInformation';

export const mockLoanInformation = {
    id: '1',
    name: 'Loan 1',
    category: 'Mortgage',
    loanType: 'Secure',
    principalAmount: 12000,
    currencyId: '1',
    loanTerm: 24,
    applicationDate: new Date(2021, 11, 26),
    interestRate: 4,
    state: STATES.Active,
    statusCode: ACTIVE_STATUS_CODES['In Review'],
};

export const mockLoanInformationMetadata: LoanInformationMetadata = {
    principalAmount: { displayName: 'Principal amount' },
    loanTerm: { displayName: 'Loan term' },
    applicationDate: { displayName: 'Application date' },
    interestRate: { displayName: 'Interest rate' },
};
