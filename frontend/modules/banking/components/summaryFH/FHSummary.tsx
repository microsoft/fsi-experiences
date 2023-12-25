import React from 'react';
import FHSummaryScreen from './FHSummaryScreen';
import useFHData, { IUseFHProps } from '../../hooks/financialHoldings/useFHData';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { SUMMARY_FH_RESPONSIVE_CLASS } from './FHSummary.const';

interface IFHSummaryProps extends IUseFHProps {}

const FHSummary: React.FC<IFHSummaryProps> = props => {
    const { fetcher, contactId } = props;
    const { entities, metadata, isLoading, isError, categoriesMetadata } = useFHData({ contactId, fetcher });

    return (
        <ResponsiveContainer classPrefix={SUMMARY_FH_RESPONSIVE_CLASS}>
            <FHSummaryScreen
                metadata={metadata}
                entities={entities}
                isError={isError}
                isLoading={isLoading}
                categoriesMetadata={categoriesMetadata}
            />
        </ResponsiveContainer>
    );
};

export default FHSummary;
