import { FinancialHoldingFields } from '../../interfaces/FHEntity';
import { calcFHAssetsAndLiabilities } from './useFHAssetsAndLiabilities';

const defaultFHProps: FinancialHoldingFields = {
    balance: 0,
    balanceDefault: 0,
    balanceDisplay: 0,
    balanceDefaultDisplay: 0,
    financialInstruments: [],
    statecode: 0,
    category: 1,
    id: '1',
    type: 1,
    name: 'test',
};

describe('calcFHAssetsAndLiabilities', () => {
    const mockedFHList: FinancialHoldingFields[] = [
        {
            ...defaultFHProps,
            balanceDefault: 10,
        },
        {
            ...defaultFHProps,
            balanceDefault: 15.5,
        },
        {
            ...defaultFHProps,
            balanceDefault: -20.2,
        },
        {
            ...defaultFHProps,
            balanceDefault: -15,
        },
    ];
    it('Should calc assets and liabilities correctly', async () => {
        expect(calcFHAssetsAndLiabilities(mockedFHList)).toEqual({ assets: 25.5, liabilities: -35.2 });
    });
});
