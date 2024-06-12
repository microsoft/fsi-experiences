import { renderHook, act } from '@testing-library/react-hooks';
import useEventForm from './useEventForm';
import { lifeEventsToCategories } from '../utilities/LifeEventsUtils';
import mockLifeEvents from '../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../interfaces/mocks/LifeEventsConfigurations.mock';
import { defaultTranslate } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { RelativeDateOptionsEnum, RelativeDateRadioOptionsEnum } from '../interfaces/EditEventDialog.interface';
import { addDays, addMonths, addYears } from 'date-fns';

describe('useEventForm tests', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const onSaveMock = jest.fn();

    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    it('Should change selectedDate when relative date options are selected with ago', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '2');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.days });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), -2).getDay());

        act(() => {
            result.current.onRelativeAmountChange(null, '1');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.weeks });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), -7).getDay());

        act(() => {
            result.current.onRelativeAmountChange(null, '3');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.months });
        });

        expect(result.current.state.selectedDate?.getMonth()).toEqual(addMonths(new Date(), -3).getMonth());

        act(() => {
            result.current.onRelativeAmountChange(null, '4');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -4).getFullYear());
    });

    it('Should change selectedDate when relative date options are selected with from today', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.fromToday });
            result.current.onRelativeAmountChange(null, '2');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.days });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), 2).getDay());

        act(() => {
            result.current.onRelativeAmountChange(null, '1');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.weeks });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), 7).getDay());

        act(() => {
            result.current.onRelativeAmountChange(null, '3');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.months });
        });

        expect(result.current.state.selectedDate?.getMonth()).toEqual(addMonths(new Date(), 3).getMonth());

        act(() => {
            result.current.onRelativeAmountChange(null, '4');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), 4).getFullYear());
    });

    it('Should override when date is already selected', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onSelectedDate(new Date());
        });

        expect(result.current.state.selectedDate?.getDate()).toEqual(new Date().getDate());

        act(() => {
            result.current.onRelativeAmountChange(null, '1');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.weeks });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), 7).getDay());
    });

    it('Shouldnt change date when not valid date +80Years', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.fromToday });
            result.current.onRelativeAmountChange(null, '1');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), 1).getFullYear());

        act(() => {
            result.current.onRelativeAmountChange(null, '81');
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), 1).getFullYear());

        act(() => {
            result.current.onRelativeAmountChange(null, '9999');
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), 1).getFullYear());

        act(() => {
            result.current.onRelativeAmountChange(null, '2');
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), 2).getFullYear());
    });

    it('Shouldnt change date when not valid date min year 1900', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '1');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -1).getFullYear());

        act(() => {
            result.current.onRelativeAmountChange(null, '122');
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -12).getFullYear());

        act(() => {
            result.current.onRelativeAmountChange(null, '131');
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -13).getFullYear());
    });

    it('Should reset relative date inputs after selecting date', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '1');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -1).getFullYear());

        act(() => {
            result.current.onRelativeAmountChange(null, '122');
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -12).getFullYear());

        act(() => {
            result.current.onSelectedDate(new Date());
        });
        expect(result.current.state.selectedDate?.getDate()).toEqual(new Date().getDate());

        expect(result.current.state.relativeDateAmount).toEqual('');
        expect(result.current.state.relativeDateSelected).toEqual(null);
        expect(result.current.state.relativeDateSelectedRadio).toEqual(RelativeDateRadioOptionsEnum.fromToday);
    });

    it('Should cut the years input if too long (relative Date Max Input LengthMap)', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '123');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), -12).getFullYear());

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.fromToday });
            result.current.onRelativeAmountChange(null, '123');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.years });
        });

        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addYears(new Date(), 12).getFullYear());
    });

    it('Should cut the Months input if too long (relative Date Max Input LengthMap)', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '1234');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.months });
        });

        expect(result.current.state.selectedDate?.getMonth()).toEqual(addMonths(new Date(), -123).getMonth());
        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addMonths(new Date(), -123).getFullYear());

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.fromToday });
            result.current.onRelativeAmountChange(null, '1234');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.months });
        });

        expect(result.current.state.selectedDate?.getMonth()).toEqual(addMonths(new Date(), 123).getMonth());
        expect(result.current.state.selectedDate?.getFullYear()).toEqual(addMonths(new Date(), 123).getFullYear());
    });

    it('Should cut the weeks input if too long (relative Date Max Input LengthMap)', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '12345');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.weeks });
        });

        let expectedRes = addDays(new Date(), -1234 * 7);
        let actualRes = result.current.state.selectedDate;
        expect(expectedRes).toEqual(actualRes);

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.fromToday });
            result.current.onRelativeAmountChange(null, '12345');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.weeks });
        });

        expectedRes = addDays(new Date(), 1234 * 7);
        actualRes = result.current.state.selectedDate;
        expect(expectedRes).toEqual(actualRes);
    });

    it('Should cut the days input if too long (relative Date Max Input LengthMap)', async () => {
        const { result } = renderHook(() =>
            useEventForm({
                configuration: mockLifeEventsConf,
                categoriesCollection: categories,
                onSave: onSaveMock,
                translate: defaultTranslate,
                visible: true,
            })
        );

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.ago });
            result.current.onRelativeAmountChange(null, '12345');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.days });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), -12345).getDay());

        act(() => {
            result.current.onRelativeRadioChange(null, { key: RelativeDateRadioOptionsEnum.fromToday });
            result.current.onRelativeAmountChange(null, '12345');
            result.current.onRelativeDateChange(null, { key: RelativeDateOptionsEnum.days });
        });

        expect(result.current.state.selectedDate?.getDay()).toEqual(addDays(new Date(), 12345).getDay());
    });
});
