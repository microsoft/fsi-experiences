export type TelemetryAdditionalData = { [key: string]: any };

export enum TelemetryEventType {
    Action = 'Action',
    Interaction = 'Interaction',
}

export enum FSIErrorTypes {
    NullReference = 1,
    ServerError = 2,
    InvalidParam = 3,
    GenericError = 4,
    TimeOut = 5,
    AsyncError = 6,
}
