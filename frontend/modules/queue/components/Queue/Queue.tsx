import { useId } from '@fluentui/react-hooks';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import React, { FC } from 'react';
import { QUEUE_NAMESPACE } from '../../constants';
import useSearch from '../../hooks/useSearch';
import { IQueueGroup } from '../../interfaces/IQueueGroup.interface';
import { IQueueListItem, QueueList } from '../QueueList';
import { Search } from '../Search';
import { getQueueListStyles, searchStyles, widgetStyles } from './Queue.styles';
import useFormatDate, { getDateFormatOption } from '@fsi/core-components/dist/context/hooks/useFormatDate';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import onRenderContent from './renders/onRenderContent';

export interface IQueueProps {
    compactLayout?: boolean;
    selectedQueueItemId?: string;
    onSelectQueueItem: (queueItem: IQueueListItem) => void;
    items: IQueueListItem[];
    steps: IQueueGroup;
    metadata?: { [key: string]: EntityMetadata };
}

const dateFormat = getDateFormatOption(DateTimePredefinedFormat.LongMonthShortDayYear);

export const Queue: FC<IQueueProps> = ({ selectedQueueItemId, onSelectQueueItem, compactLayout, items, steps, metadata }) => {
    const { onChangeSearch, resultItems, query } = useSearch({ items });
    const translate = useTranslation(QUEUE_NAMESPACE);
    const {
        palette: { themePrimary },
    } = useTheme();
    const formatDate = useFormatDate(dateFormat);

    const srSearchResultsTextID = useId('srSearchResultsText');
    const isSearchResult = !!query;

    const foundItems = resultItems || /* istanbul ignore next */[];
    const foundItemsLength = foundItems.length;
    let srSearchResultsText = '';

    if (isSearchResult) {
        const resultsText =
            foundItemsLength > 1
                ? translate('QUEUE_SEARCH_RESULTS_SR_TEXT_X_ITEMS_FOUND', { amount: foundItemsLength })
                : translate('QUEUE_SEARCH_RESULTS_SR_TEXT_1_ITEM_FOUND');
        const noFoundText = translate('QUEUE_SEARCH_RESULTS_SR_TEXT_NO_ITEMS_FOUND');
        srSearchResultsText = foundItemsLength > 0 ? resultsText : noFoundText;
    }

    return (
        <Widget styles={widgetStyles}>
            <Search
                wrapperAriaAttributes={{ 'aria-label': translate('QUEUE_SEARCH_WRAPPER_ARIA_LABEL_TEXT') }}
                placeholder={translate('QUEUE_SEARCH_PLACEHOLDER')}
                onChange={onChangeSearch}
                onClear={onChangeSearch}
                styles={searchStyles}
            />
            <ScreenReaderText role="status" id={srSearchResultsTextID}>
                {srSearchResultsText}
            </ScreenReaderText>
            <QueueList
                dataItems={resultItems}
                groups={steps}
                onRenderContent={({ data }) => onRenderContent(data, metadata, compactLayout, translate, formatDate)}
                onClick={onSelectQueueItem}
                activeItemId={selectedQueueItemId}
                styles={getQueueListStyles(themePrimary)}
            />
        </Widget>
    );
};

export default Queue;
