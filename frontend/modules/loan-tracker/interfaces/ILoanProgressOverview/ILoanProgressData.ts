export interface ILoanProgressData {
    completed: number;
    total: number;
    name: string;
    type: string;
    openTabFunc: () => void;
}
