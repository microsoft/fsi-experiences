import { IndictableFH } from '../../../../interfaces/FHEntity/IndictableFH';
import { FHMetadata } from '../../../../interfaces/FHEntity';
import { IGroupFinancialHolding } from '../../../../interfaces/Groups/IGroupFinancialHolding';
import { IFHFetcher } from '../../../../interfaces/IFHFetcher';

export interface DetailedFHBodyProps {
    fhStructure?: IGroupFinancialHolding[];
    fhItems: IndictableFH[];
    fetcher: IFHFetcher;
    contactId: string;
    metadata?: FHMetadata;
}
