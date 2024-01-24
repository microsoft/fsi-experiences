import React, { FC } from 'react';
import {
    QUEUE_CARD_ICON_END_TEST_ID,
    QUEUE_CARD_ICON_START_TEST_ID,
    QUEUE_CARD_TAG_END_TEST_ID,
    QUEUE_CARD_TAG_START_TEST_ID,
    QUEUE_CARD_TEST_ID,
} from './QueueCard.const';
import { IQueueCardProps } from './QueueCard.interface';
import { getClassNames } from './QueueCard.style';

export const QueueCard: FC<IQueueCardProps> = props => {
    const { primaryContent, iconStart, iconEnd, tagStart, tagEnd, styles: customStyles, id, tabIndex, ...restProps } = props;

    if (!primaryContent && !iconStart && !iconEnd && !tagStart && !tagEnd) return null;

    const defaultStyles = getClassNames(customStyles);

    return (
        <article {...restProps} className={defaultStyles.card as string} tabIndex={tabIndex} id={id} data-testid={QUEUE_CARD_TEST_ID}>
            <div className={defaultStyles.primaryContent as string}>{primaryContent}</div>

            {iconStart && (
                <i className={`${defaultStyles.icon} ${defaultStyles.iconStart}`} data-testid={QUEUE_CARD_ICON_START_TEST_ID}>
                    {iconStart}
                </i>
            )}

            {iconEnd && (
                <i className={`${defaultStyles.icon} ${defaultStyles.iconEnd}`} data-testid={QUEUE_CARD_ICON_END_TEST_ID}>
                    {iconEnd}
                </i>
            )}
            <div className={defaultStyles.tagsWrapper as string}>
                {tagStart && (
                    <div className={`${defaultStyles.tag} ${defaultStyles.tagStart}`} data-testid={QUEUE_CARD_TAG_START_TEST_ID}>
                        {tagStart}
                    </div>
                )}

                {tagEnd && (
                    <div className={`${defaultStyles.tag} ${defaultStyles.tagEnd}`} data-testid={QUEUE_CARD_TAG_END_TEST_ID}>
                        {tagEnd}
                    </div>
                )}
            </div>
        </article>
    );
};

export default QueueCard;
