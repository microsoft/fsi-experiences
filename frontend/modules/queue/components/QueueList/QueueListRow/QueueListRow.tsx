import React, { FC, useCallback } from 'react';
import { useId } from '@fluentui/react-hooks';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { IQueueListRowProps } from './QueueListRow.interface';
import { getClassNames } from './QueueListRow.style';
import { QUEUE_LIST_ROW_TEST_ID } from './QueueListRow.const';

export const QueueListRow: FC<IQueueListRowProps> = ({ item, isSelected, children, srCurrentItemText, styles, onClick }) => {
    const queueListRowClasses = getClassNames(styles);
    const srCurrentItemId = useId('srCurrentItem');

    const onRowClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onClick?.(item, e);
        },
        [onClick, item]
    );

    if (!children) return null;

    return (
        <div
            data-is-focusable
            data-testid={QUEUE_LIST_ROW_TEST_ID}
            data-is-selected={isSelected}
            onClick={onRowClick}
            className={queueListRowClasses.queueListRow as string}
            role="row"
            aria-selected={isSelected ? 'true' : undefined}
        >
            <div className={queueListRowClasses.queueListRowCell as string} role="gridcell">
                {children}
                {isSelected && <ScreenReaderText id={srCurrentItemId}>{srCurrentItemText}</ScreenReaderText>}
            </div>
        </div>
    );
};

export default QueueListRow;
