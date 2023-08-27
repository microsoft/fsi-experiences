import { GroupErrorEnum } from './GroupErrorEnum';

/* istanbul ignore next */ // ignoring super due to coverage issue in typescript - https://github.com/gotwarlost/istanbul/issues/690
export class GroupsError extends Error {
    constructor(message: string, public groupError: GroupErrorEnum) {
        super(message);
    }
}
