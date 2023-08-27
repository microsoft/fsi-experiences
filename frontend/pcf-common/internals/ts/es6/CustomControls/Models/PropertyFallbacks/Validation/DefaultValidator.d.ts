interface IValidator {
    error: boolean;
    errorMessage: string;
}
declare function getValidation(value: any, type: string, attributes?: CustomControlInterfaces.ICustomControlAttributes, attributeValidation?: boolean): IValidator;
export { IValidator, getValidation };
