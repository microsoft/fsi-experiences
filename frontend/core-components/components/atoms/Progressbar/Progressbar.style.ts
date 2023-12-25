import { IProgressIndicatorStyleProps, IProgressIndicatorStyles } from '@fluentui/react/lib/components/ProgressIndicator/ProgressIndicator.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { FontSizes } from '@fluentui/react/lib/Theme';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { COLORS, SystemColors } from '../../../constants/Colors';
import { MEDIA_QUERY_HIGH_CONTRAST } from '../../../styles/Common.style';
import { IProgressbarStyles } from './Progressbar.interface';

const defaultProgressIndicatorHeight = 10;

export const getDefaultProgressIndicatorStyle = (style?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>): any => {
    return mergeStyleSets(
        {
            root: {
                display: 'contents',
            },
            itemProgress: {
                gridRow: '2',
                height: 12,
                paddingBlock: '1px 0',
                overflow: 'hidden',
                borderRadius: '100vmax',
            },
            itemName: {
                gridRow: '1',
                display: 'flex',
                paddingBlockEnd: '8px',
                overflow: 'visible',
            },
            itemDescription: {
                gridRow: '3',
                display: 'flex',
                paddingBlockStart: '10px',
            },
            progressTrack: {
                height: defaultProgressIndicatorHeight,
                [MEDIA_QUERY_HIGH_CONTRAST]: {
                    border: '1px solid hsl(0deg 0% 0% / 0%)',
                    background: SystemColors.canvas,
                },
            },
            progressBar: {
                height: defaultProgressIndicatorHeight,
                borderRadius: '100vmax 0 0 100vmax',
                background: COLORS.progressbarDefaultBackground,
            },
        },
        style
    );
};

export const getClassNames = (styles?: IProgressbarStyles) => {
    return mergeStyleSets(
        {
            container: {
                displayName: 'progressbarContainer',
                display: 'grid',
                gridTemplateColumns: 'minmax(150px, 1fr) auto',
                gridTemplateRows: 'auto 1fr auto',
                alignItems: 'center',
                '& *': {
                    boxSizing: 'border-box',
                },
            },
            asideText: {
                displayName: 'progressbarAsideText',
                gridRow: '2',
                display: 'flex',
                paddingInlineStart: 24,
                paddingBlockStart: 1,
                fontSize: FontSizes.size12,
                lineHeight: 16,
                overflow: 'hidden',
                color: COLORS.lightGray130,
            },
        },
        styles
    );
};
