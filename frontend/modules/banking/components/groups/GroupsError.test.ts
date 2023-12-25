import { GroupsError } from '.';
import { GroupErrorEnum } from './GroupErrorEnum';

describe('Group error', () => {
    it('should construct an error instance', () => {
        const mockMsg = 'mock error';
        const mockErrType = GroupErrorEnum.GROUPS_ADD;
        const err = new GroupsError(mockMsg, mockErrType);

        expect(err.message).toEqual(mockMsg);
        expect(err.groupError).toEqual(mockErrType);
    });
});
