import { renderHook } from '@testing-library/react-hooks/pure';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import useOnboardingApplicationTasks from './useOnboardingApplicationTasks';
import {
    MockFailureOnboardingApplicationTasksFetcher,
    MockOnboardingApplicationTasksFetcher,
    MockOnboardingApplicationTasksFetcherWithoutBPFName,
} from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { mockHookResultTasks, mockHookResultTasksWithStage1orNoStage } from '../interfaces/mocks/OnboardingApplicationTask.mock';

const postMessageMockFn = jest.fn();
jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        postMessage: postMessageMockFn,
    }))
);

describe('useCustomerOnboardingTasks', () => {
    afterEach(() => {
        testingQueryClient.clear();
        postMessageMockFn.mockClear();
    });

    it('Should map and sort tasks for stage', async () => {
        const { result } = renderHook(() => useOnboardingApplicationTasks({ fetcher: new MockOnboardingApplicationTasksFetcher() }), {
            wrapper: QueryClientWrapper,
        });

        const mockResults = mockHookResultTasksWithStage1orNoStage.map(res => ({
            ...res,
            tasks: res.tasks.map(task => ({
                ...task,
                updateStatus: expect.any(Function),
                updateComment: expect.any(Function),
                ...(task.taskDefinition.taskNavigation
                    ? {
                          taskDefinition: {
                              ...task.taskDefinition,
                              taskNavigation: { ...task.taskDefinition.taskNavigation, action: expect.any(Function) },
                              name: `${task.taskDefinition.name} - Verification`,
                          },
                      }
                    : {}),
            })),
        }));
        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
        });

        await waitFor(() => {
            expect(result.current.tasks).toEqual(mockResults);
        });
    });

    it('Should map and sort tasks without bpf', async () => {
        const { result } = renderHook(() => useOnboardingApplicationTasks({ fetcher: new MockOnboardingApplicationTasksFetcherWithoutBPFName() }), {
            wrapper: QueryClientWrapper,
        });

        const mockResults = mockHookResultTasks.map(res => ({
            ...res,
            tasks: res.tasks.map(task => ({
                ...task,
                updateStatus: expect.any(Function),
                updateComment: expect.any(Function),
                ...(task.taskDefinition.taskNavigation
                    ? {
                          taskDefinition: {
                              ...task.taskDefinition,
                              taskNavigation: { ...task.taskDefinition.taskNavigation, action: expect.any(Function) },
                              name: `${task.taskDefinition.name} - Verification`,
                          },
                      }
                    : {}),
            })),
        }));
        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
        });

        await waitFor(() => {
            expect(result.current.tasks).toEqual(mockResults);
        });
    });

    it('Should fail and return empty tasks', async () => {
        const { result } = renderHook(() => useOnboardingApplicationTasks({ fetcher: new MockFailureOnboardingApplicationTasksFetcher() }), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => {
            expect(result.current.tasks).toEqual([]);
        });
    });

    it("Should not return function if doesn't have attached form", async () => {
        const _fetcher = new MockOnboardingApplicationTasksFetcher();
        _fetcher.openForm = jest.fn();
        const { result } = renderHook(() => useOnboardingApplicationTasks({ fetcher: _fetcher }), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => {
            expect(result.current.isLoading).toEqual(false);
        });

        const action = result.current.tasks[2].tasks[0].taskDefinition.taskNavigation?.action;
        expect(action).toBeUndefined();
    });
});
