import { FontSizes, FontWeights } from '@fluentui/react';
import { ICalloutContentStyles } from '@fluentui/react/lib/components/Callout/Callout.types';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const stylesCallout: ICalloutContentStyles = {
    root: {},
    container: {},
    beak: {},
    beakCurtain: {},
    calloutMain: { width: '340px', padding: '24px', backgroundColor: COLORS.white },
};

export const modifiedOnStyle = {
    root: { fontSize: FontSizes.size12, fontWeight: FontWeights.regular, color: COLORS.lightGray130 },
};

export const modifiedOnHourStyle = {
    root: { fontSize: FontSizes.size12, fontWeight: FontWeights.regular, color: COLORS.lightGray130, paddingInlineEnd: '8px' },
};

export const modifiedWrapper = {
    root: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
};

export const modifiedOnWrapper = {
    root: { display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
};
