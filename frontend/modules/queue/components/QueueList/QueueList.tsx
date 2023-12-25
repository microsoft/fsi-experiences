import { SelectionMode } from '@fluentui/react/lib/Selection';
import { GroupedList } from '@fluentui/react/lib/components/GroupedList/GroupedList';
import { ScrollablePane } from '@fluentui/react/lib/components/ScrollablePane/ScrollablePane';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React, { FC } from 'react';
import { QUEUE_NAMESPACE } from '../../constants/Queue.const';
import groupListGroups from '../../helpers/groupListGroups';
import type { IQueueListProps } from './QueueList.interface';
import { QueueListGroupHeaderStyles, ScrollableListStyles, getClassNames } from './QueueList.style';
import onRenderCell from './renderers/onRenderCell';
import onRenderHeader from './renderers/onRenderHeader';
import OnRenderTitle from './renderers/onRenderTitle';

export const QueueList: FC<IQueueListProps> = ({
    dataItems,
    activeItemId,
    onRenderContent,
    onClick,
    groups,
    wrapperAriaAttributes,
    styles: customStyles,
}) => {
    const groupedListGroups = groupListGroups(dataItems, groups);
    const translate = useTranslation(QUEUE_NAMESPACE);
    const queueListClasses = getClassNames(customStyles);

    /* NOTE: due to the FluentUI GroupedList bug, we have to add all needed props to Queue list item so we could use it in onRenderCell, otherwise GroupedList won't have updated data when QueueListRow is clicked*/
    const itemsWithProps = dataItems.map(item => ({ ...item, onClick, activeItemId }));

    /* istanbul ignore next */
    const GroupListProps = {
        headerProps: {
            styles: QueueListGroupHeaderStyles,
            role: 'rowheader',
            expandButtonProps: { 'aria-label': translate('SR_EXPAND_COLLAPSE_GROUP') },
            OnRenderTitle: (item) => OnRenderTitle({ item, queueListClasses }),
        },
        showEmptyGroups: true,
        onRenderHeader: onRenderHeader,
    };

    return (
        <section data-testid="queue-list" {...wrapperAriaAttributes} className={queueListClasses.queueListWrapper as string}>
            <ScrollablePane styles={ScrollableListStyles}>
                <GroupedList
                    items={itemsWithProps}
                    groupProps={GroupListProps}
                    onRenderCell={onRenderCell(onRenderContent, queueListClasses, translate, onClick, activeItemId)}
                    selectionMode={SelectionMode.none}
                    groups={groupedListGroups}
                    className={queueListClasses.queueList as string}
                />
            </ScrollablePane>
        </section>
    );
};

export default QueueList;
