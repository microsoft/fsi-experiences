import { IStyle } from '@fluentui/react/lib/Styling';
import { IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { IVerificationTask } from '../../interfaces/IVerificationTask.interface';

export interface ITaskVerificationSectionStyles {
    container?: IStyle;
}

export interface ITaskVerificationSection {
    task: IVerificationTask;
    processStage?: string;
    styles?: ITaskVerificationSectionStyles & Partial<IDropdownStyles>;
}
