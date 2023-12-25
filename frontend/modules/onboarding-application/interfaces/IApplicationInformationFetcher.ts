import { IApplicationParty } from './IApplicationParty';

export interface IApplicationPartyFetcher {
    getApplicationPartyInformation(): Promise<IApplicationParty>;
}
