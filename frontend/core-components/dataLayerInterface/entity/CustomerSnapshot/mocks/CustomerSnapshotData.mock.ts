import { PreferredContactMethod } from '../../../../enums/PreferredContactMethod';
import { ICustomerSnapshotData } from '../CustomerSnapshot';

export const MockSnapshotData: ICustomerSnapshotData = {
    fields: {
        fullname: {
            fieldName: 'fullname',
            value: 'Abigail Lewis (Sample)',
        },
        familystatuscode: {
            fieldName: 'familystatuscode',
            formattedValue: 'Divorced',
            value: 3,
        },
        birthdate: {
            fieldName: 'birthdate',
            formattedValue: '1/11/1970',
            value: '1970-01-11',
        },
        emailaddress1: {
            fieldName: 'emailaddress1',
            value: 'Abigail@example.com',
        },
        mobilephone: {
            fieldName: 'mobilephone',
            value: '(912) 555-0430',
        },
        address1_composite: {
            fieldName: 'address1_composite',
            value: '678 Cove Drive\r\nSavannah, GA 28180\r\nUnited States',
        },
        company: {
            fieldName: 'company',
        },
        msfsi_branch: {
            fieldName: 'msfsi_branch',
            formattedValue: 'Woodgrove Savannah branch',
            value: '3c21950b-6ed9-4334-857b-4cc663c8c953',
        },
        jobtitle: {
            fieldName: 'jobtitle',
            value: 'Computer Service Technician',
        },
        annualincome: {
            fieldName: 'annualincome',
            formattedValue: '$203,720.00',
            value: 203720,
        },
        msfsi_ismanagedbybanksystem: {
            fieldName: 'msfsi_ismanagedbybanksystem',
            formattedValue: 'Yes',
            value: true,
        },
        msfsi_joindate: {
            fieldName: 'msfsi_joindate',
            formattedValue: '11/4/2005 1:00 AM',
            value: '2005-11-03T23:00:00Z',
        },
        haschildrencode: {
            fieldName: 'haschildrencode',
            formattedValue: 'Default Value',
            value: 1,
        },
        numberofchildren: {
            fieldName: 'numberofchildren',
            formattedValue: '0',
            value: 0,
        },
        msfsi_tenureyears: {
            fieldName: 'msfsi_tenureyears',
            formattedValue: '16.25',
            value: 16.25,
        },
        ownerid: {
            fieldName: 'ownerid',
            formattedValue: 'Shlomi Yosef',
            value: '6f719d47-d63e-ec11-8c60-0022482494b2',
        },
    },
    currencyId: 'USD',
    preferredContactMethod: PreferredContactMethod.Phone,
};
