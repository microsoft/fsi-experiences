import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import LEventElementInSidePanel from '../LEventElementInSidePanel/LEventElementInSidePanel';
import FGoalElementInSidePanel from '../../../goals/components/FGoalElementInSidePanel/FGoalElementInSidePanel';
import { contentStyles, titleStyles } from './SidePanelSection.style';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { IEventTypes } from '../../../interfaces/LifeEvents.interface';
import { EVENTS_TYPES } from '../../../constants/LifeEvent.consts';

interface ISidePanelSectionProps {
    lifeEvents: IEventTypes[];
    title: string;
    subtitle?: string;
    hideModifyButtons?: boolean;
    readonly?: boolean;
    styles?: { sectionStyles: ITextStyles; titleStyles: ITextStyles; subTitleStyles?: ITextStyles; contentStyles: ITextStyles };
}

const lifeEventsToken = { childrenGap: 20 };
const expiredToken = { childrenGap: 16 };

const SidePanelSection: FC<ISidePanelSectionProps> = ({
    lifeEvents,
    title,
    subtitle,
    readonly,
    hideModifyButtons,
    styles = { sectionStyles: {}, titleStyles: titleStyles, subtitleStyles: {}, contentStyles: contentStyles },
}) => {
    if (!lifeEvents.length) {
        return null;
    }

    return (
        <Stack tokens={expiredToken} styles={styles.sectionStyles}>
            <Stack tokens={{ childrenGap: 2 }}>
                <Text as="h2" styles={styles.titleStyles}>
                    {title}
                </Text>
                {subtitle && <Text styles={styles.subTitleStyles}>{subtitle}</Text>}
            </Stack>
            {lifeEvents.map((element, index) => (
                <Stack key={element.event.id} tokens={lifeEventsToken} styles={styles.contentStyles}>
                    {(element.type === EVENTS_TYPES.LIFE_EVENT || element.type === EVENTS_TYPES.EVENT) && (
                        <LEventElementInSidePanel lifeEvent={element.event} index={index} readonly={readonly} hideModifyButtons={hideModifyButtons} />
                    )}
                    {element.type === EVENTS_TYPES.FINANCIAL_GOAL && element.event.financialGoal && (
                        <FGoalElementInSidePanel lifeEvent={element.event} index={index} readonly={readonly} hideModifyButtons={hideModifyButtons} />
                    )}
                </Stack>
            ))}
        </Stack>
    );
};

export default SidePanelSection;
