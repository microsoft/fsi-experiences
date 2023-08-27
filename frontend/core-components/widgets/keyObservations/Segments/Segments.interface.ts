import { IKeyObservationsFetcher } from '../../../dataLayerInterface/service/IKeyObservationsFetcher';

export interface ISegmentsProps {
    fetcher: IKeyObservationsFetcher;
    contactId: string | null;
    headerText?: string;
}
