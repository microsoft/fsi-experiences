import { maxFourColumnsDetailedFHSelector, maxTwoColumnsDetailedFHSelector } from '../../../DetailedFHMain.style';
import { maxFourColumns, maxSixColumns, maxTwoColumns } from '../SIDResponsive';

export const dataBoxStyles = ({ isExtended }) => ({
    root: {
        paddingBottom: '10px',
        paddingTop: '10px',
        flex: isExtended ? 1 : 0.25,
        [maxSixColumns]: {
            flex: 0.25,
        },
        [`${maxFourColumns} ${maxFourColumnsDetailedFHSelector}`]: {
            flex: '50%',
        },
        [`${maxTwoColumns} ${maxTwoColumnsDetailedFHSelector}`]: {
            flex: '100%',
        },
    },
});
