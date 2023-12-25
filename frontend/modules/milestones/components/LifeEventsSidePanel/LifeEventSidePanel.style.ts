import { IStackStyles } from '@fluentui/react';
import { IPanelStyles } from '@fluentui/react/lib/components/Panel';

export const panelStyle: Partial<IPanelStyles> = {
    navigation: { justifyContent: 'space-between' },
    scrollableContent: { display: 'flex', flexDirection: 'column', flex: 1 },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 0,
    },
    header: { padding: 0 },
    headerText: { lineHeight: 32 },
    closeButton: { marginInlineEnd: 28 },
    footerInner: { padding: 0 },
};

export const headerStyle: IStackStyles = {
    root: { paddingInlineStart: 24, paddingBlockEnd: 26 },
};

export const iconHeaderStyle: IStackStyles = {
    root: { fontSize: '20px' },
};

export const addButtonStyles: IStackStyles = { root: { paddingBlock: 16, paddingInlineStart: 24, marginTop: '0 !important' } };
