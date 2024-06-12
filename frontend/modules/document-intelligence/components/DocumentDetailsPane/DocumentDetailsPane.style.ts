import { NeutralColors } from '@fluentui/react/lib/Theme';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const scrollableSidePanel = { marginBlockStart: '8px', width: '360px', overflow: 'auto' };
export const pivotContainerStyles = {
    itemContainer: { ...scrollableSidePanel, flex: 1, overflow: 'hidden' },
    link: {
        selectors: {
            ':disabled:hover': {
                cursor: 'default',
                background: 'inherit',
                color: NeutralColors.gray90,
            },
            ':disabled': {
                color: NeutralColors.gray90,
            },
        },
    },
};

export const detailsContainerStyles: IStackStyles = {
    root: {
        ...(scrollableSidePanel as any),
        height: '100%',
    },
};

export const pivotContainerClassname = mergeStyles({
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    selectors: {
        '.msfsi-di-extracted-info-container': {
            height: '100%',
        },
        '.msfsi-di-document-details-container': {
            height: '100%',
            overflow: 'auto',
        },
    },
});
