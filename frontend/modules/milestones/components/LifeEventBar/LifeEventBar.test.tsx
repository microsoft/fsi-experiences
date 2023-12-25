import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { lifeEventsToCategories } from '../../utilities/LifeEventsUtils';
import mockLifeEvents from '../../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../../interfaces/mocks/LifeEventsConfigurations.mock';
import { LifeEventBar } from './LifeEventBar';
import { LifeEventContext, lifeEventContextInitialValue } from '../../LifeEvent.context';
import { LifeEventCategory } from '../../interfaces';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { CURDOperationType, DialogConfig, ErrorDialogProps } from '../../interfaces/LifeEvents.interface';
import { FinancialGoalContext, financialGoalContextInitialValue } from '../../goals/FinancialGoal.context';

describe('LifeEventBar', () => {
    const setEditDialogConfig = jest.fn();
    const setOpenSidePanelCategory = jest.fn();
    const addLifeEventCallback = jest.fn();
    const editLifeEventCallback = jest.fn();
    const addFinancialGoalCallback = jest.fn();
    const setFinancialGoalsDialog = jest.fn();

    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const dummyDialogInitialValue = {
        id: '4c0ab1e4-3153-eb11-a812-000d3a5ba768',
        categoryCode: 104800002,
        typeCode: 104800005,
        title: 'Amanda Carrington ',
        date: new Date('2000-08-07T18:00:00.000Z'),
    };

    const dummyFinancialGoal = {
        lifeEventId: '4c0ab1e4-3153-eb11-a812-000d3a5ba768',
        id: '4c0ab1e4-5534-eb11-a812-000d3a5ba768',
        targetName: 'adopt child',
        targetDate: new Date('2040-08-11T18:00:00.000Z'),
        targetValue: 12003000,
        isCompleted: false,
    };

    const dummyEditFinancialGoal: DialogConfig = {
        initialValue: {
            ...dummyDialogInitialValue,
        },
        enableEdit: true,
    };

    const getContextValue = (categoriesCollection: LifeEventCategory[] = categories, errorDialog?: ErrorDialogProps) => {
        return {
            ...lifeEventContextInitialValue,
            setOpenSidePanelCategory,
            setEditDialogConfig,
            errorDialog,
            configuration: mockLifeEventsConf,
            categoriesCollection,
            addLifeEventCallback,
            editLifeEventCallback,
        };
    };

    const getGoalsContextValue = (categoriesCollection: LifeEventCategory[] = categories, errorDialog?: ErrorDialogProps) => {
        return {
            ...financialGoalContextInitialValue,
            setOpenSidePanelCategory,
            setEditDialogConfig,
            errorDialog,
            configuration: mockLifeEventsConf,
            categoriesCollection,
            addLifeEventCallback,
            editLifeEventCallback,
            addFinancialGoalCallback,
            setFinancialGoalsDialog,
            editFinancialGoalsDialog: dummyEditFinancialGoal,
        };
    };

    const getLifeEventBarWithContext = value => {
        return (
            <LifeEventContext.Provider value={value}>
                <LifeEventBar />
            </LifeEventContext.Provider>
        );
    };

    const getFinancialGoalBarWithContext = value => {
        return (
            <LifeEventContext.Provider value={value}>
                <FinancialGoalContext.Provider value={value}>
                    <LifeEventBar />
                </FinancialGoalContext.Provider>
            </LifeEventContext.Provider>
        );
    };

    const renderEventBarTestElement = value => render(getLifeEventBarWithContext(value));
    const renderGoalsTestElement = value => render(getFinancialGoalBarWithContext(value));

    beforeEach(() => {
        setEditDialogConfig.mockClear();
    });

    it('Should render category list correctly with title', async () => {
        const contextValue = getContextValue();
        const { getAllByTestId, getByText } = renderEventBarTestElement(contextValue);

        const categoryElements = getAllByTestId(/life-event-category-wrapper/i);

        expect(categoryElements.length).toEqual(10);
        expect(getByText(lifeEventStrings.LIFE_EVENT_AND_GOAL_LABEL)).toBeVisible();
    });

    it('Should call edit dialog action when on clicking new event button', async () => {
        const contextValue = getContextValue();
        const { getByTestId } = renderEventBarTestElement(contextValue);
        fireEvent.click(getByTestId('add-event-header'));

        expect(setEditDialogConfig).toHaveBeenCalledWith({ initialValue: {} });
    });

    it('Should call edit dialog action when clicking on overlay', async () => {
        const contextValue = getContextValue();
        const { container, getByTitle, rerender } = renderEventBarTestElement(contextValue);

        const ballonsIcon = container.querySelector('[data-icon-name="Balloons"]');
        expect(ballonsIcon).toBeInTheDocument();
        fireEvent.click(ballonsIcon as Element);
        expect(setOpenSidePanelCategory).toHaveBeenCalledWith(104800000);

        const openedSidePanelContextValue = { ...getContextValue(), editDialogConfig: { initialValue: {} } };
        rerender(getLifeEventBarWithContext(openedSidePanelContextValue));

        const closeButton = getByTitle('Close');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(setEditDialogConfig).toHaveBeenCalledWith(undefined);
    });

    it('Should call editLifeEventCallback', async () => {
        const contextValue = {
            ...getGoalsContextValue(),
            editDialogConfig: { initialValue: dummyDialogInitialValue },
        };
        const { getByTestId } = renderEventBarTestElement(contextValue);
        const saveButton = getByTestId('add-event-dialog');

        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton as Element);
        expect(editLifeEventCallback).toHaveBeenCalled();
    });

    it('Should call addLifeEventCallback', async () => {
        const dummyWithOutId = { ...dummyDialogInitialValue, id: undefined };
        const contextValue = { ...getContextValue(), editDialogConfig: { initialValue: dummyWithOutId } };
        const { getByTestId } = renderEventBarTestElement(contextValue);
        const saveButton = getByTestId('add-event-dialog');

        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton as Element);
        expect(addLifeEventCallback).toHaveBeenCalled();
    });

    it('Should call editFinancialGoalCallback', async () => {
        const contextValue = {
            ...getGoalsContextValue(),
            editDialogConfig: { initialValue: { ...dummyDialogInitialValue, financialGoal: dummyFinancialGoal } },
        };
        const { getByTestId } = renderGoalsTestElement(contextValue);
        const saveButton = getByTestId('add-event-dialog');

        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton as Element);
        expect(editLifeEventCallback).toHaveBeenCalled();
    });

    it('Should call addFinancialGoalCallback', async () => {
        const dummyWithOutId = { ...dummyDialogInitialValue };
        const contextValue = {
            ...getGoalsContextValue(),
            editDialogConfig: { initialValue: { ...dummyWithOutId, financialGoal: { ...dummyFinancialGoal, id: '' } } },
            editFinancialGoalsDialog: { initialValue: { ...dummyWithOutId, financialGoal: { ...dummyFinancialGoal, id: '' } } },
        };

        const { getByTestId } = renderGoalsTestElement(contextValue);
        const saveButton = getByTestId('add-event-dialog');
        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton as Element);
        expect(addFinancialGoalCallback).toHaveBeenCalled();
    });

    it('Should render empty state for empty category list', async () => {
        const contextValue = getContextValue([]);
        const { getByTestId, getByText, queryByTestId } = renderEventBarTestElement(contextValue);

        expect(queryByTestId(/life-event-category-wrapper/i)).not.toBeInTheDocument();

        expect(getByTestId('empty-state')).toBeVisible();

        expect(getByText(lifeEventStrings.LIFE_EVENTS_EMPTY_STATE_TITLE)).toBeVisible();
    });

    it('Should show operation error dialogs', async () => {
        let contextValue = getContextValue(categories, { operationError: CURDOperationType.Delete });
        const { getByText, rerender } = renderEventBarTestElement(contextValue);

        expect(getByText(lifeEventStrings.LIFE_EVENT_ERROR_DIALOG_TITLE_Delete)).toBeInTheDocument();

        contextValue = getContextValue(categories, { operationError: CURDOperationType.Create });
        rerender(getLifeEventBarWithContext(contextValue));

        expect(getByText(lifeEventStrings.LIFE_EVENT_ERROR_DIALOG_TITLE_Create)).toBeInTheDocument();

        contextValue = getContextValue(categories, { operationError: CURDOperationType.Update });
        rerender(getLifeEventBarWithContext(contextValue));

        expect(getByText(lifeEventStrings.LIFE_EVENT_ERROR_DIALOG_TITLE_Update)).toBeInTheDocument();
    });

    it('Should show operation retry dialogs', async () => {
        const retryFunc = jest.fn();
        let contextValue = getContextValue(categories, { operationError: CURDOperationType.Create, retryFunc });
        const { getByText, rerender } = renderEventBarTestElement(contextValue);

        expect(getByText(lifeEventStrings.LIFE_EVENT_RETRY_DIALOG_TITLE_Create)).toBeInTheDocument();
        let tryAgainButton = getByText(commonStrings.TRY_AGAIN);
        expect(tryAgainButton).toBeInTheDocument();
        fireEvent.click(tryAgainButton);
        await waitFor(() => {
            expect(retryFunc).toBeCalled();
        });
        contextValue = getContextValue(categories, { operationError: CURDOperationType.Update, retryFunc });
        rerender(getLifeEventBarWithContext(contextValue));
        await waitFor(() => {
            expect(getByText(lifeEventStrings.LIFE_EVENT_RETRY_DIALOG_TITLE_Update)).toBeInTheDocument();
        });
        tryAgainButton = getByText(commonStrings.TRY_AGAIN);
        expect(tryAgainButton).toBeInTheDocument();
        fireEvent.click(tryAgainButton);
        expect(retryFunc).toBeCalled();

        contextValue = getContextValue(categories, { operationError: CURDOperationType.Delete, retryFunc });
        rerender(getLifeEventBarWithContext(contextValue));
        await waitFor(() => {
            expect(getByText(lifeEventStrings.LIFE_EVENT_RETRY_DIALOG_TITLE_Delete)).toBeInTheDocument();
        });
        tryAgainButton = getByText(commonStrings.TRY_AGAIN);
        expect(tryAgainButton).toBeInTheDocument();
        fireEvent.click(tryAgainButton);
        expect(retryFunc).toBeCalled();
    });
});
