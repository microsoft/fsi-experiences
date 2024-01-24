import React, { FC } from 'react';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { Loading } from '../Loading';
import ErrorState from '../../containers/ErrorState/ErrorState';
import { IStackStyles, Stack } from '@fluentui/react/lib/Stack';
import { ErrorImageSize, IErrorStateProps } from '../../containers/ErrorState';
import { errorStateStyles, loadingStyles } from './Widget.style';
import { EmptyState, IEmptyStateStyles } from '../EmptyState';

export interface IWidgetContentProps {
    isLoading?: boolean;
    isError?: boolean;
    errorIconSize?: ErrorImageSize;
    errorProps?: IErrorStateProps;
    emptyProps?: { title: string; icon: string; iconSize: number; styles?: IEmptyStateStyles; subtitle?: string };
    loadingLabel?: string;
}

export interface IWidget extends IWidgetContentProps {
    header?: string;
    styles?: IStackStyles;
    errorProps?: IErrorStateProps;
    name?: string;
}

const WidgetContent: FC<IWidgetContentProps> = ({ isError, isLoading, children, emptyProps, errorIconSize, loadingLabel, errorProps = {} }) => {
    if (isError) {
        return <ErrorState styles={errorStateStyles} iconSize={errorIconSize} {...errorProps} />;
    }

    if (isLoading) {
        return <Loading styles={loadingStyles} label={loadingLabel} />;
    }

    if (emptyProps) {
        return <EmptyState {...emptyProps} />;
    }

    return <>{children}</>;
};

export const Widget: FC<IWidget> = ({ header, styles, name, ...props }) => {
    return (
        <Stack styles={styles} data-testid={name || 'widget'}>
            {header && <SectionHeader titleString={header} />}
            <WidgetContent {...props} />
        </Stack>
    );
};

export default Widget;
