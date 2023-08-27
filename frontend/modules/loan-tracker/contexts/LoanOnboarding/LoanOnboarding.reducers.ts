import { ILoanOnboardingContext } from './LoanOnboarding.context';
import { sortByStepGroup, updateRoute } from '../../helpers/loanOnboardingHelper/loanOnboardingHelper';

export const LoanOnboardingActions = {
    SET_APPLICATIONS: 'SET_APPLICATIONS',
    SET_SELECTED: 'SET_SELECTED',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_STEPS: 'SET_STEPS',
    SET_ARCHIVE_REASONS: 'SET_ARCHIVE_REASONS',
    REMOVE_APPLICATION: 'REMOVE_APPLICATION',
    UPDATE_APPLICATION: 'UPDATE_APPLICATION',
} as const;

export type ILoanOnboardingReducerAction = {
    type: string;
    payload: any;
};

export const LoanOnboardingReducer = (state: ILoanOnboardingContext, action: ILoanOnboardingReducerAction): ILoanOnboardingContext => {
    switch (action.type) {
        case LoanOnboardingActions.SET_APPLICATIONS: {
            const applications = action.payload;

            return {
                ...state,
                applications,
            };
        }

        case LoanOnboardingActions.REMOVE_APPLICATION: {
            const applicationId = action.payload;

            return {
                ...state,
                applications: state.applications.filter(stateApplication => stateApplication.id !== applicationId),
            };
        }

        case LoanOnboardingActions.UPDATE_APPLICATION: {
            const updatedApplicationData = action.payload;

            const applications = state.applications.map(application =>
                application.id === updatedApplicationData.id ? updatedApplicationData : application
            );

            applications.sort((a, b) => sortByStepGroup(a, b, state.steps));

            return {
                ...state,
                applications,
            };
        }

        case LoanOnboardingActions.SET_SELECTED: {
            const selectedApplication = action.payload;

            if (selectedApplication?.id) {
                updateRoute(selectedApplication.id);
            }

            return {
                ...state,
                selectedApplication,
            };
        }
        case LoanOnboardingActions.SET_SEARCH_TERM: {
            const searchTerm = action.payload;

            return {
                ...state,
                searchTerm,
            };
        }
        case LoanOnboardingActions.SET_STEPS: {
            const steps = action.payload;

            return {
                ...state,
                steps,
            };
        }
        case LoanOnboardingActions.SET_ARCHIVE_REASONS: {
            const archiveReasons = action.payload;

            return {
                ...state,
                archiveReasons,
            };
        }
        default: {
            return state;
        }
    }
};
