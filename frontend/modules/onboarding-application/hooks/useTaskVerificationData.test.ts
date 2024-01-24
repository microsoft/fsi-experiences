import { renderHook } from '@testing-library/react-hooks/pure';
import { act, waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useTaskVerificationData } from './useTaskVerificationData';
import { MockOnboardingApplicationTasksFetcher } from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { verificationTaskMock } from '../interfaces/mocks/TaskVerification.mock';
import * as cancelTaskHooks from './useCancelTasksDisplay';
import * as updateTaskHooks from './useTaskUpdateStatus';
import { CONFIGURATION_ERROR } from '../constants/TaskVerification.const';
import { TaskState, TaskStatus } from '../constants/Fields.const';

const postMessageMockFn = jest.fn();

jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        postMessage: postMessageMockFn,
        messages: [],
    }))
);

describe('useTaskVerificationData', () => {
    const _fetcher = new MockOnboardingApplicationTasksFetcher();
    const fetchTaskByTaskDefinitionIdSpy = jest.spyOn(_fetcher, 'fetchTaskByTaskDefinitionId');
    const useCancelTaskDisplayHook = jest.spyOn(cancelTaskHooks, 'useCancelTasksDisplay');
    const useTaskUpdateStatusHook = jest.spyOn(updateTaskHooks, 'useTaskUpdateStatus');

    beforeEach(() => {
        testingQueryClient.clear();
        fetchTaskByTaskDefinitionIdSpy.mockClear();
        useCancelTaskDisplayHook.mockClear();
        useTaskUpdateStatusHook.mockClear();
    });

    it('Should call fetchTaskByTaskDefinitionId', async () => {
        const { result } = renderHook(() => useTaskVerificationData({ fetcher: _fetcher, applicationId: '1', taskDefinitionId: '1' }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);
        expect(result.current.data?.id).toEqual(verificationTaskMock.id);
        expect(result.current.data?.updateStatus).toBeDefined();
    });

    it('should return loading', async () => {
        const { result } = renderHook(
            () =>
                useTaskVerificationData({
                    fetcher: _fetcher,
                    applicationId: '123',
                    taskDefinitionId: '1',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        expect(result.current.isLoading).toBeTruthy();
    });

    it('should return an error in case fetching the data failed', async () => {
        fetchTaskByTaskDefinitionIdSpy.mockImplementation(() => Promise.reject('error'));

        const { result } = renderHook(
            () =>
                useTaskVerificationData({
                    fetcher: _fetcher,
                    applicationId: '123',
                    taskDefinitionId: '123',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('should return error message', async () => {
        fetchTaskByTaskDefinitionIdSpy.mockImplementation(() => {
            throw new Error(CONFIGURATION_ERROR);
        });
        const { result } = renderHook(
            () =>
                useTaskVerificationData({
                    fetcher: _fetcher,
                    applicationId: '123',
                    taskDefinitionId: '123',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);

        expect(result.current.isConfigurationError).toBeTruthy();
    });

    it('should return null for data when no taskDefinition', async () => {
        const _fetcher = new MockOnboardingApplicationTasksFetcher();

        const { result } = renderHook(() => useTaskVerificationData({ fetcher: _fetcher, applicationId: '1', taskDefinitionId: '' }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);
        expect(result.current.data).not.toBeDefined();
    });

    it('should not return data when shouldGetCanceledTasks is false', async () => {
        useCancelTaskDisplayHook.mockImplementation(() => false);
        fetchTaskByTaskDefinitionIdSpy.mockImplementation(() =>
            Promise.resolve({
                ...verificationTaskMock,
                status: TaskStatus.Canceled,
            })
        );
        const _fetcher = new MockOnboardingApplicationTasksFetcher();

        const { result } = renderHook(() => useTaskVerificationData({ fetcher: _fetcher, applicationId: '1', taskDefinitionId: '' }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => !result.current.isLoading);
        expect(result.current.data).not.toBeDefined();
    });

    it('Should call update task status', async () => {
        useCancelTaskDisplayHook.mockImplementation(() => true);
        fetchTaskByTaskDefinitionIdSpy.mockImplementation(() =>
            Promise.resolve({
                ...verificationTaskMock,
                id: '',
            })
        );

        const updateStatusMock = jest.fn();

        useTaskUpdateStatusHook.mockImplementation(() => ({
            updateTaskStatus: updateStatusMock,
        }));

        const { result } = renderHook(() => useTaskVerificationData({ fetcher: _fetcher, applicationId: '1', taskDefinitionId: '1' }), {
            wrapper: QueryClientWrapper,
        });
        const mockTask = { updatedStatus: TaskStatus.Done, updatedState: TaskState.Completed };

        await waitFor(() => !result.current.isLoading);
        act(() => {
            result.current.data?.updateStatus?.(mockTask.updatedStatus, mockTask.updatedState);
        });

        await waitFor(() => {
            expect(updateStatusMock).toBeCalled();
        });
    });
});
