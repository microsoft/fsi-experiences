import { OverflowText } from "@fsi/core-components/components/atoms/OverflowText";
import ScreenReaderText from "@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText";
import React from "react";
import { useId } from '@fluentui/react-hooks';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { QUEUE_NAMESPACE } from "../../../constants";

const onRenderTitle = ({ item, queueListClasses }) => {
    const translate = useTranslation(QUEUE_NAMESPACE)
    const srQueueListGroupHeaderTextID = useId('srQueueListGroupHeaderText');
    const srQueueListGroupHeaderTextPunctuationID = useId('srQueueListGroupHeaderTextPunctuation');
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

};

export default onRenderTitle;




