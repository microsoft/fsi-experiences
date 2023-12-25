import { FieldType, ICustomerSnapshotMetadata } from '../CustomerSnapshot';

export const MockSnapshotMetadata: ICustomerSnapshotMetadata = {
    fullname: {
        displayName: 'Full Name',
        type: FieldType.Text,
    },
    familystatuscode: {
        displayName: 'Marital Status',
        type: FieldType.Text,
    },
    birthdate: {
        displayName: 'Birthday',
        type: FieldType.DateTime,
    },
    emailaddress1: {
        displayName: 'Email',
        type: FieldType.Email,
    },
    mobilephone: {
        displayName: 'Mobile Phone',
        type: FieldType.Phone,
    },
    address1_composite: {
        displayName: 'Address 1',
        type: FieldType.Address,
    },
    company: {
        displayName: 'Company Phone',
        type: FieldType.Phone,
    },
    msfsi_branch: {
        displayName: 'Branch',
        target: 'msfsi_branch',
        type: FieldType.Lookup,
    },
    jobtitle: {
        displayName: 'Job Title',
        type: FieldType.Text,
    },
    annualincome: {
        displayName: 'Annual Income',
        type: FieldType.Currency,
    },
    msfsi_ismanagedbybanksystem: {
        displayName: 'Is managed by bank system',
        type: FieldType.Boolean,
    },
    msfsi_joindate: {
        displayName: 'Join date',
        type: FieldType.DateTime,
    },
    haschildrencode: {
        displayName: 'Has Children',
        type: FieldType.Text,
    },
    numberofchildren: {
        displayName: 'No. of Children',
        type: FieldType.Number,
    },
    msfsi_tenureyears: {
        displayName: 'Tenure',
        type: FieldType.Number,
    },
    ownerid: {
        displayName: 'Owner',
        target: 'systemuser',
        type: FieldType.Text,
    },
};
