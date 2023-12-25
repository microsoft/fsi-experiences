import { isNewIndication, isFocusIndication, getPeriod, sortObjectByDateProperty, sortObjectByProperty } from './LifeEventsUtils';
import mockLifeEventsConf from '../interfaces/mocks/LifeEventsConfigurations.mock';
import subDays from 'date-fns/subDays';
import subHours from 'date-fns/subHours';
import set from 'lodash/set';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import { LifeEvent } from '../interfaces';
import { ILifeEventConfigurations } from '../interfaces/Configuration';

const testCategoryCode = 104800006;
const testTypeCode = 104800015;

const event: LifeEvent = {
    id: 'fc251559-f153-eb11-a812-0022481eaf0f',
    created_on: new Date('2021-01-11T09:42:51.000Z'),
    title: 'Purchased a Tesla',
    date: new Date('2021-01-10T22:00:00.000Z'),
    categoryCode: testCategoryCode,
    typeCode: testTypeCode,
};
const testConf: ILifeEventConfigurations = {
    ...mockLifeEventsConf,
    newIndicationDisplayInDays: 1,
    focusIndicationDisplayInDays: 4,
    birthdayCategoryCode: testCategoryCode,
    birthdayTypeCode: testTypeCode,
};

describe('LifeEventsUtils', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');

    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('isNewIndication', () => {
        it('should return true for new item for date:now', () => {
            const testConf = {
                ...mockLifeEventsConf,
                newIndicationDisplayInDays: 2,
            };
            const testEvent = {
                ...event,
                created_on: todayDate,
            };
            expect(isNewIndication(testEvent, testConf)).toBeTruthy();
        });

        it('should return true for new item for in the date diff limit', () => {
            const testConf = {
                ...mockLifeEventsConf,
                newIndicationDisplayInDays: 1,
            };
            const testEvent = {
                ...event,
                created_on: subHours(todayDate, testConf.newIndicationDisplayInDays * 24 - 1),
            };
            expect(isNewIndication(testEvent, testConf)).toBeTruthy();
        });

        it('should return false for new item for date diff exceeding the limit', () => {
            const testConf = {
                ...mockLifeEventsConf,
                newIndicationDisplayInDays: 1,
            };
            const testEvent = {
                ...event,
                created_on: subHours(todayDate, testConf.newIndicationDisplayInDays * 24 + 1),
            };
            expect(isNewIndication(testEvent, testConf)).toBeFalsy();
        });

        it('should return false for missing event', () => {
            const testConf = {
                ...mockLifeEventsConf,
                newIndicationDisplayInDays: 1,
            };

            expect(isNewIndication(undefined, testConf)).toBeFalsy();
        });
    });

    describe('isFocusIndication', () => {
        it('should return true for in range birth date', () => {
            const testEvent: LifeEvent = {
                ...event,
                date: subDays(todayDate, testConf.focusIndicationDisplayInDays - 1),
            };
            expect(isFocusIndication(testEvent, testConf)).toBeTruthy();
        });

        it('should return false for not in range birth date', () => {
            const testEvent: LifeEvent = {
                ...event,
                date: subDays(todayDate, testConf.focusIndicationDisplayInDays + 1),
            };
            expect(isFocusIndication(testEvent, testConf)).toBeFalsy();
        });

        it('should return false for non birth date category', () => {
            const testEvent: LifeEvent = {
                ...event,
                date: todayDate,
                categoryCode: 104800000,
            };
            expect(isFocusIndication(testEvent, testConf)).toBeFalsy();
        });

        it('should return false for missing event', () => {
            expect(isFocusIndication(undefined, testConf)).toBeFalsy();
        });
    });

    describe('testing getPeriod', () => {
        it('should run getPeriod of today', () => {
            const rtVal = getPeriod(todayDate);

            expect(rtVal.time).toEqual(0);
        });

        it('should run getPeriod of yesterday', () => {
            const rtVal = getPeriod(addDays(todayDate, -1));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod of 5 days', () => {
            const rtVal = getPeriod(addDays(todayDate, -5));

            expect(rtVal.time).toEqual(5);
        });

        it('should run getPeriod of 7 days', () => {
            const rtVal = getPeriod(addDays(todayDate, -7));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod of 2 weeks', () => {
            const rtVal = getPeriod(addWeeks(todayDate, -2));

            expect(rtVal.time).toEqual(2);
        });

        it('should run getPeriod of 4 weeks', () => {
            const rtVal = getPeriod(addWeeks(todayDate, -4));

            expect(rtVal.time).toEqual(4);
        });
        it('should run getPeriod of 1 month', () => {
            const rtVal = getPeriod(addMonths(todayDate, -1));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod 4 months', () => {
            const now = todayDate;
            const rtVal = getPeriod(addMonths(now, -4));

            expect(rtVal.time).toEqual(4);
        });

        it('should run getPeriod 1 year', () => {
            const rtVal = getPeriod(addYears(todayDate, -1));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod 3 year', () => {
            const rtVal = getPeriod(addYears(todayDate, -3));

            expect(rtVal.time).toEqual(3);
        });

        it('should run getPeriod of tomorrow future', () => {
            const rtVal = getPeriod(addDays(todayDate, 1));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod of 5 days future', () => {
            const rtVal = getPeriod(addDays(todayDate, 5));

            expect(rtVal.time).toEqual(5);
        });

        it('should run getPeriod of 7 days future', () => {
            const rtVal = getPeriod(addDays(todayDate, 7));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod of 2 weeks future', () => {
            const rtVal = getPeriod(addWeeks(todayDate, 2));

            expect(rtVal.time).toEqual(2);
        });

        it('should run getPeriod of 4 weeks future', () => {
            const rtVal = getPeriod(addWeeks(todayDate, 4));

            expect(rtVal.time).toEqual(4);
        });

        it('should run getPeriod of 1 month future', () => {
            const rtVal = getPeriod(addMonths(todayDate, 1));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod 4 months future', () => {
            const now = todayDate;
            const rtVal = getPeriod(addMonths(now, 4));

            expect(rtVal.time).toEqual(4);
        });

        it('should run getPeriod 1 year future', () => {
            const rtVal = getPeriod(addYears(todayDate, 1));

            expect(rtVal.time).toEqual(1);
        });

        it('should run getPeriod 3 year future', () => {
            const rtVal = getPeriod(addYears(todayDate, 3));

            expect(rtVal.time).toEqual(3);
        });
    });

    describe('test sortObjectByDateProperty', () => {
        it('should return null when array null', () => {
            const arr = [];
            const obj = { arr };
            set(obj, 'arr', null);
            const result = sortObjectByDateProperty(obj.arr, 'date', 'ASC');
            expect(result).toEqual(null);
        });

        it('should sort by date property', () => {
            const arr = [
                { date: new Date(Date.now() - 10000), id: 1 },
                { date: new Date(Date.now() - 30000), id: 2 },
                { date: new Date(Date.now() - 20000), id: 3 },
            ];
            const result = sortObjectByDateProperty(arr, 'date', 'ASC');
            expect(result[0].id).toEqual(2);
            expect(result[1].id).toEqual(3);
            expect(result[2].id).toEqual(1);
        });

        it('should sort by date property desc', () => {
            const arr = [
                { date: new Date(Date.now() - 10000), id: 1 },
                { date: new Date(Date.now() - 30000), id: 2 },
                { date: new Date(Date.now() - 20000), id: 3 },
            ];
            const result = sortObjectByDateProperty(arr, 'date', 'DESC');
            expect(result[0].id).toEqual(1);
            expect(result[1].id).toEqual(3);
            expect(result[2].id).toEqual(2);
        });

        it('should sort by date property with wrong prop', () => {
            const key: 'date' | 'id' = 'date';
            const obj = { key };
            const arr = [
                { date: new Date(Date.now() - 10000), id: 1 },
                { date: new Date(Date.now() - 30000), id: 2 },
                { date: new Date(Date.now() - 20000), id: 3 },
            ];
            set(obj, 'key', 'mock');
            const result = sortObjectByDateProperty(arr, obj.key, 'DESC');
            expect(result[0].id).toEqual(1);
            expect(result[1].id).toEqual(2);
            expect(result[2].id).toEqual(3);
        });
    });

    describe('test sortObjectByProperty', () => {
        it('should return null when array null', () => {
            const arr = [];
            const obj = { arr };
            set(obj, 'arr', null);
            const result = sortObjectByProperty(obj.arr, 'num', 'ASC');
            expect(result).toEqual(null);
        });

        it('should sort by date property', () => {
            const arr = [
                { num: 10, id: 1 },
                { num: 5, id: 2 },
                { num: 7, id: 3 },
            ];
            const result = sortObjectByProperty(arr, 'num', 'ASC');
            expect(result[0].id).toEqual(2);
            expect(result[1].id).toEqual(3);
            expect(result[2].id).toEqual(1);
        });

        it('should sort by date property desc', () => {
            const arr = [
                { num: 10, id: 1 },
                { num: 5, id: 2 },
                { num: 7, id: 3 },
            ];
            const result = sortObjectByProperty(arr, 'num', 'DESC');
            expect(result[0].id).toEqual(1);
            expect(result[1].id).toEqual(3);
            expect(result[2].id).toEqual(2);
        });

        it('should sort by date property with wrong prop', () => {
            const key: 'num' | 'id' = 'num';
            const obj = { key };
            const arr = [
                { num: 10, id: 1 },
                { num: 5, id: 2 },
                { num: 7, id: 3 },
            ];
            set(obj, 'key', 'mock');
            const result = sortObjectByProperty(arr, obj.key, 'DESC');
            expect(result[0].id).toEqual(1);
            expect(result[1].id).toEqual(2);
            expect(result[2].id).toEqual(3);
        });
    });
});
