export interface IFinancialGoal {
    lifeEventId: string;
    id: string;
    targetName: string;
    targetDate?: Date;
    targetValue: number;
    progressValue?: number;
    isCompleted: boolean;
}
