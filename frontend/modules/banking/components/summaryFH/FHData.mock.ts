import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { FinancialInstrumentFields, FinancialHoldingFields, FHBaseCategory } from '../../interfaces/FHEntity';
import { FHEntityFactory } from '../../interfaces/FHEntity/mocks/FHEntityFactory.mock';
import { toIndictableFinancialHoldings } from '../../hooks/financialHoldings/useFHIndicator';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';

export const getFHMock = (): IndictableFH[] => {
    const map: Map<string, FinancialHoldingFields> = getFHMapMock();

    return toIndictableFinancialHoldings({ data: map }, FHMetadataMock);
};

const investments_fhVal6: FHBaseCategory = {
    fhPortfolioName: 'Discretionary account #237940',
    fhOpenedDate: new Date('2020-10-17'),
    fhCashBalance: 435987,
    fhPerformanceYTD: 8.09,
    fhPerformance: 8.09,
};

export const fhVal6: FinancialHoldingFields = {
    id: '37d32c40-006e-4cd0-a915-b85b48c9ffcg',
    category: 104800002,
    type: 104800000,
    balance: 1234,
    statecode: 0,
    balanceDefault: 1234,
    balanceDisplay: 1234,
    balanceDefaultDisplay: 1234,
    name: 'Sam Stuart Investment',
    role: 104800000,
    financialInstruments: [],
    fhCategoryEntity: investments_fhVal6,
};

export const getFHMapMock = () => {
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

    creditLineInstrumentList.push({
        financialHoldingInstrumentType: 104800002,
        financialHoldingInstrumentName: 'card1',
        fhiActivationDate: new Date('2020-01-23T22:00:00Z'),
        fhiCardNumber: '1245 554786 12353',
        fhiCardType: 104800001,
        fhiEmbossingName: 'Monica Thomson',
        fhiExpiryDate: new Date('2024-01-23T22:00:00Z'),
        fhiIssueDate: new Date('2020-01-23T22:00:00Z'),
        fhiNumberOfCashWithdrawal: 4,
        fhiNumberOfTransactions: 5,
        fhiPurchasingLimit: 1234,
        fhiStatus: 104800002,
        fhiWithdrawalLimit: 500,
        fsiProductName: 'AMEX Gold',
        fsiCardNetwork: 'AMEX',
    });

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
        statecode: 0,
        balance: 1000,
        balanceDefault: 1000,
        balanceDisplay: 1000,
        balanceDefaultDisplay: 1000,
        name: 'rock st3r',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin blandit dolor, non hendrerit risus tincidunt in. Sed euismod quam id est iaculis, id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan, justo id pharetra bibendum, ex sapien tincidunt velit, egetie.',
        role: 104800000,
        financialInstruments: creditLineInstrumentList,
    };
    fhVal.fhCategoryEntity = FHEntityFactory(fhVal);
    fhList.set(fhVal.id, fhVal);

    const fhVal2: FinancialHoldingFields = {
        id: 'c357fe4c-0949-eb11-a813-000d3a3b7041',
        category: 104800004,
        type: 104800009,
        statecode: 0,
        balance: 4444,
        balanceDefault: 4444,
        balanceDisplay: 4444,
        balanceDefaultDisplay: 4444,
        name: '4ever',
        role: 104800004,
        financialInstruments: accountInstrumentList,
    };
    fhVal2.fhCategoryEntity = FHEntityFactory(fhVal2);
    fhList.set(fhVal2.id, fhVal2);

    const fhVal3: FinancialHoldingFields = {
        id: 'c457fe4c-0949-eb11-a813-000d3a3b7051',
        category: 104800003,
        type: 104800012,
        statecode: 0,
        balance: 5555,
        balanceDefault: 5555,
        balanceDisplay: 5555,
        balanceDefaultDisplay: 5555,
        name: 'mumbo number 5',
        role: 104800000,
        financialInstruments: [],
    };

    fhVal3.fhCategoryEntity = FHEntityFactory(fhVal3);
    fhList.set(fhVal3.id, fhVal3);

    const fhVal4: FinancialHoldingFields = {
        id: 'c557fe4c-0949-eb11-a813-000d3a3b70e2',
        category: 104800003,
        type: 104800011,
        balance: 15000,
        balanceDefault: 15000,
        statecode: 0,
        balanceDisplay: 15000,
        balanceDefaultDisplay: 15000,
        name: 'mock 3',
        role: 104800001,
        financialInstruments: [],
    };

    fhVal4.fhCategoryEntity = FHEntityFactory(fhVal4);
    fhList.set(fhVal4.id, fhVal4);

    const fhVal5: FinancialHoldingFields = {
        id: '37d32c40-006e-4cd0-a915-b85b48c9ffcf',
        category: 104800001,
        type: 104800006,
        balance: 7245,
        statecode: 0,
        balanceDefault: 7245,
        balanceDisplay: 7245,
        balanceDefaultDisplay: 7245,
        name: 'Sam Stuart Secured Loan',
        role: 104800000,
        financialInstruments: [],
    };
    fhVal5.fhCategoryEntity = FHEntityFactory(fhVal5);
    fhList.set(fhVal5.id, fhVal5);

    fhVal6.fhCategoryEntity = FHEntityFactory(fhVal6);
    fhList.set(fhVal6.id, fhVal6);

    return fhList;
};

export const INDICATOR_TO_MESSAGE_MOCK: { [key: string]: string } = {
    'Account Blocked Amount': 'Blocked amount exceeds average balance',
    'Credit Outstanding Balance': 'Outstanding balance reached allowed limit',
    'Savings Blocked': 'Long-term saving is blocked',
};

export const EMPTY_STATE_TEXTS_MOCK: { [key: string]: string } = {
    Account: 'No owned accounts',
    Investment: 'No investments',
    Credit: 'No owned credit lines',
    Loan: 'No owned loans',
    Saving: 'No owned long-term savings',
};

export const HIDDEN_STATE_TEXT_MOCK = 'This customer information is hidden';
