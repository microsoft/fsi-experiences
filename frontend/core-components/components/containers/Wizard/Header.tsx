import { IconButton } from '@fluentui/react/lib/components/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC } from 'react';
import { generalStyles, headerActionStyles, headerTextStyles } from './Wizard.style';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';

const HeaderCancelActionIcon = { iconName: 'Cancel' };

export const WizardHeader: FC<{ hasCloseIcon?: boolean; onCancel: () => void; title: string; styles?: { root?: Object; header?: Object } }> = ({
    /* istanbul ignore next */ hasCloseIcon = false,
    onCancel,
    title,
    styles,
}) => {
    const translate = useTranslation(namespaces.COMMON);
    if (!title && !hasCloseIcon) return null;

    return (
        <Stack horizontal horizontalAlign="space-between" className={generalStyles} styles={{ root: styles?.root }} data-testid="wizard-header">
            {title && (
                <h1 className={headerTextStyles} style={styles?.header}>
                    {title}
                </h1>
            )}
            {hasCloseIcon && (
                <IconButton
                    iconProps={HeaderCancelActionIcon}
                    className={headerActionStyles}
                    onClick={onCancel}
                    data-testid="wizard-header-cancel-btn"
                    aria-label={translate('CLOSE')}
                />
            )}
        </Stack>
    );
};

export default WizardHeader;
