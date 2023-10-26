import React, { FC, useCallback, useMemo } from 'react';
import { ActionButton } from '@fluentui/react/lib/Button';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { LifeEvent } from '../../../interfaces';
import { ILifeEventConfigurations, PeriodReference } from '../../../interfaces/Configuration';
import { getPeriod, interpolatePeriodString, periodToStringKey } from '../../../utilities/LifeEventsUtils';
import { isDateValid } from '@fsi/core-components/dist/utilities/TimeUtils';
import DateTime from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime';
import useDialog from '../../../hooks/useDialog';

import {
    dateStringItemStyles,
    typeStringItemStyles,
    footerWrapper,
    createLifeEventButtonStyles,
    addIconStyles,
    typeWrapperStyles,
} from './Footer.style';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import isBefore from 'date-fns/isBefore';
import isToday from 'date-fns/isToday';

export interface ICategoryFooterProps {
    categoryCode: number;
    lastLifeEvent?: LifeEvent;
    configuration?: ILifeEventConfigurations;
    isEmpty?: boolean;
    isNew?: boolean;
    readonly?: boolean;
    hideModifyButtons?: boolean;
}

const rootTokens = { childrenGap: 6 };

const actionButtonProps = { iconName: 'Add', styles: addIconStyles };

const Footer: FC<ICategoryFooterProps> = ({ lastLifeEvent, configuration, categoryCode, isNew, isEmpty, readonly, hideModifyButtons }) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const lifeEventDate = new Date(lastLifeEvent?.date || '');
    const isTodayEvent = isToday(lifeEventDate);
    const isFutureEvent = !isTodayEvent && isBefore(new Date(), lifeEventDate);
    const showButton = isEmpty && !hideModifyButtons && categoryCode !== configuration?.birthdayCategoryCode;
    const {
        palette: { themePrimary },
    } = useTheme();
    const lifeEventsButtonStyles = useMemo(() => createLifeEventButtonStyles(themePrimary), [themePrimary]);
    const { openAddEvent } = useDialog();

    const isAgeCategory = useMemo(() => {
        return lastLifeEvent?.categoryCode === configuration?.birthdayCategoryCode;
    }, [lastLifeEvent]);

    const typeString = useMemo(() => {
        if (!lastLifeEvent || isAgeCategory) {
            return undefined;
        }

        const category = configuration?.categoriesMap[lastLifeEvent.categoryCode];
        return category?.types.find(t => t.typeCode === lastLifeEvent.typeCode)?.typeName || '';
    }, [configuration, lastLifeEvent, isAgeCategory]);

    const relativeDateString = useMemo(() => {
        if (!lastLifeEvent || !lastLifeEvent.date || !isDateValid(lastLifeEvent.date)) {
            return undefined;
        }

        const { period, time } = getPeriod(lastLifeEvent.date);

        if (isAgeCategory) {
            return interpolatePeriodString(translate(`AGE_${PeriodReference[period]}`), time);
        }

        const translatedPeriod = translate(periodToStringKey(period, isFutureEvent));
        return `${interpolatePeriodString(translatedPeriod, time)}`;
    }, [configuration, lastLifeEvent, isAgeCategory, isFutureEvent]);

    const dayAndMonth = useMemo(() => {
        /* istanbul ignore next */
        if (!isAgeCategory || !lastLifeEvent?.date || !isDateValid(lastLifeEvent?.date)) {
            return undefined;
        }

        return lastLifeEvent.date;
    }, [isAgeCategory, lastLifeEvent]);

    const addEvent = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            openAddEvent(categoryCode);
        },
        [openAddEvent, categoryCode]
    );

    return (
        <Stack styles={footerWrapper} tokens={rootTokens}>
            {typeString && (
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
                    <Stack horizontal styles={typeWrapperStyles}>
                        <Text title={typeString} styles={typeStringItemStyles}>
                            {typeString}
                        </Text>
                    </Stack>
                </Stack>
            )}
            <Text title={relativeDateString} data-testid="event-relative-time" styles={dayAndMonth ? typeStringItemStyles : dateStringItemStyles}>
                {relativeDateString}
            </Text>
            {dayAndMonth && <DateTime quickFormat={DateTimePredefinedFormat.ShortDate} styles={dateStringItemStyles} date={dayAndMonth} />}
            {showButton && (
                <ActionButton
                    disabled={readonly}
                    iconProps={actionButtonProps}
                    styles={lifeEventsButtonStyles}
                    text={translate('ADD_EVENT')}
                    onClick={addEvent}
                    title={translate('ADD_EVENT')}
                />
            )}
        </Stack>
    );
};

export default Footer;
