import { mergeStyleSets } from '@fluentui/merge-styles';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import React, { FC } from 'react';
import WizardStep from '../../WizardStep/WizardStep';
import { IWizardStepProps } from '../../WizardStep/WizardStep.interface';
import { menuStyles } from './StepsDropdownMenu.styles';

interface IStepsDropdownProps {
    onStepClick: (step: IWizardStepProps) => void;
    options: IWizardStepProps[];
    selected: IWizardStepProps;
    isOpen?: boolean;
    styles?: IStackStyles;
}

const StepsDropdown: FC<IStepsDropdownProps> = ({ selected, options, onStepClick, isOpen = true, styles }) => {
    const rootStyles = mergeStyleSets(menuStyles, styles);

    if (!isOpen) {
        return null;
    }

    return (
        <Stack data-testid="steps-dropdown-menu" styles={rootStyles}>
            {options.map((option, idx) => (
                <WizardStep
                    key={option.name}
                    name={option.name}
                    onStepClick={() => onStepClick(option)}
                    isFirst={idx === 0}
                    isActive={option === selected}
                    isCompleted={option.isCompleted}
                    description={option.description}
                    isDisabled={option.isDisabled}
                />
            ))}
        </Stack>
    );
};

export default StepsDropdown;
