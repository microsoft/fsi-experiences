import { renderHook } from '@testing-library/react-hooks/pure';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useApplicantListData } from './useApplicantListData';
import {
    MockApplicantListFetcher,
    MockApplicantListFetcherCanceledTasks,
    MockErrorApplicantListFetcher,
} from '../interfaces/mocks/ApplicantListFetcher.mock';
import { mockApplicants } from '../interfaces/mocks/ApplicantList.mock';
import * as useTaskUpdateHooks from './useTaskUpdateStatus';
import { CONFIGURATION_ERROR } from '../constants/TaskVerification.const';

const postMessageMockFn = jest.fn();

jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        postMessage: postMessageMockFn,
        messages: [],
    }))
);

describe('useApplicantListData', () => {
    const mockFetcher = new MockApplicantListFetcher();
    const useTaskUpdateStatusSpy = jest.spyOn(useTaskUpdateHooks, 'useTaskUpdateStatus');

    const mockErrorFetcher = new MockErrorApplicantListFetcher();

    const mockFetchApplicants = jest.spyOn(mockErrorFetcher, 'fetchApplicants');

    beforeEach(() => {
        testingQueryClient.clear();
        useTaskUpdateStatusSpy.mockClear();
        mockFetchApplicants.mockClear();
    });

    it('should not return canceled tasks if env var is false', async () => {
        const mockCanceledTasks = new MockApplicantListFetcherCanceledTasks();
        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: mockCanceledTasks,
                    applicationId: '123',
                    taskDefinitionId: '123',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.applicants).toEqual([]);
    });

    it('should return loading', async () => {
        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: mockFetcher,
                    applicationId: '123',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        expect(result.current.isLoading).toBeTruthy();
    });

    it('should return an error in case fetching the data failed', async () => {
        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: new MockErrorApplicantListFetcher(),
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

    it('should return applicant list data', async () => {
        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: mockFetcher,
                    applicationId: '123',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.applicants).toEqual(mockApplicants);
    });

    it('should return applicant list data with task update status function', async () => {
        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: mockFetcher,
                    applicationId: '123',
                    taskDefinitionId: '12345',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);

        result.current.applicants?.[0].task?.updateStatus(1, 2);

        expect(useTaskUpdateStatusSpy).toBeCalled();
    });

    it('should return error message', async () => {
        mockFetchApplicants.mockImplementation(() => {
            throw new Error(CONFIGURATION_ERROR);
        });
        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: mockErrorFetcher,
                    applicationId: '123',
                    taskDefinitionId: '123',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);

        expect(result.current.errorMessage).toEqual(CONFIGURATION_ERROR);
    });

    it('should return without task', async () => {
        const fetchApplicantsSpy = jest.spyOn(mockFetcher, 'fetchApplicants');

        fetchApplicantsSpy.mockReturnValue(Promise.resolve([{ ...mockApplicants[0], task: undefined }]));

        const { result } = renderHook(
            () =>
                useApplicantListData({
                    fetcher: mockFetcher,
                    applicationId: '123',
                    taskDefinitionId: '12345',
                }),
            {
                wrapper: QueryClientWrapper,
            }
        );

        await waitFor(() => !result.current.isLoading);

        expect(result.current.applicants?.[0].task).toBeFalsy();
    });
});
