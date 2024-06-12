export enum SnapshotErrorCode {
    InvalidConfiguration = 1000,
    MissingConfiguration = 1001,
    DataFetchError = 1002,
}
export class CustomerSnapshotConfigError extends Error {
    constructor(public message: string, public errorCode: SnapshotErrorCode) {
        super(message);
        this.name = 'CustomerSnapshotConfigError';
    }
}
