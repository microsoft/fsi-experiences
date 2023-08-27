import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';

export interface IPredictionProps {
    fetcher: IKeyObservationsFetcher;
    contactId: string | null;
}
