import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

export interface TimedPerformancePairs {
    time: string;
    text: string;
    value: number | undefined;
}

export interface ITimedPerformance {
    timedPerformancePairs: TimedPerformancePairs[];
    styles?: ITextStyles;
}
