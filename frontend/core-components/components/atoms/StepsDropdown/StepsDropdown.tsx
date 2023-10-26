import Stack from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC, useCallback, useState } from 'react';
import WizardStep from '../WizardStep/WizardStep';
import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { IWizardStepProps } from '../WizardStep/WizardStep.interface';
import { controlStyles } from './StepsDropdown.style';
import { IStackStyles } from '@fluentui/react';
import StepsDropdownMenu from './StepsDropdownMenu/StepsDropdownMenu';

interface IStepsDropdownProps {
    onChange: (step: IWizardStepProps) => void;
    options: IWizardStepProps[];
    selected: IWizardStepProps;
    styles?: IStackStyles;
}

const StepsDropdown: FC<IStepsDropdownProps> = ({ selected, options, onChange, styles }) => {
    const [isOpen, setIsOpen] = useState(false);
    const iconName = isOpen ? 'ChevronUp' : 'ChevronDown';
    const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen);
    const onStepClick = useCallback(
        (option: IWizardStepProps) => {
            /* istanbul ignore next */
            if (option.isDisabled) {
                return;
            }

            onChange(option);
            setIsOpen(false);
        },
        [onChange]
    );

    return (
        <Stack styles={styles}>
            <Stack
                data-testid="steps-dropdown-control"
                onClick={toggleIsOpen}
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
                styles={controlStyles}
            >
                <WizardStep {...selected} isFirst isActive />
                <FontIcon iconName={iconName} />
            </Stack>
            <StepsDropdownMenu selected={selected} options={options} onStepClick={onStepClick} isOpen={isOpen} />
        </Stack>
    );
};

export default StepsDropdown;
