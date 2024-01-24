import { ICustomerSnapshotLayout } from '../CustomerSnapshot';

export const MockSnapshotLayout: ICustomerSnapshotLayout = {
    sections: [
        {
            fields: [
                {
                    name: 'emailaddress1',
                    label: 'Email',
                },
                {
                    name: 'mobilephone',
                    label: 'Mobile Phone',
                },
                {
                    name: 'address1_composite',
                    label: 'Address 1',
                },
            ],
        },
        {
            fields: [
                {
                    name: 'company',
                    label: 'Company Phone',
                },
                {
                    name: 'msfsi_branch',
                    label: 'Branch',
                },
                {
                    name: 'jobtitle',
                    label: 'Job Title',
                },
                {
                    name: 'annualincome',
                    label: 'Annual Income',
                },
                {
                    name: 'msfsi_ismanagedbybanksystem',
                    label: 'Is managed by bank system',
                },
                {
                    name: 'msfsi_joindate',
                    label: 'Join date',
                },
                {
                    name: 'haschildrencode',
                    label: 'Has Children',
                },
                {
                    name: 'numberofchildren',
                    label: 'No. of Children',
                },
                {
                    name: 'msfsi_tenureyears',
                    label: 'Tenure',
                },
                {
                    name: 'ownerid',
                    label: 'Owner',
                },
            ],
        },
    ],
    headerSection: {
        titleField: {
            name: 'fullname',
            label: 'Full Name',
        },
        subtitleFields: [
            {
                name: 'birthdate',
                label: 'Birthday',
            },
            {
                name: 'address1_composite',
                label: 'Address 1',
            },
            {
                name: 'familystatuscode',
                label: 'Marital Status',
            },
        ],
    },
    cardTitle: 'Customer snapshot',
};
