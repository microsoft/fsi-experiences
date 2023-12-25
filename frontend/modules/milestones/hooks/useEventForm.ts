import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { LifeEventCategory } from '../interfaces';
import { ILifeEventConfigurations } from '../interfaces/Configuration';
import { LifeEvent } from '../interfaces/LifeEvent';
import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import { IComboBoxOption, IComboBoxProps } from '@fluentui/react/lib/ComboBox';
import { LifeEventContext } from '../LifeEvent.context';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { onChangeDefaultFunction, RelativeDateOptionsEnum, RelativeDateRadioOptionsEnum } from '../interfaces/EditEventDialog.interface';
import { additionalInfoTextLimit, currentDate, goalValueLimit, maxDate, minDate } from '../constants/EditEventDialog.consts';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import { IFinancialGoal } from '../goals/interfaces/FinancialGoal.interface';
import isSameDay from 'date-fns/isSameDay';
import max from 'date-fns/max';
import min from 'date-fns/min';

export interface IUseEventForm {
    visible: boolean;
    initialValue?: Partial<LifeEvent>;
    onSave: (lifeEvent: LifeEvent) => void;
    configuration: ILifeEventConfigurations;
    categoriesCollection: LifeEventCategory[];
    translate: TranslationFunction;
    isFinancialGoalUpdate?: boolean;
}

export interface IUseEventFormOutput {
    relativeDateRadioOptions: IChoiceGroupOption[];
    relativeDateOptions: IComboBoxOption[];
    state: IState;
    isNew: boolean;
    hideCategory: boolean;
    hideType: boolean;
    categoryOptions: IComboBoxOption[];
    typeOptions: IComboBoxOption[];
    onCategoryOptionsChanged: IComboBoxProps['onChange'];
    onTypeOptionsChanged: IComboBoxProps['onChange'];
    onChangeTitleFieldValue: onChangeDefaultFunction;
    onRelativeDateChange: onChangeDefaultFunction;
    onRelativeRadioChange: onChangeDefaultFunction;
    onRelativeAmountChange: onChangeDefaultFunction;
    handleSave: () => void;
    onSelectedDate: (date: Date | null | undefined) => void;
    saveButtonDisabled: boolean;
    isOtherCategory: boolean;
    minDate: Date;
    maxDate: Date;
    onChangeFinancialGoalName: onChangeDefaultFunction;
    onChangeFinancialGoalTargetAmount: onChangeDefaultFunction;
    saveButtonDisabledFinancialGoal: boolean;
    onChangeFinancialGoalComplete: onChangeDefaultFunction;
    onSelectedDateFinancialGoal: (date: Date | null | undefined) => void;
}

const functionsOfRelativeDate = {
    [RelativeDateOptionsEnum.days]: addDays,
    [RelativeDateOptionsEnum.weeks]: addWeeks,
    [RelativeDateOptionsEnum.months]: addMonths,
    [RelativeDateOptionsEnum.years]: addYears,
};
interface IState {
    selectedCategoryCode: number;
    selectedType: number;
    selectedDate?: Date;
    additionalInfo: string;
    relativeDateAmount?: string;
    relativeDateSelected?: RelativeDateOptionsEnum | null;
    relativeDateSelectedRadio: RelativeDateRadioOptionsEnum;
    stateFinancialGoals: IStateFinancialGoal;
}

export interface IStateFinancialGoal {
    financialGoalNameInfo: string;
    financialGoalTargetValue: string;
    financialGoalTargetDate?: Date;
    financialGoalProgressInfo?: number;
    financialGoalCompleted: boolean;
}

const relativeDateMaxInputLengthMap = {
    days: 5,
    weeks: 4,
    months: 3,
    years: 2,
    default: 5,
};

