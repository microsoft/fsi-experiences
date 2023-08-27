import { mergeStyles } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const ListSearchboxStyles = {
    root: { padding: '6px', height: '34px', boxSizing: 'border-box', border: `1px solid ${NeutralColors.gray110}`, paddingRight: '45px' },
};

export const ListSearchboxWrapper = mergeStyles({ margin: '23px 16px', position: 'relative' });
