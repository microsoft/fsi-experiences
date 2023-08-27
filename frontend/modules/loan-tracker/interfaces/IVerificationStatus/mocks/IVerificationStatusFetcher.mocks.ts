import { ActiveStatusCodesValues, ACTIVE_STATUS_CODES, STATES, StatesValues } from '../../../constants/LoanStateMap.consts';
import { VerificationStatusesValues } from '../IVerificationStatusFetcher';
import { IVerificationStatusFetcher } from '../IVerificationStatusFetcher';

export class MockVerificationStatusFetcher implements IVerificationStatusFetcher {
    public async updateVerificationStatus(loanId: string, verificationStatus: VerificationStatusesValues): Promise<VerificationStatusesValues> {
        return verificationStatus;
    }
    public async getLoanStatuses(loanId: string): Promise<{ stateCode: StatesValues; statusCode: ActiveStatusCodesValues }> {
        return { stateCode: STATES.Active, statusCode: ACTIVE_STATUS_CODES.Draft };
    }
    public hasVerifyPrivilege(): boolean {
        return true;
    }
}
