import { ILifeEventsFetcher } from '@fsi/milestones/interfaces/ILifeEventsFetcher';
import { ICustomerSnapshotFetcher } from '@fsi/core-components/dist/dataLayerInterface/service/ICustomerSnapshotFetcher';
import { IKeyObservationsFetcher } from '@fsi/core-components/dist/dataLayerInterface/service/IKeyObservationsFetcher';
import { IGroupFetcher } from '../../interfaces/Groups/IGroupFetcher';
import { IFHCardsFetcher } from '../../interfaces/IFHCardsFetcher';
import { IFHFetcher } from '../../interfaces/IFHFetcher';

export interface CustomerSummaryProps {
    customerSnapshotFetcher: ICustomerSnapshotFetcher;
    keyObservationsFetcher: IKeyObservationsFetcher;
    contactId: string;
    formId: string;
    lifeEventsFetcher: ILifeEventsFetcher;
    fhFetcher: IFHFetcher;
    fhCardsFetcher: IFHCardsFetcher;
    pcfGroupsFetcher: IGroupFetcher;
}
