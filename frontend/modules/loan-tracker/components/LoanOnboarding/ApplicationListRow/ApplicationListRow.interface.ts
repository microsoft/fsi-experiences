import { IStyle } from '@fluentui/react/lib/Styling';
import { ILoanApplication } from '../../../interfaces/ILoanApplication/ILoanApplication';

export interface IApplicationListRowProps {
    application: ILoanApplication;
    className?: string;
    styles?: IStyle;
}
