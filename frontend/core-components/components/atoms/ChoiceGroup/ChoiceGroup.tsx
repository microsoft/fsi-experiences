import { ChoiceGroup as FluentChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import React, { FC } from 'react';
import type { IChoiceGroupProps } from './ChoiceGroup.interface';
import { ChoiceGroupStyles } from './ChoiceGroup.style';

export const ChoiceGroup: FC<IChoiceGroupProps> = props => {
    const { styles } = props;

    return <FluentChoiceGroup {...props} styles={concatStyleSets(ChoiceGroupStyles, styles)} />;
};

export default ChoiceGroup;
