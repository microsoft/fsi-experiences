import { IGroupContact } from './IGroupContact';

export interface IGroupMember {
    id: string;
    role: number;
    IsPrimaryGroup: boolean;
    customer: IGroupContact;
}
