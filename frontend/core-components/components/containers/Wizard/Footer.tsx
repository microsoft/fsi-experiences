import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/components/Button';
import { Stack } from '@fluentui/react/lib/components/Stack';
import React, { FC } from 'react';
import type { IWizardFooterProps } from './Wizard.interface';
import { generalStyles } from './Wizard.style';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';

export const WizardFooter: FC<IWizardFooterProps> = ({
    /* istanbul ignore next */ isNextStepEnabled = false,
    onNext,
    onPrev,
    onDone,
    onCancel,
    /* istanbul ignore next */ hasNextStep = false,
    /* istanbul ignore next */ hasPrevStep = false,
    /* istanbul ignore next */ isAllStepsCompleted = false,
    doneBtnLabel,
}) => {
    const translate = useTranslation(namespaces.COMMON);

    return (
        <Stack horizontal horizontalAlign="space-between" className={generalStyles}>
            <Stack horizontal tokens={{ childrenGap: 8 }}>
                {hasPrevStep && <DefaultButton text={translate('BACK')} onClick={onPrev} data-testid="wizard-back-btn" />}
                {hasNextStep ? (
                    <PrimaryButton text={translate('NEXT')} onClick={onNext} disabled={!isNextStepEnabled} data-testid="wizard-next-btn" />
                ) : (
                    <PrimaryButton
                        text={doneBtnLabel || translate('DONE')}
                        onClick={onDone}
                        disabled={!isAllStepsCompleted}
                        data-testid="wizard-done-btn"
                    />
                )}
            </Stack>
            <DefaultButton text={translate('CANCEL')} onClick={onCancel} data-testid="wizard-cancel-btn" />
        </Stack>
    );
};

export default WizardFooter;
