import { ICustomControlExposedOrgSettings } from "../Models/CustomControlExposedInterfaces";
declare const FIELD_SECTION_ITEM_ID = "MscrmControls.Containers.FieldSectionItem";
declare const IFRAME_CLASS_ID = "{fd2a7985-3187-444e-908d-6624b21f69c0}";
declare const WEBRESOURCE_CLASS_ID = "{9fdf5f91-88b1-47f4-ad53-c11efc01a01d}";
declare const MODERN_CURRENCY_CONTROL_NAME = "PowerApps.CoreControls.CurrencyInput";
declare const MODERN_PHONENUMBER_CONTROL_NAME = "PowerApps.CoreControls.PhoneNumber";
declare const MODERN_TEXTBOX_CONTROL_NAME = "PowerApps.CoreControls.TextInput";
declare const MODERN_INPUT_CONTROLS = "ModernInputControls";
interface IConfigAuxInfo {
    quickFormId?: string;
    chartDataRequestType?: CustomControlInterfaces.FirstDataRequestType;
}
declare enum ContainerControlType {
    GridContainer = 0,
    DashboardContainer = 1,
    QuickCreateForm = 2,
    FieldSectionContainer = 3,
    TimelineContainer = 4,
    ChartControl = 5,
    WebresourceControl = 6,
    DummyControl = 7,
    CalendarControl = 8
}
declare const KNOWN_FALLBACK_CONTROLS: {
    [controlName: string]: string;
};
declare const KNOWN_REPLACEMENT_CONTROLS: {
    [legacyControlName: string]: {
        newControlName: () => string;
        enabled: (contextString: string, orgSettings?: ICustomControlExposedOrgSettings) => boolean;
    };
};
declare function updateManifestFallback(controlName: string, fallback: string): void;
declare function getManifestFallback(controlName: string): string;
declare function getDataFieldNameForTimer(descriptor: CustomControlInterfaces.ICustomControlDescriptor, TIMER_CONTROL_DATAFIELDNAME_KEY: string): string;
declare function getFieldSectionItemSpecificationParameters(explicitConfig: CustomControlInterfaces.ICustomControlConfiguration, classId?: string): any;
declare function isFieldSectionItemControl(controlId: string): boolean;
declare function wrapFieldLevelConfig(explicitConfig: CustomControlInterfaces.ICustomControlConfiguration, manifest: CustomControlInterfaces.ICustomControlManifest): CustomControlInterfaces.ICustomControlConfiguration;
declare function constructTimerParameters(timerParameters: CustomControlInterfaces.ITimerParameter): CustomControlInterfaces.ITimerParameter;
declare function extendDefaultValueParameterByControlDescriptor(defaultValueParameter: CustomControlInterfaces.ICustomControlParameterDefinition, descriptor: CustomControlInterfaces.ICustomControlDescriptor): CustomControlInterfaces.ICustomControlParameterDefinition;
declare function isNullOrUndefined(util: any): boolean;
declare function retrieveDefaultConfigurationForFieldControl(name: string, dataFieldName: string, type: string, entityTypeName?: string, classId?: string, descriptor?: CustomControlInterfaces.ICustomControlDescriptor, auxInfo?: IConfigAuxInfo): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForSubgridControl(controlId: string, parameters: CustomControlInterfaces.IGridCustomControlDescriptorParameters, isAssociatedGrid?: boolean, pcfDatasetGridOrgSetting?: string): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForHomePageGridControl(controlId: string, entityName: string, viewId: string, pcfDatasetGridOrgSetting?: string): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForHomePageGridControlForChart(controlId: string, entityName: string, viewId: string, pcfDatasetGridOrgSetting?: string): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForHomePageChartControl(name: string, entityName: string, viewId: string, visualizationId: string, refreshCounter?: number, filterExpression?: string, isUserChart?: boolean, chartDrillDownParameters?: CustomControlInterfaces.ChartDrillDownParameter[], isUserView?: boolean, extraFilters?: string[], linkEntities?: string, renderStandaloneExpandButton?: boolean, renderStandaloneCloseButton?: boolean, isChartOnTheRightSide?: boolean, isEmbeddedInTeams?: boolean): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForAssociatedGridChartControl(name: string, entityName: string, viewId: string, visualizationId: string, relationshipName: string, refreshCounter?: number, isUserChart?: boolean, isUserView?: boolean, extraFilters?: string[], linkEntities?: string, renderStandaloneCloseButton?: boolean, isChartOnTheRightSide?: boolean): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveContainerControlForFormPowerBIControl(parameters: CustomControlInterfaces.IPowerBIParameterDefinition, FormFactor: number, Name: string): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForQuickFormChartControl(parameters: CustomControlInterfaces.IChartCustomControlDescriptorParameters, dataRequestType?: CustomControlInterfaces.FirstDataRequestType, renderChartCommandBar?: boolean): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForFormChartControl(parameters: CustomControlInterfaces.IChartCustomControlDescriptorParameters, firstDataRequestType?: CustomControlInterfaces.FirstDataRequestType, refreshCounter?: number): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDefaultConfigurationForControl(name: string, dataFieldName: string, type: string, descriptor: CustomControlInterfaces.ICustomControlDescriptor, entityTypeName?: string, classId?: string, pcfDatasetGridOrgSetting?: string): CustomControlInterfaces.ICustomControlConfiguration;
declare function retrieveDataTypeBySourceTypeForControl(type: string, classId?: string): string;
declare function retrieveContainerControlTypeByControlId(controlId: string): ContainerControlType;
declare function retrieveDefaultManifestNameByDataType(dataType: string, attributes?: CustomControlInterfaces.ICustomControlAttributes, isMainGrid?: boolean, pcfDatasetGridOrgSetting?: string, entityName?: string): string;
declare function retrieveDefaultManifestByConfiguration(configuration: CustomControlInterfaces.ICustomControlConfiguration, isMainGrid?: boolean, pcfDatasetGridOrgSetting?: string): string;
declare function isLegacyDataSetControl(controlManifest: CustomControlInterfaces.ICustomControlManifest): boolean;
declare function resetForUnitTesting(): void;
export { IConfigAuxInfo, ContainerControlType, constructTimerParameters, getDataFieldNameForTimer, getFieldSectionItemSpecificationParameters, resetForUnitTesting, isNullOrUndefined, retrieveDefaultConfigurationForFieldControl, retrieveDefaultConfigurationForSubgridControl, retrieveDefaultConfigurationForHomePageGridControl, retrieveDefaultConfigurationForHomePageGridControlForChart, retrieveDefaultConfigurationForHomePageChartControl, retrieveDefaultConfigurationForAssociatedGridChartControl, retrieveDefaultConfigurationForQuickFormChartControl, retrieveDefaultConfigurationForFormChartControl, retrieveContainerControlForFormPowerBIControl, retrieveDefaultConfigurationForControl, extendDefaultValueParameterByControlDescriptor, wrapFieldLevelConfig, isFieldSectionItemControl, retrieveDataTypeBySourceTypeForControl, retrieveDefaultManifestNameByDataType, retrieveDefaultManifestByConfiguration, isLegacyDataSetControl, retrieveContainerControlTypeByControlId, FIELD_SECTION_ITEM_ID, IFRAME_CLASS_ID, WEBRESOURCE_CLASS_ID, KNOWN_FALLBACK_CONTROLS, KNOWN_REPLACEMENT_CONTROLS, MODERN_INPUT_CONTROLS, MODERN_TEXTBOX_CONTROL_NAME, MODERN_PHONENUMBER_CONTROL_NAME, MODERN_CURRENCY_CONTROL_NAME, updateManifestFallback, getManifestFallback, };
