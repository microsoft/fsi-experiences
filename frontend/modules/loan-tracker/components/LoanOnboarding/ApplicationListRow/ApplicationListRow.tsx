import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { PersonaSize, Persona } from '@fluentui/react/lib/components/Persona';
import { Stack } from '@fluentui/react/lib/Stack';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { useId } from '@fluentui/react-hooks/lib/useId';
import React, { FC, useContext, useMemo, useCallback } from 'react';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { APPLICATION_STATUSES } from '../../../constants/ApplicationStatuses.consts';
import { LoanOnboardingContext } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import type { IApplicationListRowProps } from './ApplicationListRow.interface';
import {
    ApplicantStyles,
    ApplicantWrapperStyles,
    ApplicationListRowStyles,
    ApplicationLoanInfoWrapperStyles,
    ApplicationLoanTitleStyles,
    ApplicationLoanTypeStyles,
    ApplicationStatusStyles,
} from './ApplicationListRow.style';

export const ApplicationListRow: FC<IApplicationListRowProps> = ({ application, styles = {}, className = '' }) => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const { selectedApplication, setSelected } = useContext(LoanOnboardingContext);
    const isSelected = application.id === selectedApplication?.id;
    const translate = useTranslation(namespaces.LOAN_ONBOARDING_CONTROL);

    const containerStyles = useMemo(() => ApplicationListRowStyles(themePrimary, isSelected, styles), [themePrimary, isSelected]);
    const applicantStyles = useMemo(() => ApplicantStyles(isSelected), [isSelected]);
    const onSelectedRow = useCallback(() => setSelected(application), [application, setSelected]);

    const applicationStatus = APPLICATION_STATUSES[application.status];

    const iconStyles = applicationStatus.color ? { color: applicationStatus.color } : {};
    const statusLabel = translate(applicationStatus.label);

    const srCurrentItemId = useId('srCurrentItem');

    return (
        <Stack
            data-is-focusable
            horizontal
            styles={containerStyles}
            verticalAlign="center"
            onClick={onSelectedRow}
            className={className}
            wrap
            data-testid="application-row"
            data-is-selected={isSelected}
            role="row"
        >
            <Stack verticalAlign="start" className={ApplicationLoanInfoWrapperStyles} role="cell">
                <Stack.Item className={ApplicationLoanTitleStyles}>{<OverflowText text={application.name} />}</Stack.Item>
                <Stack.Item className={ApplicationLoanTypeStyles}>{<OverflowText text={application.loanType} />}</Stack.Item>
            </Stack>
            <Stack.Item className={ApplicantWrapperStyles} data-testid="row-applicant-wrapper" role="cell">
                <Persona text={application.primaryApplicant} size={PersonaSize.size32} data-testid="row-applicant-persona" styles={applicantStyles} />
            </Stack.Item>
            <FontIcon
                iconName={applicationStatus.icon}
                className={ApplicationStatusStyles}
                style={iconStyles as any}
                aria-label={statusLabel}
                title={statusLabel}
                data-testid="row-status-icon"
                role="cell"
            />
            {isSelected && <ScreenReaderText id={srCurrentItemId}>{translate('CURRENT')}</ScreenReaderText>}
        </Stack>
    );
};

export default ApplicationListRow;
