import React, { FC, ReactElement } from 'react';
import { LoanOnboardingContext, ILoanOnboardingContext } from '../contexts/LoanOnboarding/LoanOnboarding.context';

export const renderLoanOnboardingContextProvider = (Component: FC<any>, props, loanOnboardingContext: ILoanOnboardingContext): ReactElement => {
    return (
        <LoanOnboardingContext.Provider value={loanOnboardingContext}>
            <Component {...props} />
        </LoanOnboardingContext.Provider>
    );
};
