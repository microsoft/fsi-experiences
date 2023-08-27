import { ILoanAssetsAndLiabilitiesFetcher } from './ILoanAssetsAndLiabilitiesFetcher';
import { ILoanApplicantFetcher } from '../ILoanApplicant/ILoanApplicantFetcher';

export interface ILoanApplicationAssetsAndLiabilitiesFetcher extends ILoanApplicantFetcher, ILoanAssetsAndLiabilitiesFetcher {}
