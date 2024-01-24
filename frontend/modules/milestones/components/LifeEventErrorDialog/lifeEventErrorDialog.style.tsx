import { IDialogStyles } from '@fluentui/react/lib/components/Dialog';

export const lifeEventErrorDialogStyles: IDialogStyles = {
    root: {
        display: 'flex',
        fontSize: '20px',
        justifyContent: 'center',
        '.ms-Dialog-subText': {
            margin: 0,
        },
    },
    main: { minHeight: '100px !important', height: 156 },
};

export const dialogStyles = {
    content: { display: 'flex', flexDirection: 'column' },
    inner: { flex: 1, display: 'flex' },
    innerContent: { display: 'flex', flex: 1, flexDirection: 'column' },
};

export const contentStyles = { root: { marginTop: 'auto' } };

export const okButtonStyles = { root: { marginLeft: 'auto' } };

export const modalStyles = { scrollableContent: { display: 'flex' } };
