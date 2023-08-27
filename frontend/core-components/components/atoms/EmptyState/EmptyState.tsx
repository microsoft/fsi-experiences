import React, { FC } from 'react';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Image } from '@fluentui/react/lib/Image';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { callsToActionStyles, getClassNames, imageStyle } from './EmptyState.style';
import { IEmptyStateProps } from './EmptyState.interface';
import { useTranslation } from '../../../context/hooks/useTranslation';

export const EmptyState: FC<IEmptyStateProps> = props => {
    const { title, subtitle, icon, footer, callsToAction, horizontalActions, isErrorState } = props;
    const translate = useTranslation();

    const styles = getClassNames(props);

    return (
        <Stack
            className={styles.container}
            verticalAlign="center"
            horizontalAlign="center"
            data-testid={isErrorState ? 'error-state' : 'empty-state'}
            role="alert"
            aria-live={isErrorState ? undefined : 'assertive'}
            aria-atomic={isErrorState ? undefined : 'true'}
            aria-label={isErrorState ? translate('ERROR') : translate('EMPTY_STATE')}
        >
            {icon && (
                <Stack.Item className={styles.icon} align="center" data-testid="empty-state-icon">
                    <Image alt="" src={icon} styles={imageStyle} aria-hidden="true" />
                </Stack.Item>
            )}
            <StackItem className={styles.title}>{title}</StackItem>
            {subtitle && (
                <StackItem data-testid="empty-state-sub-title" className={styles.subtitle}>
                    {subtitle}
                </StackItem>
            )}
            {callsToAction && (
                <Stack data-testid="empty-state-actions" tokens={{ childrenGap: '24px' }} styles={callsToActionStyles} horizontal={horizontalActions}>
                    {callsToAction.map((call, index) => (
                        <PrimaryButton
                            iconProps={call.iconProps}
                            key={index}
                            data-testid="empty-state-action"
                            onClick={call.callback}
                            text={call.title}
                            disabled={call.disabled}
                        />
                    ))}
                </Stack>
            )}
            {footer}
        </Stack>
    );
};

export default EmptyState;
