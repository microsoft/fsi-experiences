import React, { FC } from 'react';
import { IStateFinancialGoal } from '../../../hooks/useEventForm';
import { Label, Stack, TextField } from '@fluentui/react';
import { additionalInfoTextLimit, goalValueLimit } from '../../../constants/EditEventDialog.consts';
import { useCurrencies } from '@fsi/core-components/dist/context/hooks/useCurrencies';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { labelStyles } from './FinancialGoalTargetValues.style';
import { onChangeDefaultFunction } from '../../../interfaces/EditEventDialog.interface';
import { useId } from '@fluentui/react-hooks';
import { MaskedTextField } from '@fluentui/react/lib/components/TextField/MaskedTextField/MaskedTextField';

export interface FinancialGoalTargetValuesProps {
    onChangeFinancialGoalName: onChangeDefaultFunction;
    onChangeFinancialGoalTargetAmount: onChangeDefaultFunction;
    stateFinancialGoals: IStateFinancialGoal;
    disabled?: boolean;
}

const section = { childrenGap: 8 };

const FinancialGoalTargetValues: FC<FinancialGoalTargetValuesProps> = ({
    onChangeFinancialGoalName,
    onChangeFinancialGoalTargetAmount,
    stateFinancialGoals,
    disabled,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    const baseCurrencyCode = useCurrencies();

    const errorMessageTargetName =
        stateFinancialGoals.financialGoalNameInfo.length > additionalInfoTextLimit
            ? translate('MAX_LENGTH', { length: additionalInfoTextLimit })
            : undefined;

    const errorMessageTargetValue =
        Number(stateFinancialGoals.financialGoalTargetValue) > goalValueLimit
            ? translate('WITHIN_LIMIT_ONLY', { limit: goalValueLimit })
            : Number(stateFinancialGoals.financialGoalTargetValue) < 0
            ? translate('MIN_NUMBER', { min: '0' })
            : undefined;

    const goalNameId = useId('goal-name-information');
    const targetId = useId('goal-target-information');
    const DigitsMask = '9999999999999999';

    return (
        <Stack tokens={section}>
            <Label htmlFor={goalNameId} styles={labelStyles} required>
                {translate('FINANCIAL_GOAL_NAME_AND_TARGET_AMOUNT')}
            </Label>
            <TextField
                id={goalNameId}
                defaultValue={stateFinancialGoals.financialGoalNameInfo}
                onChange={onChangeFinancialGoalName}
                placeholder={translate('FINANCIAL_GOAL_NAME_EXAMPLE')}
                title={translate('FINANCIAL_GOAL_NAME_EXAMPLE')}
                errorMessage={errorMessageTargetName}
                disabled={disabled}
            />
            <MaskedTextField
                id={targetId}
                value={stateFinancialGoals.financialGoalTargetValue}
                onChange={onChangeFinancialGoalTargetAmount}
                placeholder={translate('AMOUNT_IN', { code: baseCurrencyCode.baseCurrencyCode })}
                title={translate('AMOUNT_IN', { code: baseCurrencyCode.baseCurrencyCode })}
                mask={DigitsMask}
                maskChar={''}
                disabled={disabled}
                errorMessage={errorMessageTargetValue}
            />
        </Stack>
    );
};

export default FinancialGoalTargetValues;
