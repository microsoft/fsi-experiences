import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import IndicatorColumn from '../../../../../components/summaryFH/IndicatorColumn';

const renderIndicator = (groupHolding: IGroupFinancialHolding) => {
    const indicators = groupHolding?.indicator || [];

    if (!indicators.length) {
        return '';
    }

    return <IndicatorColumn indicator={indicators[0]} size={16} />;
};

export default renderIndicator;
