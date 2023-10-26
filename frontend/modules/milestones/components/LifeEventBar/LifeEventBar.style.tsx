import { CSSProperties } from 'react';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { defaultFontFamily } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';

export const addIconProps: IIconProps = { iconName: 'Add' };

export const rootLifeEventBar: CSSProperties = {
    width: '100%',
    fontFamily: defaultFontFamily,
};

export const lifeEventBarContentStyles = {
    root: {
        display: 'grid',
        columnGap: 12,
        padding: '0 16px',
        paddingTop: 10,
        gridTemplateColumns: 'repeat(auto-fit,minmax(180px, 1fr))',
        '&.empty': {
            paddingTop: 0,
        },
        '.ms-layer': {
            display: 'none',
        },
    },
};
