import '@testing-library/jest-dom';
import { setup } from '@fsi/core-components/dist/dev-localization-setup';
import { setupMocks } from '@fsi/core-components/dist/jest-setup';
import TasksStrings from './assets/strings/OnboardingApplicationTasksControl/OnboardingApplicationTasksControl.1033.json';
import TasksProgressOverviewStrings from './assets/strings/OnboardingApplicationTaskProgressOverviewControl/OnboardingApplicationTaskProgressOverviewControl.1033.json';
import ApplicantListControlStrings from './assets/strings/ApplicantListControl/ApplicantListControl.1033.json';
import AssetsAndLiabilitiesString from './assets/strings/AssetsAndLiabilities/AssetsAndLiabilities.1033.json';
import FinancialCategoriesFormFieldStrings from './assets/strings/FinancialCategoriesFormFields/FinancialCategoriesFormFields.1033.json';
import {
    ONBOARDING_APPLICATION_TASKS,
    ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL,
    APPLICANT_LIST_NAMESPACE,
    ASSETS_AND_LIABILITIES,
    FINANCIAL_CATEGORIES_FORM_FIELDS,
} from './constants/namespaces.const';

setup([
    {
        namespace: ONBOARDING_APPLICATION_TASKS,
        file: TasksStrings,
    },
    {
        namespace: ONBOARDING_APPLICATION_TASK_PROGRESS_OVERVIEW_CONTROL,
        file: TasksProgressOverviewStrings,
    },
    {
        namespace: APPLICANT_LIST_NAMESPACE,
        file: ApplicantListControlStrings,
    },
    {
        namespace: ASSETS_AND_LIABILITIES,
        file: AssetsAndLiabilitiesString,
    },
    {
        namespace: FINANCIAL_CATEGORIES_FORM_FIELDS,
        file: FinancialCategoriesFormFieldStrings,
    },
]);

setupMocks();
