import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockLifeEventsFetcher } from './interfaces/mocks/MockLifeEventsFetcher';
import LifeEventContextProvider, { LifeEventContext } from './LifeEvent.context';
import { LIFE_EVENT_HIDE_LIST_CONFIGURATIONS, MAX_CRUD_OPERATION_RETRIES } from './constants/LifeEvent.consts';
import { FSIContainer } from '@fsi/core-components/dist/context/FSIContext';
import { IConfig } from '@fsi/core-components/dist/context/config/IConfig';
import lifeEventsConfigurations from './interfaces/mocks/LifeEventsConfigurations.mock';
import { LifeEvent } from './interfaces';
import { LIFE_EVENTS_FLAGS } from './constants/lifeEvents';

describe('LifeEvent Context', () => {
    const mockContactId = 'testId';
    const mockExistLifeEventId = 'e5268ba8-3153-eb11-a812-000d3a5ba768';

    const mockLifeEvent: LifeEvent = {
        id: 'test-id',
        created_on: new Date(),
        title: 'test',
        categoryCode: 0,
        typeCode: 0,
    };

    let contextValue;
    const contextValueCallback = jest.fn();
    const TestComponents = () => {
        contextValue = useContext(LifeEventContext);
        contextValueCallback(contextValue);
        return <div>Test Component</div>;
    };

    const mockFetcher = new MockLifeEventsFetcher();

    const renderContext = (contactId: string = mockContactId, config?: IConfig, customMockFetcher: MockLifeEventsFetcher = mockFetcher) => (
        <FSIContainer config={config}>
            <LifeEventContextProvider fetcher={customMockFetcher} contactId={contactId}>
                <TestComponents />
            </LifeEventContextProvider>
        </FSIContainer>
    );

    const fetcherGetSpy = jest.spyOn(mockFetcher, 'fetchLifeEvents');

    beforeEach(() => {
        contextValueCallback.mockReset();
        contextValue = null;
    });

    it('Should render component with life event context and call fetc events', async () => {
        const { getByText } = render(renderContext());

        expect(getByText('Test Component')).toBeVisible();
        expect(contextValueCallback).toBeCalled();
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations));
        expect(contextValue.categoriesCollection.length).toEqual(lifeEventsConfigurations.categoryConfig.length);
    });

    it('Should call get life events with updated contact id', async () => {
        const fetchConfigSpy = jest.spyOn(mockFetcher, 'fetchConfigurations');

        const { rerender } = render(renderContext());

        expect(fetchConfigSpy).toHaveBeenCalled();
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations));

        rerender(renderContext('new id'));

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith('new id', lifeEventsConfigurations));
    });

    it('Should call add life event', async () => {
        const fetcherAddSpy = jest.spyOn(mockFetcher, 'addLifeEvent');
        render(renderContext());

        contextValue.addLifeEventCallback(mockLifeEvent);
        expect(fetcherAddSpy).toHaveBeenCalledWith(mockContactId, mockLifeEvent);

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, expect.any(Object)));
    });

    it(`Should call retry func exactly (${MAX_CRUD_OPERATION_RETRIES}) times in case of add life event exception`, async () => {
        const customMockFetcher = new MockLifeEventsFetcher();
        customMockFetcher.addLifeEvent = async () => {
            throw Error('test error');
        };

        const fetcherAddSpy = jest.spyOn(customMockFetcher, 'addLifeEvent');
        render(
            renderContext(
                mockContactId,
                {
                    flags: {
                        [LIFE_EVENTS_FLAGS.ENABLE_MODIFYING_LIFE_EVENTS]: false,
                    },
                },
                customMockFetcher
            )
        );

        contextValue.addLifeEventCallback(mockLifeEvent);
        await waitFor(() => expect(fetcherAddSpy).toHaveBeenNthCalledWith(1, mockContactId, mockLifeEvent));
        await waitFor(() => expect(contextValue.errorDialog.retryFunc).toBeDefined());

        for (let i = 0; i < MAX_CRUD_OPERATION_RETRIES; i++) {
            contextValue.errorDialog.retryFunc();
            await waitFor(() => expect(fetcherAddSpy).toHaveBeenNthCalledWith(i + 2, mockContactId, mockLifeEvent));
        }
        await waitFor(() => expect(contextValue.errorDialog.retryFunc).toBeUndefined());
    });

    it(`Should call retry func exactly (${MAX_CRUD_OPERATION_RETRIES}) times in case of edit life event exception`, async () => {
        const customMockFetcher = new MockLifeEventsFetcher();
        customMockFetcher.editLifeEvent = async () => {
            throw Error('test error');
        };

        const fetcherEditSpy = jest.spyOn(customMockFetcher, 'editLifeEvent');
        render(
            renderContext(
                mockContactId,
                {
                    flags: {
                        [LIFE_EVENTS_FLAGS.ENABLE_MODIFYING_LIFE_EVENTS]: false,
                    },
                },
                customMockFetcher
            )
        );

        contextValue.editLifeEventCallback(mockLifeEvent);
        await waitFor(() => expect(fetcherEditSpy).toHaveBeenNthCalledWith(1, mockLifeEvent));
        await waitFor(() => expect(contextValue.errorDialog.retryFunc).toBeDefined());

        for (let i = 0; i < MAX_CRUD_OPERATION_RETRIES; i++) {
            contextValue.errorDialog.retryFunc();
            await waitFor(() => expect(fetcherEditSpy).toHaveBeenNthCalledWith(i + 2, mockLifeEvent));
        }
        await waitFor(() => expect(contextValue.errorDialog.retryFunc).toBeUndefined());
    });

    it(`Should call retry func exactly (${MAX_CRUD_OPERATION_RETRIES}) times in case of delete life event exception`, async () => {
        const customMockFetcher = new MockLifeEventsFetcher();
        customMockFetcher.deleteLifeEvent = async () => {
            throw Error('test error');
        };

        const fetcherDeleteSpy = jest.spyOn(customMockFetcher, 'deleteLifeEvent');
        render(
            renderContext(
                mockContactId,
                {
                    flags: {
                        [LIFE_EVENTS_FLAGS.ENABLE_MODIFYING_LIFE_EVENTS]: false,
                    },
                },
                customMockFetcher
            )
        );

        contextValue.deleteLifeEventCallback(mockLifeEvent);
        await waitFor(() => expect(fetcherDeleteSpy).toHaveBeenNthCalledWith(1, mockLifeEvent));
        await waitFor(() => expect(contextValue.errorDialog.retryFunc).toBeDefined());

        for (let i = 0; i < MAX_CRUD_OPERATION_RETRIES; i++) {
            contextValue.errorDialog.retryFunc();
            await waitFor(() => expect(fetcherDeleteSpy).toHaveBeenNthCalledWith(i + 2, mockLifeEvent));
        }
        await waitFor(() => expect(contextValue.errorDialog.retryFunc).toBeUndefined());
    });

    it('Should call edit life event', async () => {
        const fetcherEditSpy = jest.spyOn(mockFetcher, 'editLifeEvent');
        render(renderContext());

        contextValue.editLifeEventCallback(mockLifeEvent);
        expect(fetcherEditSpy).toHaveBeenCalledWith(mockLifeEvent);
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, expect.any(Object)));
    });

    it('Should call delete life event', async () => {
        const fetcherDeleteSpy = jest.spyOn(mockFetcher, 'deleteLifeEvent');
        render(renderContext());

        contextValue.deleteLifeEventCallback(mockExistLifeEventId);
        expect(fetcherDeleteSpy).toHaveBeenCalledWith(mockExistLifeEventId);
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, expect.any(Object)));
    });

    it('Should get filtered life event base on hide config', async () => {
        render(
            renderContext(mockContactId, {
                configSets: {
                    [LIFE_EVENT_HIDE_LIST_CONFIGURATIONS]: new Set(['104800002', '104800000']),
                },
            })
        );

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations));
        expect(contextValue.categoriesCollection.length).toEqual(lifeEventsConfigurations.categoryConfig.length - 2);
        expect(contextValue.categoriesCollection.find(c => c.categoryCode.toString() === '104800000')).toBeUndefined();
        expect(contextValue.categoriesCollection.find(c => c.categoryCode.toString() === '104800002')).toBeUndefined();
    });

    it('Should get none empty life event categories in read only mode', async () => {
        render(
            renderContext(mockContactId, {
                flags: {
                    [LIFE_EVENTS_FLAGS.ENABLE_MODIFYING_LIFE_EVENTS]: false,
                },
            })
        );

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations));
        expect(contextValue.canModifyLifeEvents).toBeFalsy();
    });

    it('Should get filtered life event base empty config', async () => {
        render(
            renderContext(mockContactId, {
                configSets: {},
            })
        );

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations));
        expect(contextValue.categoriesCollection.length).toEqual(lifeEventsConfigurations.categoryConfig.length);
    });
});
