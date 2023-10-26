import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { minSixColumns } from '../../consts/reponsive.consts';

export const headerRootStyles = { root: { [minSixColumns]: { maxWidth: 150 } } };

export const headerStyles: any = {
    fontSize: FontSizes.size24,
    fontWeight: FontWeights.semibold,
    whiteSpace: 'break-spaces',
    wordBreak: 'break-word',
    margin: 0,
};
