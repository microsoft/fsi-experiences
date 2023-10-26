import React, { FC } from 'react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { EmptyState as DefaultEmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { emptyStateStyles } from './EmptyState.styles';
import { addIconProps } from '../LifeEventBar/LifeEventBar.style';
import Stack from '@fluentui/react/lib/components/Stack/Stack';

interface IEmptyStateProps {
    isBirthdayCategory: boolean;
    onClick: () => void;
    readonly?: boolean;
    hideModifyButtons?: boolean;
}

const newEventFromEmptyStateStyles = { root: { marginTop: 28 } };
const EmptyState: FC<IEmptyStateProps> = ({ isBirthdayCategory, onClick, readonly, hideModifyButtons }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    if (isBirthdayCategory) {
        return (
            <DefaultEmptyState
                title={translate('LIFE_EVENT_EMPTY_STATE_BIRTHDAY_TITLE')}
                icon={IMAGE_SRC.emptyState100}
                subtitle={translate('LIFE_EVENT_EMPTY_STATE_BIRTHDAY_SUBTITLE')}
                iconSize={100}
                styles={emptyStateStyles}
            />
        );
    }

    if (hideModifyButtons) {
        return (
            <DefaultEmptyState
                title={translate('LIFE_EVENT_EMPTY_STATE_NO_EVENT_TITLE')}
                icon={IMAGE_SRC.emptyStateFolder100}
                iconSize={100}
                styles={emptyStateStyles}
            />
        );
    }

    return (
        <DefaultEmptyState
            title={translate('LIFE_EVENT_EMPTY_STATE_SIDE_PANEL_TITLE')}
            icon={IMAGE_SRC.create100}
            iconSize={100}
            styles={emptyStateStyles}
            footer={
                !isBirthdayCategory && (
                    <Stack>
                        <PrimaryButton
                            styles={newEventFromEmptyStateStyles}
                            iconProps={addIconProps}
                            onClick={onClick}
                            text={translate('ADD_EVENT')}
                            disabled={readonly}
                        />
                    </Stack>
                )
            }
        />
    );
};
export default EmptyState;
