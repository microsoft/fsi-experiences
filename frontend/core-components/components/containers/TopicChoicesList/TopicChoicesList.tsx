import { ChoiceGroup } from '@fluentui/react/lib/components/ChoiceGroup/ChoiceGroup';
import { IChoiceGroupOption } from '@fluentui/react/lib/components/ChoiceGroup/ChoiceGroup.types';
import React, { FC, useMemo } from 'react';
import { ITopicDetailsProps, TopicDetails } from '../../atoms/TopicDetails';
import { TopicCardStyle } from '../../atoms/TopicDetails/TopicDetails.style';
import type { ITopicChoicesListProps } from './TopicChoicesList.interface';
import { groupOptionsStyle } from './TopicChoicesList.style';

export const TopicChoicesList: FC<ITopicChoicesListProps> = ({ header, topics, selectedTopic, onSelect }) => {
    const options: IChoiceGroupOption[] = useMemo(
        () =>
            topics.map((topic: ITopicDetailsProps) => ({
                text: topic.name,
                iconProps: {
                    iconName: topic.icon || 'bank',
                },
                key: topic.id || topic.name,
                styles: TopicCardStyle,
                onRenderLabel: () => <TopicDetails name={topic.name} description={topic.description} key={topic.id} />,
            })),
        [topics]
    );

    return <ChoiceGroup label={header} defaultSelectedKey={selectedTopic} options={options} styles={groupOptionsStyle} onChange={onSelect} />;
};

export default TopicChoicesList;
