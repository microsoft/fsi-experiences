import { ICustomControlHostProps, IExternalUtils } from "./../CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
export declare class OrgSettings implements CustomControlBagInterfaces.IOrgSettings {
    languageId: number;
    attributes: {
        [key: string]: any;
    };
    uniqueName: string;
    isAutoSaveEnabled: boolean;
    isRTL: boolean;
    fiscalYearStartDate: Date;
    fiscalPeriodFormat: number;
    fiscalPeriodType: number;
    fiscalYearFormatYear: number;
    fiscalYearFormatPrefix: number;
    fiscalYearFormatSuffix: number;
    fiscalYearDisplayCode: number;
    fiscalPeriodConnector: string;
    showWeekNumber: boolean;
    boundDashboardDefaultCardExpanded: boolean;
    allowUnresolvedPartiesOnEmailSend: boolean;
    webResourceHash: string;
    enableBingMapsIntegration: boolean;
    bingMapsApiKey: string;
    availableBingMapLocales: string;
    excludedCountriesForMaps: string;
    bFDatacenter: boolean;
    securitySettingForEmail: number;
    appointmentRichEditorExperience: boolean;
    gridTotalRecordCountLimit: number;
    lookupCharacterCountBeforeResolve: number;
    lookupResolveDelayMS: number;
    advancedLookupEnabled: boolean;
    isCollaborationExperienceEnabled: boolean;
    pcfDatasetGridEnabled: string;
    allowUsersHidingSystemViews: boolean;
    constructor(customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils);
}
