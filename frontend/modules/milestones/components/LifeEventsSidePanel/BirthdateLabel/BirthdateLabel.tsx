import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { focusLabel, focusLabelBold, focusLabelsWrapper } from './BirthdateLabel.style';
import differenceInDays from 'date-fns/differenceInDays';
import { Label } from '@fluentui/react/lib/Label';

interface IBirthdateLabelProps {
    date?: Date;
}

const birthdayLabelKeys = {
    '1': 'CONTACT_BIRTHDAY_IS_TOMORROW',
    '0': 'CONTACT_BIRTHDAY_TODAY',
    '-1': 'CONTACT_BIRTHDAY_WAS_YESTERDAY',
};

const BirthdateLabel: FC<IBirthdateLabelProps> = ({ date }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const today = new Date();
    const daysToDate = (date && differenceInDays(new Date(date).setFullYear(today.getFullYear()), today)) || 0;

    return (
        <Stack styles={focusLabelsWrapper}>
            <Label styles={focusLabel}>
                {translate(birthdayLabelKeys[daysToDate] || (daysToDate < 0 ? 'CONTACT_BIRTHDAY_WAS' : 'CONTACT_BIRTHDAY_IN'), {
                    days: Math.abs(+daysToDate),
                })}
            </Label>
            <Label styles={focusLabelBold}> {translate('WISH_THEM_HAPPY_BIRTHDAY')}</Label>
        </Stack>
    );
};

export default BirthdateLabel;
