import { mockTasks, openTabNavigation, reviewFormNavigation } from './../interfaces/mocks/OnboardingApplicationTask.mock';
import { renderHook } from '@testing-library/react-hooks/pure';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useNavigationAction } from './useNavigationAction';
import { MockOnboardingApplicationTasksFetcher } from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';

const postMessageMockFn = jest.fn();
jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        postMessage: postMessageMockFn,
    }))
);

describe('useCanceledTaskGroup', () => {
    const _fetcher = new MockOnboardingApplicationTasksFetcher();
    const openFormSpy = jest.spyOn(_fetcher, 'openForm');

    it('Should return open tab function for task navigation of type open a tab', async () => {
        const { result } = renderHook(() => useNavigationAction({ fetcher: _fetcher }), {
            wrapper: QueryClientWrapper,
        });

        const action = result.current({
            ...mockTasks[0],
            taskDefinition: {
                ...mockTasks[0].taskDefinition,
                taskNavigation: openTabNavigation,
            },
        });

        expect(action).not.toBeUndefined();
        action?.();
        expect(postMessageMockFn).toBeCalled();
    });

    it('should review a form for task navigation of type review a form', async () => {
        const { result } = renderHook(() => useNavigationAction({ fetcher: _fetcher }), {
            wrapper: QueryClientWrapper,
        });

        const action = result.current({
            ...mockTasks[0],
            taskDefinition: {
                ...mockTasks[0].taskDefinition,
                taskNavigation: reviewFormNavigation,
            },
        });

        expect(action).not.toBeUndefined();
        action?.();
        expect(openFormSpy).toBeCalledWith(reviewFormNavigation.taskForm);
    });

    it('should return undefined', () => {
        const { result } = renderHook(() => useNavigationAction({ fetcher: _fetcher }), {
            wrapper: QueryClientWrapper,
        });

        const action = result.current({
            ...mockTasks[0],
            taskDefinition: {
                ...mockTasks[0].taskDefinition,
                taskNavigation: {
                    type: 10,
                },
            },
        });

        expect(action).toBeUndefined();
    });

    it('should not trigger post message', () => {
        const { result } = renderHook(() => useNavigationAction({ fetcher: _fetcher }), {
            wrapper: QueryClientWrapper,
        });

        const action = result.current({
            ...mockTasks[0],
            taskDefinition: {
                ...mockTasks[0].taskDefinition,
                taskNavigation: {
                    ...openTabNavigation,
                    details: '',
                },
            },
        });

        expect(action).toBeUndefined();
        expect(postMessageMockFn).not.toBeCalled();
    });

    it('should not trigger openForm', () => {
        const { result } = renderHook(() => useNavigationAction({ fetcher: _fetcher }), {
            wrapper: QueryClientWrapper,
        });

        const action = result.current({
            ...mockTasks[0],
            taskDefinition: {
                ...mockTasks[0].taskDefinition,
                taskNavigation: {
                    ...reviewFormNavigation,
                    taskForm: undefined,
                },
            },
        });

        expect(action).toBeUndefined();
        expect(openFormSpy).not.toBeCalled();
    });

    afterEach(() => {
        postMessageMockFn.mockClear();
        openFormSpy.mockClear();
    });
});
