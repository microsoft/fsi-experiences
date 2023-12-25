import React, { CSSProperties, FC } from 'react';
import { Text } from '@fluentui/react/lib/components/Text/Text';
import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { Separator } from '@fluentui/react/lib/Separator';
import { wizardStepDescriptionStyles, wizardStepSeparatorStyles, wizardStepSubinfoStyles } from './WizardStep.style';
import { COLORS } from '../../../constants/Colors';
import { IWizardStepProps } from './WizardStep.interface';
import { ActionButton, IButtonStyles } from '@fluentui/react/lib/components/Button';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';

const WizardStep: FC<IWizardStepProps> = ({
    onStepClick,
    name,
    isActive = false,
    isCompleted = false,
    description,
    isDisabled = false,
    isFirst = false,
}) => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const stepNameStyles: IButtonStyles = {
        root: {
            height: 'fit-content',
            padding: '0px',
            marginBottom: '0.25em',
            fontSize: FontSizes.size14,
            textAlign: 'left',
            fontWeight: isActive ? FontWeights.semibold : FontWeights.regular,
            selectors: {
                ':hover': {
                    cursor: 'pointer',
                },
            },
        },
        label: {
            margin: '0px',
        },
    };

    const iconStyle: CSSProperties = {
        color: isCompleted || isActive ? themePrimary : COLORS.stepCircleRing,
        lineHeight: 1.5,
        textAlign: 'center',
        minWidth: '1.125rem' /*~ 18px */,
    };

    let icon = 'CircleRing';

    if (isCompleted) {
        icon = 'CompletedSolid';
    } else if (isActive) {
        icon = 'FullCircleMask';
    }

    return (
        <Stack horizontal verticalAlign="end">
            <Stack verticalAlign="center" horizontalAlign="center">
                {!isFirst && <Separator vertical alignContent="start" styles={wizardStepSeparatorStyles} data-testid="wizard-step-line" />}
                <FontIcon iconName={icon} style={iconStyle} data-testid="wizard-step-icon" />
            </Stack>
            <Stack styles={wizardStepSubinfoStyles}>
                <ActionButton onClick={onStepClick} styles={stepNameStyles} disabled={isDisabled} data-testid="wizard-step-btn">
                    {name}
                </ActionButton>
                {description && <Text styles={wizardStepDescriptionStyles}>{description}</Text>}
            </Stack>
        </Stack>
    );
};

export default WizardStep;
