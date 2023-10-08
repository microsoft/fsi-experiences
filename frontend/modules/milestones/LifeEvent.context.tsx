/* istanbul ignore file */
import React, { FC, createContext, useReducer, useCallback, useState, useEffect } from 'react';
import { LifeEventReducer, LifeEventsActions } from './reducers/LifeEventReducer';
import { lifeEventsToCategories } from './utilities/LifeEventsUtils';
import { LifeEvent, LifeEventCategory } from './interfaces';
import { ILifeEventConfigurations } from './interfaces/Configuration';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { useConfigSet } from '@fsi/core-components/dist/context/hooks/useConfigSet';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { LIFE_EVENTS_FLAGS } from './constants/lifeEvents';
import useContactAccessInfo from '@fsi/core-components/dist/hooks/useContactAccessInfo';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry';
import { LIFE_EVENT_HIDE_LIST_CONFIGURATIONS, MAX_CRUD_OPERATION_RETRIES } from './constants/LifeEvent.consts';

import {
    CURDOperationType,
    DialogConfig,
    ErrorDialogProps,
    ILifeEventContextProviderProps,
    OperationDataProps,
} from './interfaces/LifeEvents.interface';

export const lifeEventContextInitialValue = {
    categoriesCollection: Array<LifeEventCategory>(),
    configuration: {} as ILifeEventConfigurations | undefined,
    fetchLifeEvents: () => Promise.resolve(),
    fetchLifeEventById: (id: string) => Promise.resolve({} as LifeEvent),
    addLifeEventCallback: (lifeEvent: LifeEvent): Promise<string> => Promise.resolve(''),
    deleteLifeEventCallback: (lifeEventId: string, categoryCode: number) => {},
    editLifeEventCallback: (lifeEvent: LifeEvent) => {},
    openSidePanelCategory: 0,
    setOpenSidePanelCategory: (categoryCode: number) => {},
    setEditDialogConfig: (config?: DialogConfig) => {},
    editDialogConfig: undefined as DialogConfig | undefined,
    loading: LoadingState.None,
    setErrorDialog: (error: ErrorDialogProps | undefined) => {},
    errorDialog: undefined as ErrorDialogProps | undefined,
    hideModifyButtons: undefined as boolean | undefined,
    readonly: undefined as boolean | undefined,
};

export const LifeEventContext = createContext(lifeEventContextInitialValue);
const LifeEventContextProvider: FC<ILifeEventContextProviderProps> = ({ fetcher, contactId, children }) => {
    const { data: access } = useContactAccessInfo({ entityId: contactId, fetcher });
    const [conf, setConf] = useState<ILifeEventConfigurations>();
    const loggerService = useLoggerService();

    const [errorDialog, setErrorDialog] = useState<ErrorDialogProps | undefined>(undefined);
    const [loading, setLoading] = useState<LoadingState>(LoadingState.None);

    const [categories, dispatch] = useReducer(LifeEventReducer, []);
    // side pane properties:
    const [openSidePanelCategory, setOpenSidePanelCategory] = useState(0);

    const [editDialogConfig, setEditDialogConfig] = useState<DialogConfig | undefined>();

    const hideCategories = useConfigSet(LIFE_EVENT_HIDE_LIST_CONFIGURATIONS);
    const hideModifyButtons = !useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_MODIFYING_LIFE_EVENTS);
    const sendLoggerError = (enumType: CURDOperationType, operationName: string, lifeEventId: string, retryNumber: number, e?: any) => {
        const formattedErrorText = `Failed to ${enumType} life event ${lifeEventId} - attempt #${retryNumber + 1} ${
            !retryNumber ? '' : retryNumber == MAX_CRUD_OPERATION_RETRIES ? '(last retry)' : '(retry)'
        }`;

        loggerService.logError('LifeEventContext', operationName, formattedErrorText, FSIErrorTypes.ServerError, e);
    };

    const lifeEventRetryManager = async (operationData: OperationDataProps, retryNumber = 0) => {
        try {
            const res = await operationData.executeOperation();
            fetchLifeEvents();

            return res;
        } catch (e: any) {
            sendLoggerError(operationData.enumType, operationData.name, operationData.eventId, retryNumber, e);
            const retryFunc = retryNumber < MAX_CRUD_OPERATION_RETRIES ? () => lifeEventRetryManager(operationData, retryNumber + 1) : undefined;
            setErrorDialog({ operationError: operationData.enumType, retryFunc });
        }
    };

    const addLifeEvent = useCallback(
        async (lifeEvent: LifeEvent) => {
            const operationData = {
                enumType: CURDOperationType.Create,
                name: 'addLifeEvent',
                eventId: lifeEvent.id || '',
                executeOperation: async (): Promise<string> => {
                    const lifeEventId = await fetcher.addLifeEvent(contactId, lifeEvent);
                    lifeEvent.id = lifeEventId;
                    dispatch({ type: LifeEventsActions.ADD_LIFE_EVENT, payload: lifeEvent });

                    return lifeEventId;
                },
            };
            const lifeEventId = await lifeEventRetryManager(operationData);

            return lifeEventId as string;
        },
        [categories, contactId]
    );

    const deleteLifeEvent = useCallback(
        async (lifeEventId: string, categoryCode: number) => {
            const operationData = {
                enumType: CURDOperationType.Delete,
                name: 'deleteLifeEvent',
                eventId: lifeEventId,
                executeOperation: async (): Promise<void> => {
                    await fetcher.deleteLifeEvent(lifeEventId);
                    dispatch({ type: LifeEventsActions.DELETE_LIFE_EVENT, payload: { lifeEventId, categoryCode } });
                },
            };
            const lifeEvent = await lifeEventRetryManager(operationData);

            return lifeEvent as string;
        },
        [categories]
    );

    const editLifeEvent = useCallback(
        async (lifeEvent: LifeEvent) => {
            const operationData = {
                enumType: CURDOperationType.Update,
                name: 'editLifeEvent',
                eventId: lifeEvent.id,
                executeOperation: async (): Promise<void> => {
                    await fetcher.editLifeEvent(lifeEvent);
                    dispatch({ type: LifeEventsActions.EDIT_LIFE_EVENT, payload: lifeEvent });
                },
            };
            await lifeEventRetryManager(operationData);

            return lifeEvent.id;
        },
        [categories]
    );

    const fetchLifeEvents = useCallback(async () => {
        setLoading(LoadingState.Loading);

        try {
            const conf = await fetcher.fetchConfigurations();
            setConf(conf);

            const lifeEvents = await fetcher.fetchLifeEvents(contactId, conf);
            const categories = lifeEventsToCategories(lifeEvents, conf).filter(lc => !hideCategories?.has(lc.categoryCode.toString()));
            dispatch({ type: LifeEventsActions.LIFE_EVENTS_LOADED, payload: categories });
            setLoading(LoadingState.Success);
        } catch (e) {
            setLoading(LoadingState.Error);
        }
    }, [categories, contactId, hideCategories]);

    const fetchLifeEventById = useCallback(async (id: string) => {
        return fetcher.fetchLifeEventById(id);
    }, []);

    useEffect(() => {
        fetchLifeEvents();
    }, [contactId]);

    return (
        <LifeEventContext.Provider
            value={{
                categoriesCollection: categories,
                configuration: conf,
                addLifeEventCallback: addLifeEvent,
                deleteLifeEventCallback: deleteLifeEvent,
                editLifeEventCallback: editLifeEvent,
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
                readonly: !access?.write && !access?.append && !access?.appendTo,
            }}
        >
            {children}
        </LifeEventContext.Provider>
    );
};
export default LifeEventContextProvider;
