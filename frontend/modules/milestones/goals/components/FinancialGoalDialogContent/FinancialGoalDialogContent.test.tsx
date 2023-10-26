import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockLifeEvents from '../../../interfaces/mocks/LifeEvents.mock';
import { LifeEvent } from '../../../interfaces';
import { LifeEventContext } from '../../../LifeEvent.context';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { defaultDatePattern } from '@fsi/core-components/dist/components';
import addDays from 'date-fns/addDays';
import FinancialGoalDialogContent from './FinancialGoalDialogContent';
import { DialogType } from '@fluentui/react/lib/components/Dialog/DialogContent.types';
import { IFinancialGoal } from '../../interfaces/FinancialGoal.interface';
import { FinancialGoalContext, financialGoalContextInitialValue } from '../../FinancialGoal.context';
import subDays from 'date-fns/subDays';

describe('FinancialGoalDialogContent', () => {
    const onDialogDismiss = jest.fn();
    const onSave = jest.fn();
    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const testCategoryCode = 104800006;
    const testCategoryName = 'Vehicle';
    const testTypeCode = 104800015;
    const testTypeName = 'Purchase';

    const eventDate = addDays(new Date(), 365);
    const enteredInfo = 'Buy new Tesla';
    const amount = 2200;

    const testEventToEdit: Partial<LifeEvent> = {
        categoryCode: testCategoryCode,
        id: 'test-id',
        title: 'test-title',
        typeCode: testTypeCode,
        date: eventDate,
    };

    const testFinancialGoal: IFinancialGoal = {
        lifeEventId: 'test-id',
        id: '4c0ab1e4-5534-eb11-a812-000d3a5ba768',
        targetName: 'buy child tesla',
        targetDate: eventDate,
        targetValue: 130000,
        isCompleted: false,
    };

    const targetTime = addDays(Date.now(), 1000).toLocaleDateString();

    const dialogFinancialGoalProps = {
        type: DialogType.normal,
        title: lifeEventStrings.FINANCIAL_CATEGORY_CREATED.replace('{{category}}', testCategoryName),
        closeButtonAriaLabel: lifeEventStrings.LIFE_EVENT_DIALOG_CLOSE,
        subText: lifeEventStrings.INFORMATION_FINANCIAL_GOAL.replace('{{type}}', testTypeName).replace(
            '{{date}}',
            testEventToEdit.date?.toLocaleString() || new Date().toLocaleString()
        ),
    };

    const fetchLifeEventById = jest.fn().mockResolvedValue(testEventToEdit);

    const getContextValue = () => {
        return {
            ...financialGoalContextInitialValue,
            configuration: mockLifeEventsConf,
            fetchLifeEventById,
            categoriesCollection: categories,
        };
    };

    const renderFinancialGoalDialogContentElement = (isEditDialog: boolean, initialValue?: Partial<LifeEvent>) => {
        return render(
            <LifeEventContext.Provider value={getContextValue()}>
                <FinancialGoalContext.Provider value={getContextValue()}>
                    <FinancialGoalDialogContent
                        visible={true}
                        initialValue={initialValue}
                        categoriesCollection={categories}
                        configuration={mockLifeEventsConf}
                        onDialogDismiss={onDialogDismiss}
                        onSave={onSave}
                        dialogFinancialGoalProps={dialogFinancialGoalProps}
                        categoryName={testCategoryName}
                        isEditDialog={isEditDialog}
                    />
                </FinancialGoalContext.Provider>
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        fetchLifeEventById.mockClear();
        onDialogDismiss.mockClear();
        onSave.mockClear();
    });

    it('Should create financial goal via date picker', async () => {
        const { getByPlaceholderText, getByRole, getByTestId } = renderFinancialGoalDialogContentElement(false, testEventToEdit);

        fireEvent.change(getByPlaceholderText(lifeEventStrings.FINANCIAL_GOAL_NAME_EXAMPLE), { target: { value: enteredInfo } });
        fireEvent.change(getByPlaceholderText(commonStrings.AMOUNT_IN.replace('{{code}}', 'USD')), { target: { value: amount } });
        expect(getByRole('button', { name: commonStrings.ADD })).toBeEnabled();

        const dateInput = getByPlaceholderText(defaultDatePattern, { exact: false });
        fireEvent.click(dateInput);
        fireEvent.change(dateInput, { target: { value: targetTime } });
        fireEvent.blur(dateInput);

        fireEvent.click(getByTestId('add-financial-goal-dialog'));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({
                financialGoal: {
                    progressValue: undefined,
                    targetDate: new Date(targetTime),
                    targetName: enteredInfo,
                    targetValue: amount,
                    isCompleted: false,
                    id: '',
                    lifeEventId: testEventToEdit.id,
                },
            })
        );
    });

    it('Should edit financial goal', async () => {
        const newDate = subDays(eventDate, 14);
        const prevGoal = { ...testFinancialGoal, targetDate: newDate, isCompleted: true };
        const existingLifeEvent = { ...testEventToEdit, modified_on: new Date(), financialGoal: prevGoal };

        const { getByPlaceholderText, getByText, getByTestId } = renderFinancialGoalDialogContentElement(true, existingLifeEvent);

        const titleEdit = lifeEventStrings.EDIT_FINANCIAL_GOAL.replace('{{goal}}', testFinancialGoal.targetName);
        expect(getByText(titleEdit)).toBeValid();

        fireEvent.click(getByText(lifeEventStrings.GOAL_COMPLETED));
        expect(getByText(lifeEventStrings.MARK_GOAL_AS_COMPLETE)).toBeValid();

        const dateInput = getByPlaceholderText(defaultDatePattern, { exact: false });
        fireEvent.click(dateInput);
        fireEvent.change(dateInput, { target: { value: targetTime } });
        fireEvent.blur(dateInput);

        expect(getByTestId('add-financial-goal-dialog')).toBeEnabled();
        fireEvent.click(getByTestId('add-financial-goal-dialog'));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({
                financialGoal: {
                    ...testFinancialGoal,
                    targetDate: new Date(targetTime),
                    isCompleted: false,
                },
            })
        );
    });
});
