import React, { FC } from 'react';
import { useId } from '@fluentui/react-hooks';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { QUEUE_NAMESPACE } from '../../constants';
import { IQueueListItem, QueueList } from '../QueueList';
import { notEmptyString } from '@fsi/core-components/dist/utilities/FormUtils';
import { Search } from '../Search';
import { DATA_LAYOUT, getQueueCardStyles, getQueueListStyles, searchStyles, timeStyles, widgetStyles } from './Queue.styles';
import { QueueCard } from '../QueueCard';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import { Persona, PersonaSize } from '@fluentui/react/lib/components/Persona';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import useSearch from '../../hooks/useSearch';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { IQueueGroup } from '../../interfaces/IQueueGroup.interface';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { QUEUE_CARD_TAG_START_SR_ID_PREFIX } from './Queue.const';
import useFormatDate, { getDateFormatOption } from '@fsi/core-components/dist/context/hooks/useFormatDate';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';

export interface IQueueProps {
    compactLayout?: boolean;
    selectedQueueItemId?: string;
    onSelectQueueItem: (queueItem: IQueueListItem) => void;
    items: IQueueListItem[];
    steps: IQueueGroup;
    metadata?: { [key: string]: EntityMetadata };
}

interface IGetTagStartMarkupProps {
    date: Date;
    formattedDate: string;
    dateSrText: string;
    dateSrTextId: string;
}

const getTagStartMarkup = ({ date, formattedDate, dateSrText, dateSrTextId }: IGetTagStartMarkupProps) => {
    if (!date) return undefined;
    return (
        <>
            {dateSrText && <ScreenReaderText id={`${QUEUE_CARD_TAG_START_SR_ID_PREFIX}-${dateSrTextId}`}>{dateSrText}</ScreenReaderText>}
            <time dateTime={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`} style={timeStyles}>
                <OverflowText text={formattedDate!} />
            </time>
        </>
    );
};

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

    const foundItems = resultItems || /* istanbul ignore next */ [];
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

    const onRenderContent = ({ data }) => {
        const primaryContentSecondaryText = notEmptyString(data.itemText) ? `${data.itemName} • ${data.itemText}` : data.itemName;
        const primaryCustomer = data.primaryCustomer || translate('N_A');
        const { status: { type: statusType = '', text: statusText = '' } = {} } = data;

        return (
            <QueueCard
                id={`queueCard-${data.id}`}
                tagStart={getTagStartMarkup({
                    date: data.date,
                    formattedDate: formatDate(data.date),
                    dateSrText: metadata?.date?.displayName!,
                    dateSrTextId: data.id,
                })}
                tagEnd={statusText && <OverflowText text={statusText} overflowModeSelf />}
                primaryContent={
                    <Persona
                        text={primaryCustomer}
                        secondaryText={primaryContentSecondaryText}
                        size={PersonaSize.size28}
                        data-testid="queue-card-persona"
                        showSecondaryText={true}
                    />
                }
                iconEnd={
                    data.workedBy && (
                        <Indicator
                            iconName="ReminderPerson"
                            tooltipProps={{
                                content: (
                                    <>
                                        {translate('QUEUE_CARD_WORKED_BY_TEXT', { name: data.workedBy! })}
                                        <ScreenReaderText id={`srQueueCardIconEndText-${data.id}`}>
                                            {` ${translate('QUEUE_CARD_WORKED_BY_TEXT_SR_POSTFIX')}`}
                                        </ScreenReaderText>
                                    </>
                                ),
                            }}
                            iconAriaLabel={translate('QUEUE_CARD_WORKED_BY_ARIA_LABEL_TEXT', { itemName: primaryCustomer })}
                        />
                    )
                }
                styles={getQueueCardStyles({ status: statusType })}
                aria-label={translate('QUEUE_CARD_QUEUE_ITEM_ARIA_LABEL_TEXT', { itemName: primaryCustomer })}
                data-layout={compactLayout ? /* istanbul ignore next */ DATA_LAYOUT.COMPACT : undefined}
            />
        );
    };

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
                onRenderContent={onRenderContent}
                onClick={onSelectQueueItem}
                activeItemId={selectedQueueItemId}
                styles={getQueueListStyles(themePrimary)}
            />
        </Widget>
    );
};

export default Queue;
