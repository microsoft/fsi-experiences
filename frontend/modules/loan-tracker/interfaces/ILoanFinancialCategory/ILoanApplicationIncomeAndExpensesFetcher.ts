import { ILoanIncomeAndExpensesFetcher } from './ILoanIncomeAndExpensesFetcher';
import { ILoanApplicantFetcher } from '../ILoanApplicant/ILoanApplicantFetcher';

export interface ILoanApplicationIncomeAndExpensesFetcher extends ILoanApplicantFetcher, ILoanIncomeAndExpensesFetcher {}
