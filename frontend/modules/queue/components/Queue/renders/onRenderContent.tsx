import { Persona, PersonaSize } from '@fluentui/react/lib/components/Persona';
import Indicator from "@fsi/core-components/dist/components/atoms/Indicator/Indicator";
import { OverflowText } from "@fsi/core-components/dist/components/atoms/OverflowText";
import ScreenReaderText from "@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText";
import { notEmptyString } from "@fsi/core-components/dist/utilities/FormUtils";
import React from "react";
import { QueueCard } from "../../QueueCard";
import { QUEUE_CARD_TAG_START_SR_ID_PREFIX } from "../Queue.const";
import { DATA_LAYOUT, getQueueCardStyles, timeStyles } from "../Queue.styles";

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

export const onRenderContent = (data, metadata, compactLayout, translate, formatDate) => {
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
}

export default onRenderContent;