import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';

export interface ILoanInformation {
    id: string;
    name: string;
    category: string;
    loanType: string;
    principalAmount: number;
    currencyId: string;
    loanTerm: number;
    applicationDate: Date;
    interestRate: number;
    state: number;
    statusCode: number;
}

export type LoanInformationMetadata = {
    [P in keyof ILoanInformation]?: EntityMetadata;
};
