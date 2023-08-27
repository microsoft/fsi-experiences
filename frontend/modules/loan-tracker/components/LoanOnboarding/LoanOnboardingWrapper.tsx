import React, { FC } from 'react';
import NotificationProvider from '@fsi/core-components/dist/services/NotificationService/NotificationService';
import LoanOnboardingContextProvider from '../../contexts/LoanOnboarding/LoanOnboarding.context';
import { ILoanOnboardingFetcher } from '../../interfaces/ILoanOnboarding/ILoanOnboardingFetcher';
import { LoanOnboardingWidget } from './LoanOnboardingWidget/LoanOnboardingWidget';

export interface ILoanOnboardingProps {
    fetcher: ILoanOnboardingFetcher;
}

export const LoanOnboardingWrapper: FC<ILoanOnboardingProps> = props => {
    const { fetcher } = props;

    return (
        <LoanOnboardingContextProvider fetcher={fetcher}>
            <NotificationProvider>
                <LoanOnboardingWidget />
            </NotificationProvider>
        </LoanOnboardingContextProvider>
    );
};

export default LoanOnboardingWrapper;
