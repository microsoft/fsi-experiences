/* istanbul ignore file */
import { useContext } from 'react';
import { ResponsiveContainerContext } from '../components/atoms/ResponsiveContainer/ResponsiveContainer.context';

const useResponsiveColumns = () => {
    const { columns: responsiveColumns } = useContext(ResponsiveContainerContext);
    const maxSixColumns = responsiveColumns <= 6;
    const maxFourColumns = responsiveColumns <= 4;
    const maxTwoColumns = responsiveColumns <= 2;

    return { maxSixColumns, responsiveColumns, maxTwoColumns, maxFourColumns };
};

export default useResponsiveColumns;
