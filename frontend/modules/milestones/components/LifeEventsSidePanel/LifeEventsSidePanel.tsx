import React, { FC, useContext, useCallback, useEffect, useMemo } from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import { LifeEventContext } from '../../LifeEvent.context';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import Content from '../Content';
import { addButtonStyles, headerStyle, iconHeaderStyle, panelStyle } from './LifeEventSidePanel.style';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { Icon } from '@fluentui/react/lib/components/Icon';
import { PrimaryButton } from '@fluentui/react/lib/components/Button/PrimaryButton/PrimaryButton';
import useDialog from '../../hooks/useDialog';

export const LifeEventsDetailsSidePanel: FC = () => {
    const { categoriesCollection, configuration, openSidePanelCategory, setOpenSidePanelCategory, fetchLifeEvents, hideModifyButtons, readonly } =
        useContext(LifeEventContext);

    useEffect(() => {
        if (openSidePanelCategory) {
            fetchLifeEvents();
        }
    }, [openSidePanelCategory]);

    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const { openAddEvent } = useDialog();
    const onDismiss = useCallback(() => {
        setOpenSidePanelCategory(0);
    }, [setOpenSidePanelCategory]);

    const headerText = useMemo(() => {
        return (configuration?.categoryConfig || []).find(c => c.categoryCode === openSidePanelCategory)?.name;
    }, [configuration, openSidePanelCategory]);

    const headerIcon = useMemo(() => {
        return (configuration?.categoryConfig || []).find(c => c.categoryCode === openSidePanelCategory)?.icon;
    }, [configuration, openSidePanelCategory]);

    const addNewEventFromSideBarButtonClick = useCallback(() => {
        openAddEvent(openSidePanelCategory);
    }, [openAddEvent, openSidePanelCategory]);

    return (
        <Panel
            isOpen={!!openSidePanelCategory}
            onDismiss={onDismiss}
            headerText={headerText}
            closeButtonAriaLabel={translate('LIFE_EVENT_DIALOG_CLOSE')}
            isLightDismiss={true}
            styles={panelStyle}
            onRenderHeader={(props, defaultRenderer) => (
                <Stack tokens={{ childrenGap: 8 }} horizontal styles={headerStyle} verticalAlign="center">
                    <Icon iconName={headerIcon} styles={iconHeaderStyle} />
                    {defaultRenderer(props)}
                </Stack>
            )}
            isFooterAtBottom
            onRenderFooterContent={() => (
                <Stack horizontalAlign="start" verticalAlign="end" styles={addButtonStyles}>
                    {!hideModifyButtons && (
                        <PrimaryButton
                            disabled={readonly}
                            iconProps={{ iconName: 'Add' }}
                            onClick={addNewEventFromSideBarButtonClick}
                            text={translate('ADD')}
                        />
                    )}
                </Stack>
            )}
        >
            <Content
                readonly={readonly}
                hideModifyButtons={hideModifyButtons}
                openSidePanelCategory={openSidePanelCategory}
                categoriesCollection={categoriesCollection}
                configuration={configuration}
                addNewEvent={addNewEventFromSideBarButtonClick}
            />
        </Panel>
    );
};
export default LifeEventsDetailsSidePanel;
