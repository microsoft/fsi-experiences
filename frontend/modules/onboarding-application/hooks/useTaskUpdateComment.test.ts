import { renderHook } from '@testing-library/react-hooks/pure';
import { act, waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useTaskUpdateComment } from './useTaskUpdateComment';
import { MockOnboardingApplicationTasksFetcher } from '../interfaces/mocks/MockOnboardingApplicationTasksFetcher';

const postMessageMockFn = jest.fn();

describe('useTaskUpdateComment', () => {
    const _fetcher = new MockOnboardingApplicationTasksFetcher();
    const updateTaskCommentSpy = jest.spyOn(_fetcher, 'updateTaskComment');
    const getQueryDataSpy = jest.spyOn(testingQueryClient, 'getQueryData');
    const setQueryDataSpy = jest.spyOn(testingQueryClient, 'setQueryData');

    beforeEach(() => {
        testingQueryClient.clear();
        getQueryDataSpy.mockClear();
        setQueryDataSpy.mockClear();
        updateTaskCommentSpy.mockClear();
    });

    it('Should call update task status', async () => {
        getQueryDataSpy.mockReturnValueOnce([]);
        const { result } = renderHook(() => useTaskUpdateComment({ fetcher: _fetcher, queryName: '123', postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.updateTaskComment({ comment: '123454', taskId: '123' });
        });

        await waitFor(() => {
            expect(updateTaskCommentSpy).toBeCalled();
            expect(getQueryDataSpy).toBeCalled();
        });
    });

    it('should call update the tasks', async () => {
        getQueryDataSpy.mockReturnValueOnce([
            {
                id: '123',
                comment: '123',
            },
            {
                id: '1234',
                comment: '1234',
            },
        ]);
        const mockUpdatedTask = { comment: '123454', taskId: '123' };
        const mockQueryName = '123';
        const { result } = renderHook(() => useTaskUpdateComment({ fetcher: _fetcher, queryName: mockQueryName, postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.updateTaskComment(mockUpdatedTask);
        });

        await waitFor(() => {
            expect(updateTaskCommentSpy).toBeCalled();
            expect(getQueryDataSpy).toBeCalled();
            expect(setQueryDataSpy).toBeCalledWith(
                [mockQueryName],
                [
                    {
                        id: '123',
                        comment: mockUpdatedTask.comment,
                    },
                    {
                        id: '1234',
                        comment: '1234',
                    },
                ]
            );
        });
    });

    it('should update with the original tasks when not found', async () => {
        getQueryDataSpy.mockReturnValueOnce(undefined);
        const mockUpdatedTask = { comment: '123454', taskId: '123' };
        const mockQueryName = '123';
        const { result } = renderHook(() => useTaskUpdateComment({ fetcher: _fetcher, queryName: mockQueryName, postMessage: postMessageMockFn }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            result.current.updateTaskComment(mockUpdatedTask);
        });

        await waitFor(() => {
            expect(updateTaskCommentSpy).toBeCalled();
            expect(getQueryDataSpy).toBeCalled();
            expect(setQueryDataSpy).toBeCalledWith([mockQueryName], undefined);
        });
    });
});
