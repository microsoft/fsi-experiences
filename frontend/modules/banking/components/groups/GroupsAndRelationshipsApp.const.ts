import { createClassSelectorRange } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';

export const GROUPS_APP_RESPONSIVE_CLASS = 'fsi-group-app';
export const maxEightColumnsGroupsSelector = createClassSelectorRange(0, 8, GROUPS_APP_RESPONSIVE_CLASS);
export const maxSevenColumnsGroupsSelector = createClassSelectorRange(0, 7, GROUPS_APP_RESPONSIVE_CLASS);
export const maxSixColumnsGroupsSelector = createClassSelectorRange(0, 6, GROUPS_APP_RESPONSIVE_CLASS);
export const maxFourColumnsGroupsSelector = createClassSelectorRange(0, 4, GROUPS_APP_RESPONSIVE_CLASS);
export const maxThreeColumnsGroupsSelector = createClassSelectorRange(0, 3, GROUPS_APP_RESPONSIVE_CLASS);

export const leftCardWidth = 415;
export const leftCardCollapsedWidth = 290;
