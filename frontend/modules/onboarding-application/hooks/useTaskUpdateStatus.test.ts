import { renderHook } from '@testing-library/react-hooks/pure';
import { act, waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useTaskUpdateStatus, getToastIcon, getToastMessage } from './useTaskUpdateStatus';
import { MockOnboardingApplicationTasksFetcher } from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { TaskState, TaskStatus } from '../constants/Fields.const';
import { NOTIFICATION_STATES, NOTIFICATION_TYPES } from '@fsi/core-components/dist/services/NotificationService/NotificationService.const';
import * as notificationServiceHooks from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';

describe('useTaskUpdateStatus', () => {
    const _fetcher = new MockOnboardingApplicationTasksFetcher();
    const useTaskUpdateStatusSpy = jest.spyOn(_fetcher, 'updateTaskStatus');
    const getQueryDataSpy = jest.spyOn(testingQueryClient, 'getQueryData');
    const setQueryDataSpy = jest.spyOn(testingQueryClient, 'setQueryData');
    const mockTask = { updatedStatus: TaskStatus.Done, updatedState: TaskState.Completed, taskId: '123', taskName: 'abc' };
    const useNotificationServiceSpy = jest.spyOn(notificationServiceHooks, 'useNotificationService');
    const mockShow = jest.fn();
    const postMessageMockFn = jest.fn();

    beforeEach(() => {
        testingQueryClient.clear();
        getQueryDataSpy.mockClear();
        setQueryDataSpy.mockClear();
        useTaskUpdateStatusSpy.mockClear();
        useNotificationServiceSpy.mockClear();
        mockShow.mockClear();
        postMessageMockFn.mockClear();

        useNotificationServiceSpy.mockReturnValue({
            show: mockShow,
            hide: jest.fn(),
            currentState: NOTIFICATION_STATES.HIDDEN,
            message: '',
        });
    });

    const mockQueryName = '123';

    it('Should call update task status', async () => {
        getQueryDataSpy.mockReturnValueOnce([]);

        const _fetcher = new MockOnboardingApplicationTasksFetcher();
        _fetcher.updateTaskStatus = jest.fn();

        const { result } = renderHook(() => useTaskUpdateStatus({ fetcher: _fetcher, queryName: mockQueryName, postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });
        act(() => {
            result.current.updateTaskStatus(mockTask);
        });

        await waitFor(() => {
            expect(_fetcher.updateTaskStatus).toBeCalled();
            expect(postMessageMockFn).toBeCalled();
            expect(mockShow).toBeCalled();
        });
    });

    it('should call update the original tasks', async () => {
        getQueryDataSpy.mockReturnValueOnce([
            {
                id: '123',
                state: TaskState.Opened,
                status: TaskStatus.Pending,
            },
            {
                id: '1234',
                comment: '1234',
            },
        ]);
        const mockQueryName = '123';
        const { result } = renderHook(() => useTaskUpdateStatus({ fetcher: _fetcher, queryName: mockQueryName, postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.updateTaskStatus(mockTask);
        });

        await waitFor(() => {
            expect(useTaskUpdateStatusSpy).toBeCalled();
            expect(getQueryDataSpy).toBeCalled();
            expect(setQueryDataSpy).toBeCalledWith(mockQueryName, [
                {
                    id: '123',
                    status: mockTask.updatedStatus,
                    state: mockTask.updatedState,
                },
                {
                    id: '1234',
                    comment: '1234',
                },
            ]);
        });
    });

    it('Should call setQueryDataSpy', async () => {
        getQueryDataSpy.mockReturnValueOnce({});

        const _fetcher = new MockOnboardingApplicationTasksFetcher();
        _fetcher.updateTaskStatus = jest.fn();

        const { result } = renderHook(() => useTaskUpdateStatus({ fetcher: _fetcher, queryName: mockQueryName, postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });
        act(() => {
            result.current.updateTaskStatus(mockTask);
        });

        await waitFor(() => {
            expect(setQueryDataSpy).toBeCalledWith(mockQueryName, {
                status: mockTask.updatedStatus,
                state: mockTask.updatedState,
            });
        });
    });

    it('should trigger onError', async () => {
        const _fetcher = new MockOnboardingApplicationTasksFetcher();
        const updateStatusSpy = jest.spyOn(_fetcher, 'updateTaskStatus');
        updateStatusSpy.mockReturnValueOnce(Promise.reject('error'));

        const { result } = renderHook(() => useTaskUpdateStatus({ fetcher: _fetcher, queryName: mockQueryName, postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });
        act(() => {
            result.current.updateTaskStatus(mockTask);
        });

        await waitFor(() => {
            expect(mockShow).toBeCalled();
            expect(postMessageMockFn).not.toBeCalled();
        });
    });
});

describe('getToastMessage', () => {
    it('should return the right message', () => {
        expect(getToastMessage(TaskStatus.Done)).toEqual('TOAST_TASK_COMPLETED');
        expect(getToastMessage(TaskStatus.Pending)).toEqual('TOAST_TASK_UPDATED');
    });
});

describe('getToastIcon', () => {
    it('should return the right icon', () => {
        expect(getToastIcon(TaskStatus.Done)).toEqual(NOTIFICATION_TYPES.SUCCESS);
        expect(getToastIcon(TaskStatus.Pending)).toEqual(NOTIFICATION_TYPES.INFO);
    });
});
