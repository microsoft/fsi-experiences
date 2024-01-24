import { IEmptyStateProps } from '../../atoms/EmptyState';

export type ErrorImageSize = 48 | 100 | 200;
export interface IErrorStateProps extends Partial<IEmptyStateProps> {
    iconSize?: ErrorImageSize;
}
