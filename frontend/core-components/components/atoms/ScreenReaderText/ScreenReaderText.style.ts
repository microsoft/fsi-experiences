import { mergeStyles } from '@fluentui/react/lib/Styling';

export const srClassName = mergeStyles({
    displayName: 'sr-text',
    position: 'fixed',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: '0',
    border: 'none',
    overflow: 'hidden',
    clipPath: 'inset(100%)',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
});
