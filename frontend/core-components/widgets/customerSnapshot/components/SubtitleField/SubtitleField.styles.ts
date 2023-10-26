export const fieldRootStyles = ({ isInline }) => ({
    root: {
        ':last-child .comma-space': {
            display: 'none',
        },
        display: isInline ? 'inline' : 'flex',
        '.ms-Stack': {
            display: isInline ? 'inline' : 'flex',
        },
    },
});
