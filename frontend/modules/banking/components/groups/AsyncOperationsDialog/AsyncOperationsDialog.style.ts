export const contentStyles = {
    content: { display: 'flex', flexDirection: 'column' },
    inner: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
};

export const dialogStyles = {
    main: {
        width: 364,
        minHeight: 141,
        '.ms-Modal-scrollableContent': {
            display: 'flex',
        },
        '@media (min-width:480px)': {
            minWidth: 0,
            width: 364,
        },
    },
};
