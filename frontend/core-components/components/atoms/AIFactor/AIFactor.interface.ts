export interface IAIFactor {
    displayName: string;
    id: string;
    factor: number;
}

export interface IAIFactorProps {
    factorInfo: IAIFactor;
    showFactorRate?: boolean;
    lowIsGood?: boolean;
    negativeLabel?: string;
    positiveLabel?: string;
}
