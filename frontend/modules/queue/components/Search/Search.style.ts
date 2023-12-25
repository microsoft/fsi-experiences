import { NeutralColors } from '@fluentui/react/lib/Theme';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { ISearchStyles } from './Search.interface';

export const getClassNames = (customStyles?: ISearchStyles) => {
    return mergeStyleSets(
        {
            wrapper: {
                displayName: `search-wrapper`,
                boxSizing: 'border-box',
                position: 'relative',
                '& *': {
                    boxSizing: 'border-box',
                },
            },
            searchbox: {
                height: 'auto',
                minHeight: '45px',
                paddingInline: '8px',
                paddingBlock: '5px 7px',
                border: `1px solid ${NeutralColors.gray110}`,
            },
            icon: {
                color: NeutralColors.gray160,
            },
            field: {
                color: NeutralColors.gray130,
            },
        },
        customStyles
    );
};
