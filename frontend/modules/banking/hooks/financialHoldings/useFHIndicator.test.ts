import FHCredit from '../../interfaces/FHEntity/FHCredit';
import FHLoan from '../../interfaces/FHEntity/FHLoan';
import FHSavings from '../../interfaces/FHEntity/FHSavings';
import FinancialHoldingFields from '../../interfaces/FHEntity/FinancialHoldingFields';
import FinancialInstrumentFields from '../../interfaces/FHEntity/FinancialInstrumentFields';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';
import { FHAccount } from '../../interfaces/FHEntity/';

import {
    geFinancialHoldingsInstrumentIndicators,
    getFHAccountIndicators,
    getFHCreditIndicators,
    getFHLoanIndicators,
    getFHLSavingIndicators,
    getFinancialHoldingsIndicators,
} from './useFHIndicator';

describe('Financial holding indicators', () => {
    describe('test visit account', () => {
        let acc: FHAccount;

        beforeEach(() => {
            acc = {
                fhAvailableBalance: 1000,
                fhAverageBalance: 900,
                fhAccountBlockedAmount: 0,
            };
        });

        it('should run account visitor', () => {
            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result).toBeDefined();
        });

        it('should have warning on blocked amount', () => {
            acc.fhAccountBlockedAmount = 10;
            acc.fhAverageBalance = 1;

            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result[0].order).toEqual(3);
            expect(result[0].type()).toEqual('warning');
            expect(result[0].messageKey).toBeDefined();
        });

        it('should take default values when FhAverageBalance null', () => {
            acc.fhAccountBlockedAmount = 10;
            acc.fhAverageBalance = undefined;

            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result[0].order).toEqual(3);
            expect(result[0].type()).toEqual('warning');
        });

        it('should take default values when FhAverageBalance null 2', () => {
            acc.fhAccountBlockedAmount = undefined;
            acc.fhAverageBalance = undefined;

            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result.filter(r => r.order === 3)).toHaveLength(0);
        });

        it('should have fyi on available balance', () => {
            acc.fhAverageBalance = 100;

            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result[0].order).toEqual(4);
            expect(result[0].type()).toEqual('fyi');
            expect(result[0].messageKey).toBeDefined();
        });

        it('should have no fyi if available balance null', () => {
            delete acc.fhAvailableBalance;

            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result.filter(r => r.order === 4)).toHaveLength(0);
        });

        it('should have no fyi if average balance null', () => {
            delete acc.fhAverageBalance;

            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result.filter(r => r.order === 4)).toHaveLength(0);
        });

        it("should have no fyi if balance condition isn't pass 30", () => {
            const result = getFHAccountIndicators(acc, FHMetadataMock);
            expect(result.filter(r => r.order === 4)).toHaveLength(0);
        });

        it('should have fyi of higher available balance', () => {
            acc.fhAverageBalance = 100;
            const result = getFHAccountIndicators(acc, FHMetadataMock)[0];
            expect(result.messageKey).toEqual('INDICATOR_ACCOUNT_AVAILABLE_BALANCE_HIGHER');
        });

        it('should have fyi of lower available balance', () => {
            acc.fhAvailableBalance = 100;
            const result = getFHAccountIndicators(acc, FHMetadataMock)[0];
            expect(result.messageKey).toEqual('INDICATOR_ACCOUNT_AVAILABLE_BALANCE_LOWER');
        });

        it('should have fyi of lower available balance when available balance is zero', () => {
            acc.fhAvailableBalance = 0;
            const result = getFHAccountIndicators(acc, FHMetadataMock)[0];
            expect(result.messageKey).toEqual('INDICATOR_ACCOUNT_AVAILABLE_BALANCE_LOWER');
        });
    });

    describe('test visit credit', () => {
        let cred: FHCredit;
        let balance;

        beforeEach(() => {
            cred = {
                fhCreditLimit: 900,
            };
            balance = 1000;
        });

        it('should run account visitor', () => {
            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            expect(result).toBeDefined();
        });

        it('should have no fyi if outstanding balance null', () => {
            balance = 0;

            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(0);
        });

        it('should have no fyi if average balance null', () => {
            cred.fhCreditLimit = 0;

            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(0);
        });

        it("should have no fyi if credit balance doesn't reach threshold", () => {
            balance = 100;

            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(0);
        });

        it('should have fyi if credit limit reach threshold', () => {
            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(1);
            expect(result[0].messageKey).toBeDefined();
            expect(result[0].type()).toEqual('fyi');
        });

        it('should have fyi with "approaching" when credit close to limit', () => {
            balance = 899;

            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            const messageKey = result.filter(r => r.order === 1)[0].messageKey;
            expect(messageKey).toEqual('INDICATOR_OUTSTANDING_BALANCE_LIMIT_APPROACHING');
        });

        it('should have fyi with "reaching" when credit close to limit', () => {
            const result = getFHCreditIndicators(cred, balance, FHMetadataMock);
            const messageKey = result.filter(r => r.order === 1)[0].messageKey;
            expect(messageKey).toEqual('INDICATOR_OUTSTANDING_BALANCE_LIMIT_REACHED');
        });
    });

    describe('test visit loan', () => {
        let loan: FHLoan;

        beforeEach(() => {
            loan = {
                fhLoanMaturityDate: new Date('2020'),
                fhNextInterestReviewDate: new Date('2020'),
                fhDelinquencyStatus: true,
                fhDaysPastDue: 1,
                fhCollectionRisk: 104800001, //Medium,
            };
        });

        it('should run loan visitor', () => {
            const result = getFHLoanIndicators(loan, FHMetadataMock);
            expect(result).toBeDefined();
        });

        it('should have Maturity timesensetive indication', () => {
            loan.fhLoanMaturityDate = new Date();

            const result = getFHLoanIndicators(loan, FHMetadataMock);
            const maturity = result.filter(r => r.order === 3);
            expect(maturity).toHaveLength(1);
            expect(maturity[0].type()).toEqual('timeSensitive');
            expect(result[0].messageKey).toBeDefined();
        });

        it('should have Interest review timesensetive indication', () => {
            loan.fhNextInterestReviewDate = new Date();

            const result = getFHLoanIndicators(loan, FHMetadataMock);
            const maturity = result.filter(r => r.order === 2);
            expect(maturity).toHaveLength(1);
            expect(maturity[0].type()).toEqual('timeSensitive');
            expect(result[0].messageKey).toBeDefined();
        });

        it('should not have warning if delinquency status down', () => {
            loan.fhDelinquencyStatus = false;

            const result = getFHLoanIndicators(loan, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(0);
        });

        it('should not have warning if days past due is null or less then 30', () => {
            loan.fhDaysPastDue = undefined;

            let result = getFHLoanIndicators(loan, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(0);

            loan.fhDaysPastDue = 2;

            result = getFHLoanIndicators(loan, FHMetadataMock);
            expect(result.filter(r => r.order === 1)).toHaveLength(0);
        });

        it('should have warning will message that contain the risk and days past due', () => {
            loan.fhDaysPastDue = 44;

            const result = getFHLoanIndicators(loan, FHMetadataMock);
            const warn = result.filter(r => r.order === 1);

            expect(warn).toHaveLength(1);
            expect(warn[0].messageKey).toEqual('INDICATOR_LOAN_PAYMENT_RISK');
            expect(warn[0].messageProps).toEqual(
                expect.objectContaining({
                    risk: 'Medium',
                    fhDaysPastDue: loan.fhDaysPastDue,
                })
            );
            expect(warn[0].type()).toEqual('warning');
        });
    });

    describe('test visit savings', () => {
        let savings: FHSavings;

        beforeEach(() => {
            savings = {
                fhSavingsBlockedAmount: 1000,
                fhMaturityDate: new Date('2020'),
            };
        });

        it('should run loan visitor', () => {
            const result = getFHLSavingIndicators(savings, FHMetadataMock);
            expect(result).toBeDefined();
        });

        it('should have maturity timesensetive indication', () => {
            savings.fhMaturityDate = new Date();

            const result = getFHLSavingIndicators(savings, FHMetadataMock);
            const maturity = result.filter(r => r.order === 1);
            expect(maturity).toHaveLength(1);
            expect(maturity[0].type()).toEqual('timeSensitive');
            expect(maturity[0].messageKey).toBeDefined();
            expect(maturity[0].messageProps!['weekDiff']).toBeDefined();
        });

        it("should not have warning if blocked amount doesn't exists", () => {
            const result = getFHLSavingIndicators(savings, FHMetadataMock);
            const blocked = result.filter(r => r.order === 2);
            expect(blocked).toHaveLength(1);
            expect(blocked[0].type()).toEqual('warning');
            expect(blocked[0].messageKey).toBeDefined();
        });

        it('should have warning if blocked amount exists', () => {
            savings.fhSavingsBlockedAmount = undefined;

            const result = getFHLSavingIndicators(savings, FHMetadataMock);
            const blocked = result.filter(r => r.order === 2);
            expect(blocked).toHaveLength(0);
        });
    });

    describe('test visit instrument', () => {
        let instrument: FinancialInstrumentFields;

        beforeEach(() => {
            instrument = {
                fhiOverdraftLimitUsed: 1000,
                fhiOverdraftLimit: 1000,
                fhiLastItemStatus: 104800001,
            };
        });

        it('should run loan visitor', () => {
            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            expect(result).toBeDefined();
        });

        it("should not have warning if overdraft limit used doesn't exists", () => {
            instrument.fhiOverdraftLimitUsed = 0;

            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const limit = result.filter(r => r.order === 1);
            expect(limit).toHaveLength(0);
        });

        it("should not have warning if overdraft limit doesn't exists", () => {
            instrument.fhiOverdraftLimit = 0;

            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const limit = result.filter(r => r.order === 1);
            expect(limit).toHaveLength(0);
        });

        it("should have warning if overdraft limit used pass threshold doesn't exists", () => {
            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const limit = result.filter(r => r.order === 1);
            expect(limit).toHaveLength(1);
            expect(limit[0].type()).toEqual('warning');
            expect(limit[0].messageKey).toBeDefined();
        });

        it('should have warning with "approaching" when used is less then limit', () => {
            instrument.fhiOverdraftLimitUsed = 900;

            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const limit = result.filter(r => r.order === 1);
            expect(limit).toHaveLength(1);
            expect(limit[0].type()).toEqual('warning');
            expect(limit[0].messageKey).toEqual('INDICATOR_OVERDRAFT_LIMIT_APPROACHING');
        });

        it('should have warning with "reached" when used is greater or equal then limit', () => {
            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const limit = result.filter(r => r.order === 1);
            expect(limit).toHaveLength(1);
            expect(limit[0].type()).toEqual('warning');
            expect(limit[0].messageKey).toEqual('INDICATOR_OVERDRAFT_LIMIT_REACHED');
        });

        it('should have warning and timesesitive when lastItemStatus is not successful', () => {
            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const itemStatus = result.filter(r => r.order === 2);
            expect(itemStatus).toHaveLength(2);
            expect(itemStatus[0].type()).toEqual('timeSensitive');
            expect(itemStatus[0].messageKey).toEqual('INDICATOR_STANDING_ORDER_STATUS');
            expect(itemStatus[0].messageProps!['status']).toEqual('Rejected');
            expect(itemStatus[1].type()).toEqual('warning');
            expect(itemStatus[1].messageKey).toEqual('INDICATOR_DIRECT_DEPOSIT_STATUS');
            expect(itemStatus[1].messageProps!['status']).toEqual('Rejected');
        });

        it('should not have warning and timesesitive when lastItemStatus is null', () => {
            instrument.fhiLastItemStatus = undefined;

            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const itemStatus = result.filter(r => r.order === 2);
            expect(itemStatus).toHaveLength(0);
        });

        it('should not have warning and timesesitive when lastItemStatus is not successfult', () => {
            instrument.fhiLastItemStatus = 104800000;

            const result = geFinancialHoldingsInstrumentIndicators(instrument, FHMetadataMock);
            const itemStatus = result.filter(r => r.order === 2);
            expect(itemStatus).toHaveLength(0);
        });
    });

    describe('test visit fh', () => {
        let fh: FinancialHoldingFields;

        beforeEach(() => {
            fh = {
                balance: 0,
                balanceDefault: 0,
                balanceDisplay: 0,
                balanceDefaultDisplay: 0,
                type: 1,
                statecode: 0,
                id: 'test',
                name: 'name',
                category: 1111,
                fhCategoryEntity: undefined,
                financialInstruments: [],
            };
        });

        it('should run fh visitor', () => {
            const result = getFinancialHoldingsIndicators(fh, FHMetadataMock);
            expect(result).toBeDefined();
        });

        it('should return empty array since not indicator found', () => {
            const result = getFinancialHoldingsIndicators(fh, FHMetadataMock);
            expect(result).toHaveLength(0);
        });

        it("should return savings result since it's the only one in the fh", () => {
            const savings: FHSavings = {
                fhSavingsBlockedAmount: 1000,
                fhMaturityDate: new Date(),
            };

            fh.fhCategoryEntity = savings;
            fh.category = FH_NAME_TO_CATEGORY_MAP.Saving;

            const result = getFinancialHoldingsIndicators(fh, FHMetadataMock);
            expect(result.length).toBeGreaterThan(0);
        });

        it("should return instrument's result since it's the only one in the fh", () => {
            const instrument: FinancialInstrumentFields = {
                fhiOverdraftLimitUsed: 100,
                fhiOverdraftLimit: 1000,
                fhiLastItemStatus: 104800001,
            };
            fh.financialInstruments = [instrument];
            const result = getFinancialHoldingsIndicators(fh, FHMetadataMock);
            expect(result.length).toBeGreaterThan(0);
        });

        it('should return indicators by order asc', () => {
            const instrument: FinancialInstrumentFields = {
                fhiLastItemStatus: 104800001,
            };
            fh.financialInstruments = [instrument];

            const savings: FHSavings = {
                fhSavingsBlockedAmount: undefined,
                fhMaturityDate: new Date(),
            };
            fh.fhCategoryEntity = savings;
            fh.category = FH_NAME_TO_CATEGORY_MAP.Saving;

            let result = getFinancialHoldingsIndicators(fh, FHMetadataMock);
            expect(result[1].order).toBeGreaterThan(result[0].order);

            instrument.fhiOverdraftLimitUsed = 1000;
            instrument.fhiOverdraftLimit = 1000;
            instrument.fhiLastItemStatus = 104800000;
            savings.fhSavingsBlockedAmount = 1000;
            savings.fhMaturityDate = undefined;

            result = getFinancialHoldingsIndicators(fh, FHMetadataMock);
            expect(result[1].order).toBeGreaterThan(result[0].order);
        });
    });
});
