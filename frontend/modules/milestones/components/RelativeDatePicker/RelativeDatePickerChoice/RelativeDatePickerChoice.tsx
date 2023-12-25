import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { onChangeDefaultFunction, RelativeDateRadioOptionsEnum } from '../../../interfaces/EditEventDialog.interface';
import { choiceGroupStyles } from './RelativeDatePickerChoice.style';

interface IRelativeDatePickerChoiceProps {
    relativeDateSelectedRadio: RelativeDateRadioOptionsEnum;
    relativeDateRadioOptions: IChoiceGroupOption[];
    onRelativeRadioChange: onChangeDefaultFunction;
    financialGoalFutureOnly: boolean;
}

const RelativeDatePickerChoice: FC<IRelativeDatePickerChoiceProps> = ({
    relativeDateSelectedRadio,
    relativeDateRadioOptions,
    onRelativeRadioChange,
    financialGoalFutureOnly,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    if (financialGoalFutureOnly) {
        return <Text>{translate('FROM_TODAY')}</Text>;
    }

    return (
        <ChoiceGroup
            styles={choiceGroupStyles}
            selectedKey={relativeDateSelectedRadio}
            options={relativeDateRadioOptions}
            onChange={onRelativeRadioChange}
        />
    );
};

export default RelativeDatePickerChoice;
