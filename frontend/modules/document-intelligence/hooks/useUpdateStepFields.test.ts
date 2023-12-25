import { stepResultSuccessMock } from '../interfaces/mocks/PipelineStepData.mock';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { testingQueryClient, QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { MockDocumentsFetcher } from '../interfaces/mocks/MockDocumentsFetcher';
import { IDocumentsFetcher } from '../interfaces/IDocumentsFetcher';
import { useUpdateStepFields } from './useUpdateStepFields';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { GET_STEPS_RESULTS_QUERY_KEY } from '../constants/DocumentQueries.const';

const mockFetcher = new MockDocumentsFetcher();
const invalidateQuerySpy = jest.spyOn(queryClient, 'invalidateQueries');

const errorFetcher = {
    ...mockFetcher,
    updateStepFieldsData: step => Promise.reject('error'),
} as IDocumentsFetcher;

const simpleFetcher = {
    ...mockFetcher,
    updateStepFieldsData: step => Promise.resolve(true),
} as IDocumentsFetcher;

describe('useUpdateStepFields', () => {
    beforeEach(() => {
        testingQueryClient.clear();
        invalidateQuerySpy.mockClear();
    });

    it('should call updateStepFieldsData', async () => {
        const updateStepFieldsDataSpy = jest.spyOn(simpleFetcher, 'updateStepFieldsData');
        const { result } = renderHook(() => useUpdateStepFields(simpleFetcher, '1234'), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            stepResultId: stepResultSuccessMock.resultId,
            stepOutput: stepResultSuccessMock.output,
            fieldsToUpdate: {
                field1: 'value1',
                field2: 'value2',
            },
        };

        result.current.onSave(params);
        await waitFor(() => {
            expect(updateStepFieldsDataSpy).toBeCalledWith(params);
            expect(invalidateQuerySpy).toBeCalledWith([GET_STEPS_RESULTS_QUERY_KEY, '1234']);
        });
    });

    it('should not call invalidateQuerySpy', async () => {
        const updateStepFieldsDataSpy = jest.spyOn(simpleFetcher, 'updateStepFieldsData');
        const { result } = renderHook(() => useUpdateStepFields(simpleFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            stepResultId: stepResultSuccessMock.resultId,
            stepOutput: stepResultSuccessMock.output,
            fieldsToUpdate: {
                field1: 'value1',
                field2: 'value2',
            },
        };

        result.current.onSave(params);
        await waitFor(() => {
            expect(updateStepFieldsDataSpy).toBeCalledWith(params);
            expect(invalidateQuerySpy).not.toBeCalled();
        });
    });

    it('should return error', async () => {
        const { result } = renderHook(() => useUpdateStepFields(errorFetcher), {
            wrapper: QueryClientWrapper,
        });
        const params = {
            stepResultId: stepResultSuccessMock.resultId,
            stepOutput: stepResultSuccessMock.output,
            fieldsToUpdate: {
                field1: 'value1',
                field2: 'value2',
            },
        };

        result.current.onSave(params);
        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });
});
