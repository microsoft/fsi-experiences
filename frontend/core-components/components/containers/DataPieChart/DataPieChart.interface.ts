import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { CSSProperties } from 'react';

export interface IPieChartData {
    category: string;
    color: string;
    value: number;
}

export interface IRoundedPieChartData extends IPieChartData {
    actualValue: number;
}

export interface IDataPieChartProps {
    header: string;
    emptyStateText: string;
    data: IPieChartData[];
    isCompactView?: boolean;
    showCurrency?: boolean;
    styles?: { rootStyles?: IStackStyles; legendStyles?: IStackStyles; chartStyles?: CSSProperties };
}
