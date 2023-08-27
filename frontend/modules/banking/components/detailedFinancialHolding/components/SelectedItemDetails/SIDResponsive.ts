import { createClassSelectorRange } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';

export const FSI_INSTRUMENT_RESPONSIVE_CLASS = 'fsi-instrument';
export const maxTweleveColumns = createClassSelectorRange(7, 12, FSI_INSTRUMENT_RESPONSIVE_CLASS);
export const maxNineColumns = createClassSelectorRange(0, 9, FSI_INSTRUMENT_RESPONSIVE_CLASS);
export const maxSixColumns = createClassSelectorRange(0, 6, FSI_INSTRUMENT_RESPONSIVE_CLASS);
export const maxFourColumns = createClassSelectorRange(0, 4, FSI_INSTRUMENT_RESPONSIVE_CLASS);
export const maxTwoColumns = createClassSelectorRange(0, 2, FSI_INSTRUMENT_RESPONSIVE_CLASS);
