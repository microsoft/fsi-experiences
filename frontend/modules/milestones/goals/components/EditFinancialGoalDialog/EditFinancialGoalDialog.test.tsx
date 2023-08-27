import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockLifeEvents from '../../../interfaces/mocks/LifeEvents.mock';
import { LifeEvent } from '../../../interfaces/LifeEvent';
import { LifeEventContext, lifeEventContextInitialValue } from '../../../LifeEvent.context';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import EditFinancialGoalDialog from './EditFinancialGoalDialog';
import addDays from 'date-fns/addDays';
import { IFinancialGoal } from '../../interfaces/FinancialGoal.interface';

describe('EditFinancialGoalDialog', () => {
    const onDialogDismiss = jest.fn();
    const onSave = jest.fn();
    const setPopUp = jest.fn();
    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;

    const eventDate = addDays(new Date(), 365);

    const testEventToEdit: Partial<LifeEvent> = {
        categoryCode: testCategoryCode,
        id: 'test-id',
        title: 'test-title',
        typeCode: testTypeCode,
        date: eventDate,
    };

    const testFinancialGoal: IFinancialGoal = {
        lifeEventId: 'test-id',
        id: '4c0ab1e4-5534-eb11-a812-000p3a5ba768',
        targetName: 'buy child tesla',
        targetDate: new Date('2040-08-11T18:00:00.000Z'),
        targetValue: 130000,
        isCompleted: false,
    };

    const modifiedLifeEvent = { ...testEventToEdit, modified_on: new Date() };

    const fetchLifeEventById = jest.fn().mockResolvedValue(testEventToEdit);

    const getContextValue = () => {
        return {
            ...lifeEventContextInitialValue,
            configuration: mockLifeEventsConf,
            fetchLifeEventById,
            categoriesCollection: categories,
        };
    };

    const renderEventEditDialogTestElement = (visible: boolean, editPopUp: boolean, initialValue?: Partial<LifeEvent>) => {
        return render(
            <LifeEventContext.Provider value={getContextValue()}>
                <EditFinancialGoalDialog
                    visible={visible}
                    initialValue={initialValue}
                    categoriesCollection={categories}
                    configuration={mockLifeEventsConf}
                    onDialogDismiss={onDialogDismiss}
                    onSave={onSave}
                    editPopUp={editPopUp}
                    setPopUp={setPopUp}
                />
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        fetchLifeEventById.mockClear();
        onDialogDismiss.mockClear();
        onSave.mockClear();
    });

    it('Shouldnt create new financial goal', async () => {
        // create an event
        const { getByRole, getByTestId } = renderEventEditDialogTestElement(true, true, modifiedLifeEvent);

        act(() => {
            //create a financial goal
            fireEvent.click(getByRole('button', { name: commonStrings.ADD }));
            //cancel financial goal creating
            fireEvent.click(getByRole('button', { name: lifeEventStrings.LIFE_EVENT_CANCEL_BUTTON_LABEL }));
        });

        expect(getByTestId('add-financial-goal-dialog')).not.toBeVisible();
    });

    it('Should open popup window and not create financial goal', async () => {
        // create an event
        const { getByRole, getByText } = renderEventEditDialogTestElement(true, false, modifiedLifeEvent);

        expect(getByText(lifeEventStrings.FINANCIAL_CATEGORY_CREATED.replace('{{category}}', 'vehicle'))).toBeInTheDocument();

        act(() => {
            fireEvent.click(getByRole('button', { name: commonStrings.DONE }));
        });

        expect(onDialogDismiss).toHaveBeenCalled();
    });

    it('Should open popup window and create new financial goal', async () => {
        // create an event
        const { getByRole, getByText } = renderEventEditDialogTestElement(true, false, modifiedLifeEvent);

        expect(getByText(lifeEventStrings.FINANCIAL_CATEGORY_CREATED.replace('{{category}}', 'vehicle'))).toBeInTheDocument();

        act(() => {
            fireEvent.click(getByRole('button', { name: lifeEventStrings.ADD_FINANCIAL_GOAL }));
        });

        expect(setPopUp).toHaveBeenCalled();
    });

    it('Should open edit financial goal', async () => {
        const existingLifeEventMock = { ...modifiedLifeEvent, financialGoal: { ...testFinancialGoal } };
        // create an event
        const { getByPlaceholderText } = renderEventEditDialogTestElement(false, true, existingLifeEventMock);

        expect(getByPlaceholderText(lifeEventStrings.FINANCIAL_GOAL_NAME_EXAMPLE)).toBeInTheDocument();
    });
});
