import { FHData } from '../interfaces/FHEntity/FHData';
import { FHMetadata } from '../interfaces/FHEntity/FHMetadata';
import { IndictableFH } from '../interfaces/FHEntity/IndictableFH';
import { IFHFetcher } from '../interfaces/IFHFetcher';
import { getFHMapMock } from '../components/summaryFH/FHData.mock';
import { categoriesMetadataMock, FHMetadataMock, forbiddenCategoriesMetadataMock } from '../interfaces/FHEntity/mocks/FHMetadata.mock';

const emptyPromiseFunction = () => {
    return Promise.reject(new Error());
};

export const emptyFHFetcher: IFHFetcher = {
    fetchFHData: emptyPromiseFunction,
    fetchFHMetadata: emptyPromiseFunction,
    fetchFHRelatedCustomers: emptyPromiseFunction,
    fetchFHOtherCustomersOwn: emptyPromiseFunction,
    fetchFHById: emptyPromiseFunction,
};

export class MockFHFetcher implements IFHFetcher {
    public async fetchFHData(contactId: string, fetchFI = true, categoryId?: string): Promise<FHData> {
        return { data: getFHMapMock(), requestMetadata: categoriesMetadataMock };
    }

    public async fetchFHMetadata(): Promise<FHMetadata> {
        return FHMetadataMock;
    }

    public async fetchFinancialHoldingByCategory(contactId: string, categoryId: number): Promise<FHData> {
        return { data: getFHMapMock(), requestMetadata: categoriesMetadataMock };
    }

    public async fetchFHRelatedCustomers() {
        return [];
    }

    public async fetchFHById(fhId) {
        return { ...getFHMapMock().get('37d32c40-006e-4cd0-a915-b85b48c9ffcg'), indicator: [] } as IndictableFH;
    }
}

export class MockFHFetcherForbidden extends MockFHFetcher {
    public async fetchFHData(contactId: string, fetchFI = true, categoryId?: string): Promise<FHData> {
        return { data: getFHMapMock(), requestMetadata: forbiddenCategoriesMetadataMock };
    }
}
