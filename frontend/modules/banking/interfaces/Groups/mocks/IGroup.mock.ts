import { IGroupFinancialHolding, IGroup } from '..';
import cloneDeep from 'lodash/cloneDeep';
import { fhRolesValues } from '../../../constants/FHValueMaps';
import { IGroupResponse } from '../IGroupResponse';
import { FHCredit, FinancialHoldingFields } from '../../../interfaces/FHEntity';
import { FinancialInstrumentFields } from '../../../interfaces/FHEntity/FinancialInstrumentFields';

const member1 = {
    id: 'gm1',
    role: 1,
    IsPrimaryGroup: true,
    customer: {
        id: '123',
        name: 'Roni Milner',
        address: '123 Spanish Moss Road Savannah, GA 86416 United States',
        income: 122345678,
    },
};

const member2 = {
    id: 'gm2',
    role: 1,
    IsPrimaryGroup: false,
    customer: {
        id: 'id1',
        name: 'Ronaldo',
        address: 'Tel Aviv',
        income: 2345,
    },
};

const fh1: FinancialHoldingFields = {
    id: 'fh1',
    category: 104800000,
    type: 104800002,
    statecode: 0,
    balance: 44541,
    balanceDefault: 44541,
    balanceDisplay: 44541,
    balanceDefaultDisplay: 44541,
    name: 'FH1',
    role: fhRolesValues.owner,
    financialInstruments: [],
};

fh1.fhCategoryEntity = {
    fhLastPaymentDueDate: new Date('2019-12-29T22:00:00.000Z'),
    fhNextStatementDate: new Date('2019-12-23T22:00:00.000Z'),
    fhLastStatementDate: new Date('2019-11-13T22:00:00.000Z'),
    fhMinPaymentDue: 33,
    fhNextInterestReviewDate: new Date('2020-12-23T22:00:00.000Z'),
    fhLastStatementBalance: 333,
    fhMonthlyPayment: 2,
    fhCreditLimit: 1000,
    fhOutstandingBalance: 100,
} as FHCredit;

const fh1i: FinancialInstrumentFields = {
    financialHoldingInstrumentType: 104800002,
    financialHoldingInstrumentName: 'instrument 33',
    fhiActivationDate: new Date('2020-01-23T22:00:00.000Z'),
    fhiCardNumber: '4456 6542 6224 3211',
    fhiCardType: 104800000,
    fhiEmbossingName: 'Monica Thomson',
    fhiExpiryDate: new Date('2024-01-23T22:00:00.000Z'),
    fhiIssueDate: new Date('2020-01-23T22:00:00.000Z'),
    fhiNumberOfCashWithdrawal: 4,
    fhiNumberOfTransactions: 5,
    fhiPurchasingLimit: 3000,
    fhiStatus: 104800002,
    fhiWithdrawalLimit: 500,
    fsiProductName: 'Freedon Flex',
    fsiCardNetwork: 'Visa',
};
fh1.financialInstruments.push(fh1i);

const ifh1: IGroupFinancialHolding = {
    ...fh1,
    groupHoldingId: 'gh1',
    owners: [
        {
            contact: {
                contactId: '123',
                fullName: 'Roni Milner',
            },
            role: fhRolesValues.owner,
        },
        {
            contact: {
                contactId: '345',
                fullName: 'Ben Gold',
            },
            role: fhRolesValues.owner,
        },
    ],
    indicator: [],
};

const fh2: FinancialHoldingFields = {
    financialInstruments: [],
    id: 'fh2',
    statecode: 0,
    category: 104800001,
    type: 104800009,
    balance: 2341,
    balanceDefault: 2341,
    balanceDisplay: 2341,
    balanceDefaultDisplay: 2341,
    name: 'FH2',
};

const ifh2: IGroupFinancialHolding = {
    ...fh2,
    groupHoldingId: 'gh2',
    owners: [
        {
            contact: {
                contactId: 'id1',
                fullName: 'Ronaldo',
            },
            role: fhRolesValues.owner,
        },
    ],
    indicator: [],
};

const fh3: FinancialHoldingFields = {
    financialInstruments: [],
    id: 'fh4',
    statecode: 0,
    category: 104800003,
    type: 104800009,
    balance: 1121,
    balanceDefault: 1121,
    balanceDisplay: 1121,
    balanceDefaultDisplay: 1121,
    name: 'FH4',
};

const ifh3: IGroupFinancialHolding = {
    ...fh3,
    groupHoldingId: 'gh4',
    owners: [
        {
            contact: {
                contactId: 'id1',
                fullName: 'Ronaldo',
            },
            role: fhRolesValues.owner,
        },
    ],
    indicator: [],
};

const fh4: FinancialHoldingFields = {
    financialInstruments: [],
    id: 'fh5',
    statecode: 0,
    category: 104800004,
    type: 104800009,
    balance: 231,
    balanceDefault: 231,
    balanceDisplay: 231,
    balanceDefaultDisplay: 231,
    name: 'FH5',
    fhCategoryEntity: undefined,
};

const ifh4: IGroupFinancialHolding = {
    ...fh4,
    groupHoldingId: 'gh5',
    owners: [
        {
            contact: {
                contactId: 'id1',
                fullName: 'Ronaldo',
            },
            role: fhRolesValues.owner,
        },
    ],
    indicator: [],
};

const group1: IGroup = {
    id: 'id1',
    primaryMember: 'gm1',
    name: 'My Family (Sample)',
    type: 104800000,
    members: [member1, member2],
    financialHoldings: [ifh1, ifh2, ifh3, ifh4],
    creationDate: new Date('2021-03-08T08:28:57.000Z'),
    version: 0,
};

const group2: IGroup = {
    id: 'id2',
    primaryMember: 'gm2',
    name: 'Second Family',
    type: 104800001,
    members: [member1, member2],
    financialHoldings: [ifh1, ifh2, ifh3, ifh4],
    creationDate: new Date('2021-03-08T09:28:57.000Z'),
    version: 0,
};

const requestMetadata = {
    msfsi_FH_Account: 200,
    msfsi_FH_Creditline: 200,
    msfsi_FH_Investment: 200,
    msfsi_FH_Loan: 200,
    msfsi_FH_Saving: 200,
};

const fullMock: IGroupResponse = { groupsArray: [group1, group2], metadata: requestMetadata };

export const getFullMock = () => cloneDeep(fullMock);
export default fullMock;
