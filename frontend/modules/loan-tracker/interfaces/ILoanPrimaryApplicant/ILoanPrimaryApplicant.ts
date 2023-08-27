import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { ILoanParty } from '../ILoanParty/ILoanParty';

export interface ILoanApplicantData {
    fullName: string;
    birthdate: Date;
    familyStatus: string;
    doNotEmail: boolean;
    doNotPhone: boolean;
    phoneNumber: string;
    emailAddress: string;
}

export interface ILoanPrimaryApplicant {
    id: string;
    contact: ILoanApplicantData;
    kycStatus: string;
    additionalParties: ILoanParty[];
}

interface ILoanPrimaryApplicantExtended extends ILoanPrimaryApplicant, ILoanApplicantData {}

export type LoanPrimaryApplicantMetadata = {
    [P in keyof ILoanPrimaryApplicantExtended]?: EntityMetadata;
};
