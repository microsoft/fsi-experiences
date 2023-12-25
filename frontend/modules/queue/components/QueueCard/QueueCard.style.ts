import { FontSizes, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS, SystemColors } from '@fsi/core-components/dist/constants/Colors';
import { MEDIA_QUERY_HIGH_CONTRAST } from '@fsi/core-components/dist/styles/Common.style';
import { IQueueCardStyles } from './QueueCard.interface';

const queueCardClassPrefix = 'queue-card';

export const getClassNames = (customStyles?: IQueueCardStyles): IQueueCardStyles => {
    return mergeStyleSets(
        {
            card: {
                displayName: queueCardClassPrefix,
                position: 'relative',
                display: 'grid',
                gridTemplateRows: 'minmax(16px, 0.7fr) minmax(16px, 0.4fr)',
                columnGap: '3px',
                inlineSize: 'min(100%, 360px)',
                minBlockSize: '89px',
                padding: '8px',
                borderBlockEnd: `1px solid ${COLORS.lightGray40}`,
                boxSizing: 'border-box',
                gridTemplateColumns: 'minmax(8px, auto) min(33px, 100%) 1fr minmax(20px, auto)',
                '& *': {
                    boxSizing: 'border-box',
                },
                '& > *:empty': {
                    display: 'none',
                },
                '&:hover': {
                    background: NeutralColors.gray10,
                },
                '&:focus-visible, &:focus-within': {
                    background: COLORS.lightBlue40,
                    [MEDIA_QUERY_HIGH_CONTRAST]: {
                        background: SystemColors.selectedText,
                    },
                },
                '&:focus-visible': {
                    outline: `2px solid ${COLORS.darkBlue3}`,
                },
            },
            primaryContent: {
                displayName: `${queueCardClassPrefix}__primary-content`,
                gridColumn: '2/4',
                gridRow: '1',
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                minWidth: 0,
                maxWidth: '100%',
                '& > *': {
                    flexGrow: 1,
                },
            },
            icon: {
                displayName: `${queueCardClassPrefix}__icon`,
                justifySelf: 'center',
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                inlineSize: 'fit-content',
            },
            iconStart: {
                displayName: `${queueCardClassPrefix}__icon--start`,
                gridColumn: '1',
                gridRow: '1',
                minInlineSize: '6px',
                aspectRatio: '1',
                alignSelf: 'center',
            },
            iconEnd: {
                displayName: `${queueCardClassPrefix}__icon--end`,
                gridColumn: '4',
                gridRow: '1',
                alignSelf: 'start',
                marginBlockStart: '5px',
            },
            tagsWrapper: {
                displayName: `${queueCardClassPrefix}__tags-wrapper`,
                gridColumn: '3',
                gridRow: '2',
                display: 'flex',
                alignSelf: 'center',
                minWidth: 0,
            },
            tag: {
                displayName: `${queueCardClassPrefix}__tag`,
                alignSelf: 'center',
                display: 'inline-flex',
                minWidth: 0,
                fontSize: FontSizes.size10,
                color: NeutralColors.gray140,
            },
            tagStart: {
                displayName: `${queueCardClassPrefix}__tag--start`,
                marginInlineEnd: '7px',
                fontSize: FontSizes.size12,
            },
            tagEnd: {
                displayName: `${queueCardClassPrefix}__tag--end`,
                paddingBlock: '1px',
                paddingInline: '4px',
                border: `1px solid var(--tag-end-border-color, ${COLORS.lightGray88})`,
                borderRadius: '2px',
                background: `var(--tag-end-background, ${COLORS.lightGray27})`,
                color: `var(--tag-end-color, ${COLORS.lightGray38})`,
            },
        },
        customStyles
    );
};
