import { IDeclareFeatures } from "../Models/PropertyInfrastructure/IFeatureSupport";
declare function modifyDeclaredFunctions(obj: IDeclareFeatures, manifest: CustomControlInterfaces.ICustomControlManifest): void;
declare function getDeprecatedErrorMessage(obj: IDeclareFeatures, methodName: string): string;
declare function getNotImplementedErrorMessage(obj: IDeclareFeatures, methodName: string): string;
declare function getUnspecifiedMethodErrorMessage(obj: IDeclareFeatures, methodName: string): string;
declare function getRequiredUnsupportedErrorMessage(obj: IDeclareFeatures, methodName: string): string;
declare function isValidApiVersionFormat(version: string): boolean;
export { modifyDeclaredFunctions, isValidApiVersionFormat, getDeprecatedErrorMessage, getNotImplementedErrorMessage, getUnspecifiedMethodErrorMessage, getRequiredUnsupportedErrorMessage, };
