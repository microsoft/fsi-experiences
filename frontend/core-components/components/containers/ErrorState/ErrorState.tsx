import React, { FC } from 'react';
import { useTranslation } from '../../../context/hooks/useTranslation';
import EmptyState from '../../atoms/EmptyState/EmptyState';
import { sizeToIcon } from './ErrorState.const';
import type { IErrorStateProps } from './ErrorState.interface';

const ErrorState: FC<IErrorStateProps> = props => {
    const translate = useTranslation();
    const { title = translate('ERROR_STATE_TITLE'), subtitle = translate('ERROR_STATE_SUBTITLE'), iconSize } = props;

    const icon = iconSize && sizeToIcon(iconSize);

    return <EmptyState title={title} subtitle={subtitle} icon={icon} isErrorState {...props}></EmptyState>;
};

export default ErrorState;
