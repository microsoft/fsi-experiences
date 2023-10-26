import React, { FC, useCallback } from 'react';
import { IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Text } from '@fluentui/react/lib/Text';
import { ComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { MaskedTextField } from '@fluentui/react/lib/components/TextField/MaskedTextField/MaskedTextField';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { DatePicker } from '@fsi/core-components/dist/components/atoms/DatePicker/DatePicker';
import {
    relativeDateInputsWrapperStyles,
    relativeDateAmountStyles,
    relativeDateStyles,
    relativeDateRadioWrapperStyles,
    datePickerStyles,
    relativeWrapperStyles,
    describeRelativeDateStyles,
} from './RelativeDatePicker.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { onChangeDefaultFunction, RelativeDateOptionsEnum, RelativeDateRadioOptionsEnum } from '../../interfaces/EditEventDialog.interface';
import { DatePickerProps } from '@fsi/core-components/dist/components/atoms/DatePicker/DatePicker.interface';
import RelativeDatePickerHeader from '../../goals/components/RelativeDatePickerFinancialGoal/RelativeDatePickerHeader';
import RelativeDatePickerChoice from './RelativeDatePickerChoice';

interface IRelativeDatePickerProps extends DatePickerProps {
    relativeDateRadioOptions: IChoiceGroupOption[];
    relativeDateOptions: IComboBoxOption[];
    onRelativeDateChange: onChangeDefaultFunction;
    onRelativeRadioChange: onChangeDefaultFunction;
    onRelativeAmountChange: onChangeDefaultFunction;
    selectedDate?: Date;
    relativeDateAmount?: string;
    relativeDateSelected?: RelativeDateOptionsEnum | null;
    relativeDateSelectedRadio: RelativeDateRadioOptionsEnum;
    financialGoalFutureOnly: boolean;
}

const sectionTokens = { childrenGap: 8 };

const comboBoxStyles = { label: { display: 'none' } };

const RelativeDatePicker: FC<IRelativeDatePickerProps> = ({
    onSelectedDate,
    onRelativeAmountChange,
    onRelativeDateChange,
    onRelativeRadioChange,
    relativeDateOptions,
    relativeDateRadioOptions,
    relativeDateAmount,
    relativeDateSelectedRadio,
    relativeDateSelected,
    selectedDate,
    minDate,
    maxDate,
    financialGoalFutureOnly,
    disabled,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const labelId = useId('event-date-label');
    const inputId = useId('event-input');
    const descriptionId = useId('event-date-description');
    const relativeDataId = useId('event-date-relative');
    const relativeDateMask = '99999';
    const maskPlaceholder = '';

    const describeRelativeDate = financialGoalFutureOnly
        ? translate('OR_ADD_TIMEFRAME_RELATIVE_TO_FUTURE')
        : translate('OR_ADD_TIMEFRAME_RELATIVE_TO_TODAY');

    const RenderDatePickerOption = useCallback(() => {
        return (
            <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                onSelectedDate={onSelectedDate}
                selectedDate={selectedDate}
                styles={datePickerStyles}
                labelId={labelId}
                id={inputId}
                descriptionId={descriptionId}
                disabled={disabled}
                outOfBoundCustomMessage={financialGoalFutureOnly ? translate('FINANCIAL_GOAL_DATE_PASSED') : undefined}
            />
        );
    }, [selectedDate]);

    return (
        <Stack tokens={sectionTokens}>
            <RelativeDatePickerHeader financialGoalFutureOnly={financialGoalFutureOnly} labelId={labelId} />
            <RenderDatePickerOption />
            <Text styles={describeRelativeDateStyles} id={relativeDataId}>
                {describeRelativeDate}
            </Text>
            <Stack wrap horizontal tokens={sectionTokens} styles={relativeWrapperStyles}>
                <Stack styles={relativeDateRadioWrapperStyles} horizontal>
                    <RelativeDatePickerChoice
                        relativeDateSelectedRadio={relativeDateSelectedRadio}
                        relativeDateRadioOptions={relativeDateRadioOptions}
                        onRelativeRadioChange={onRelativeRadioChange}
                        financialGoalFutureOnly={financialGoalFutureOnly}
                    />
                </Stack>
                <Stack styles={relativeDateInputsWrapperStyles} horizontal tokens={sectionTokens}>
                    <Stack.Item styles={relativeDateAmountStyles}>
                        <MaskedTextField
                            aria-labelledby={relativeDataId}
                            value={relativeDateAmount}
                            onChange={onRelativeAmountChange}
                            placeholder={translate('E_G_AMOUNT', { amount: 4 })}
                            title={translate('E_G_AMOUNT', { amount: 4 })}
                            mask={relativeDateMask}
                            maskChar={maskPlaceholder}
                            disabled={disabled}
                        />
                    </Stack.Item>
                    <Stack.Item styles={relativeDateStyles}>
                        <ComboBox
                            placeholder={translate('E_G_YEARS')}
                            title={translate('E_G_YEARS')}
                            autoComplete="on"
                            selectedKey={relativeDateSelected}
                            options={relativeDateOptions}
                            label={translate('SELECT_TIMEFRAME')}
                            styles={comboBoxStyles}
                            onChange={onRelativeDateChange}
                            disabled={disabled}
                            useComboBoxAsMenuWidth
                        />
                    </Stack.Item>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default RelativeDatePicker;
