import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Label } from '@fluentui/react/lib/components/Label/Label';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { descriptionDateStyles } from './RelativeDatePicker.style';
import { labelStyles } from '../../../components/EditEventDialog/EditEventDialog.style';

interface IRelativeDatePickerHeaderProps {
    financialGoalFutureOnly: boolean;
    labelId: string;
}

const RelativeDatePickerHeader: FC<IRelativeDatePickerHeaderProps> = ({ financialGoalFutureOnly, labelId }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const descriptionId = useId('event-date-description');

    if (financialGoalFutureOnly) {
        return (
            <Stack>
                <Label id={labelId} styles={labelStyles}>
                    {translate('GOAL_DATE')}
                </Label>
            </Stack>
        );
    }

    return (
        <Stack>
            <Label id={labelId} styles={labelStyles} aria-describedby={descriptionId} required>
                {translate('EVENT_DATE')}
            </Label>
            <Text styles={descriptionDateStyles} id={descriptionId}>
                {translate('ADD_SPECIFIC_DATE')}
            </Text>
        </Stack>
    );
};

export default RelativeDatePickerHeader;
