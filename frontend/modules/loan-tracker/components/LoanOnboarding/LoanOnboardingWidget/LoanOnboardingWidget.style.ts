import { mergeStyles } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { MEDIA_QUERY_BREAKPOINT_SMALL } from '../../../constants/StyleSelectors.consts';

export const mainDivStyle = mergeStyles({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'auto',
    height: '100%',
});

export const separatorStyles = {
    root: {
        width: 1,
        margin: 0,
        padding: 0,
        backgroundColor: COLORS.separatorLineGrayColor,
        zIndex: 0,
        [`@media screen and (max-width: ${MEDIA_QUERY_BREAKPOINT_SMALL})`]: {
            display: 'none',
        },
    },
};
