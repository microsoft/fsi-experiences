import { baseCustomerOnboardingCardStyle } from '@fsi/core-components/dist/styles/Common.style';

export const TaskProgressOverviewStyles = {
    root: {
        ...baseCustomerOnboardingCardStyle,
        minHeight: '400px',
    },
};

export const TaskProgressOverviewLoaderStyles = {
    /*overwrites default FluentUI `margin-top` which is set to `0px` to be in the center*/
    root: {
        marginBlock: 'auto !important',
    },
};
