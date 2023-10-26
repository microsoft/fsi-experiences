import React, { FC, useMemo } from 'react';
import { DetailsList, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { IFHSummaryTableProps } from './FHAccountsTable';
import { FH_LOAN_ICON_TEXT_MAP, FH_NAME_TO_CATEGORY_MAP, FH_NAME_TO_TYPE_MAP, LoanLineMap } from '../../constants/FHValueMaps';
import { getColumns } from './FHSummaryColumns';
import { getHighestIndicator, ICategoryArrayValues } from '@fsi/core-components/dist/utilities/CalcUtils';
import SummaryViewEmptyState from './SummaryViewEmptyState';
import { fhSummaryTableStyle, margins } from './summaryFHConstants';
import { IIndicatorFields, IndictableFH } from '../../interfaces/FHEntity/IndictableFH';
import { createFHCategoryValue, onShouldVirtualize } from './utilities';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';

export interface ILoanLineProps {
    icon?: string;
    count: number;
    sum: number;
    indicator?: IIndicatorFields;
}

const calcLoanFields = ({ FHTable, typesOptionSet }: { FHTable: IndictableFH[]; typesOptionSet: OptionSetMap }): Array<ICategoryArrayValues> => {
    const summaryFields: ICategoryArrayValues[] = [];
    const loanValuesMap = JSON.parse(JSON.stringify(FH_LOAN_ICON_TEXT_MAP)) as LoanLineMap;
    const customLoanTypes: number[] = [];
    const fhLoans = FHTable.filter(value => value.category === FH_NAME_TO_CATEGORY_MAP.Loans);
    fhLoans.forEach(value => {
        const fhType = value.type;
        if (!loanValuesMap[fhType]) {
            customLoanTypes.push(fhType);
            loanValuesMap[fhType] = { count: 0, sum: 0, indicator: undefined };
        }
        const FHTypeValue = loanValuesMap[fhType];
        const indicatorArr = value.indicator;
        const indicator = indicatorArr && indicatorArr[0];

        if (FHTypeValue && fhType) {
            loanValuesMap[fhType] = {
                sum: FHTypeValue.sum + value.balanceDefault,
                count: FHTypeValue.count + 1,
                indicator: getHighestIndicator(indicator, FHTypeValue.indicator),
                icon: FHTypeValue.icon,
            };
        }
    });

    [FH_NAME_TO_TYPE_MAP.Mortgage, FH_NAME_TO_TYPE_MAP.Secured, FH_NAME_TO_TYPE_MAP.Unsecured, ...customLoanTypes].forEach(loanType => {
        const loan = loanValuesMap[loanType];
        summaryFields.push(
            createFHCategoryValue(loan.count, loan.sum, loan.indicator, typesOptionSet[loanType]?.text || '', loan.icon || 'CubeShape')
        );
    });

    if (fhLoans.length === 0) {
        return [];
    }

    return summaryFields;
};

export const FHLoansTable: FC<IFHSummaryTableProps> = props => {
    const columns = getColumns(props.isCompact);
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const items = useMemo(
        () => calcLoanFields({ FHTable: props.indictableFHItems, typesOptionSet: props.typesOptionSet }),
        [props.indictableFHItems, props.typesOptionSet]
    );

    if (items.length === 0) {
        return <SummaryViewEmptyState text={translate('NO_OWNED_LOANS')} />;
    }

    return (
        <div style={margins} data-testid={`loans-table`}>
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
