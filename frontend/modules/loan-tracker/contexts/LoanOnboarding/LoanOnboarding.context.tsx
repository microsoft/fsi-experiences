import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { FC } from 'react';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { useMediaQueryListener } from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { MEDIA_QUERY_BREAKPOINT_SMALL } from '../../constants/StyleSelectors.consts';
import { ILoanOnboardingProps } from '../../components/LoanOnboarding/LoanOnboardingWrapper';
import { LoanOnboardingActions, LoanOnboardingReducer } from './LoanOnboarding.reducers';
import { ILoanApplication } from '../../interfaces/ILoanApplication/ILoanApplication';
import { BusinessFlowStepsMap } from '../../interfaces/ILoanOnboarding/BusinessFlowStepsMap';
import { CLOSE_LIST_ATTR, LOAN_LIST_WRAPPER_ID } from '../../components/LoanOnboarding/LoanApplicationList';

export interface ILoanOnboardingContext {
    applications: ILoanApplication[];
    selectedApplication?: ILoanApplication;
    steps: BusinessFlowStepsMap;
    archiveReasons: { [key: string]: string };
    setSelected: (application: ILoanApplication) => void;
    archiveApplication: (loanId: string, reason: string, comment?: string) => Promise<void>;
    searchTerm?: string;
    setSearchTerm: (term?: string) => void;
}

export const initialOnboardingValue: ILoanOnboardingContext = {
    applications: [],
    steps: {},
    archiveReasons: {},
    archiveApplication: (loanId: string, reason: string, comment?: string) => Promise.resolve(),
    setSelected: () => {},
    setSearchTerm: () => {},
};

export const LoanOnboardingContext = createContext(initialOnboardingValue);

export const LoanOnboardingContextProvider: FC<ILoanOnboardingProps> = ({ fetcher, children }) => {
    const [state, dispatch] = useReducer(LoanOnboardingReducer, initialOnboardingValue);
    const [loading, setLoading] = useState(false);
    const { messages: loanStageMessages } = useBrowserCommunication(`loan-stage-change`);

    const { messages: saveChangesMessages } = useBrowserCommunication('loan-data-changed-outside-channel');

    const { postMessage: postLoanArchiveSuccessMessage } = useBrowserCommunication(`loan-archive-success`);

    const isSmallScreen = useMediaQueryListener(`screen and (max-width: ${MEDIA_QUERY_BREAKPOINT_SMALL})`);

    const fetchApplications = useCallback(async () => {
        const steps = await fetcher.getBusinessFlowSteps();
        const archiveReasons = await fetcher.getLoanArchiveReasons();
        const applications = await fetcher.fetchApplications(steps);
        const selectedId = await fetcher.fetchCurrentApplicationId();

        const selectedApplication = selectedId ? applications.find(application => application.id === selectedId) : applications[0];

        dispatch({ type: LoanOnboardingActions.SET_STEPS, payload: steps });
        dispatch({ type: LoanOnboardingActions.SET_ARCHIVE_REASONS, payload: archiveReasons });
        dispatch({ type: LoanOnboardingActions.SET_APPLICATIONS, payload: applications });
        dispatch({ type: LoanOnboardingActions.SET_SELECTED, payload: selectedApplication });
    }, [fetcher]);

    const updateApplication = useCallback(async (loanId: string) => {
        try {
            const updatedApplicationData = await fetcher.getUpdatedLoanApplicationData(loanId);

            if (updatedApplicationData?.status && updatedApplicationData?.stepId) {
                dispatch({ type: LoanOnboardingActions.UPDATE_APPLICATION, payload: updatedApplicationData });
                dispatch({ type: LoanOnboardingActions.SET_SELECTED, payload: updatedApplicationData });
            } else {
                dispatch({ type: LoanOnboardingActions.REMOVE_APPLICATION, payload: loanId });
            }
        } catch {
            dispatch({ type: LoanOnboardingActions.REMOVE_APPLICATION, payload: loanId });
        }
    }, []);

    const archiveApplication = useCallback(
        async (applicationId: string, archiveReason: string, comment?: string) => {
            await fetcher.archiveApplication(applicationId, archiveReason, comment);
            postLoanArchiveSuccessMessage('SUCCESS');
            dispatch({ type: LoanOnboardingActions.REMOVE_APPLICATION, payload: applicationId });
        },
        [fetcher, postLoanArchiveSuccessMessage]
    );

    const setSelected = useCallback(
        (item: ILoanApplication) => {
            dispatch({ type: LoanOnboardingActions.SET_SELECTED, payload: item });

            if (!isSmallScreen) {
                return;
            }

            /* istanbul ignore next */
            window.requestAnimationFrame(() => {
                const loanListWrapper = document.getElementById(LOAN_LIST_WRAPPER_ID);
                loanListWrapper?.setAttribute(CLOSE_LIST_ATTR, '');
            });
        },
        [isSmallScreen]
    );

    const setSearchTerm = useCallback((term?: string) => {
        dispatch({ type: LoanOnboardingActions.SET_SEARCH_TERM, payload: term });
    }, []);

    /* istanbul ignore next */
    useEffect(() => {
        const loanMessages = loanStageMessages?.length ? loanStageMessages : saveChangesMessages;
        if (loanMessages?.length) {
            const loanId = loanMessages.pop();
            updateApplication(loanId);
        }
    }, [loanStageMessages, saveChangesMessages, updateApplication]);

    useEffect(() => {
        setLoading(true);
        fetchApplications();
        setLoading(false);
    }, []);

    const value = useMemo(
        () => ({
            ...state,
            setSelected,
            setSearchTerm,
            archiveApplication,
        }),
        [state, setSelected, setSearchTerm, archiveApplication]
    );

    return <LoanOnboardingContext.Provider value={value}>{children}</LoanOnboardingContext.Provider>;
};

export default LoanOnboardingContextProvider;
