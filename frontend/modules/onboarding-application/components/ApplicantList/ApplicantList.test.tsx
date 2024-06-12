import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ApplicantList } from './ApplicantList';
import * as useApplicantHooks from '../../hooks/useApplicantListData';
import ApplicantListStrings from '../../assets/strings/ApplicantListControl/ApplicantListControl.1033.json';
import { MockApplicantListFetcher } from '../../interfaces/mocks/ApplicantListFetcher.mock';
import { IApplicantListFetcher } from '../../interfaces/IApplicantListFetcher';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { mockApplicants } from '../../interfaces/mocks/ApplicantList.mock';

describe('ApplicantList', () => {
    const mockUseApplicantListData = jest.spyOn(useApplicantHooks, 'useApplicantListData');
    const mockSyncAppState = jest.fn();
    const mockOnChangeApplicant = jest.fn();
    const mockFetcher = new MockApplicantListFetcher();

    const renderApplicantList = (fetcher: IApplicantListFetcher = mockFetcher, selected = '') => {
        return render(
            <ApplicantList
                onSyncAppState={mockSyncAppState}
                onChangeApplicant={mockOnChangeApplicant}
                taskDefinitionId={'1'}
                applicationId={'1'}
                selectedApplicant={selected}
                fetcher={fetcher || mockFetcher}
            />,
            { wrapper: QueryClientWrapper }
        );
    };

    beforeEach(() => {
        mockUseApplicantListData.mockClear();
        mockSyncAppState.mockClear();
        mockOnChangeApplicant.mockClear();
        testingQueryClient.clear();
    });

    it('Should be rendered in DOM', () => {
        const { getByTestId } = renderApplicantList();
        expect(getByTestId('applicant-list-container')).toBeInTheDocument();
    });

    it('should render empty state', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: false,
            applicants: [],
            isError: false,
        });
        const { getByText } = renderApplicantList();

        expect(getByText(ApplicantListStrings.NO_DATA)).toBeTruthy();

        await waitFor(() => {
            expect(mockSyncAppState).toBeCalled();
        });
    });

    it('should render loading state', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: true,
            applicants: [],
            isError: false,
        });
        const { getByText } = renderApplicantList();

        expect(getByText('Loading...')).toBeTruthy();

        await waitFor(() => {
            expect(mockSyncAppState).toBeCalled();
        });
    });

    it('should render error state', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: false,
            applicants: [],
            isError: true,
            errorMessage: 'error test',
        });

        const { getByText } = renderApplicantList();

        expect(getByText('error test')).toBeTruthy();

        await waitFor(() => expect(mockSyncAppState).toBeCalled());
    });

    it('should trigger onChangeApplicant when no selected', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: false,
            applicants: mockApplicants,
            isError: false,
        });

        renderApplicantList();

        await waitFor(() => expect(mockOnChangeApplicant).toBeCalledWith(mockApplicants[0].id));
    });

    it('should trigger onChangeApplicant when no matched selected', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: false,
            applicants: mockApplicants,
            isError: false,
        });

        renderApplicantList(mockFetcher, '1234');

        await waitFor(() => expect(mockOnChangeApplicant).toBeCalledWith(mockApplicants[0].id));
    });

    it('should not trigger onChangeApplicant', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: false,
            applicants: mockApplicants,
            isError: false,
        });

        renderApplicantList(mockFetcher, mockApplicants[0].id);

        await waitFor(() => expect(mockOnChangeApplicant).not.toBeCalled());
    });

    it('should not trigger onChangeApplicant when no applicants', async () => {
        mockUseApplicantListData.mockReturnValue({
            isLoading: false,
            applicants: [],
            isError: false,
        });

        renderApplicantList(mockFetcher, mockApplicants[0].id);

        await waitFor(() => expect(mockOnChangeApplicant).not.toBeCalled());
    });
});
