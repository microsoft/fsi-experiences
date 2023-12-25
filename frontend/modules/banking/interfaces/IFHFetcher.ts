import { ICustomerFH } from '../interfaces/FHEntity/CustomerFH';
import { FHData } from '../interfaces/FHEntity/FHData';
import { FHMetadata } from '../interfaces/FHEntity/FHMetadata';
import { IFinancialProduct } from '../interfaces/FHEntity/IFinancialProduct';
import { IndictableFH } from '../interfaces/FHEntity/IndictableFH';

export interface IFHFetcher {
    fetchFHData(contactId: string, fetchFI: boolean, categoryId?: string): Promise<FHData>;
    fetchFHMetadata(): Promise<FHMetadata>;
    fetchFHRelatedCustomers?(fhId: string): Promise<ICustomerFH[]>;
    fetchFHOtherCustomersOwn?(contactId: string): Promise<Map<string, ICustomerFH[]>>;
    fetchFHById?(fhId: string): Promise<IndictableFH>;
    fetchFinancialProducts?(fhId: string): Promise<IFinancialProduct[]>;
}
