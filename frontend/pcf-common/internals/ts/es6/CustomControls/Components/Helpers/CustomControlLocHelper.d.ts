interface IControlInfraStrings {
    ERROR_LOADING_CONTROL?: string;
    VALIDATION_FAILED_EMAIL?: string;
    VALIDATION_FAILED_BOOL?: string;
    VALIDATION_FAILED_DATE?: string;
    VALIDATION_FAILED_NUM?: string;
    VALIDATION_FAILED_INT?: string;
    VALIDATION_FAILED_RANGE?: string;
    SELECT_TO_ENTER_DATA?: string;
}
declare function getLocalizedString(key: keyof IControlInfraStrings): string;
declare function updateLocStrings(newStrings: IControlInfraStrings): void;
declare function resetStrings(): void;
export { IControlInfraStrings, getLocalizedString, updateLocStrings, resetStrings };
