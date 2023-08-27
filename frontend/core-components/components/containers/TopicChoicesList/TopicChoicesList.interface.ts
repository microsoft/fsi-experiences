import { IChoiceGroupOption } from '@fluentui/react/lib/components/ChoiceGroup/ChoiceGroup.types';
import React from 'react';
import { ITopicDetailsProps } from '../../atoms/TopicDetails';

export type OnSelectFunc = (e?: React.FormEvent<HTMLElement | HTMLInputElement>, options?: IChoiceGroupOption) => void;

export interface ITopicChoicesListProps {
    header: string;
    selectedTopic?: string;
    topics: ITopicDetailsProps[];
    onSelect: OnSelectFunc;
}
