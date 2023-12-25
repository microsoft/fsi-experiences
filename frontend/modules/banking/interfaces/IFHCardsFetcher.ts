import { FHCardsResponse } from '../interfaces/FHEntity';
import { FHMetadata } from '../interfaces/FHEntity/FHMetadata';

export interface IFHCardsFetcher {
    fetchFHCardsData(contactId: string): Promise<FHCardsResponse>;
    fetchFHMetadata(): Promise<FHMetadata>;
}
