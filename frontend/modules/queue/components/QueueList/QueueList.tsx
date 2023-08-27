import React, { FC, ReactElement, useCallback, useMemo } from 'react';
import { useId } from '@fluentui/react-hooks';
import { GroupedList } from '@fluentui/react/lib/components/GroupedList/GroupedList';
import { IGroup } from '@fluentui/react/lib/components/GroupedList/GroupedList.types';
import { GroupHeader, IGroupHeaderProps } from '@fluentui/react/lib/components/GroupedList/GroupHeader';
import { ScrollablePane } from '@fluentui/react/lib/components/ScrollablePane/ScrollablePane';
import { Sticky } from '@fluentui/react/lib/components/Sticky/Sticky';
import { StickyPositionType } from '@fluentui/react/lib/components/Sticky/Sticky.types';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IQueueGroup } from '../../interfaces/IQueueGroup.interface';
import type { IQueueListItem, IQueueListProps } from './QueueList.interface';
import { getClassNames, QueueListGroupHeaderStyles, ScrollableListStyles } from './QueueList.style';
import { QueueListRow } from './QueueListRow/QueueListRow';
import { QUEUE_NAMESPACE } from '../../constants/Queue.const';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';

export const createGroups = (dataItems: IQueueListItem[], queueGroups: IQueueGroup): IGroup[] => {
    const groups = new Map();

    for (const key in queueGroups) {
        const name = queueGroups[key].name;

        groups.set(key, { key: key, count: 0, startIndex: -1, name });
    }

    dataItems.forEach((slot, index) => {
        if (!groups.has(slot.groupId)) return;

        const group = groups.get(slot.groupId);

        if (group.count === 0) {
            group.startIndex = index;
        }

        group.count++;
    });

    return Array.from(groups.values());
};

export const QueueList: FC<IQueueListProps> = ({
    dataItems,
    activeItemId,
    onRenderContent,
    onClick,
    groups,
    wrapperAriaAttributes,
    styles: customStyles,
}) => {
    const groupedListGroups = useMemo(() => {
        const createdGroups = createGroups(dataItems, groups);
        return createdGroups.length > 0 ? createdGroups : undefined; // undefined forces <GroupedList> to display all items, ungrouped, if no groups provided
    }, [dataItems, groups]);
    const translate = useTranslation(QUEUE_NAMESPACE);
    const srQueueListGroupHeaderTextID = useId('srQueueListGroupHeaderText');
    const srQueueListGroupHeaderTextPunctuationID = useId('srQueueListGroupHeaderTextPunctuation');

    const queueListClasses = getClassNames(customStyles);

    /* NOTE: due to the FluentUI GroupedList bug, we have to add all needed props to Queue list item so we could use it in onRenderCell, otherwise GroupedList won't have updated data when QueueListRow is clicked*/
    const itemsWithProps = dataItems.map(item => ({ ...item, onClick, activeItemId }));

    const onRenderCell = useCallback(
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
        [onClick, translate, onRenderContent, activeItemId]
    );

    /* istanbul ignore next */
    const GroupListProps = {
        headerProps: {
            styles: QueueListGroupHeaderStyles,
            role: 'rowheader',
            expandButtonProps: { 'aria-label': translate('SR_EXPAND_COLLAPSE_GROUP') },
            onRenderTitle: item => {
                const group = item.group || {};
                return (
                    <div className={queueListClasses.queueListGroupHeader as string}>
                        <OverflowText styles={{ root: queueListClasses.queueListGroupHeaderPrimaryText }} text={group.name} overflowModeSelf />
                        <ScreenReaderText id={`${srQueueListGroupHeaderTextPunctuationID}${group.name?.replace(/\W+/g, '')}`}>;</ScreenReaderText>
                        <OverflowText styles={{ root: queueListClasses.queueListGroupHeaderSecondaryText }} text={group.count} overflowModeSelf />
                        <ScreenReaderText id={`${srQueueListGroupHeaderTextID}${group.name?.replace(/\W+/g, '')}`}>
                            {`${group.count === 1 ? translate('ROW') : translate('ROWS')}`}
                        </ScreenReaderText>
                    </div>
                );
            },
        },
        showEmptyGroups: true,
        onRenderHeader: (props?: IGroupHeaderProps): ReactElement => (
            <Sticky stickyPosition={StickyPositionType.Both}>
                <GroupHeader {...props} />
            </Sticky>
        ),
    };

    return (
        <section data-testid="queue-list" {...wrapperAriaAttributes} className={queueListClasses.queueListWrapper as string}>
            <ScrollablePane styles={ScrollableListStyles}>
                <GroupedList
                    items={itemsWithProps}
                    groupProps={GroupListProps}
                    onRenderCell={onRenderCell}
                    selectionMode={SelectionMode.none}
                    groups={groupedListGroups}
                    className={queueListClasses.queueList as string}
                />
            </ScrollablePane>
        </section>
    );
};

export default QueueList;
