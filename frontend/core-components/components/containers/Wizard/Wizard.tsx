import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC, useCallback, useMemo, useState } from 'react';
import type { IWizardProps } from './Wizard.interface';
import { defaultMainViewContentStyles, wizardStyles, stepContentStyles, stepsPaneStyles, defaultContentStyles } from './Wizard.style';
import Divider from '../../atoms/Divider/Divider';
import Footer from './Footer';
import Header from './Header';
import StepsDropdown from '../../atoms/StepsDropdown';
import { IWizardStepProps } from '../../atoms/WizardStep';
import StepsDropdownMenu from '../../atoms/StepsDropdown/StepsDropdownMenu';

const Wizard: FC<IWizardProps> = ({
    header,
    steps,
    firstStep = 0,
    onCancel,
    onSave,
    hasCloseIcon = false,
    headerStyles,
    doneBtnLabel,
    children,
    showCompletedWhileDirty,
    contentStyles = defaultContentStyles,
    mainViewContentStyles = defaultMainViewContentStyles,
    isStepDropdown,
}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(firstStep);
    const stepOptions = useMemo(
        () =>
            steps.map((step, idx) => {
                const isStepCompleted = showCompletedWhileDirty ? idx <= currentStepIndex && step.isCompleted : step.isCompleted;
                return { ...step, isCompleted: isStepCompleted };
            }),
        [steps, showCompletedWhileDirty, currentStepIndex]
    );

    const selectedStep = stepOptions[currentStepIndex];

    const onChangeStepDropdown = useCallback(
        (step: IWizardStepProps) => {
            const idx = stepOptions.findIndex(stepOption => stepOption.name === step.name);

            setCurrentStepIndex(idx);
        },
        [stepOptions]
    );

    const isAllStepsCompleted = useMemo(() => !steps.some(step => !step.isCompleted), [steps]);
    const currentStep = steps[currentStepIndex];
    const CurrentStepViewComp = currentStep?.ViewComp;
    const isCurrentStepCompleted = currentStep?.isMoveForward;
    const onPrev = useCallback(async () => {
        await currentStep.onBack?.();
        setCurrentStepIndex(prevCurrentStep => prevCurrentStep - 1);
    }, [currentStep]);
    const onNext = useCallback(async () => {
        await currentStep.onNext?.();
        setCurrentStepIndex(prevCurrentStep => prevCurrentStep + 1);
    }, [currentStep]);

    return (
        <Stack className={wizardStyles} data-testid="wizard-root">
            <Header hasCloseIcon={hasCloseIcon} onCancel={onCancel} title={header} styles={headerStyles} />
            {header && <Divider />}
            <Stack horizontal styles={mainViewContentStyles} tokens={{ maxHeight: '100%' }} grow>
                <Stack className={stepsPaneStyles} data-testid="wizard-left-pane">
                    {isStepDropdown ? (
                        <StepsDropdown options={stepOptions} onChange={onChangeStepDropdown} selected={selectedStep} />
                    ) : (
                        <StepsDropdownMenu isOpen selected={selectedStep} options={stepOptions} onStepClick={onChangeStepDropdown} />
                    )}
                </Stack>
                {!isStepDropdown && <Divider vertical data-testid="wizard-vertical-divider" />}
                <Stack grow className={stepContentStyles}>
                    <Stack grow data-testid="wizard-step-content" styles={contentStyles}>
                        {children}
                        {CurrentStepViewComp}
                    </Stack>
                    <Divider />
                    <Footer
                        hasNextStep={currentStepIndex < steps.length - 1}
                        hasPrevStep={currentStepIndex > 0}
                        isNextStepEnabled={isCurrentStepCompleted}
                        isAllStepsCompleted={isAllStepsCompleted}
                        onCancel={onCancel}
                        onPrev={onPrev}
                        onNext={onNext}
                        onDone={onSave}
                        doneBtnLabel={doneBtnLabel}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Wizard;
