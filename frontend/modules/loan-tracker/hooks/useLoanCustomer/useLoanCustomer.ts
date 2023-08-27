import sortBy from 'lodash/sortBy';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import { ILoanApplicationCustomer } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';
import { ILoanCustomerLookupFetcher } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomerLookupFetcher';
import { isLoanApplicationLocked } from '../../helpers/loanApplicationsHelper/loanApplicationsHelper';
import { ILoanApplicantFetcher } from '../../interfaces/ILoanApplicant/ILoanApplicantFetcher';
import { ActiveStatusCodesValues, StatesValues } from '../../constants/LoanStateMap.consts';

interface IUseLoanCustomerLookup {
    fetcher: ILoanApplicantFetcher;
    loanApplicationId: string;
    onApplicantSelectCallback?: (guid: string) => void;
    queryName: string;
    onAddApplicantSuccessCallback?: (updatedCustomer: ILoanApplicationCustomer) => void;
    onRemoveApplicantSuccessCallback?: (removedApplicantfullName: string, removedApplicantrole: string) => void;
}

export interface IUseLoanCustomerLookupOutput {
    applicants?: ILoanApplicationCustomer[];
    onChangeApplicant: (guid?: string) => void;
    onVerifyToggle: (customer: ILoanApplicationCustomer) => void;
    addApplicantMutationFunc?: (newAppicantData: ILoanApplicationCustomer) => Promise<void>;
    removeApplicantMutationFunc?: (applicantId: string) => Promise<void>;
    selectedApplicantId: string;
    isLoading: boolean;
    isError: boolean;
    isLoanLocked: boolean;
    hasApplicantPrivilege: (operation: number) => boolean;
}

const useLoanCustomerLookup = ({
    queryName,
    onApplicantSelectCallback,
    onAddApplicantSuccessCallback,
    onRemoveApplicantSuccessCallback,
    fetcher,
    loanApplicationId,
}: IUseLoanCustomerLookup): IUseLoanCustomerLookupOutput => {
    const query = useMemo(() => [queryName, loanApplicationId], [queryName, loanApplicationId]);
    const { postMessage } = useBrowserCommunication(query.join('-'));
    const { messages: saveChangesMessages, postMessage: postLoanChangeMessage } = useBrowserCommunication(`loanapp-change-${loanApplicationId}`);
    const queryClient = useQueryClient();

    const {
        data: applicants,
        isLoading: isLoanApplicationCustomersLoading,
        isError: isLoanApplicationCustomersError,
        refetch,
    } = useQuery(query, () => fetcher.getLoanApplicationCustomers(loanApplicationId), {
        onSuccess: data => {
            postMessage(data);
        },
    });

    const {
        data: loanApplication,
        isLoading: isLoanApplicationLoading,
        isError: isLoanApplicationError,
    } = useQuery('loan-application', () => fetcher.getLoanInformation());
    useEffect(() => {
        if (saveChangesMessages[saveChangesMessages.length - 1] === loanApplicationId) {
            refetch();
        }
    }, [refetch, saveChangesMessages, loanApplicationId]);

    const { mutate: onVerifyToggle } = useMutation((customer: ILoanApplicationCustomer) => fetcher.updateCustomerVerifiedInformation(customer), {
        onMutate: async customer => {
            await queryClient.cancelQueries(query);
            const previusApplicants = queryClient.getQueryData(query);
            queryClient.setQueryData<ILoanApplicationCustomer[] | undefined>(query, prevApplicants =>
                prevApplicants?.map(applicant => (applicant.id === customer.id ? customer : applicant))
            );

            return { previusApplicants };
        },
        onSuccess: () => {
            queryClient.invalidateQueries(query);
        },
    });

    /* istanbul ignore next */
    const addApplicantMutationFunc = async (newAppicantData: ILoanApplicationCustomer) => {
        const customerLookupFetcher = fetcher as ILoanCustomerLookupFetcher;
        const addedCustomer = await customerLookupFetcher.addApplicant(loanApplicationId, newAppicantData);
        queryClient.invalidateQueries(query);
        postLoanChangeMessage(loanApplicationId);
        setState(addedCustomer.id);
        onAddApplicantSuccessCallback?.(addedCustomer);
    };

    /* istanbul ignore next */
    const removeApplicantMutationFunc = async (applicantId: string) => {
        const customerLookupFetcher = fetcher as ILoanCustomerLookupFetcher;
        await customerLookupFetcher.removeApplicant(applicantId);
        const removedApplicant = applicants?.find(applicant => applicant.id === applicantId);
        const primaryApplicant = applicants?.find(applicant => applicant.isPrimary);
        queryClient.invalidateQueries(query);
        postLoanChangeMessage(loanApplicationId);
        if (primaryApplicant) {
            setState(primaryApplicant.id);
        }
        onRemoveApplicantSuccessCallback?.(removedApplicant?.fullName || '', removedApplicant?.role || '');
    };

    const [selectedApplicantId, setState] = useState('');

    const sortedApplicants = useMemo(() => sortBy(applicants, applicant => !applicant.isPrimary), [applicants]);

    useEffect(() => {
        if (selectedApplicantId && onApplicantSelectCallback) {
            onApplicantSelectCallback(selectedApplicantId);
        }
    }, [selectedApplicantId, onApplicantSelectCallback]);

    useEffect(() => {
        if (sortedApplicants?.[0] && !selectedApplicantId) {
            setState(sortedApplicants[0].id);
        }
    }, [sortedApplicants, selectedApplicantId]);

    const onChangeApplicant = useCallback((guid?: string) => setState(guid || ''), []);

    const isLoanLocked = useMemo(
        () =>
            isLoanApplicationLocked({
                stateCode: loanApplication?.state as StatesValues,
                statusCode: loanApplication?.statusCode as ActiveStatusCodesValues,
            }),
        [loanApplication?.state, loanApplication?.statusCode]
    );

    const hasApplicantPrivilege = useCallback(
        (operation: number) => fetcher.hasApplicantPrivilege(operation) && !isLoanLocked,
        [isLoanLocked, fetcher]
    );

    const isLoading = isLoanApplicationCustomersLoading || isLoanApplicationLoading;
    const isError = isLoanApplicationError || isLoanApplicationCustomersError;

    return {
        isLoanLocked,
        applicants: sortedApplicants,
        onChangeApplicant,
        onVerifyToggle,
        addApplicantMutationFunc,
        removeApplicantMutationFunc,
        selectedApplicantId,
        isLoading,
        isError,
        hasApplicantPrivilege,
    };
};

export default useLoanCustomerLookup;
