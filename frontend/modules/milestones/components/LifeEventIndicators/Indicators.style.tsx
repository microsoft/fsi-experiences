import { CSSProperties } from 'react';
import { FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const InstancesCircle: CSSProperties = {
    border: `1px solid ${COLORS.lightGray}`,
    borderRadius: '35px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '1px 7px 0px 6px',
};

export const InstancesTextOfX: CSSProperties = {
    fontSize: FontSizes.size10,
    lineHeight: '17px',
    fontWeight: 400,
    margin: '-1px 1px 0px 2px',
};

export const InstancesTextOfInstances: CSSProperties = {
    fontSize: FontSizes.size12,
    fontWeight: 500,
    marginTop: '-1px',
};

export const FocusCircleStyle: CSSProperties = {
    height: '11px',
    width: '11px',
    borderRadius: '100%',
    background: COLORS.red,
    border: '2px solid #FAF9F8',
    boxSizing: 'border-box',
};
