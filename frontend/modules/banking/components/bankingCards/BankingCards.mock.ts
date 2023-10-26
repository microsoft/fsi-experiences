import { FinancialInstrumentFields, FinancialHoldingFields } from '../../interfaces/FHEntity';
import { FHEntityFactory } from '../../interfaces/FHEntity/mocks/FHEntityFactory.mock';

export const getFHMock = () => {
    const list: Map<string, FinancialHoldingFields> = getlist();
    let counter = 0;
    list.forEach(fh => (counter += fh.financialInstruments.length));

    return { financialHoldings: list, cardsNumber: counter };
};

const getlist = () => {
    const instrumentList: FinancialInstrumentFields[] = [];

    instrumentList.push({
        financialHoldingInstrumentType: 104800002,
        financialHoldingInstrumentName: 'instrument 33',
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
    });
    instrumentList.push({
        financialHoldingInstrumentType: 10480000,
        financialHoldingInstrumentName: 'instrument 34',
        fhiActivationDate: new Date('2020-01-23T22:00:00Z'),
        fhiCardNumber: '1245 554786 12353',
        fhiCardType: 104800001,
        fhiEmbossingName: 'Monica Thomson 1',
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

    const fhList: Map<string, FinancialHoldingFields> = new Map<string, FinancialHoldingFields>();

    const fhVal: FinancialHoldingFields = {
        id: 'c257fe4c-0949-eb11-a813-000d3a3b7031',
        category: 104800000,
        type: 104800013,
        statecode: 0,
        balance: 3333,
        balanceDefault: 3333,
        balanceDisplay: 3333,
        balanceDefaultDisplay: 3333,
        name: 'rock st3r',
        role: 104800000,
        financialInstruments: instrumentList,
    };
    fhVal.fhCategoryEntity = FHEntityFactory(fhVal);

    fhList.set(fhVal.id, fhVal);

    fhVal.id = 'c357fe4c-0949-eb11-a813-000d3a3b7041';
    fhVal.category = 104800004;
    fhVal.type = 104800008;
    (fhVal.balance = 4444),
        (fhVal.balanceDefault = 4444),
        (fhVal.balanceDisplay = 4444),
        (fhVal.balanceDefaultDisplay = 4444),
        (fhVal.name = '4ever');
    fhVal.role = 104800000;
    fhVal.financialInstruments = instrumentList;
    fhVal.fhCategoryEntity = FHEntityFactory(fhVal);
    fhList.set(fhVal.id, fhVal);

    return fhList;
};
