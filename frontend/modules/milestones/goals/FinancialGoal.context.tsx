/* istanbul ignore file */
import React, { FC, createContext, useReducer, useCallback, useState, useContext } from 'react';
import { LifeEventReducer, LifeEventsActions } from '../reducers/LifeEventReducer';
import { LifeEvent } from '../interfaces/LifeEvent';
import { IFinancialGoalsFetcher } from '../interfaces/ILifeEventsFetcher';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry';
import { MAX_CRUD_OPERATION_RETRIES } from '../constants/LifeEvent.consts';
import { IFinancialGoal } from './interfaces/FinancialGoal.interface';
import { CURDOperationType, DialogConfig, ILifeEventContextProviderProps, OperationDataProps } from '../interfaces/LifeEvents.interface';
import { lifeEventContextInitialValue, LifeEventContext } from '../LifeEvent.context';

export const financialGoalContextInitialValue = {
    ...lifeEventContextInitialValue,
    setFinancialGoalsDialog: (config?: DialogConfig) => {},
    editFinancialGoalsDialog: undefined as DialogConfig | undefined,
    addFinancialGoalCallback: (lifeEvent: LifeEvent): Promise<string> => Promise.resolve(''),
    deleteFinancialGoalCallback: async (financialGoalId: string, categoryCode: number): Promise<void | string> => {},
    editFinancialGoalCallback: (financialGoal: IFinancialGoal) => {},
    setPopUp: (config?: boolean) => {},
    editPopUp: undefined as boolean | undefined,
};

export const FinancialGoalContext = createContext(financialGoalContextInitialValue);

const FinancialGoalContextProvider: FC<ILifeEventContextProviderProps> = ({ fetcher, contactId, children }) => {
    const {
        configuration,
        fetchLifeEvents,
        fetchLifeEventById,
        addLifeEventCallback,
        deleteLifeEventCallback,
        editLifeEventCallback,
        openSidePanelCategory,
        setOpenSidePanelCategory,
        setEditDialogConfig,
        editDialogConfig,
        loading,
        setErrorDialog,
        errorDialog,
        hideModifyButtons,
        readonly,
    } = useContext(LifeEventContext);

    const loggerService = useLoggerService();

    const [editFinancialGoalsDialog, setFinancialGoalsDialog] = useState<DialogConfig | undefined>();
    const [editPopUp, setPopUp] = useState<boolean | undefined>();

    const [categories, dispatch] = useReducer(LifeEventReducer, []);
    const sendLoggerError = (enumType: CURDOperationType, operationName: string, financialGoalId: string, retryNumber: number, e?: any) => {
        const formattedErrorText = `Failed to ${enumType} financial goal ${financialGoalId} - attempt #${retryNumber + 1} ${
            !retryNumber ? '' : retryNumber == MAX_CRUD_OPERATION_RETRIES ? '(last retry)' : '(retry)'
        }`;

        loggerService.logError('FinancialGoalContext', operationName, formattedErrorText, FSIErrorTypes.ServerError, e);
    };

    const financialGoalRetryManager = async (operationData: OperationDataProps, retryNumber = 0) => {
        try {
            const res = await operationData.executeOperation();
            fetchLifeEvents();

            return res;
        } catch (e: any) {
            sendLoggerError(operationData.enumType, operationData.name, operationData.eventId, retryNumber, e);
            const retryFunc = retryNumber < MAX_CRUD_OPERATION_RETRIES ? () => financialGoalRetryManager(operationData, retryNumber + 1) : undefined;
            setErrorDialog({ operationError: operationData.enumType, retryFunc });
        }
    };

    const addFinancialGoal = useCallback(
        async (lifeEvent: LifeEvent) => {
            const financialGoalFetcher = fetcher as IFinancialGoalsFetcher;
            const operationData = {
                enumType: CURDOperationType.Create,
                name: 'addFinancialGoal',
                eventId: lifeEvent.financialGoal?.id || '',
                executeOperation: async (): Promise<string> => {
                    const financialGoalId = await financialGoalFetcher.addFinancialGoal(contactId, lifeEvent.financialGoal!);
                    dispatch({ type: LifeEventsActions.ADD_FINANCIAL_GOAL, payload: lifeEvent });
                    return financialGoalId;
                },
            };
            const financialGoalId = await financialGoalRetryManager(operationData);

            return financialGoalId as string;
        },
        [categories, contactId]
    );

    const deleteFinancialGoal = useCallback(
        async (financialGoalId: string, categoryCode: number) => {
            const financialGoalFetcher = fetcher as IFinancialGoalsFetcher;
            const operationData = {
                enumType: CURDOperationType.Delete,
                name: 'deleteFinancialGoal',
                eventId: financialGoalId,
                executeOperation: async (): Promise<void> => {
                    await financialGoalFetcher.deleteFinancialGoal(financialGoalId);
                    dispatch({ type: LifeEventsActions.DELETE_FINANCIAL_GOAL, payload: { financialGoalId, categoryCode } });
                },
            };
            const financialGoal = await financialGoalRetryManager(operationData);

            return financialGoal as string;
        },
        [categories]
    );

    const editFinancialGoal = useCallback(
        async (financialGoal: IFinancialGoal) => {
            const financialGoalFetcher = fetcher as IFinancialGoalsFetcher;
            const operationData = {
                enumType: CURDOperationType.Update,
                name: 'editFinancialGoal',
                eventId: financialGoal.id,
                executeOperation: async (): Promise<void> => {
                    await financialGoalFetcher.editFinancialGoal(financialGoal);
                    dispatch({ type: LifeEventsActions.EDIT_FINANCIAL_GOAL, payload: financialGoal });
                },
            };
            await financialGoalRetryManager(operationData);

            return financialGoal.id;
        },
        [categories]
    );

    return (
        <FinancialGoalContext.Provider
            value={{
                categoriesCollection: categories,
                configuration: configuration,
                addLifeEventCallback: addLifeEventCallback,
                deleteLifeEventCallback: deleteLifeEventCallback,
                editLifeEventCallback: editLifeEventCallback,
                setEditDialogConfig: setEditDialogConfig,
                editDialogConfig: editDialogConfig,
                setOpenSidePanelCategory: setOpenSidePanelCategory,
                openSidePanelCategory: openSidePanelCategory,
                fetchLifeEvents,
                fetchLifeEventById,
                loading,
                errorDialog,
                setErrorDialog,
                hideModifyButtons,
                readonly: readonly,
                setFinancialGoalsDialog: setFinancialGoalsDialog,
                editFinancialGoalsDialog: editFinancialGoalsDialog,
                addFinancialGoalCallback: addFinancialGoal,
                deleteFinancialGoalCallback: deleteFinancialGoal,
                editFinancialGoalCallback: editFinancialGoal,
                setPopUp: setPopUp,
                editPopUp: editPopUp,
            }}
        >
            {children}
        </FinancialGoalContext.Provider>
    );
};
export default FinancialGoalContextProvider;
