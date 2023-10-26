import React, { FC, useMemo } from 'react';
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { IFHSummaryTableProps } from './FHAccountsTable';
import { FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';
import SummaryViewEmptyState from './SummaryViewEmptyState';
import { getColumnsLinesOfCredit } from './FHSummaryColumns';
import { fhSummaryTableStyle, margins } from './summaryFHConstants';
import { IIndicatorFields, IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { onShouldVirtualize } from './utilities';

export interface ILineProps {
    name?: string;
    sum: number;
    indicator?: IIndicatorFields;
    icon?: string;
}

const calcCreditLineFields = (FHTable: IndictableFH[]): Array<ILineProps> => {
    const summaryFields: ILineProps[] = [];

    FHTable.forEach((value, key) => {
        if (value.category === FH_NAME_TO_CATEGORY_MAP['Credit']) {
            const indicatorArr = value.indicator;
            const indicator = indicatorArr && indicatorArr[0];
            summaryFields.push({ name: value.name, sum: value.balanceDefault, indicator: indicator, icon: 'PaymentCard' });
        }
    });

    return summaryFields;
};
export const FHCreditLinesTable: FC<IFHSummaryTableProps> = props => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const columns = getColumnsLinesOfCredit(props.isCompact);
    const items = useMemo(() => calcCreditLineFields(props.indictableFHItems), [props.indictableFHItems]);

    if (items.length === 0) {
        return <SummaryViewEmptyState text={translate('NO_OWNED_CREDIT_LINES')} />;
    }

    return (
        <div style={margins} data-testid={`credit-lines-table`}>
            <DetailsList
                key={props.isCompact ? 'compact' : 'default'}
                styles={fhSummaryTableStyle}
                items={items}
                columns={columns}
                onShouldVirtualize={onShouldVirtualize}
                setKey="set"
                selectionMode={SelectionMode.none}
                isHeaderVisible={false}
            />
        </div>
    );
};
