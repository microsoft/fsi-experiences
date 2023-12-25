import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import {
    MockFailureOnboardingApplicationTasksFetcher,
    MockOnboardingApplicationTasksFetcher,
} from '../../interfaces/mocks/MockOnboardingApplicationTasksFetcher';
import { TASK_VERIFICATION_TESTID } from './TaskVerification.const';
import { TASK_VERIFICATION_SECTION_TESTID } from '../TaskVerificationSection/TaskVerificationSection.const';
import { IVerificationTask } from '../../interfaces/IVerificationTask.interface';
import { QueryClientWrapper, testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { IOnboardingApplicationTasksFetcher } from '../../interfaces/IOnboardingApplicationTasksFetcher';
import { CONFIGURATION_ERROR } from '../../constants/TaskVerification.const';
import commonStrings from '@fsi/core-components/assets/strings/common/common.1033.json';
import TaskVerification from './TaskVerification';

const mockFetcher = new MockOnboardingApplicationTasksFetcher();
const emptyFetcher = new MockOnboardingApplicationTasksFetcher();
emptyFetcher.fetchTaskByTaskDefinitionId = ({ applicationId, taskDefinitionId }) => Promise.resolve({} as IVerificationTask);
const errorFetcher = new MockFailureOnboardingApplicationTasksFetcher();

const renderTaskVerification = (fetcher: IOnboardingApplicationTasksFetcher = mockFetcher) => {
    return render(<TaskVerification fetcher={fetcher || mockFetcher} taskDefinitionId={'1'} applicationId={'1'} />, { wrapper: QueryClientWrapper });
};

describe('TaskVerification', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should be rendered in DOM', () => {
        const { getByTestId } = renderTaskVerification();
        expect(getByTestId(TASK_VERIFICATION_TESTID)).toBeInTheDocument();
    });

    it('Should render loading', () => {
        const { getByTestId } = renderTaskVerification();
        expect(getByTestId(TASK_VERIFICATION_TESTID)).toBeInTheDocument();

        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('Should show error state', async () => {
        const { getByTestId, queryByTestId } = renderTaskVerification(errorFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(queryByTestId(TASK_VERIFICATION_SECTION_TESTID)).toBeNull();
        expect(getByTestId('error-state')).toBeVisible();
    });

    it('Should show configuration error state', async () => {
        const fetchTaskByTaskDefinitionIdMock = ({ applicationId, taskDefinitionId }) => {
            throw new Error(CONFIGURATION_ERROR);
        };

        const configurationErrorFetcher = {
            ...errorFetcher,
            fetchTaskByTaskDefinitionId: fetchTaskByTaskDefinitionIdMock,
        };

        const { getByTestId, queryByTestId, queryByText } = renderTaskVerification(configurationErrorFetcher as any);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(queryByTestId(TASK_VERIFICATION_SECTION_TESTID)).toBeNull();
        expect(queryByText(commonStrings.INVALID_CONFIGURATION)).toBeVisible();
    });

    it('Should show empty state', async () => {
        const { getByTestId, queryByTestId } = renderTaskVerification(emptyFetcher);
        await waitForElementToBeRemoved(() => getByTestId('loading-spinner'));

        expect(queryByTestId(TASK_VERIFICATION_SECTION_TESTID)).toBeNull();
        expect(getByTestId('empty-state')).toBeVisible();
    });
});
