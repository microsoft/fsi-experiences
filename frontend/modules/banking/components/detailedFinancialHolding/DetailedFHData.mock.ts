import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { FinancialInstrumentFields, FinancialHoldingFields, FHData, FHInvestment } from '../../interfaces/FHEntity';
import { FHEntityFactory } from '../../interfaces/FHEntity/mocks/FHEntityFactory.mock';
import { toIndictableFinancialHoldings } from '../../hooks/financialHoldings/useFHIndicator';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';

export const getDetailedFHMock = (): IndictableFH[] => {
    const list: Map<string, FinancialHoldingFields> = getFHEntitiesMap();

    return toIndictableFinancialHoldings({ data: list }, FHMetadataMock);
};

export const getFHFetcherMock = (): FHData => {
    return { data: getFHEntitiesMap() };
};

const getFHEntitiesMap = () => {
    const accountInstrumentList: FinancialInstrumentFields[] = [];
    const creditLineInstrumentList: FinancialInstrumentFields[] = [];

    const rtVal: FinancialInstrumentFields = {
        financialHoldingInstrumentType: 104800002,
        financialHoldingInstrumentName: 'card2',
        fhiActivationDate: new Date('2020-01-23T22:00:00Z'),
        fhiCardNumber: '4456 6542 6224 3211',
        fhiCardType: 104800000,
        fhiEmbossingName: 'Monica Thomson',
        fhiExpiryDate: new Date('2024-01-23T22:00:00Z'),
        fhiIssueDate: new Date('2020-01-23T22:00:00Z'),
        fhiNumberOfCashWithdrawal: 4,
        fhiNumberOfTransactions: 5,
        fhiPurchasingLimit: 3000,
        fhiStatus: 104800000,
        fhiWithdrawalLimit: 500,
        fsiProductName: 'Freedon Flex',
        fsiCardNetwork: 'Visa',
    };

    creditLineInstrumentList.push(rtVal);
    accountInstrumentList.push(rtVal);

    accountInstrumentList.push({
        financialHoldingInstrumentType: 104800000,
        financialHoldingInstrumentName: 'direct debit',
        fhiCreditorName: 'Ben Gold',
        fhiCreditorIdentifier: '33554646',
        fhiMandateId: '123456789',
        fhiDebtorAccount: '998-998',
        fhiMandateLimit: 360,
        fhiMandateStartDate: new Date('2020-01-23T22:00:00Z'),
        fhiMandateEndDate: new Date('2022-01-23T22:00:00Z'),
        fhiNextItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiNextItemCount: 85,
        fhiLastItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiLastItemAmount: 79,
        fhiLastItemStatus: 104800000,
    });

    accountInstrumentList.push({
        financialHoldingInstrumentType: 104800001,
        financialHoldingInstrumentName: 'standing order',
        fhiDebtorAccount: 'A345B66',
        fhiFirstPaymentDate: new Date('2020-01-23T22:00:00Z'),
        fhiFrequency: 104800001,
        fsiDayOfMonth: 4,
        fsiDayOfWeek: 4,
        fhiTotalAmount: 3000,
        fhiNextItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiNextItemCount: 85,
        fhiLastItemDate: new Date('2022-01-23T22:00:00Z'),
        fhiLastItemAmount: 79,
    });

    accountInstrumentList.push({
        financialHoldingInstrumentType: 104800003,
        financialHoldingInstrumentName: 'overdraft',
        fhiOverdraftLimit: 2000,
        fhiOverdraftLimitUsed: 500,
        fhiOverdraftRate: 10,
        fhiCreditorIdentifier: '33554646',
        fhiMandateId: '123456789',
    });

    const fhList: Map<string, FinancialHoldingFields> = new Map<string, FinancialHoldingFields>();
    const fhVal: FinancialHoldingFields = {
        id: 'c257fe4c-0949-eb11-a813-000d3a3b7031',
        category: 104800000,
        type: 104800013,
        balance: 0,
        statecode: 0,
        balanceDefault: 0,
        balanceDisplay: 0,
        balanceDefaultDisplay: 0,
        name: 'rock st3r',
        role: 104800000,
        financialInstruments: creditLineInstrumentList,
    };
    fhVal.fhCategoryEntity = FHEntityFactory(fhVal);
    fhList.set(fhVal.id, fhVal);

    const fhVal1: FinancialHoldingFields = {
        id: 'c357fe4c-0949-eb11-a813-000d3a3b7041',
        category: 104800004,
        type: 104800009,
        statecode: 0,
        balance: 4444,
        balanceDefault: 1111,
        balanceDisplay: 4444,
        balanceDefaultDisplay: 1111,
        currencyId: 'EUR',
        name: '4ever',
        role: 104800004,
        fhCode: 'account-1234',
        financialInstruments: accountInstrumentList,
    };
    fhVal1.fhCategoryEntity = FHEntityFactory(fhVal1);
    fhList.set(fhVal1.id, fhVal1);

    const fhVal2: FinancialHoldingFields = {
        id: 'c457fe4c-0949-eb11-a813-000d3a3b7051',
        category: 104800003,
        type: 104800012,
        balance: 5555,
        statecode: 0,
        balanceDefault: 55555,
        balanceDisplay: 5555,
        balanceDefaultDisplay: 55555,
        name: 'mumbo number 5',
        role: 104800000,
        fhCode: 'account-1234',
        financialInstruments: [],
    };
    fhVal2.fhCategoryEntity = FHEntityFactory(fhVal2);
    fhList.set(fhVal2.id, fhVal2);

    const fhVal3: FinancialHoldingFields = {
        id: 'c557fe4c-0949-eb11-a813-000d3a3b70e2',
        category: 104800003,
        type: 104800011,
        balance: 15000,
        statecode: 0,
        balanceDefault: 15000,
        balanceDisplay: 15000,
        balanceDefaultDisplay: 15000,
        name: 'mock 3',
        role: 104800001,
        financialInstruments: [],
    };
    fhVal3.fhCategoryEntity = FHEntityFactory(fhVal3);
    fhList.set(fhVal3.id, fhVal3);

    const fhVal4: FinancialHoldingFields = {
        id: '37d32c40-006e-4cd0-a915-b85b48c9ffcf',
        category: 104800001,
        type: 104800006,
        balance: -7245,
        statecode: 0,
        balanceDefault: -7245,
        balanceDisplay: 7245,
        balanceDefaultDisplay: 7245,
        name: 'Sam Stuart Secured Loan',
        role: 104800000,
        financialInstruments: [],
    };

    fhVal4.fhCategoryEntity = FHEntityFactory(fhVal4);
    fhList.set(fhVal4.id, fhVal4);

    const fhVal5: FinancialHoldingFields = {
        id: '37d32c40-006e-4cd0-a915-b85b48c9ffff',
        category: 104800001,
        type: 104800007,
        statecode: 0,
        balance: -7245,
        balanceDefault: -7245,
        balanceDisplay: -7245,
        balanceDefaultDisplay: -7245,
        name: 'Sam Stuart Secured Loan',
        role: 104800000,
        financialInstruments: [],
    };

    fhVal5.fhCategoryEntity = FHEntityFactory(fhVal5, true);
    fhList.set(fhVal5.id, fhVal5);

    const fhVal6: FinancialHoldingFields = {
        id: '37d32c40-006e-4cd0-a915-b85b48c9fhff',
        category: 104800002,
        type: 104800000,
        balance: 1234,
        statecode: 0,
        balanceDefault: 1234,
        balanceDisplay: 1234,
        balanceDefaultDisplay: 1234,
        name: 'Sam Stuart Investment',
        role: 104800000,
        fhCode: 'inv-12345',
        financialInstruments: [],
    };

    fhVal6.fhCategoryEntity = FHEntityFactory(fhVal6);
    fhList.set(fhVal6.id, fhVal6);

    const fhVal7: FinancialHoldingFields = {
        id: '37d32c40-006e-4cd0-a915-b85b78c9fhff',
        category: 104800002,
        type: 104800002,
        balance: 1234,
        statecode: 0,
        balanceDefault: 1234,
        balanceDisplay: 1234,
        balanceDefaultDisplay: 1234,
        name: 'Sam Stuart Investment2',
        fhCode: 'inv-12345',
        role: 104800000,
        financialInstruments: [],
    };

    fhVal7.fhCategoryEntity = FHEntityFactory(fhVal7);
    const investEntity7 = fhVal7.fhCategoryEntity as FHInvestment;
    investEntity7.fhGainLoss = 0;
    fhList.set(fhVal7.id, fhVal7);

    const fhVal8: FinancialHoldingFields = {
        id: '37d32c40-006f-4cd0-a915-b85b48c9fhff',
        category: 104800002,
        type: 104800003,
        balance: 1234,
        statecode: 0,
        balanceDefault: 1234,
        balanceDisplay: 1234,
        balanceDefaultDisplay: 1234,
        name: 'Sam Stuart Investment3',
        fhCode: 'inv-12345',
        role: 104800000,
        financialInstruments: [],
    };

    fhVal8.fhCategoryEntity = FHEntityFactory(fhVal8);
    const investEntity8 = fhVal8.fhCategoryEntity as FHInvestment;
    investEntity8.fhGainLoss = -100;
    fhList.set(fhVal8.id, fhVal8);

    const fhVal9: FinancialHoldingFields = {
        id: '37d32c40-006f-9cd0-a915-b85b48c9fhff',
        category: 104800002,
        type: 104800004,
        balance: 1234,
        statecode: 0,
        balanceDefault: 1234,
        balanceDisplay: 1234,
        balanceDefaultDisplay: 1234,
        name: 'Sam Stuart Investment4',
        fhCode: 'inv-12345',
        role: 104800000,
        financialInstruments: [],
    };

    fhVal9.fhCategoryEntity = FHEntityFactory(fhVal9);
    const investEntity9 = fhVal9.fhCategoryEntity as FHInvestment;
    investEntity9.fhGainLoss = undefined;
    fhList.set(fhVal9.id, fhVal9);

    return fhList;
};

export const INDICATOR_TO_MESSAGE_MOCK: { [key: string]: string } = {
    'Account Blocked Amount': 'Blocked amount exceeds average balance',
    'Credit Outstanding Balance': 'Outstanding balance reached allowed limit',
    'Savings Blocked': 'Long-term saving is blocked',
};

export const EMPTY_STATE_TEXTS_MOCK: { [key: string]: string } = {
    Account: 'No owned accounts',
    Credit: 'No owned credit lines',
    Loan: 'No owned loans',
    Saving: 'No owned long-term savings',
};
