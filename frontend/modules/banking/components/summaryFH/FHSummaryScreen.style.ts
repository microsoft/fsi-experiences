import { INavStyles } from '@fluentui/react/lib/components/Nav/Nav.types';
import { minSixColumns } from './FHSummary.const';

export const navStyles: Partial<INavStyles> = {
    root: {
        display: 'none',
        '.ms-Nav-link': {
            borderRadius: 0,
            ':hover': {
                color: 'initial',
            },
        },
        [minSixColumns]: {
            display: 'flex',
        },
    },
    groupContent: { marginBottom: 0 },
};

export const verticalSeparatorStyles = { root: { padding: 0, display: 'none', zIndex: 1, [minSixColumns]: { display: 'flex' } } };

export const fhSummaryHeaderSeparatorStyles = {
    root: {
        zIndex: 1,
    },
};

export const pivotStyles = { root: { textAlign: 'left', padding: '0 24px', [minSixColumns]: { display: 'none' } } };

export const pivotStyle = { flex: 1, overflow: 'auto' };
