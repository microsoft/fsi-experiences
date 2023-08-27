import { renderHook, act } from '@testing-library/react-hooks';
import { useMutation } from 'react-query';
import { ACTIVE_STATUS_CODES, STATES, VERIFICATION_STATUSES } from '../../constants/LoanStateMap.consts';
import { mockLoanCustomers, newAddedCustomer, rolesMock } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomer.mocks';
import { ILoanInformation } from '../../interfaces/ILoanInformation/ILoanInformation';
import { mockLoanInformation, mockLoanInformationMetadata } from '../../interfaces/ILoanInformation/mocks/ILoanInformation.mocks';
import { MockLoanApplicationCustomerFetcher } from '../../interfaces/ILoanApplicationCustomer/mocks/ILoanApplicationCustomerFetcher.mocks';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import useLoanCustomer from './useLoanCustomer';

describe('useLoanCustomer tests', () => {
    const onApplicantSelectCallback = jest.fn();
    const options = {
        queryName: 'loan-parties',
        fetcher: new MockLoanApplicationCustomerFetcher(),
        loanApplicationId: '',
        onApplicantSelectCallback,
    };
    const createMockFetcher = (loanInformation: ILoanInformation) => ({
        getLoanApplicationCustomers: jest.fn().mockResolvedValue(mockLoanCustomers),
        addApplicantMutationFunc: () => jest.fn().mockReturnValue(new Promise(resolve => resolve(newAddedCustomer))),
        addApplicantMutationOptions: {},
        removeApplicantMutationFunc: () => jest.fn().mockReturnValue(Promise.resolve()),
        removeApplicantMutationOptions: {},
        getRoles: jest.fn().mockResolvedValue(rolesMock),
        updateCustomerVerifiedInformation: jest.fn().mockResolvedValue({}),
        getLoanInformation: jest.fn().mockResolvedValue(loanInformation),
        getLoanInformationMetadata: jest.fn().mockResolvedValue(mockLoanInformationMetadata),
        hasApplicantPrivilege: jest.fn().mockReturnValue(true),
        hasFinancialItemPrivilege: jest.fn().mockReturnValue(true),
    });

    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should set selectedApplicant', async () => {
        const { result } = renderHook(() => useLoanCustomer(options), { wrapper: QueryClientWrapper });

        act(() => {
            result.current.onChangeApplicant(mockLoanCustomers[0].id);
        });

        expect(onApplicantSelectCallback).toBeCalledWith(mockLoanCustomers[0].id);
        expect(result.current.selectedApplicantId).toEqual(mockLoanCustomers[0].id);
    });

    it('Should toggle verified', async () => {
        const { result, waitFor } = renderHook(() => useLoanCustomer(options), { wrapper: QueryClientWrapper });

        act(() => {
            result.current.onVerifyToggle(mockLoanCustomers[0]);
        });

        await waitFor(() => {
            expect(result.current.applicants?.[0].verificationStatus).toEqual(VERIFICATION_STATUSES.Verified);
        });
    });

    it('Should add an applicant with success callback called', async () => {
        const onAddApplicantSuccessCallback = jest.fn();

        const customLoanCustomers = [...mockLoanCustomers];
        const mockFetcher = {
            ...createMockFetcher(mockLoanInformation),
            getLoanApplicationCustomers: jest.fn().mockResolvedValue(customLoanCustomers),
        };

        const { result, waitFor } = renderHook(() => useLoanCustomer({ ...options, onAddApplicantSuccessCallback, fetcher: mockFetcher }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            if (result.current.addApplicantMutationFunc) {
                renderHook(() => useMutation(() => result.current.addApplicantMutationFunc!({ ...newAddedCustomer, id: '' })), {
                    wrapper: QueryClientWrapper,
                });
            }
            customLoanCustomers.push(newAddedCustomer);
        });

        await waitFor(() => {
            expect(result.current.applicants?.[2]).toEqual(newAddedCustomer);
        });
    });

    it('Should remove an applicant with success callback called', async () => {
        const onAddApplicantSuccessCallback = jest.fn();

        const customLoanCustomers = [...mockLoanCustomers];
        const mockFetcher = {
            ...createMockFetcher(mockLoanInformation),
            getLoanApplicationCustomers: jest.fn().mockResolvedValue(customLoanCustomers),
        };

        const { result, waitFor } = renderHook(() => useLoanCustomer({ ...options, onAddApplicantSuccessCallback, fetcher: mockFetcher }), {
            wrapper: QueryClientWrapper,
        });

        act(() => {
            if (result.current.removeApplicantMutationFunc) {
                renderHook(() => useMutation(() => result.current.removeApplicantMutationFunc!(mockLoanCustomers[1].id)), {
                    wrapper: QueryClientWrapper,
                });
            }
            customLoanCustomers.splice(1, 1);
        });

        await waitFor(() => {
            expect(result.current.applicants?.length).toEqual(1);
        });
    });

    it('Should sort applicants', async () => {
        const { result, waitFor } = renderHook(() => useLoanCustomer(options), { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(result.current.applicants?.[0].isPrimary).toEqual(true);
            expect(result.current.applicants?.[1].isPrimary).toEqual(false);
        });
    });

    it('Should be disabled when loan is active but not in review', async () => {
        const mockFetcher = createMockFetcher({ ...mockLoanInformation, statusCode: ACTIVE_STATUS_CODES['In Progress'] });
        const { result, waitFor } = renderHook(() => useLoanCustomer({ ...options, fetcher: mockFetcher }), { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(result.current.isLoanLocked).toEqual(true);
        });
    });

    it('Should be disabled when loan is inactive', async () => {
        const mockFetcher = createMockFetcher({ ...mockLoanInformation, state: STATES.Inactive });
        const { result, waitFor } = renderHook(() => useLoanCustomer({ ...options, fetcher: mockFetcher }), { wrapper: QueryClientWrapper });

        await waitFor(() => {
            expect(result.current.isLoanLocked).toEqual(true);
        });
    });
});
