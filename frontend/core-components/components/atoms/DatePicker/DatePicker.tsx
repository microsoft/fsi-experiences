import React, { FC, useCallback, useMemo } from 'react';
import { DatePicker as FluentDatePicker, IDatePickerStrings } from '@fluentui/react/lib/DatePicker';
import { isDateValid } from '../../../utilities/TimeUtils';
import { DayOfWeek, ICalendarProps } from '@fluentui/react/lib/components/Calendar';
import { defaultDateGridString, defaultDatePattern } from './DatePicker.const';
import { DatePickerProps } from './DatePicker.interface';
import { useDateFormattingInfo } from '../../../context/hooks/useDateFormattingInfo';
import { useTranslation } from '../../../context/hooks/useTranslation';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { baseClassName, calendarStyles, datePickerStyles, underlinedBaseClass } from './DatePicker.style';
import { getClassNameStyleSets } from '../../../utilities/GetClassNameStyleSets';
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { LabelWithAdditionalInfo } from '../LabelWithAdditionalInfo/LabelWithAdditionalInfo';
import { DirectionalHint, ICalloutProps } from '@fluentui/react/lib/components/Callout';

const calendarProps: ICalendarProps = {
    styles: calendarStyles,
};

const calloutProps: ICalloutProps = {
    directionalHint: DirectionalHint.topRightEdge,
    alignTargetEdge: true,
};

export const DatePicker: FC<DatePickerProps> = (props: DatePickerProps) => {
    const dateFormatting = useDateFormattingInfo();
    const translate = useTranslation();
    const {
        selectedDate,
        onSelectedDate,
        placeholder,
        maxDate,
        minDate,
        label,
        styles,
        className,
        underlined,
        disabled,
        isRequired,
        labelId,
        descriptionId,
        customDateFormatting,
        outOfBoundCustomMessage,
    } = props;

    const datePickerStrings: IDatePickerStrings = useMemo(() => {
        const datePickerCommonTexts = {
            goToToday: translate('GO_TO_TODAY'),
            weekNumberFormatString: translate('WEEK_NUMBER_FORMATTING'),
            prevMonthAriaLabel: translate('PREV_MONTH_ARIA_LABEL'),
            nextMonthAriaLabel: translate('NEXT_MONTH_ARIA_LABEL'),
            prevYearAriaLabel: translate('PREV_YEAR_ARIA_LABEL'),
            nextYearAriaLabel: translate('NEXT_YEAR_ARIA_LABEL'),
            prevYearRangeAriaLabel: translate('PREV_YEAR_RANGE_ARIA_LABEL'),
            nextYearRangeAriaLabel: translate('NEXT_YEAR_RANGE_ARIA_LABEL'),
            closeButtonAriaLabel: translate('CLOSE'),
            monthPickerHeaderAriaLabel: translate('MONTH_PICKER_HEADER_ARIA_LABEL'),
            yearPickerHeaderAriaLabel: translate('YEAR_PICKER_HEADER_ARIA_LABEL'),
            invalidInputErrorMessage: translate('INVALID_INPUT_ERROR'),
            isOutOfBoundsErrorMessage: outOfBoundCustomMessage || translate('IS_OUT_OF_BOUNDS_ERROR'),
        };

        const grisStrings = dateFormatting?.dateGridStrings || defaultDateGridString;
        return {
            ...datePickerCommonTexts,
            ...grisStrings,
        };
    }, [dateFormatting, translate]);

    const handleSelectedDate = useCallback(
        (date: Date | null | undefined): void => {
            onSelectedDate(date);
        },
        [onSelectedDate]
    );

    const datePattern = customDateFormatting?.shortDatePattern || dateFormatting?.shortDatePattern || defaultDatePattern;

    const formatDate = useCallback(
        (date?: Date) => {
            return date && isDateValid(date) ? format(date, datePattern) : '';
        },
        [datePattern]
    );

    const parseDate = useCallback(
        (dateStr: string): Date | null => {
            return parse(dateStr, datePattern, new Date());
        },
        [datePattern]
    );

    const onInvalid = useCallback(() => {}, []);

    const firstDayOfTheWeek = dateFormatting ? dateFormatting.firstDayOfTheWeek : DayOfWeek.Sunday;

    const classNames = getClassNameStyleSets({
        baseClassName,
        styles,
        customClassNames: className,
        underlinedClass: underlined ? underlinedBaseClass : undefined,
    });

    return (
        <Stack className={className}>
            {label && <LabelWithAdditionalInfo label={label || ''} fieldId={props.id || ''} isRequired={isRequired} />}
            <FluentDatePicker
                id={props.id}
                textField={{
                    'aria-labelledby': labelId,
                    'aria-describedby': descriptionId,
                    'aria-required': 'true',
                }}
                disabled={disabled}
                onSelectDate={handleSelectedDate}
                isMonthPickerVisible
                value={selectedDate}
                firstDayOfWeek={firstDayOfTheWeek}
                strings={datePickerStrings}
                allowTextInput
                parseDateFromString={parseDate}
                showGoToToday
                placeholder={placeholder || datePattern.toLowerCase()}
                maxDate={maxDate}
                minDate={minDate}
                onInvalid={onInvalid}
                formatDate={formatDate}
                styles={concatStyleSets(datePickerStyles(label), props.styles)}
                className={classNames[baseClassName]}
                borderless={!!underlined}
                data-testid={props['data-testid']}
                isRequired={isRequired}
                calendarProps={calendarProps}
                calloutProps={calloutProps}
            />
        </Stack>
    );
};
