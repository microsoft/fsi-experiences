/// <reference types="react" />
import { ICCFContainerStyle } from "../../CommonComponents/Primitive/ICCFContainerStyle";
import { VirtualComponent } from "../Components/VirtualComponent";
import * as CustomControlDependantInterfaces from "./CustomControlDependantInterfaces";
import { CustomControlEntityReference } from "./CustomControlEntityReference";
import { CustomControlExposedUserAgent, DateFormattingInfo, IAccessibilityComponentWrapperProps, ICustomControlExposedOrgSettings, IPopupService, NumberFormattingInfo, IConnectors } from "./CustomControlExposedInterfaces";
import { Dictionary } from "../Utilities/Dictionary";
import { DataProvider } from "./Dataset/CustomControlDataProviderInterfaces";
import { DataSetFactoryConfiguration } from "./Dataset/DataSetFactory";
import type { PersonaPresence } from "@fluentui/react/lib/Persona";
interface ICustomControlHostOwnProps {
    controlId: string;
    id: string;
    systemDefinedProperties?: {
        [key: string]: CustomControlInterfaces.IPropertyCustomControlParameterDefinition;
    };
    configuration: CustomControlInterfaces.ICustomControlConfiguration;
    descriptor: CustomControlInterfaces.ICustomControlDescriptor;
    formInfo?: CustomControlInterfaces.IFormProps;
    parentDefinedControlProps?: CustomControlInterfaces.IParentComponentProps;
    rowSpan?: number;
    themingData?: IThemingData;
    children?: {
        [key: string]: CustomControlInterfaces.ICustomControlConfiguration;
    };
    contextString?: string;
    parentContextToken?: any;
    externalCommandManagerId?: string;
    externalCommandPromise?: Promise<boolean>;
    shouldRender?: boolean;
    logLevel?: CustomControlInterfaces.TracerLogLevel;
    authoringMode?: boolean;
    zIndexOverride?: number;
    rootBodyElement?: HTMLElement;
    useUnicodeIconsInternally?: boolean;
    generateStylingWrapperElement?: (children: JSX.Element) => JSX.Element;
    datasetProviders?: {
        [datasetKey: string]: DataProvider;
    };
    datasetConfiguration?: {
        [datasetKey: string]: DataSetFactoryConfiguration;
    };
}
interface ICommandManagerInitObject {
    commandManagerId: string;
    ribbonId?: string;
}
interface ICustomControlHostWrapperProps {
    dataSetUIOptions: CustomControlInterfaces.IDataSetUIOptions;
}
interface IDynamicData {
    parameters: {
        [key: string]: CustomControlInterfaces.ICustomControlParameter;
    };
    dataReady: boolean;
    updated: boolean;
    generateDummySystemProps?: boolean;
}
interface ICommonPropBagData {
    formattingData?: IFormattingData;
    clientData: IClientData;
    utilsData: IUtilsData;
    themingData: IThemingData;
}
interface IPropBagData extends ICommonPropBagData {
    accessibilityData: IAccessibilityData;
    resourcesData: IResourcesData;
    modeData: IModeData;
    pageData: IPageData;
}
interface ICustomControlHostStateProps {
    stateToPropsMappingError?: boolean;
    stateToPropsMappingErrorMessage?: string;
    dynamicData: IDynamicData;
    manifest: CustomControlInterfaces.ICustomControlManifest;
    personalizationState: any;
    propBagData: IPropBagData;
    children?: {
        [key: string]: CustomControlInterfaces.ICustomControlConfiguration;
    };
    personalizationConfiguration?: any;
    pageType?: string;
    popupStack?: string[];
    contextToken?: any;
    internalCommandManagerEtns?: string[];
    updatedProperties?: string[];
    internalCommandManagerIds?: ICommandManagerInitObject[];
    globalCommandManagerInitialized?: boolean;
    portalFlyoutToDialogId?: string;
    designLanguage?: IThemeMap;
    themePortalWrapper?: (element: JSX.Element) => JSX.Element;
    inactive?: boolean;
    datasetProviders?: {
        [datasetKey: string]: DataProvider;
    };
}
interface IThemeMap {
    DesignLanguageId: string;
    ThemeId: string;
    [key: string]: string | IThemeMapElement | undefined;
}
interface IThemeMapElement {
    [key: string]: string | IThemeMapElement | undefined;
}
interface ICustomControlHostDispatchPropsActions {
    clearNestedChild: (key: string) => boolean;
    createAccessibilityComponent: (props: IAccessibilityComponentWrapperProps) => JSX.Element;
    createCommandManagerUXComponent: () => (props: CustomControlDependantInterfaces.ICCFConnectedCommandManagerProps) => JSX.Element;
    createKeyboardShortcut: (keyCombination: number[], shortcutHandler: (event: KeyboardEvent) => void, isGlobal: boolean, areaName: string, shortcutDescription: string, srcElementId?: string) => CustomControlDependantInterfaces.IKeyboardShortcut;
    createXrmForm: (contextToken: any, pageId: string, entityTypeName: string, entityId: string) => boolean;
    createXrmGrid: (contextToken: any, pageId: string, parameters: CustomControlInterfaces.IParameterDefinitionMap, controlName?: string, customControlId?: string) => boolean;
    registerNewControl: (contextToken: any, pageId: string, controlName: string, controlId: string) => boolean;
    executeAddOnLoad: (dataSetObjectWrapper: any, contextToken: any) => any;
    executeNotifyHandlersThatEventOccurred: (notifyHandlersThatEventOccurredParameter: CustomControlInterfaces.INotifyHandlersThatEventOccurredParameter) => Promise<any>;
    getConnectorsApi: (controlId: string) => IConnectors;
    getRecordSetQueryKey: (dataSetObjectWrapper: any) => string;
    addSessionTab: (sessionTab: CustomControlInterfaces.ITab) => Promise<void>;
    closeSessionTab: (closedSessionTabIndex: number) => Promise<void>;
    updateSessionTab: (sessionTab: CustomControlInterfaces.ITab) => Promise<void>;
    closeAllSessionTabs: () => Promise<void>;
    dismissMessage: () => Promise<void>;
    initializeReferencePanelControl: (controls: CustomControlInterfaces.IControlDescriptor[]) => Promise<void>;
    cleanReferencePanelState: () => Promise<void>;
    markActiveTab: (currentTab: CustomControlInterfaces.ITab, isUnderOverflow: boolean) => Promise<void>;
    getResource: (resource: CustomControlInterfaces.IResourceRecord) => Promise<void>;
    initializeCommandManager: (pageId: string, contextToken: any, controlId: string, commandManagerId: string) => {
        promise: Promise<void>;
        resolve: () => void;
    };
    loadManifest: (customControlId: string, customControlName?: string) => Promise<void>;
    loadResources: (customControl: CustomControlInterfaces.ICustomControlManifest) => Promise<void>;
    loadResourceStrings: (customControl: CustomControlInterfaces.ICustomControlManifest) => Promise<void>;
    triggerOfflineMetadataSync: () => Promise<void>;
    retrieveFormWithAttributes: (entityName: string, formId?: string, formType?: string) => Promise<any>;
    refreshDataSetParameter: (dataSetObjectWrapper: any, contextToken?: any) => any;
    updateGridPageNumber?: (pageId: string, contextToken: any, pageNumber: number) => void;
    retrieveDataSetLookupCellParameter: (dataSetParameter: CustomControlInterfaces.ILegacyDataSetParameter, dataSetLookupCellWrapper: any, contextToken?: any) => any;
    renderNestedCustomControl: (key: string, props: ICustomControlHostOwnProps, dataSetHostProps?: ICustomControlHostWrapperProps) => JSX.Element;
    renderReactSubtree: (element: JSX.Element, node: Element) => void;
    retrieveGridData: (query: CustomControlInterfaces.ICCFQuery, pageId: string) => any;
    retrieveLookupData: (query: CustomControlInterfaces.ICCFQuery, pageId: string) => any;
    retrieveLookupMetadataAction: (lookupObjectWrapper: any) => any;
    addPendingCommandManagerId: (pageId: string, contextToken: any, controlId: string, commandManagerId: string) => {
        promise: Promise<void>;
        resolve: () => void;
    };
    retrieveRecordCommand: (allRecords: {
        [id: string]: CustomControlInterfaces.DataSetRecord;
    }, commandManagerId: string, contextToken: any, records: string[], commandButtonIds?: string[], filterByPriority?: boolean, useNestedFormat?: boolean, controlConstructorName?: string, refreshAllRules?: boolean, pageId?: string) => Promise<CustomControlInterfaces.ICommandObjectWrapper[]>;
    retrieveRecordDataForForm: (entityReference: CustomControlEntityReference, formId: string, processControlDataRequest?: object, additionalColumns?: string[], isPrimaryAttributeRequested?: boolean) => Promise<any>;
    retrieveForm: (entityReference: CustomControlEntityReference, formId: string) => Promise<any>;
    retrieveEntityData: (etn: string) => Promise<any>;
    retrieveChartDrilldownAttributes: (etn: string) => Promise<any>;
    retrieveView: (entityTypeName: string, viewQueryType: any, viewType: any, viewId?: any) => any;
    retrieveViewSelector: (entityTypeName: string, viewQueryType: any) => any;
    retrievePersonaInfo?: (userId: string) => Promise<any>;
    usePresenceStatus?: (userAadObjectId: string | null) => PersonaPresence | undefined;
    useProfilePhoto?: (userAadObjectId: string | null) => string;
    save: (snapshotId: string, columns: string[]) => Promise<any>;
    saveEmbeddedEntity: (pageId: string, entityTypeName: string, recordId: string, closestParentWithContext: string, columnSet: string[], viewId: string, suppressDuplicateDetection: boolean) => Promise<any>;
    setFieldControlPersonalization: (personalizationConfig: any, personalizations: any, page?: string) => any;
    setGridControlPersonalization: (personalizationConfig: any, personalizations: any, page?: string) => any;
    setDashboardControlPersonalization: (personalizationConfig: any, personalizations: any, page?: string) => any;
    setGenericControlPersonalization: (customControlId: string, personalizations: any, page?: string) => any;
    setGlobalControlPersonalization: (customControlId: string, personalizations: any) => any;
    setPowerBISignedInState: (pageId: string, signedInState: string) => void;
    beginSecureSessionForResource?: (resource: string, cookieName: string, cookieDoamin: string, allowPrompt?: boolean) => Promise<any>;
    setValue: (entityReference: any, controlKeyValuePairs: {
        [key: string]: any;
    }, snapshotId: string, pageId?: string) => Promise<string>;
    setXrmObject: (proxy: IXrmProxy) => void;
    updateFieldValue: (pageId: string, controlNameValuePairs: any, suppressOnChange?: boolean, entityTypeName?: string, recordId?: string, closestParentWithContext?: string) => void;
    updateOutputs: (pageId: string, entityTypeName: string, recordId: string, customControlId: string, closestControlParentWithSave: string, outputs: CustomControlInterfaces.IOutputMap, contextToken: any) => any;
    openPopup: (popupId: string) => Promise<any>;
    closePopup: (popupId: string) => Promise<any>;
    updateControlMemoizedDataSet: (legacyDataSetWrapper: any, actions: CustomControlInterfaces.ICustomControlActions, recordId: string) => void;
    executeRollupRequest: (target: ControlAndClientApiInterfaces.LookupValue, fieldName: string, pageId: string) => any;
    loadWebResource?: (resourceName: string, pageId: string) => Promise<any>;
    registerOngoingWork?: (promise: Promise<boolean>, forceResolveCallback?: () => void, pageId?: string, attributesPendingUpdate?: string[]) => any;
    isPresenceEnabledEntity: (entityName: string) => any;
    getPresenceMappedField: (entityName: string) => any;
    updateChartFilterExpression?: (pageId: string, contextToken: any, highChartFilterExpression: string) => any;
    fireXrmEvent?: (controlId: string, pageId: string, contextToken: any, eventType: CustomControlInterfaces.KnownSystemEventListeners, eventInfo?: string) => void;
    sendLookupRequest?: (lookupRequest: any, contextToken: any, pageId?: string, etn?: string, controlId?: string, attributeName?: string, dependentAttributeName?: string) => Promise<any>;
    runPreSearch?: (contextToken: any, controlId: string, pageId?: string) => void;
    runOnReadyStateComplete?: (contextToken: any, pageId: string, controlId: string) => void;
    runCustomOpenRecord?: (pageId: string, entityName: string, recordId: string, contextToken: any) => Promise<boolean>;
    handleOutputSchemaChange?: (newSchema: CustomControlInterfaces.IOutputSchemaMap) => any;
    getBoundFileObject?: (attributeName: string, entityReference: ControlAndClientApiInterfaces.LookupValue, pageId: string, contextToken: any) => any;
    retrieveLookupRecordsBySearchString?: (primaryEntityName: string, targets: string[], searchString: string) => Promise<CustomControlInterfaces.IDataRecord[]>;
    retrieveLookupRecordsByIds?: (primaryEntityName: string, targets: string[], selectedIds: string[]) => Promise<CustomControlInterfaces.IDataRecord[]>;
    fireManifestEvent?: (eventName: string) => void;
}
interface ICustomControlHostDispatchProps {
    propBagMethods: {
        navigation: INavigationDispatch;
        utils: IUtilsDispatch;
        device: IDeviceDispatch;
        mode: IModeDispatch;
    };
    actions: ICustomControlHostDispatchPropsActions;
}
interface ICustomControlHostRoot {
}
interface ICustomControlHostProps extends ICustomControlHostOwnProps, ICustomControlHostStateProps, ICustomControlHostDispatchProps {
}
interface ICustomControlWebClientWrapperProps {
    givenHostProps: ICustomControlHostProps;
    stylingTheme?: {
        theme: any;
        scopedSettings: any;
        useThemeProvider?: boolean;
    };
    setReRenderCallBack: (forceCcfUpdate: () => any) => any;
}
interface IFnODetails {
    Id?: string;
    TenantId?: string;
    Url?: string;
}
interface IClientData {
    orgSettingsData: ICustomControlExposedOrgSettings;
    languageCode: number;
    isRTL: boolean;
    showWeekNumber: boolean;
    locale: string;
    userAgent: CustomControlExposedUserAgent;
    formFactor: any;
    usePathBasedUrls: boolean;
    organizationUniqueName: string;
    disableScroll?: boolean;
    fnoDetails?: IFnODetails;
}
interface IFormattingData {
    timeZoneUtcOffsetMinutes?: number;
    dateTimeFormatInfo?: DateFormattingInfo;
    numberFormatInfo?: NumberFormattingInfo;
    timeZoneAdjusters?: CustomControlDependantInterfaces.ITimeZoneAdjusterState[];
    formatInfoCultureName?: string;
    formatter?: CustomControlDependantInterfaces.IFormatter;
    languagesByCode?: {
        [code: number]: string;
    };
    workDayStartTime?: string;
}
interface IResourceStringData {
    [stringId: string]: string;
}
interface IResourcesData {
    strings: IResourceStringData;
    stringsLoaded: boolean;
}
interface IAccessibilityData {
    assignedTabIndex: number;
    assignedTooltip?: string;
}
interface IUtilsData {
    encoder: CustomControlDependantInterfaces.IEncoder;
    dateTimeUtils: CustomControlDependantInterfaces.IDateTimeUtils;
    scheduleRender?: (render: () => void) => void;
    hasEntityPrivilege?: (entityTypeName: string, privilegeType: Constants.PrivilegeType, privilegeDepth: Constants.PrivilegeDepth) => boolean;
}
interface IModeData {
    entityTypeName: string;
    entityId: string;
    entityRecordName?: string;
    isOffline: boolean;
    isRead?: boolean;
    isAuthoringMode?: boolean;
}
interface IPageData {
    appId: string;
    isPageReadOnly: boolean;
}
interface IUtilsDispatch {
    setState(state: any): boolean;
    logMessage(customControlName: string, message: string, logType: number): void;
}
interface INavigationDispatch {
    openEditForm(entityReference: CustomControlEntityReference, processId?: string, processInstanceId?: string, selectedStageId?: string, isCrossEntityNavigate?: boolean, pageId?: string): void;
    openGridPage(entityTypeName: string, viewId?: string, showChart?: boolean, visualizationType?: number, visualizationId?: string, filterExpression?: string, chartDrillDownParameters?: CustomControlInterfaces.ChartDrillDownParameter[], viewType?: number, pageId?: string): void;
    openDashboard(id: string, pageId?: string): void;
    openCreateForm(logicalName: string, initialValues?: Dictionary, createFromEntity?: CustomControlEntityReference, pageId?: string): void;
    openSearch(query?: string, pageId?: string): void;
    openPowerBIFullScreenPage(powerBIEmbedUrl?: string, powerBIGroupId?: string, powerBIDashboardId?: string, powerBITileId?: string, powerBIReportId?: string, powerBIReportUrl?: string, powerBIComponentTypeCode?: string, pageId?: string): void;
    openUrl(url: string, options?: ControlAndClientApiInterfaces.WindowOptions, pageId?: string): void;
    openUrlWithProtocol(url: string, protocol: string, pageId?: string): void;
    openPhoneNumber(phoneNumber: string, to_etn: string, to_id: string, to_name: string, regarding_etn?: string, regarding_id?: string, regarding_name?: string, controlLogicalName?: string, contextToken?: any, openFormOnEnd?: boolean, executeGlobalHandler?: boolean, pageId?: string): void;
    openMaps(address: string, pageId?: string): void;
    openMap(address: string, pageId?: string): void;
}
interface IDeviceDispatch {
    isGetBarcodeValueOperationAvailable(): boolean;
    isTakePictureOperationAvailable(): boolean;
    isCaptureVideoOperationAvailable(): boolean;
    isCaptureAudioOperationAvailable(): boolean;
    isOpenARViewerAvailable(): boolean;
}
interface IModeDispatch {
    setNotification(message: string, id: string, pageId: string, controlName: string, contextToken: any, entityTypeName: string, entityId: string): boolean;
    clearNotification(pageId: string, controlName: string, contextToken: any, entityTypeName: string, entityId: string, id?: string): boolean;
}
interface IXrmProxy {
    Initialized: boolean;
    OrgSettings: ControlAndClientApiInterfaces.OrgSettings;
    UserSettings: ControlAndClientApiInterfaces.UserSettings;
    Offline: ControlAndClientApiInterfaces.Offline;
    Utils: ControlAndClientApiInterfaces.Utils;
    Page: ControlAndClientApiInterfaces.Page;
    Reporting: ControlAndClientApiInterfaces.Reporting;
    Diagnostics: ControlAndClientApiInterfaces.Diagnostics;
    Client: ControlAndClientApiInterfaces.Client;
    IntelligenceApi: ControlAndClientApiInterfaces.IntelligenceApi;
    GraphApi: ControlAndClientApiInterfaces.GraphApi;
    setUserSettings(userSettings: ControlAndClientApiInterfaces.UserSettings): void;
    setOrgSettings(orgSettings: ControlAndClientApiInterfaces.OrgSettings): void;
    setUtils(utils: ControlAndClientApiInterfaces.Utils): void;
    setOffline(offline: ControlAndClientApiInterfaces.Offline): void;
    setPage(page: ControlAndClientApiInterfaces.Page): void;
    setReporting(reporting: ControlAndClientApiInterfaces.Reporting): void;
    setDiagnostics(diagnostics: ControlAndClientApiInterfaces.Diagnostics): void;
    setNavigationContext(xrmNavigation: ControlAndClientApiInterfaces.Navigation): void;
    setClient(client: ControlAndClientApiInterfaces.Client): void;
    setExternalContext(xrmExternalContext: ControlAndClientApiInterfaces.ExternalContext): void;
    setDeviceContext(xrmDevice: ControlAndClientApiInterfaces.Device): void;
    setApplicationUI(applicationUI: ControlAndClientApiInterfaces.ApplicationUI): void;
    setWebApi(webApi: ControlAndClientApiInterfaces.WebApiSwitch): void;
    setIntelligenceApi(intelligenceApi: ControlAndClientApiInterfaces.IntelligenceApi): void;
    setGraphApi?(graphApi: ControlAndClientApiInterfaces.GraphApi): void;
}
interface IXrmObject {
    OrgSettings?: ControlAndClientApiInterfaces.OrgSettings;
    UserSettings?: ControlAndClientApiInterfaces.UserSettings;
    Offline?: ControlAndClientApiInterfaces.Offline;
    Utils?: ControlAndClientApiInterfaces.Utils;
    Page?: ControlAndClientApiInterfaces.Page;
    Reporting?: ControlAndClientApiInterfaces.Reporting;
    Diagnostics?: ControlAndClientApiInterfaces.Diagnostics;
    Client?: ControlAndClientApiInterfaces.Client;
    ApplicationUI?: ControlAndClientApiInterfaces.ApplicationUI;
    IntelligenceApi?: ControlAndClientApiInterfaces.IntelligenceApi;
    GraphApi?: ControlAndClientApiInterfaces.GraphApi;
    WebApi?: ControlAndClientApiInterfaces.WebApi;
    ExternalContext?: ControlAndClientApiInterfaces.ExternalContext;
    Navigation?: ControlAndClientApiInterfaces.Navigation;
    Device?: ControlAndClientApiInterfaces.Device;
}
interface IExternalUtils {
    xrmProxy: IXrmProxy;
    getPopupService(): IPopupService;
    forceUpdate(callback?: () => void): void;
    bindDOMElement(virtualComponent: VirtualComponent, DOMNode: Element): void;
    unbindDOMComponent(componentId: string): boolean;
    updateComponent(id: string, props: Dictionary): void;
    setGlobalCommandManagerPromise(promise: {
        promise: Promise<void>;
        resolve: () => void;
    }): void;
    getGlobalCommandManagerPromise(): {
        promise: Promise<void>;
        resolve: () => void;
    };
}
interface IHostData {
    allocatedHeight: number;
    allocatedWidth: number;
    updatedProperties: string[];
    isInSeeMoreMode: boolean;
    isInTopMostSeeMore: boolean;
    updateDescendantSeeMore(childSeeMoreStatus: boolean): void;
    trackResize(shouldTrack: boolean): void;
    updateFullscreen(isFullscreen: boolean, options?: CustomControlInterfaces.ISeeMoreDataExtended): void;
    ignoreUpdates(shouldIgnore: boolean): void;
}
interface IThemingData {
    shouldUseDesignSystem?: boolean;
    defaultThemingData: IDefaultThemingData;
    getEntityColor: (entityLogicalName: string) => string;
    fullScreenOverrideStyle?: ICCFContainerStyle;
}
interface IDefaultThemingData {
    normalfontfamily: string;
    normalfontcolor: string;
    normalfontsize: string;
    solidborderstyle: string;
    noneborderstyle: string;
    colors: IDefaultThemingDataColors;
    textbox: IDefaultThemingDataTextBox;
    spacings: IDefaultThemingDataSpacings;
    fontfamilies: IDefaultThemingDataFontFamilies;
    fontsizes: IDefaultThemingDataFontSizes;
    breakpoints: IDefaultThemingDataBreakpoints;
    measures: IDefaultThemingDataMeasures;
    lookup: IDefaultThemingDataLookup;
    borders: IDefaultThemingDataBorders;
    shadows: IDefaultThemingDataShadows;
    buttons: IDefaultThemingDataButtons;
}
interface IDefaultThemingDataButtons {
    button01primary: object;
    button01secondary: object;
    buttonprimarytext: object;
    buttonsecondarytext: object;
    actioniconbutton01: object;
    button02primary: object;
    button02secondary: object;
}
interface IDefaultThemingDataLookup {
    tagpadding: string;
    tagmargin: string;
    tagbackgroundcolor: string;
}
interface IDefaultThemingDataBorders {
    border01: string;
    border02: string;
    border03: string;
}
interface IDefaultThemingDataShadows {
    shadow01: string;
}
interface IDefaultThemingDataMeasures {
    measure025: string;
    measure050: string;
    measure075: string;
    measure100: string;
    measure125: string;
    measure150: string;
    measure175: string;
    measure200: string;
    measure225: string;
    measure250: string;
    measure300: string;
    measure350: string;
    measure400: string;
    measure450: string;
    measure500: string;
    measure550: string;
    measure600: string;
}
interface IDefaultThemingDataBreakpoints {
    dimensionxs: string;
    dimensions: string;
    dimensionm: string;
    dimensionl: string;
    dimensionxl: string;
}
interface IDefaultThemingDataFontSizes {
    xsfontsize: string;
    sfontsize: string;
    bfontsize: string;
    mfontsize: string;
    lfontsize: string;
    xlfontsize: string;
    font225: string;
    font200: string;
    font175: string;
    font150: string;
    font125: string;
    font115: string;
    font100: string;
    font085: string;
    font075: string;
}
interface IDefaultThemingDataFontFamilies {
    semilight: string;
    semibold: string;
    regular: string;
    bold: string;
}
interface IDefaultThemingDataSpacings {
    xshorizontal: string;
    shorizontal: string;
    bhorizontal: string;
    mhorizontal: string;
    lhorizontal: string;
    xlhorizontal: string;
    xxlhorizontal: string;
    xsvertical: string;
    svertical: string;
    bvertical: string;
    mvertical: string;
    lvertical: string;
    xlvertical: string;
    xxlvertical: string;
}
interface IDefaultThemingDataColors {
    whitebackground: string;
    defaulttheming: string;
    navbarshelf: string;
    header: string;
    globallink: string;
    selectedlinkeffect: string;
    hoverlinkeffect: string;
    processcontrol: string;
    defaultentity: string;
    defaultcustomentity: string;
    controlshade: string;
    controlborder: string;
    statustheme: IStatusColors;
    status: IDefaultThemingDataStatusColors;
    baseColor: IBaseColors;
    base: IDefaultThemingDataBaseColors;
    links: IDefaultThemingDataLinkColors;
    linkstheme: ILinkColors;
    grays: IDefaultThemingDataGrayColors;
}
interface IDefaultThemingDataGrayColors {
    gray01: string;
    gray02: string;
    gray03: string;
    gray04: string;
    gray05: string;
    gray06: string;
    gray07: string;
    gray08: string;
    gray09: string;
}
interface IDefaultThemingDataStatusColors {
    neutral: string;
    error: string;
    warning: string;
    success: string;
    info: string;
}
interface IDefaultThemingDataLinkColors {
    default: string;
    visited: string;
    disabled: string;
}
interface IDefaultThemingDataBaseColors {
    white: string;
    black: string;
    red: string;
    orange: string;
    yellow: string;
    green: string;
    blue: string;
    teal: string;
    purple: string;
}
interface IColor {
    Fill?: string;
    Text?: string;
}
interface IControlColor extends IColor {
    Stroke?: string;
}
interface ILinkColors {
    Normal?: IColor;
    Hover?: IColor;
    Visited?: IColor;
    Pressed?: IColor;
    Disabled?: IColor;
}
interface INavBarThemeColor {
    NavBar1?: IColor;
    NavBar2?: IColor;
    NavBar3?: IColor;
}
interface IAccentThemeColor {
    Accent1?: IColor;
    Accent2?: IColor;
    Accent3?: IColor;
}
interface IMainThemeColor {
    MainColor1?: IColor;
    MainColor2?: IColor;
    MainColor3?: IColor;
}
interface IBaseColorSet {
    BaseColor: string;
    lighter(Luminosity: number): string;
    darker(Luminosity: number): string;
}
interface IBaseColorSetStatic {
    [key: string]: string;
}
interface IBaseColors {
    Red?: IBaseColorSetStatic;
    Orange?: IBaseColorSetStatic;
    Yellow?: IBaseColorSetStatic;
    Green?: IBaseColorSetStatic;
    Blue?: IBaseColorSetStatic;
    Teal?: IBaseColorSetStatic;
    Purple?: IBaseColorSetStatic;
    Clay?: IBaseColorSetStatic;
    Pink?: IBaseColorSetStatic;
    Grey?: IBaseColorSetStatic;
    Violet?: IBaseColorSetStatic;
    White?: string;
    Black?: string;
    Transparent?: string;
    CalculateContrast?: Function;
}
interface IStatusColors {
    Alert1?: IColor;
    Alert2?: IColor;
    Priority1?: IColor;
    Priority2?: IColor;
    Priority3?: IColor;
    Positive1?: IColor;
    Positive2?: IColor;
    Info1?: IColor;
    Neutral1?: IColor;
}
interface IDefaultThemingDataTextBox {
    fonticonsize: string;
    fontweight: number;
    contentfontweight: number;
    fontsize: string;
    errorfontsize: string;
    spacing: string;
    containerspacing: string;
    rightmargin: string;
    lineheight: string;
    linethickness: string;
    errorlinethickness: string;
    horizontalpadding: string;
    verticalpadding: string;
    maxlength: number;
    labelcolor: string;
    contentcolor: string;
    linecolor: string;
    hoverboxcolor: string;
    backgroundcolor: string;
    errorbackgroundcolor: string;
    redcolor: string;
    bluecolor: string;
    restmodecolor: string;
}
export { IThemeMap, IThemeMapElement, IColor, IControlColor, ILinkColors, IAccentThemeColor, INavBarThemeColor, IMainThemeColor, IBaseColorSet, IBaseColorSetStatic, IBaseColors, IStatusColors, IDefaultThemingDataStatusColors, IDefaultThemingDataBaseColors, IDefaultThemingDataLinkColors, IDefaultThemingDataGrayColors, IAccessibilityData, IDynamicData, IClientData, IDefaultThemingDataButtons, IDefaultThemingDataLookup, IDefaultThemingDataBorders, IDefaultThemingDataShadows, IDefaultThemingDataMeasures, IDefaultThemingDataBreakpoints, IDefaultThemingDataFontSizes, IDefaultThemingDataFontFamilies, IDefaultThemingDataSpacings, IDefaultThemingDataColors, IDefaultThemingDataTextBox, IDefaultThemingData, IThemingData, IFormattingData, IResourceStringData, IResourcesData, IUtilsData, IModeData, IPageData, IUtilsDispatch, INavigationDispatch, IDeviceDispatch, IModeDispatch, IXrmObject, IXrmProxy, ICommonPropBagData, IPropBagData, ICommandManagerInitObject, ICustomControlHostRoot, ICustomControlHostOwnProps, ICustomControlHostWrapperProps, ICustomControlHostStateProps, ICustomControlHostDispatchPropsActions, ICustomControlHostDispatchProps, ICustomControlHostProps, ICustomControlWebClientWrapperProps, IExternalUtils, IHostData, IFnODetails, };
