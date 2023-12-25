import React, { FC, Ref } from 'react';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import { addIcon, addEventStyle } from './Header.style';
import { SectionHeader } from '@fsi/core-components/dist/components/atoms/SectionHeader/SectionHeader';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useIsFeatureEnabled } from '@fsi/core-components/dist/context/hooks/useIsFeatureEnabled';
import { LIFE_EVENTS_FLAGS } from '../../../constants/lifeEvents';

interface IHeaderProps {
    addButtonEnabled: boolean;
    handleAddEventButtonClicked: () => void;
    hideModifyButtons?: boolean;
    addEventRef: Ref<HTMLButtonElement>;
}

const Header: FC<IHeaderProps> = ({ addButtonEnabled, hideModifyButtons, handleAddEventButtonClicked, addEventRef }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const enableFinancialGoals = useIsFeatureEnabled(LIFE_EVENTS_FLAGS.ENABLE_FINANCIAL_GOALS);
    const addButton = enableFinancialGoals ? translate('ADD') : translate('ADD_EVENT');
    const title = enableFinancialGoals ? 'LIFE_EVENT_AND_GOAL_LABEL' : 'LIFE_EVENT_LABEL';
    const {
        palette: { themePrimary },
    } = useTheme();

    return (
        <SectionHeader titleString={translate(title)}>
            {!hideModifyButtons && (
                <CommandBarButton
                    data-testid="add-event-header"
                    disabled={!addButtonEnabled}
                    styles={addEventStyle}
                    onClick={handleAddEventButtonClicked}
                    iconProps={addIcon(themePrimary)}
                    text={addButton}
                    elementRef={addEventRef}
                />
            )}
        </SectionHeader>
    );
};

export default Header;
