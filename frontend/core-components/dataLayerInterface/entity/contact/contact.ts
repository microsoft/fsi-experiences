export interface IContact {
    fullName: string;
    birthdate: Date;
    address: string;
    familyStatus: string;
    jobTitle: string;
    annualIncome: number;
    currencyId: string;
    doNotPostalMail: boolean;
    doNotEmail: boolean;
    doNotPhone: boolean;
    preferredContactMethod: number;
    branchCode: string;
    branchName: string;
    branchId?: string;
    branchAddress: string;
    phoneNumber: string;
    emailAddress: string;
}

export default IContact;
