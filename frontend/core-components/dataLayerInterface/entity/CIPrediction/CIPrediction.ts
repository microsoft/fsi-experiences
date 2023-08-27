export interface CIPredictionThreshold {
    level: number;
    threshold: number;
    label: string;
}
export interface CIPredictionFactor {
    value: number;
    fieldName: string;
}
export interface CIPrediction extends CIPredictionThreshold {
    score: number;
    factors: CIPredictionFactor[];
    isExternal?: boolean;
}
