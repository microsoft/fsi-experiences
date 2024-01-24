import React, { FC } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { loadingStyles } from './Loading.style';
import { useTranslation } from '../../../context/hooks/useTranslation';
import { IStackStyles, Stack } from '@fluentui/react/lib/components/Stack';

export interface ILoadingProps {
    label?: string;
    className?: string;
    spinnerClassName?: string;
    styles?: IStackStyles;
}

export const Loading: FC<ILoadingProps> = ({ label, className, spinnerClassName, styles = loadingStyles }) => {
    const translate = useTranslation();

    return (
        <Stack styles={styles} className={className} data-testid={`loading-spinner`}>
            <Spinner size={SpinnerSize.large} label={label || translate('LOADING')} className={spinnerClassName} ariaLabel={translate('LOADING')} />
        </Stack>
    );
};

export default Loading;
