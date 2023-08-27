import { ILoanParty } from '../../ILoanParty/ILoanParty';
import { ILoanApplicantData, ILoanPrimaryApplicant, LoanPrimaryApplicantMetadata } from '../ILoanPrimaryApplicant';

export const contactMock: ILoanApplicantData = {
    fullName: 'Spongebob Squarepants',
    birthdate: new Date(1995, 11, 26),
    familyStatus: 'Single',
    doNotEmail: false,
    doNotPhone: false,
    phoneNumber: '+972124578996',
    emailAddress: 'spongebob@walla.com',
};

export const additionalPartiesMock: ILoanParty[] = [
    {
        id: '2',
        name: 'Patrik Star',
        role: 'Stupid',
    },
    {
        id: '3',
        name: 'Squidward Tentacles',
        role: 'Arrogant',
    },
];

export const loanPrimaryApplicantMock: ILoanPrimaryApplicant = {
    id: '1',
    contact: contactMock,
    kycStatus: 'Approved',
    additionalParties: additionalPartiesMock,
};

export const loanPrimaryApplicantMockMetadata: LoanPrimaryApplicantMetadata = {
    kycStatus: { displayName: 'Know your customer' },
    phoneNumber: { displayName: 'Phone' },
    emailAddress: { displayName: 'Email' },
};
