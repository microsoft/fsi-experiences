import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import { ReactElement } from 'react';

export type ValidateWizardStepFunc = (data: any) => boolean;

export type WizardMessageBar = { bold?: string; regular?: string };
export type UpdateMessageBarFunction = (type: MessageBarType, msg: WizardMessageBar) => void;

export type SetDataFunc = (data: any) => void;

export type WizardStepContentRenderFunc = (
    oldData: any,
    updatedData: any,
    updateMessageBar: UpdateMessageBarFunction,
    setData: SetDataFunc
) => ReactElement | null;

export interface IWizardStepProps {
    name: string;
    isActive?: boolean;
    isCompleted?: boolean;
    onStepClick?: () => void;
    description?: string;
    isDisabled?: boolean;
    isFirst?: boolean;
}

export default interface IWizardStep {
    id: string;
    name: string;
    isCompleted: ValidateWizardStepFunc;
    render: WizardStepContentRenderFunc;
}
