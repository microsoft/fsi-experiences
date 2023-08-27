import { ILoanApplication } from '../../interfaces/ILoanApplication/ILoanApplication';
import {
    loanArchiveReasonsMock,
    mockApplications,
    mockUpdatedLoanApplication,
    stepsMock,
} from '../../interfaces/ILoanApplication/mocks/ILoanApplication.mocks';
import { initialOnboardingValue } from './LoanOnboarding.context';
import { LoanOnboardingActions, LoanOnboardingReducer } from './LoanOnboarding.reducers';

describe('LoanOnboardingReducer', () => {
    it('should change the applications and the groups', () => {
        const payload: ILoanApplication[] = mockApplications;

        const newState = LoanOnboardingReducer(initialOnboardingValue, { type: LoanOnboardingActions.SET_APPLICATIONS, payload });

        expect(newState).toEqual({
            ...initialOnboardingValue,
            applications: payload,
        });
    });

    it('should return the current state', () => {
        const newState = LoanOnboardingReducer(initialOnboardingValue, { type: '', payload: '2' });

        expect(newState).toEqual(initialOnboardingValue);
    });

    it('SET_SELECTED: should NOT update URL when payload is undefined', () => {
        const newState = LoanOnboardingReducer(initialOnboardingValue, {
            type: LoanOnboardingActions.SET_SELECTED,
            payload: undefined,
        });

        const url = new URL(window.location.toString());

        expect(url.searchParams.get('id')).toBeNull();
    });

    it('change the selectedApplication', () => {
        const payload: ILoanApplication = mockApplications[1];

        const newState = LoanOnboardingReducer(initialOnboardingValue, { type: LoanOnboardingActions.SET_SELECTED, payload });

        expect(newState).toEqual({
            ...initialOnboardingValue,
            selectedApplication: payload,
        });
    });

    it('should change the search term', () => {
        const payload = 'test me';

        const newState = LoanOnboardingReducer(initialOnboardingValue, {
            type: LoanOnboardingActions.SET_SEARCH_TERM,
            payload,
        });

        expect(newState).toEqual({
            ...initialOnboardingValue,
            searchTerm: payload,
        });
    });

    it('should change the steps of the application', () => {
        const payload = stepsMock;

        const newState = LoanOnboardingReducer(initialOnboardingValue, { type: LoanOnboardingActions.SET_STEPS, payload });

        expect(newState).toEqual({
            ...initialOnboardingValue,
            steps: payload,
        });
    });

    it('should change the archive reasons of the application', () => {
        const payload = loanArchiveReasonsMock;

        const newState = LoanOnboardingReducer(initialOnboardingValue, { type: LoanOnboardingActions.SET_ARCHIVE_REASONS, payload });

        expect(newState).toEqual({
            ...initialOnboardingValue,
            archiveReasons: payload,
        });
    });

    it('should remove application from the applications', () => {
        const stateWithAllApplications = LoanOnboardingReducer(initialOnboardingValue, {
            type: LoanOnboardingActions.SET_APPLICATIONS,
            payload: mockApplications,
        });

        expect(stateWithAllApplications).toEqual({
            ...initialOnboardingValue,
            applications: mockApplications,
        });

        const applicationToRemove = mockApplications[0];
        const newStateAfterRemovedApplications = LoanOnboardingReducer(stateWithAllApplications, {
            type: LoanOnboardingActions.REMOVE_APPLICATION,
            payload: applicationToRemove.id,
        });

        expect(newStateAfterRemovedApplications).toEqual({
            ...initialOnboardingValue,
            applications: stateWithAllApplications.applications.filter(stateApplication => stateApplication.id !== applicationToRemove.id),
        });
    });

    it("should update application's step after a step change", () => {
        const stateValue = { ...initialOnboardingValue, applications: mockApplications, steps: stepsMock };
        const newStateAfterUpdateApplications = LoanOnboardingReducer(stateValue, {
            type: LoanOnboardingActions.UPDATE_APPLICATION,
            payload: mockUpdatedLoanApplication,
        });

        const updatedApplications = [...mockApplications];
        updatedApplications[3].stepId = mockUpdatedLoanApplication.stepId;

        expect(newStateAfterUpdateApplications).toEqual({
            ...stateValue,
            applications: updatedApplications,
        });
    });
});
