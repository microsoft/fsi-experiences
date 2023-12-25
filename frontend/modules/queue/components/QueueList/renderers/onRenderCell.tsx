import React, { useCallback } from "react";
import { QueueListRow } from "../QueueListRow";
import { IQueueListItem, IQueueListProps } from "../QueueList.interface";

const onRenderCell = (onRenderContent, queueListClasses, translate, onClick, activeItemId) =>
    useCallback(
        (nestingDepth, item: IQueueListItem & IQueueListProps, itemIndex) => {
            return (
                <QueueListRow
                    item={item}
                    srCurrentItemText={translate('QUEUE_LIST_ROW_SR_CURRENT_ITEM_TEXT')}
                    onClick={item.onClick}
                    isSelected={item.activeItemId === item.data.id}
                    styles={{ ...queueListClasses }}
                >
                    {onRenderContent(item)}
                </QueueListRow>
            );
        },
        [onClick, onRenderContent, activeItemId]
    );

export default onRenderCell;