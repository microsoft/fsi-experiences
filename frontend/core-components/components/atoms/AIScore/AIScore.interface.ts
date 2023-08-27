import { ReactElement } from 'react';
export interface IAIInfo {
    text: string;
    moreInfo?: string | ReactElement;
}

export interface IAIScoreInfo extends IAIInfo {
    color: string;
    score: number;
}

export interface IAIScoreProps {
    scoreInfo: IAIScoreInfo;
    scoreTitle: string;
    ofTotalText: string;
}
