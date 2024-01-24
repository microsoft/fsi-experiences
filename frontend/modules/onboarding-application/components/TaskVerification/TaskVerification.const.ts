import { IErrorStateProps } from "@fsi/core-components/dist/components/containers/ErrorState";
import { emptyStateStyles, errorStateStyles } from "./TaskVerification.style";

export const TASK_VERIFICATION_TESTID = 'task-verification-container';
export const errorDefaultProps: IErrorStateProps = {
    iconSize: 48,
    styles: errorStateStyles,
};

export const emptyDefaultProps = {
    iconSize: 48,
    styles: emptyStateStyles,
};
