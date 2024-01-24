import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';
import { IEmptyStateProps } from './EmptyState.interface';

export const getClassNames = (props: IEmptyStateProps) => {
    const { iconSize = 200 } = props;

    return mergeStyleSets(
        {
            container: {
                padding: `35px`,
                height: '100%',
                width: '100%',
                textAlign: 'center',
            },
            icon: {
                maxWidth: iconSize,
                width: iconSize,
                marginBlockEnd: 28,
            },
            title: {
                fontSize: FontSizes.size18,
                fontWeight: 600,
                whiteSpace: 'pre-line',
                lineHeight: '24px',
                textAlign: 'center',
                color: NeutralColors.gray160,
            },
            subtitle: {
                padding: `12px 0px`,
                lineHeight: '20px',
                whiteSpace: 'pre-line',
                fontSize: FontSizes.size14,
                color: NeutralColors.gray130,
            },
        },
        props.styles
    );
};
export const imageStyle = { image: { width: '100%' } };

export const callsToActionStyles = {
    root: {
        padding: '24px 0px',
    },
};
