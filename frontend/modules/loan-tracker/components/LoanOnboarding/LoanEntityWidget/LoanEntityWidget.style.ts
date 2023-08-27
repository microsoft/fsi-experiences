import { mergeStyles } from '@fluentui/react';
import { MEDIA_QUERY_BREAKPOINT_SMALL } from '../../../constants/StyleSelectors.consts';
import { OPEN_IFRAME_ATTR } from './LoanEntityWidget.const';

export const LoanEntityWidgetStyles = mergeStyles({
    position: 'absolute',
    visibility: 'hidden',
    flex: 1,
    width: '100%',
    height: '100%',
    transition: 'visibility 0.5s',
    [`&[${OPEN_IFRAME_ATTR}]`]: {
        visibility: 'visible',
        transition: 'none',
    },
    [`@media screen and (min-width: ${MEDIA_QUERY_BREAKPOINT_SMALL})`]: {
        position: 'static',
        visibility: 'visible',
        transition: 'none',
    },
});