const useEventForm: (options: IUseEventForm) => IUseEventFormOutput = ({
    initialValue,
    visible,
    translate,
    configuration,
    categoriesCollection,
    onSave,
    isFinancialGoalUpdate,
}) => {
    const relativeDateRadioOptions: IChoiceGroupOption[] = useMemo(
        () => [
            { key: RelativeDateRadioOptionsEnum.ago, text: translate('AGO') },
            { key: RelativeDateRadioOptionsEnum.fromToday, text: translate('FROM_TODAY') },
        ],
        [translate]
    );

    const relativeDateOptions: IComboBoxOption[] = useMemo(
        () => [
            { key: RelativeDateOptionsEnum.days, text: translate('DAYS') },
            { key: RelativeDateOptionsEnum.weeks, text: translate('WEEKS') },
            { key: RelativeDateOptionsEnum.months, text: translate('MONTHS') },
            { key: RelativeDateOptionsEnum.years, text: translate('YEARS') },
        ],
        [translate]
    );

    const { fetchLifeEventById } = useContext(LifeEventContext);

    const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);

    const [state, setState] = useState<IState>({
        selectedCategoryCode: initialValue?.categoryCode || 0,
        selectedType: initialValue?.typeCode || 0,
        selectedDate: initialValue?.date,
        additionalInfo: initialValue?.title || '',
        relativeDateSelectedRadio: relativeDateRadioOptions[1].key as RelativeDateRadioOptionsEnum,
        relativeDateSelected: undefined,
        relativeDateAmount: undefined,
        stateFinancialGoals: {
            financialGoalNameInfo: initialValue?.financialGoal?.targetName || '',
            financialGoalTargetValue: initialValue?.financialGoal?.targetValue.toString() || '',
            financialGoalTargetDate: initialValue?.financialGoal?.targetDate || max([initialValue?.date!, currentDate]),
            financialGoalProgressInfo: initialValue?.financialGoal?.progressValue,
            financialGoalCompleted: initialValue?.financialGoal?.isCompleted || false,
        },
    });

    const {
        selectedCategoryCode,
        selectedType,
        selectedDate,
        additionalInfo,
        relativeDateAmount,
        relativeDateSelected,
        relativeDateSelectedRadio,
        stateFinancialGoals,
    } = state;

    useEffect(() => {
        if (visible && initialValue?.id) {
            refreshDialogValues(initialValue?.id);
        }
    }, [visible]);

    useEffect(() => {
        if (relativeDateSelected && relativeDateAmount) {
            setState(prevState => ({
                ...prevState,
                relativeDateAmount:
                    relativeDateAmount.length > relativeDateMaxInputLengthMap[relativeDateSelected]
                        ? relativeDateAmount.slice(0, relativeDateMaxInputLengthMap[relativeDateSelected])
                        : relativeDateAmount,
            }));
        }
        if (
            relativeDateAmount &&
            !isNaN(+relativeDateAmount) &&
            relativeDateSelected &&
            Object.values(RelativeDateOptionsEnum).includes(relativeDateSelected)
        ) {
            const sign = relativeDateSelectedRadio === RelativeDateRadioOptionsEnum.ago ? -1 : 1;
            const signedAmount = parseFloat(`${relativeDateAmount}`) * sign;
            let newSelectedDate = functionsOfRelativeDate[relativeDateSelected](new Date(), signedAmount);

            if (relativeDateSelected === RelativeDateOptionsEnum.years && !Number.isInteger(signedAmount)) {
                const daysToAddByFraction = (signedAmount % 1) * 365;
                newSelectedDate = addDays(newSelectedDate, daysToAddByFraction);
            }

            if (isAfter(newSelectedDate, maxDate) || isBefore(newSelectedDate, minDate)) {
                return;
            }

            if (isFinancialGoalUpdate) {
                setState(prevState => ({
                    ...prevState,
                    stateFinancialGoals: { ...prevState.stateFinancialGoals, financialGoalTargetDate: newSelectedDate },
                }));
            } else {
                setState(prevState => ({ ...prevState, selectedDate: newSelectedDate }));
            }
        }
    }, [initialValue, relativeDateAmount, relativeDateSelected, relativeDateSelectedRadio]);

    const refreshDialogValues = async (id: string) => {
        try {
            const lifeEvent = await fetchLifeEventById(id);
            setState(prevState => ({
                ...prevState,
                selectedCategoryCode: lifeEvent.categoryCode,
                selectedType: lifeEvent.typeCode,
                selectedDate: lifeEvent?.date,
                additionalInfo: lifeEvent?.title || '',
                stateFinancialGoals: {
                    ...prevState.stateFinancialGoals,
                    financialGoalNameInfo: lifeEvent.financialGoal?.targetName || '',
                    financialGoalTargetValue: lifeEvent.financialGoal?.targetValue ? lifeEvent.financialGoal?.targetValue.toString() : '',
                    financialGoalTargetDate: lifeEvent.financialGoal?.targetDate || lifeEvent?.date,
                    financialGoalProgressInfo: lifeEvent.financialGoal?.progressValue,
                    financialGoalCompleted: lifeEvent.financialGoal?.isCompleted || false,
                },
            }));
        } catch (e) {
            // console.error('failed to refresh dialog values', e)
        }
    };

    const isNew = !initialValue?.id;

    const hideCategory = !!(!isNew || initialValue?.categoryCode);

    const isOtherCategory = selectedCategoryCode === configuration.otherCategoryCode;

    const hideType = !hideCategory && isNew && isOtherCategory;

    const categoryOptions: IComboBoxOption[] = useMemo(
        () =>
            categoriesCollection?.map(category => ({
                key: category.categoryCode,
                text: category.categoryName,
                disabled: category.categoryCode === configuration.birthdayCategoryCode,
            })) || [],
        [categoriesCollection]
    );

    const typeOptions = useMemo(
        () =>
            configuration.categoryConfig
                .find(cat => cat.categoryCode === selectedCategoryCode)
                ?.types.map(type => ({
                    key: type.typeCode,
                    text: type.typeName,
                    disabled: type.typeCode === configuration.birthdayTypeCode,
                    displayOrder: type.displayOrder || Infinity,
                }))
                .sort((t1: any, t2: any) => {
                    return t1.displayOrder >= t2.displayOrder ? 1 : -1;
                }) || [],
        [configuration.categoryConfig, selectedCategoryCode]
    );

    const onCategoryOptionsChanged: IComboBoxProps['onChange'] = useCallback((_, option) => {
        const selectedCategory = option?.key as number;
        setState(prevState => ({ ...prevState, selectedCategoryCode: selectedCategory, selectedType: 0 }));

        return selectedCategory;
    }, []);

    const onTypeOptionsChanged: IComboBoxProps['onChange'] = useCallback(
        (_, option) => {
            const selectedTypeCB = option?.key as number;

            if (selectedTypeCB !== undefined && selectedCategoryCode > 0) {
                const obj = configuration.categoryConfig
                    .find(cat => cat.categoryCode === selectedCategoryCode)
                    ?.types.find(e => e.typeCode === selectedTypeCB);

                /* istanbul ignore if */
                if (obj === undefined) {
                    setState(prevState => ({ ...prevState, selectedCategoryCode: 0 }));

                    return selectedTypeCB;
                }
            }

            setState(prevState => ({ ...prevState, selectedType: selectedTypeCB }));

            return selectedTypeCB;
        },
        [configuration.categoryConfig, selectedCategoryCode]
    );

    const onChangeTitleFieldValue = useCallback((_, newValue) => {
        setState(prevState => ({ ...prevState, additionalInfo: newValue || '' }));
    }, []);

    const onRelativeDateChange = useCallback((_, newValue) => {
        setState(prevState => ({ ...prevState, relativeDateSelected: newValue.key }));
    }, []);

    const onRelativeRadioChange = useCallback((_, newValue) => {
        setState(prevState => ({ ...prevState, relativeDateSelectedRadio: newValue.key }));
    }, []);

    const onRelativeAmountChange = useCallback((_, newValue) => {
        setState(prevState => ({ ...prevState, relativeDateAmount: newValue }));
    }, []);

    const onChangeFinancialGoalName = useCallback((_, newValue) => {
        setState(prevState => ({
            ...prevState,
            stateFinancialGoals: { ...prevState.stateFinancialGoals, financialGoalNameInfo: newValue },
        }));
    }, []);

    const onChangeFinancialGoalTargetAmount = useCallback((_, newValue) => {
        setState(prevState => ({
            ...prevState,
            stateFinancialGoals: { ...prevState.stateFinancialGoals, financialGoalTargetValue: newValue || 0 },
        }));
    }, []);

    const onChangeFinancialGoalComplete = useCallback((_, newValue) => {
        setState(prevState => ({
            ...prevState,
            stateFinancialGoals: { ...prevState.stateFinancialGoals, financialGoalCompleted: newValue },
        }));
    }, []);

    const handleSave = useCallback(() => {
        const financialGoalData: IFinancialGoal = {
            id: initialValue?.financialGoal?.id || '',
            targetName: stateFinancialGoals.financialGoalNameInfo || '',
            targetDate: stateFinancialGoals.financialGoalTargetDate || selectedDate,
            targetValue: parseFloat(`${stateFinancialGoals.financialGoalTargetValue}`),
            progressValue: stateFinancialGoals.financialGoalProgressInfo,
            isCompleted: stateFinancialGoals.financialGoalCompleted,
            lifeEventId: initialValue?.id || '',
        };

        const lifeEvent: LifeEvent = {
            id: initialValue?.id || '',
            created_on: new Date(),
            modified_on: new Date(),
            title: additionalInfo,
            date: selectedDate,
            categoryCode: selectedCategoryCode,
            typeCode: selectedType,
        };

        const lifeEventData: LifeEvent = financialGoalData.targetName ? { ...lifeEvent, financialGoal: financialGoalData } : lifeEvent;
        onSave(lifeEventData);
        setDisableSaveButton(true);
    }, [additionalInfo, initialValue, onSave, selectedCategoryCode, selectedDate, selectedType, stateFinancialGoals]);

    const onSelectedDate = useCallback(
        (date: Date | null | undefined): void => {
            if (!date) {
                return;
            }
            setState(prevState => ({
                ...prevState,
                selectedDate: date || undefined,
                relativeDateSelectedRadio: relativeDateRadioOptions[1].key as RelativeDateRadioOptionsEnum,
                relativeDateSelected: null,
                relativeDateAmount: '',
            }));
        },
        [relativeDateRadioOptions]
    );

    const onSelectedDateFinancialGoal = useCallback(
        (date: Date | null | undefined): void => {
            if (!date) {
                return;
            }
            setState(prevState => ({
                ...prevState,
                relativeDateSelectedRadio: relativeDateRadioOptions[1].key as RelativeDateRadioOptionsEnum,
                relativeDateSelected: null,
                relativeDateAmount: '',
                stateFinancialGoals: {
                    ...prevState.stateFinancialGoals,
                    financialGoalTargetDate: date,
                    financialGoalRelativeDateAmount: '',
                },
            }));
        },
        [relativeDateRadioOptions]
    );

    useEffect(() => {
        if (selectedCategoryCode === configuration.otherCategoryCode) {
            setState(prevState => ({ ...prevState, selectedType: configuration.otherTypeCode }));
        }
    }, [configuration.otherCategoryCode, configuration.otherTypeCode, selectedCategoryCode]);

    const saveButtonDisabled = useMemo(() => {
        if (additionalInfo.length > additionalInfoTextLimit) {
            return true;
        }

        if (!selectedDate) {
            return true;
        }

        if (!selectedCategoryCode || !selectedType) {
            return true;
        }

        if (isOtherCategory && !additionalInfo) {
            return true;
        }

        return disableSaveButton || false;
    }, [additionalInfo, selectedDate, selectedCategoryCode, selectedType, isOtherCategory, disableSaveButton]);

    const isOutOfBoundNameAndValue =
        stateFinancialGoals.financialGoalNameInfo.length > additionalInfoTextLimit ||
        parseFloat(`${stateFinancialGoals.financialGoalTargetValue}`) > goalValueLimit ||
        parseFloat(`${stateFinancialGoals.financialGoalTargetValue}`) < 0;

    const isOutOfBoundDate =
        isBefore(stateFinancialGoals.financialGoalTargetDate!, min([initialValue?.date!, new Date()])) &&
        !isSameDay(stateFinancialGoals.financialGoalTargetDate!, min([initialValue?.date!, new Date()]));

    const isInvalidIncomplete = !stateFinancialGoals.financialGoalCompleted && isOutOfBoundDate;

    const isInvalidGoal = isOutOfBoundNameAndValue || !(stateFinancialGoals.financialGoalNameInfo && stateFinancialGoals.financialGoalTargetValue);

    const isGoalNotDirty =
        stateFinancialGoals.financialGoalNameInfo === initialValue?.financialGoal?.targetName &&
        stateFinancialGoals.financialGoalTargetValue === initialValue?.financialGoal?.targetValue.toString() &&
        isSameDay(stateFinancialGoals.financialGoalTargetDate!, initialValue?.financialGoal?.targetDate!) &&
        stateFinancialGoals.financialGoalCompleted === initialValue?.financialGoal?.isCompleted;

    const saveButtonDisabledFinancialGoal = useMemo(
        () => disableSaveButton || isInvalidGoal || isGoalNotDirty || !!isInvalidIncomplete,
        [disableSaveButton, isInvalidGoal, isGoalNotDirty, isInvalidIncomplete]
    );

    return {
        relativeDateRadioOptions,
        relativeDateOptions,
        state,
        isNew,
        hideType,
        hideCategory,
        categoryOptions,
        typeOptions,
        onCategoryOptionsChanged,
        onTypeOptionsChanged,
        onChangeTitleFieldValue,
        onRelativeDateChange,
        onRelativeRadioChange,
        onRelativeAmountChange,
        handleSave,
        onSelectedDate,
        saveButtonDisabled,
        isOtherCategory,
        minDate,
        maxDate,
        onChangeFinancialGoalName,
        onChangeFinancialGoalTargetAmount,
        saveButtonDisabledFinancialGoal,
        onChangeFinancialGoalComplete,
        onSelectedDateFinancialGoal,
    };
};

export default useEventForm;
