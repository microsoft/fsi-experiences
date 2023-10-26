import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockFinancialGoalFetcher } from '../interfaces/mocks/MockLifeEventsFetcher';
import LifeEventContextProvider from '../LifeEvent.context';
import { FSIContainer } from '@fsi/core-components/dist/context/FSIContext';
import { IConfig } from '@fsi/core-components/dist/context/config/IConfig';
import lifeEventsConfigurations from '../interfaces/mocks/LifeEventsConfigurations.mock';
import { LifeEvent } from '../interfaces/LifeEvent';
import FinancialGoalContextProvider, { FinancialGoalContext } from './FinancialGoal.context';
import { IFinancialGoal } from './interfaces/FinancialGoal.interface';

describe('FinancialGoal Context', () => {
    const mockContactId = 'testId';

    const mockFinancialGoal: IFinancialGoal = {
        lifeEventId: 'test-id',
        id: '4c0ab1e4-5534-eb11-a812-000d3a5ba768',
        targetName: 'adopt child',
        targetDate: new Date('2040-08-11T18:00:00.000Z'),
        targetValue: 12003000,
        isCompleted: false,
    };

    const mockLifeEvent: LifeEvent = {
        id: 'test-id',
        created_on: new Date(),
        title: 'test',
        categoryCode: 0,
        typeCode: 0,
        financialGoal: mockFinancialGoal,
    };

    let contextValue;
    const contextValueCallback = jest.fn();
    const TestComponents = () => {
        contextValue = useContext(FinancialGoalContext);
        contextValueCallback(contextValue);
        return <div>Test Component</div>;
    };

    const mockFetcher = new MockFinancialGoalFetcher();

    const renderContext = (contactId: string = mockContactId, config?: IConfig, customMockFetcher: MockFinancialGoalFetcher = mockFetcher) => (
        <FSIContainer config={config}>
            <LifeEventContextProvider fetcher={customMockFetcher} contactId={contactId}>
                <FinancialGoalContextProvider fetcher={customMockFetcher} contactId={contactId}>
                    <TestComponents />
                </FinancialGoalContextProvider>
            </LifeEventContextProvider>
        </FSIContainer>
    );

    const fetcherGetSpy = jest.spyOn(mockFetcher, 'fetchLifeEvents');

    beforeEach(() => {
        contextValueCallback.mockReset();
        contextValue = null;
    });

    it('Should call get financial goals with updated contact id', async () => {
        const fetchConfigSpy = jest.spyOn(mockFetcher, 'fetchConfigurations');

        const { rerender } = render(renderContext());

        expect(fetchConfigSpy).toHaveBeenCalled();
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, lifeEventsConfigurations));

        rerender(renderContext('new id'));

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith('new id', lifeEventsConfigurations));
    });

    it('Should call add financial goal', async () => {
        const fetcherAddSpy = jest.spyOn(mockFetcher, 'addFinancialGoal');
        render(renderContext());

        contextValue.addFinancialGoalCallback(mockLifeEvent);
        expect(fetcherAddSpy).toHaveBeenCalledWith(mockContactId, mockFinancialGoal);

        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, expect.any(Object)));
    });

    it('Should call edit financial goal', async () => {
        const fetcherEditSpy = jest.spyOn(mockFetcher, 'editFinancialGoal');
        render(renderContext());

        contextValue.editFinancialGoalCallback(mockLifeEvent);
        expect(fetcherEditSpy).toHaveBeenCalledWith(mockLifeEvent);
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, expect.any(Object)));
    });

    it('Should call delete financial goal', async () => {
        const fetcherDeleteSpy = jest.spyOn(mockFetcher, 'deleteFinancialGoal');
        render(renderContext());

        contextValue.deleteFinancialGoalCallback(mockFinancialGoal.id);
        expect(fetcherDeleteSpy).toHaveBeenCalledWith(mockFinancialGoal.id);
        await waitFor(() => expect(fetcherGetSpy).toHaveBeenCalledWith(mockContactId, expect.any(Object)));
    });
});
