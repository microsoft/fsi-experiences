import { ReactElement } from 'react';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import IWizardStep from '../../atoms/WizardStep/WizardStep.interface';

export interface IStep {
    name: string;
    description?: string;
    isCompleted: boolean;
    ViewComp: ReactElement;
    isDisabled?: boolean;
    onNext?: (callback?: Function) => void;
    onBack?: () => void;
    isMoveForward?: boolean;
}

export interface IWizardProps {
    header: string;
    steps: IStep[];
    firstStep?: number;
    onCancel: () => void;
    onSave: () => void;
    hasCloseIcon?: boolean;
    headerStyles?: {
        root?: Object;
        header?: Object;
    };
    doneBtnLabel?: string;
    contentStyles?: IStackStyles;
    showCompletedWhileDirty?: boolean;
    mainViewContentStyles?: IStackStyles;
    isStepDropdown?: boolean;
}

export interface IWizardFooterProps {
    isNextStepEnabled?: boolean;
    onNext: () => void;
    onPrev: () => void;
    onDone: () => void;
    onCancel: () => void;
    hasNextStep?: boolean;
    hasPrevStep?: boolean;
    isAllStepsCompleted?: boolean;
    doneBtnLabel?: string;
}
