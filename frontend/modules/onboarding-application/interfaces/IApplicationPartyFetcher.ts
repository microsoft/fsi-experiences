import { IApplicationParty } from './IApplicationParty';

export interface IApplicationPartyFetcher {
    getApplicationParty(): Promise<IApplicationParty>;
}
