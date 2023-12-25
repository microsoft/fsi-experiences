import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CommunicationColors, NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS, SystemColors } from '@fsi/core-components/dist/constants/Colors';
import { MEDIA_QUERY_HIGH_CONTRAST } from '@fsi/core-components/dist/styles/Common.style';
import { IQueueListStyles } from '../QueueList.interface';
import { QUEUE_LIST_ROW_TEST_ID } from './QueueListRow.const';

export const getClassNames = (customStyles?: IQueueListStyles): IQueueListStyles => {
    return mergeStyleSets(
        {
            queueListRow: {
                displayName: QUEUE_LIST_ROW_TEST_ID,
                position: 'relative',
                boxSizing: 'border-box',
                borderBlockEnd: `1px solid ${COLORS.lightGray}`,
                '& *': {
                    boxSizing: 'border-box',
                },
                '&[aria-selected="true"]': {
                    backgroundColor: CommunicationColors.tint40,
                    [MEDIA_QUERY_HIGH_CONTRAST]: {
                        backgroundColor: SystemColors.activeText,
                    },
                },
                ':hover': {
                    backgroundColor: NeutralColors.gray10,
                },
                // by using [role] we increase selector specificity to override Dynamics default focus style `.showOutline *:focus`
                '&:focus-visible, &[role]:focus': {
                    outline: `2px solid var(--outline-color, ${COLORS.darkBlue3})`,
                    outlineOffset: '-2px',
                },
            },
            queueListRowCell: {
                displayName: `${QUEUE_LIST_ROW_TEST_ID}__cell`,
            },
        },
        customStyles
    );
};
