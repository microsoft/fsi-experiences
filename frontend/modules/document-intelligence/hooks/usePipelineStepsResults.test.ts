import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { stepResultSuccessMock, stepRunningMock } from '../interfaces/mocks/PipelineStepData.mock';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { usePipelineStepsResults } from './usePipelineStepsResults';
import { stepsDefinitions, stepDefinitionExtract } from '../interfaces/mocks/StepsDefinitions.mock';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import * as documentsMock from '../interfaces/mocks/DocumentData.mock';
import { GROUPED_DOCUMENTS_QUERY_KEY, SINGLE_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';

const mockFetcher = new MockDocumentsFetcher();

const errorFetcher = {
    ...mockFetcher,
    getPipelineStepsResults: (pipelineId: string) => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    getPipelineStepsResults: (pipelineId: string) => Promise.resolve({ [stepResultSuccessMock.definitionId]: stepResultSuccessMock }),
} as IDocumentsFetcher;

const pendingFetcher = {
    ...mockFetcher,
    getPipelineStepsResults: (pipelineId: string) => Promise.resolve({ [stepRunningMock.definitionId]: stepRunningMock }),
} as IDocumentsFetcher;

const pendingMultipleFetcher = {
    ...mockFetcher,
    getPipelineStepsResults: (pipelineId: string) =>
        Promise.resolve({ [stepResultSuccessMock.definitionId]: stepResultSuccessMock, [stepRunningMock.definitionId]: stepRunningMock }),
} as IDocumentsFetcher;

const getPipelineStepsResultsSpy = jest.spyOn(simpleFetcher, 'getPipelineStepsResults');

describe('getPipelineStepsResultsSpy', () => {
    const invalidateQuerySpy = jest.spyOn(queryClient, 'invalidateQueries');

    const mockStepsResultsWithDefinitions = [
        {
            ...stepDefinitionExtract,
            ...stepResultSuccessMock,
            fields: stepDefinitionExtract.fields.map(field => ({
                ...field,
                ...(stepResultSuccessMock.fields[field.id] || {}),
            })),
        },
    ];

    beforeEach(() => {
        testingQueryClient.clear();
        getPipelineStepsResultsSpy.mockClear();
        jest.useFakeTimers();
    });

    it('Should call getDocumentPipelineSteps', async () => {
        renderHook(() => usePipelineStepsResults(simpleFetcher, { stepsDefinitions, document: documentsMock.recApprovalDocMock }), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineStepsResultsSpy).toBeCalledTimes(1);
        expect(getPipelineStepsResultsSpy).toBeCalledWith(documentsMock.recApprovalDocMock.pipelineResult?.id);
    });

    it('Should not call getDocumentPipelineSteps', async () => {
        renderHook(() => usePipelineStepsResults(simpleFetcher, { stepsDefinitions, document: documentsMock.approvedDocMock }), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineStepsResultsSpy).toBeCalledTimes(0);
    });

    it('Should return an error in case fetching the pipeline-steps failed', async () => {
        const { result } = renderHook(() => usePipelineStepsResults(errorFetcher, { stepsDefinitions, document: documentsMock.recApprovalDocMock }), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeTruthy();
    });

    it('Should return loading for completed document', async () => {
        const { result } = renderHook(() => usePipelineStepsResults(mockFetcher, { stepsDefinitions, document: documentsMock.autoApprovedDocMock }), {
            wrapper: QueryClientWrapper,
        });
        await waitFor(() => result.current.isLoading);
        expect(result.current.isLoading).toBeTruthy();
    });

    it('Should not fetch file without pipeline id', async () => {
        getPipelineStepsResultsSpy.mockClear();
        renderHook(() => usePipelineStepsResults(mockFetcher, { stepsDefinitions, document: documentsMock.approvedDocMock }), {
            wrapper: QueryClientWrapper,
        });
        expect(getPipelineStepsResultsSpy).not.toBeCalled();
    });

    it('Should return valid response', async () => {
        const { result } = renderHook(
            () => usePipelineStepsResults(simpleFetcher, { stepsDefinitions: [stepsDefinitions[0]], document: documentsMock.recApprovalDocMock }),
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => !result.current.isLoading);
        expect(result.current.isError).toBeFalsy();
        expect(result.current.pipelineSteps).toEqual(mockStepsResultsWithDefinitions);
    });

    it('should not invalidateQuery for pipeline when steps are not completed', async () => {
        const { result } = renderHook(
            () => usePipelineStepsResults(pendingFetcher, { stepsDefinitions, document: documentsMock.recApprovalDocMock }),
            {
                wrapper: QueryClientWrapper,
            }
        );

        await waitFor(() => !result.current.isLoading);
        jest.runOnlyPendingTimers();
        expect(invalidateQuerySpy).not.toBeCalledWith([GROUPED_DOCUMENTS_QUERY_KEY, documentsMock.recApprovalDocMock.contextId]);
        expect(invalidateQuerySpy).not.toBeCalledWith([SINGLE_DOCUMENTS_QUERY_KEY, documentsMock.recApprovalDocMock.id]);
    });

    it('should trigger invalidateQuery for pipeline when steps are completed', async () => {
        const { result } = renderHook(
            () => usePipelineStepsResults(simpleFetcher, { stepsDefinitions: [stepDefinitionExtract], document: documentsMock.recApprovalDocMock }),
            {
                wrapper: QueryClientWrapper,
            }
        );

        await waitFor(() => !result.current.isLoading);
        jest.runOnlyPendingTimers();
        expect(invalidateQuerySpy).toBeCalledTimes(3);
    });

    it('should not trigger invalidateQuery for pipeline when some steps are not completed', async () => {
        const { result } = renderHook(
            () => usePipelineStepsResults(pendingMultipleFetcher, { stepsDefinitions, document: documentsMock.recApprovalDocMock }),
            {
                wrapper: QueryClientWrapper,
            }
        );

        await waitFor(() => !result.current.isLoading);
        jest.runOnlyPendingTimers();
        expect(invalidateQuerySpy).not.toBeCalledWith([GROUPED_DOCUMENTS_QUERY_KEY, documentsMock.recApprovalDocMock.contextId]);
        expect(invalidateQuerySpy).not.toBeCalledWith([SINGLE_DOCUMENTS_QUERY_KEY, documentsMock.recApprovalDocMock.id]);
    });

    it('should not trigger invalidateQuery for pipeline when no step definitions', async () => {
        const { result } = renderHook(
            () => usePipelineStepsResults(pendingMultipleFetcher, { stepsDefinitions: [], document: documentsMock.recApprovalDocMock }),
            {
                wrapper: QueryClientWrapper,
            }
        );

        await waitFor(() => !result.current.isLoading);
        jest.runOnlyPendingTimers();
        expect(invalidateQuerySpy).not.toBeCalledWith([GROUPED_DOCUMENTS_QUERY_KEY, documentsMock.recApprovalDocMock.contextId]);
        expect(invalidateQuerySpy).not.toBeCalledWith([SINGLE_DOCUMENTS_QUERY_KEY, documentsMock.recApprovalDocMock.id]);
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        invalidateQuerySpy.mockClear();
    });
});
