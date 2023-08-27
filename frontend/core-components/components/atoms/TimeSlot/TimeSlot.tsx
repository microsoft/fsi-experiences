import React, { FC } from 'react';
import type { ITimeSlotProps } from './TimeSlot.interface';
import { toDate } from '../../../utilities';
import { DEFAULT_FORMAT } from './TimeSlot.const';
import { DefaultButton } from '@fluentui/react/lib/components/Button/DefaultButton/DefaultButton';

export const TimeSlot: FC<ITimeSlotProps> = React.memo(({ time, itemIndex, timeFormat = DEFAULT_FORMAT, isSelected = false, onSelect }) => {
    return (
        time && (
            <DefaultButton
                data-is-focusable
                data-selection-index={itemIndex}
                data-is-selected={isSelected}
                data-testid="timeslot"
                onClick={onSelect}
                checked={isSelected}
            >
                {toDate(time, timeFormat)}
            </DefaultButton>
        )
    );
});

export default TimeSlot;
