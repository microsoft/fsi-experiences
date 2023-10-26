import React, { FC } from 'react';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import FinancialDataSummary, { IFinancialDataSummaryProps } from './FinancialDataSummary';
import { FH_SUMMARY_COMPACT_VIEW, FH_SUMMARY_FULL_VIEW, responsiveContainerStyles } from './FinancialDataSummary.style';

const FinancialDataSummaryWrapper: FC<IFinancialDataSummaryProps> = props => {
    return (
        <ResponsiveContainer style={responsiveContainerStyles} classPrefix={props.isCompactView ? FH_SUMMARY_COMPACT_VIEW : FH_SUMMARY_FULL_VIEW}>
            <FinancialDataSummary {...props} />
        </ResponsiveContainer>
    );
};
export default FinancialDataSummaryWrapper;
