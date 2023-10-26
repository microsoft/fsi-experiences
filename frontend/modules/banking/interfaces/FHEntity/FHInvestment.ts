import { FHBaseCategory } from './FHBaseCategory';

export interface FHInvestment extends FHBaseCategory {
    // Investments fields
    fhPortfolioName?: string;
    fhOpenedDate?: Date;
    fhCashBalance?: number;
    fhPerformance?: number;
    fhPerformance1Y?: number;
    fhPerformance3Y?: number;
    fhPerformanceYTD?: number;
    fhGainLoss?: number;
    fhInvestmentTimeFrame?: number;
    fhInvestmentObjectives?: number;
    fhInvestmentRiskCategory?: number;
}

export default FHInvestment;
