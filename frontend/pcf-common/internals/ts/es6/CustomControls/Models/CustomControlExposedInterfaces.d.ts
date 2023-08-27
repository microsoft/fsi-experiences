import * as React from "react";
import { IPerformanceStopwatch, IKeyboardShortcut } from "./CustomControlDependantInterfaces";
import { CustomControlEntityReference } from "./CustomControlEntityReference";
import { VirtualComponent } from "../Components/VirtualComponent";
import { Dictionary } from "../Utilities/Dictionary";
import { FileObject } from "../../CommonComponents/File/FileObject";
import { DateTimeFieldBehavior, ControlAttributes } from "./CustomControlMetadataInterfaces";
import { ColorTokens } from "@fluentui/react-components";
declare type GetOutputSchemaAction<TParams> = (context: IPropBag<TParams>, authoringInputDictionary: IPropertyAuthoringInfoMap) => Promise<IOutputSchemaMap>;
interface CustomControl<TParams, TOutput> {
    getOutputSchema?: GetOutputSchemaAction<TParams>;
    getOutputs(): TOutput;
    destroy(): void;
    init(context: IPropBag<TParams>, notifyOutputChanged?: () => void, state?: Dictionary, container?: HTMLDivElement): void;
}
interface VirtualControl<TParams, TOutput> extends CustomControl<TParams, TOutput> {
    updateView(context: IPropBag<TParams>): CustomControlInterfaces.IVirtualComponent | React.ReactElement;
}
interface StandardControl<TParams, TOutput> extends CustomControl<TParams, TOutput> {
    updateView(context: IPropBag<TParams>): void;
}
interface ReactControl<TParams, TOutput> extends CustomControl<TParams, TOutput> {
    updateView(context: IPropBag<TParams>): React.ReactElement;
}
interface IPropertyAuthoringInfo {
    value: any;
    isAuthoringSource: boolean;
}
interface IPropertyAuthoringInfoMap {
    [propertyKey: string]: IPropertyAuthoringInfo;
}
interface IOutputSchemaMap {
    [propertyKey: string]: any;
}
interface IFetchXmlValueEncodeOptions {
    encloseWithWildcard?: boolean;
    encloseWithWildcardOption?: EncloseWithWildcardOption;
}
declare const enum EncloseWithWildcardOption {
    Front = 1,
    End = 2,
    Both = 3
}
interface IFormatting {
    formatDateShort(value: Date, includeTime?: boolean): string;
    formatDateLong(value: Date): string;
    formatDateLongAbbreviated(value: Date): string;
    formatDateYearMonth(value: Date): string;
    formatInteger(value: number): string;
    formatDecimal(value: number, precision?: number): string;
    formatCurrency(value: number, precision?: number, symbol?: string): string;
    getWeekOfYear(value: Date): number;
    getTimeZoneOffsetInMinutes(value: Date): number;
    formatTime(value: Date, behavior: CrmFramework.DateTimeFieldBehavior): string;
    formatDateAsFilterStringInUTC(value: Date, includeTime?: boolean): string;
    formatLanguage(value: number): string;
    formatUserDateTimeToUTC(userDateTime: Date, behavior?: DateTimeFieldBehavior): string;
    formatUTCDateTimeToUserDate(utcDateTime: string, behavior?: DateTimeFieldBehavior): Date;
    formatUserInput(input: unknown, controlAttributes: ControlAttributes): string;
    parseDateFromInput(input: string, controlAttributes: ControlAttributes): Date;
}
interface Component {
    getType(): string;
    getProperties(): any;
}
declare const enum RequiredLevel {
    Unknown = -1,
    None = 0,
    SystemRequired = 1,
    ApplicationRequired = 2,
    Recommended = 3
}
declare const enum ImeMode {
    Auto = 0,
    Inactive = 1,
    Active = 2,
    Disabled = 3
}
interface BaseAttributes {
    DisplayName: string;
    LogicalName: string;
    RequiredLevel: RequiredLevel;
    IsSecured: boolean;
    Type: string;
    SourceType: number;
    Description: string;
}
interface ActionCollection {
    actions?: (() => void)[];
    message: string;
}
interface BusinessRuleNotification {
    actions?: ActionCollection[];
    messages: string[];
    notificationLevel?: string;
    uniqueId?: string;
}
interface ControlNotifications {
    error: BusinessRuleNotification;
    recommendation: BusinessRuleNotification;
    information: BusinessRuleNotification;
}
interface SecurityValues {
    editable: boolean;
    readable: boolean;
    secured: boolean;
}
interface BaseProperty {
    type: string;
    raw: any;
    attributes?: BaseAttributes;
    formatted?: string;
    isPropertyLoading?: boolean;
    error: boolean;
    errorMessage: string;
    notifications?: ControlNotifications;
    security?: SecurityValues;
}
interface OptionSetValue {
    Label: string;
    Value: number;
    Color: string;
    accessibilityLabel?: string;
}
interface BaseNumberAttributes extends BaseAttributes {
    MinValue: number;
    MaxValue: number;
    ImeMode: ImeMode;
    lastUpdatedField: string;
    lastUpdatedValue: Date;
    rollupStateField: string;
    rollupStateValue: number;
    recalculate: () => void;
    rollupValid: boolean;
    calculatedFieldValid: boolean;
}
interface BaseStringAttributes extends BaseAttributes {
    MaxLength: number;
    ImeMode: ImeMode;
}
interface DecimalNumberAttributes extends BaseNumberAttributes {
    Precision: number;
}
interface WholeNumberAttributes extends BaseNumberAttributes {
    Format: string;
    LanguageByCode?: Dictionary;
    TimeZoneByCode?: Dictionary;
}
interface DateTimeAttributes extends BaseAttributes {
    behavior: string;
    format: string;
    imeMode: ImeMode;
    lastUpdatedField: string;
    lastUpdatedValue: Date;
    rollupStateField: string;
    rollupStateValue: number;
    recalculate: () => void;
    rollupValid: boolean;
    calculatedFieldValid: boolean;
}
interface LookupAttributes extends BaseAttributes {
    targets: string[];
}
interface SingleLineAttributes extends BaseStringAttributes {
    Format: string;
}
interface OptionSetAttributes extends BaseAttributes {
    Options: OptionSetValue[];
    DefaultValue: number;
}
interface TwoOptionAttributes extends BaseAttributes {
    Options: OptionSetValue[];
    DefaultValue: boolean;
}
interface RollupControlAttributes extends BaseAttributes {
    rollupStateValue: number;
    lastUpdatedValue: Date;
    recalculate(): void;
}
interface FileAttributes extends BaseNumberAttributes {
    Timestamp?: number;
}
interface NumberProperty extends BaseProperty {
    raw: number;
    attributes?: BaseNumberAttributes;
}
interface DecimalNumberProperty extends NumberProperty {
    attributes?: DecimalNumberAttributes;
}
interface WholeNumberProperty extends NumberProperty {
    attributes?: WholeNumberAttributes;
}
interface DateTimeProperty extends BaseProperty {
    raw: Date;
    attributes?: DateTimeAttributes;
}
interface StringProperty extends BaseProperty {
    raw: string;
    attributes?: BaseStringAttributes;
}
interface SingleLineProperty extends StringProperty {
    attributes?: SingleLineAttributes;
}
interface EnumProperty<Type> {
    raw: Type;
    type: string;
}
interface OptionSetProperty extends BaseProperty {
    raw: number;
    attributes?: OptionSetAttributes;
}
interface MultiSelectOptionSetProperty extends BaseProperty {
    raw: number[];
    attributes?: OptionSetAttributes;
}
interface TwoOptionsProperty extends BaseProperty {
    raw: boolean;
    attributes?: TwoOptionAttributes;
}
interface FileProperty extends BaseProperty {
    raw: FileObject;
    attributes?: FileAttributes;
}
interface TimerProperty extends BaseProperty {
    timerParameters: ITimerParameter;
}
interface ITimerParameter {
    CancelConditionName: string;
    CancelConditionValue: string;
    FailureTimeField: string;
    FailureConditionName: string;
    FailureConditionValue: string;
    PauseConditionName: string;
    PauseConditionValue: string;
    SuccessConditionName: string;
    SuccessConditionValue: string;
    WarningConditionName: string;
    WarningConditionValue: string;
}
declare enum PopupType {
    Root = 1,
    Nested = 2
}
declare enum FormFactor {
    None = 0,
    Slate = 1,
    Phone = 2,
    Desktop = 3,
    MailApp = 4
}
interface IPopupProps {
    id?: string;
    name: string;
    closeOnOutsideClick?: boolean;
    popupStyle?: CustomControlInterfaces.ICCFStyle;
    shadowStyle?: CustomControlInterfaces.ICCFStyle;
    popupToOpen?: string;
    type: PopupType;
    content: HTMLElement;
    disableAutoAccessibility?: boolean;
}
interface IPopupService {
    createPopup(props: IPopupProps): void;
    openPopup(name: string): void;
    closePopup(name: string): void;
    updatePopup(name: string, newProps: IPopupProps): void;
    deletePopup(name: string): void;
    getPopups(): JSX.Element[];
    setPopupsId(id: string): void;
    getPopupsId(): string;
}
interface IUtility extends ControlAndClientApiInterfaces.Utils, ControlAndClientApiInterfaces.ApplicationUI {
    createPerformanceMarker(id: string, logLevel?: CustomControlInterfaces.TracerLogLevel): void;
    createPerformanceStopwatch(id: string, logLevel?: CustomControlInterfaces.TracerLogLevel): IPerformanceStopwatch;
    log(customControlName: string, message: string, logType: number): void;
    bindDOMElement(virtualComponent: VirtualComponent, DOMNode: Element): void;
    clearNotification(id: string): boolean;
    createCrmUri(url: string): string;
    createServerUri(url: string): string;
    crmUrlEncode(s: string): string;
    crmHtmlEncode(s: string): string;
    disablePanoramaScroll(value: boolean): boolean;
    eventListenerExists(eventName: string): boolean;
    fireEvent(eventName: string, params: any): void;
    getControlDefaultMapping(dataType: string): string;
    getElementByRef(refId: string): Element;
    getPopupService(): IPopupService;
    getServiceUri(service: string): string;
    hasEntityPrivilege(entityTypeName: string, privilegeType: Constants.PrivilegeType, privilegeDepth: Constants.PrivilegeDepth): boolean;
    isNullOrUndefined(object: any): boolean;
    notifyOutputChanged(): void;
    openInBrowser(url: string): void;
    requestRender(callback?: () => void): void;
    scrollToView(controlContainer: any): void;
    setNotification(msg: string, id: string): boolean;
    setState(state: any): boolean;
    triggerOfflineMetadataSync(): Promise<void>;
    unbindDOMComponent(componentId: string): boolean;
    updateComponent(id: string, props: Dictionary): void;
    retrieveFormWithAttributes(entityName: string, formId?: string, formType?: string): Promise<any>;
    retrieveChartDrilldownAttributes(etn: string): Promise<any>;
    getEntityName(entityTypeCode: number): string;
    retrieveRecordCommand(allRecords: {
        [id: string]: CustomControlInterfaces.DataSetRecord;
    }, commandManagerId: string, records: string[], commandButtonIds?: string[], filterByPriority?: boolean, useNestedFormat?: boolean): Promise<CustomControlInterfaces.ICommandObjectWrapper[]>;
    doesControlExist(customControlName: string): Promise<boolean>;
    encodeFilterString(filterValueString: string, encodeOptions: IFetchXmlValueEncodeOptions): string;
    getUserSettings(): Promise<ControlAndClientApiInterfaces.UserSettings>;
}
interface IResources {
    getResource(id: string, success: (data: string) => void, failure: () => void): void;
    getString(id: string): string;
}
interface IPerformance {
}
declare type PrimitiveControls = "Boolean" | "ComboBox" | "Container" | "Hyperlink" | "Img" | "Label" | "List" | "ListItem" | "LivePersonaCardHoverTarget" | "MicrosoftIcon" | "Popup" | "ScrollContainer" | "TextInput" | "IFRAME" | "CommandBar" | "Option" | "Select" | "EntityImage" | "PROGRESSINDICATOR" | "HorizontalScroll" | "PresenceIndicator" | "PLACEHOLDER";
declare const supportedPrimitives: string[];
interface IFactory {
    createElement(type: string, properties: CustomControlInterfaces.IVirtualComponentProps, children?: any): CustomControlInterfaces.IVirtualComponent;
    createComponent(type: PrimitiveControls, id: string, properties: any): CustomControlInterfaces.IVirtualComponent;
    bindDOMElement(virtualComponent: VirtualComponent, DOMNode: Element): void;
    bindDOMComponent(virtualComponent: VirtualComponent, DOMNode: Element): void;
    fireEvent(eventName: string, params: any): void;
    getControlDefaultMapping(dataType: string): string;
    requestRender(callback?: () => void): void;
    unbindDOMComponent(componentId: string): boolean;
    updateComponent(id: string, props: Dictionary): void;
}
interface ICustomControlExposedOrgSettings {
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
    organizationId: string;
    isActionCardEnabled: boolean;
    isEmailMonitoringAllowed: boolean;
    allowUnresolvedPartiesOnEmailSend: boolean;
    webResourceHash?: string;
    enableBingMapsIntegration?: boolean;
    bingMapsApiKey?: string;
    availableBingMapLocales?: string;
    excludedCountriesForMaps?: string;
    bFDatacenter?: boolean;
    securitySettingForEmail?: number;
    appointmentRichEditorExperience?: boolean;
    gridTotalRecordCountLimit?: number;
    lookupCharacterCountBeforeResolve?: number;
    lookupResolveDelayMS?: number;
    advancedLookupEnabled?: boolean;
    isCollaborationExperienceEnabled?: boolean;
    pcfDatasetGridEnabled?: string;
    allowUsersHidingSystemViews?: boolean;
}
interface DateFormattingInfo {
    AMDesignator: string;
    AbbreviatedDayNames: string[];
    AbbreviatedMonthGenitiveNames: string[];
    AbbreviatedMonthNames: string[];
    CalendarWeekRule: number;
    Calendar: Calendar;
    DateSeparator: string;
    DayNames: string[];
    FirstDayOfWeek: CrmFramework.DayOfWeek;
    FullDateTimePattern: string;
    LongDatePattern: string;
    LongTimePattern: string;
    MonthDayPattern: string;
    MonthGenitiveNames: string[];
    MonthNames: string[];
    PMDesignator: string;
    ShortDatePattern: string;
    ShortTimePattern: string;
    ShortestDayNames: string[];
    SortableDateTimePattern: string;
    TimeSeparator: string;
    UniversalSortableDateTimePattern: string;
    YearMonthPattern: string;
    amDesignator: string;
    abbreviatedDayNames: string[];
    abbreviatedMonthGenitiveNames: string[];
    abbreviatedMonthNames: string[];
    calendarWeekRule: number;
    calendar: Calendar;
    dateSeparator: string;
    dayNames: string[];
    firstDayOfWeek: CrmFramework.DayOfWeek;
    fullDateTimePattern: string;
    longDatePattern: string;
    longTimePattern: string;
    monthDayPattern: string;
    monthGenitiveNames: string[];
    monthNames: string[];
    pmDesignator: string;
    shortDatePattern: string;
    shortTimePattern: string;
    shortestDayNames: string[];
    sortableDateTimePattern: string;
    timeSeparator: string;
    universalSortableDateTimePattern: string;
    yearMonthPattern: string;
}
interface NumberFormattingInfo {
    CurrencyDecimalDigits: number;
    CurrencyDecimalSeparator: string;
    CurrencyGroupSeparator: string;
    CurrencyGroupSizes: number[];
    CurrencyNegativePattern: number;
    CurrencyPositivePattern: number;
    CurrencySymbol: string;
    NANSymbol: string;
    NativeDigits: string[];
    NegativeInfinitySymbol: string;
    NegativeSign: string;
    NumberDecimalDigits: number;
    NumberDecimalSeparator: string;
    NumberGroupSeparator: string;
    NumberGroupSizes: number[];
    NumberNegativePattern: number;
    PerMilleSymbol: string;
    PercentDecimalDigits: number;
    PercentDecimalSeparator: string;
    PercentGroupSeparator: string;
    PercentGroupSizes: number[];
    PercentNegativePattern: number;
    PercentPositivePattern: number;
    PercentSymbol: string;
    PositiveInfinitySymbol: string;
    PositiveSign: string;
    currencyDecimalDigits: number;
    currencyDecimalSeparator: string;
    currencyGroupSeparator: string;
    currencyGroupSizes: number[];
    currencyNegativePattern: number;
    currencyPositivePattern: number;
    currencySymbol: string;
    nanSymbol: string;
    nativeDigits: string[];
    negativeInfinitySymbol: string;
    negativeSign: string;
    numberDecimalDigits: number;
    numberDecimalSeparator: string;
    numberGroupSeparator: string;
    numberGroupSizes: number[];
    numberNegativePattern: number;
    perMilleSymbol: string;
    percentDecimalDigits: number;
    percentDecimalSeparator: string;
    percentGroupSeparator: string;
    percentGroupSizes: number[];
    percentNegativePattern: number;
    percentPositivePattern: number;
    percentSymbol: string;
    positiveInfinitySymbol: string;
    positiveSign: string;
}
interface Calendar {
    MinSupportedDateTime: Date;
    MaxSupportedDateTime: Date;
    AlgorithmType: number;
    CalendarType: number;
    Eras: number[];
    TwoDigitYearMax: number;
    IsReadOnly: boolean;
    minSupportedDateTime: Date;
    maxSupportedDateTime: Date;
    algorithmType: number;
    calendarType: number;
    eras: number[];
    twoDigitYearMax: number;
    isReadOnly: boolean;
}
interface CustomControlExposedUserAgent {
    isWin: boolean;
    isAndroid: boolean;
    isAndroidModern: boolean;
    isIos: boolean;
    isBrowserIE: boolean;
    isBrowserChrome: boolean;
    isBrowserFirefox: boolean;
}
interface AccessibilityInternalData {
    keyboardShortcuts: any;
}
interface IClient extends ControlAndClientApiInterfaces.Client {
    isPreview: boolean;
    formFactor: FormFactor;
    userAgent: CustomControlExposedUserAgent;
    languageCode: string;
    isRTL: boolean;
    locale: string;
    orgSettings: ICustomControlExposedOrgSettings;
    dateFormattingInfo: DateFormattingInfo;
    numberFormattingInfo: NumberFormattingInfo;
    userTimeZoneUtcOffsetMinutes: number;
    allocatedWidth: number;
    allocatedHeight: number;
    disableScroll: boolean;
    trackContainerResize(value: boolean): void;
    getUserTimeZoneUtcOffset(d: Date): number;
    setFullscreen(value: boolean): void;
    setFullScreen(value: boolean): void;
    ignoreSelfUpdates(value: boolean): void;
    isOffline(): boolean;
}
interface IAccessibility {
    assignedTabIndex: number;
    assignedTooltip?: string;
    isHighContrastEnabled: boolean;
    registerShortcut(keyCombination: number[], shortcutHandler: (event: KeyboardEvent) => void, isGlobal: boolean, areaName: string, shortcutDescription: string, srcElementId?: string): void;
    getUniqueId(id: string): string;
    focusElementById(id: string, isAbsoluteId?: boolean): void;
    blurElementById(id: string, isAbsoluteId?: boolean): void;
}
interface IMode {
    isControlDisabled: boolean;
    isRead: boolean;
    isPreview: boolean;
    isAuthoringMode: boolean;
    isOffline: boolean;
    isVisible: boolean;
    label: string;
    fullPageParams?: any;
    isActive: boolean;
    hasFocus: boolean;
    contextInfo: IContextInfo;
    rowSpan: number;
    accessibilityLabel?: string;
    allocatedWidth: number;
    allocatedHeight: number;
    blur: () => void;
    focus: () => void;
    trackContainerResize(value: boolean): void;
    setNotification(message: string, id: string): boolean;
    clearNotification(id?: string): boolean;
    setControlState(state: any, globalSetting?: boolean): boolean;
    setFullScreen(value: boolean, options?: CustomControlInterfaces.ISeeMoreDataExtended): void;
    requestAlwaysRender(value: boolean): void;
}
interface IPage extends ControlAndClientApiInterfaces.Page {
    appId: string;
    entityTypeName: string;
    entityId: string;
    isPageReadOnly: boolean;
}
interface ILearningPath {
    DOMAttributeName: string;
    baseControlId: string;
}
interface ICommunicationChannel {
    getPresenceMappedField(entityName: string): string;
    isPresenceEnabled(entityName: string): boolean;
}
interface IContextInfo {
    entityTypeName: string;
    entityId: string;
    entityRecordName?: string;
}
interface IOrgSettings extends ControlAndClientApiInterfaces.OrgSettings {
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
}
interface IUserSettings extends ControlAndClientApiInterfaces.UserSettings {
    dateFormattingInfo: DateFormattingInfo;
    numberFormattingInfo: NumberFormattingInfo;
    workDayStartTime: string;
}
interface INavigation extends ControlAndClientApiInterfaces.Navigation {
    openGridPage(entityTypeName: string, viewId?: string, showChart?: boolean, visualizationId?: string, filterExpression?: string, pageId?: string): void;
    openGrid(entityTypeName: string, viewId?: string, showChart?: boolean, visualizationType?: number, visualizationId?: string, filterExpression?: string, chartDrillDownParameters?: CustomControlInterfaces.ChartDrillDownParameter[], viewType?: number, pageId?: string): void;
    openDashboard(id: string, pageId?: string): void;
    openCreateForm(logicalName: string, initialValues?: Dictionary, createFromEntity?: CustomControlEntityReference, pageId?: string): void;
    openSearch(query?: string, pageId?: string): void;
    openPowerBIFullScreenPage(powerBIEmbedUrl?: string, powerBIGroupId?: string, powerBIDashboardId?: string, powerBITileId?: string, powerBIReportId?: string, powerBIReportUrl?: string, powerBIComponentTypeCode?: string, pageId?: string): void;
    openUrlWithProtocol(url: string, protocol: string, pageId?: string): void;
    openPhoneNumber(phoneNumber: string, useForm?: boolean, passedEtn?: string, passedId?: string, passedName?: string, executeGlobalHandler?: boolean, pageId?: string): void;
    openMaps(address: string, pageId?: string): void;
    openMap(address: string, pageId?: string): void;
}
interface IDevice {
    captureImage(options?: ControlAndClientApiInterfaces.CaptureImageOptions): Promise<ControlAndClientApiInterfaces.FileObject>;
    captureAudio(options?: ControlAndClientApiInterfaces.CaptureAudioOptions): Promise<ControlAndClientApiInterfaces.FileObject>;
    captureVideo(options?: ControlAndClientApiInterfaces.CaptureVideoOptions): Promise<ControlAndClientApiInterfaces.FileObject>;
    pickFile(options?: ControlAndClientApiInterfaces.PickFileOptions): Promise<ControlAndClientApiInterfaces.FileObject[]>;
    getBarcodeValue(): Promise<string>;
    isGetBarcodeValueOperationAvailable(): boolean;
    isTakePictureOperationAvailable(): boolean;
    isCaptureVideoOperationAvailable(): boolean;
    isCaptureAudioOperationAvailable(): boolean;
    getCurrentPosition(): Promise<ControlAndClientApiInterfaces.Position>;
    isOpenARViewerAvailable(): boolean;
    openARViewer(options: ControlAndClientApiInterfaces.ARViewerOptions): Promise<string>;
}
interface IExternalContext {
    getAvailableExternalContexts(): Collection.ItemCollection<ControlAndClientApiInterfaces.ExternalContextDescriptor>;
    getExternalContextProperty(externalContextId: string, externalContextPropertyId: string, options?: ControlAndClientApiInterfaces.ExternalContextPropertyOptions): Promise<ControlAndClientApiInterfaces.ExternalContextSuccessResponse>;
    invokeExternalContextAction(externalContextId: string, externalContextActionId: string, options?: ControlAndClientApiInterfaces.ExternalContextActionOptions): Promise<ControlAndClientApiInterfaces.ExternalContextSuccessResponse>;
    removeExternalContextPropertyListener(externalContextId: string, externalContextPropertyId: string, listener: ControlAndClientApiInterfaces.ExternalContextPropertyListener): void;
}
interface IThemingBagLookup {
    tagpadding: string;
    tagmargin: string;
    tagbackgroundcolor: string;
}
interface IThemingBagBorders {
    border01: string;
    border02: string;
    border03: string;
}
interface IThemingBagShadows {
    shadow01: string;
}
interface IThemingBagMeasures {
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
interface IThemingBagBreakpoints {
    dimensionxs: string;
    dimensions: string;
    dimensionm: string;
    dimensionl: string;
    dimensionxl: string;
}
interface IThemingBagFontSizes {
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
interface IThemingBagFontFamilies {
    semilight: string;
    semibold: string;
    regular: string;
    bold: string;
}
interface IThemingBagSpacings {
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
interface IThemingBagColors {
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
    status: IThemingBagStatusColors;
    base: IThemingBagBaseColors;
    links: IThemingBagLinkColors;
    grays: IThemingBagGrayColors;
}
interface IThemingBagGrayColors {
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
interface IThemingBagLinkColors {
    default: string;
    visited: string;
    disabled: string;
}
interface IThemingBagBaseColors {
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
interface IThemingBagStatusColors {
    neutral: string;
    error: string;
    warning: string;
    success: string;
    info: string;
}
interface IThemingBagTextBox {
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
interface IThemingBag {
    normalfontfamily: string;
    normalfontcolor: string;
    normalfontsize: string;
    solidborderstyle: string;
    noneborderstyle: string;
    colors: IThemingBagColors;
    textbox: IThemingBagTextBox;
    spacings: IThemingBagSpacings;
    fontfamilies: IThemingBagFontFamilies;
    fontsizes: IThemingBagFontSizes;
    breakpoints: IThemingBagBreakpoints;
    measures: IThemingBagMeasures;
    lookup: IThemingBagLookup;
    borders: IThemingBagBorders;
    shadows: IThemingBagShadows;
    disableUiTransitions(): void;
    rightAlignEdit(): void;
    inlineLayout(val: boolean): void;
    getEntityColor(entityLogicalName: string): string;
}
interface IConnectors {
    readonly [name: string]: IConnector;
}
interface IConnector {
    readonly [name: string]: IConnectorAction<any, any>;
}
declare type IConnectorAction<TArgs, TResult> = (args: TArgs) => Promise<TResult>;
interface IPropBag<T> {
    parameters: T;
    accessibility: IAccessibility;
    client: IClient;
    formatting: IFormatting;
    factory: IFactory;
    mode: IMode;
    connectors: IConnectors;
    navigation: INavigation;
    reporting: ControlAndClientApiInterfaces.Reporting;
    diagnostics: IDiagnostics;
    intelligenceApi: ControlAndClientApiInterfaces.IntelligenceApi;
    resources: IResources;
    performance: IPerformance;
    theming: IThemingBag;
    utils: IUtility;
    webAPI: ControlAndClientApiInterfaces.WebApi;
    graphApi: ControlAndClientApiInterfaces.GraphApi;
    orgSettings: IOrgSettings;
    userSettings: IUserSettings;
    offline: ControlAndClientApiInterfaces.Offline;
    children?: any;
    decorators?: CustomControlInterfaces.IDecorators;
    refs?: {
        [ref: string]: any;
    };
    updatedProperties: string[];
    page: IPage;
    device: IDevice;
    externalContext: IExternalContext;
    learningPath: ILearningPath;
    communicationChannel: ICommunicationChannel;
    design: IDesignBag | IFluentDesignBag;
    events: IEventBag;
}
interface IEventBag {
    [eventName: string]: () => void;
}
interface IDesignBase {
    DesignLanguageId: string;
    ThemeId: string;
}
interface IDesignBag extends IDesignBase {
    [key: string]: string;
}
interface IFluentDesignBag extends IDesignBase, ColorTokens {
}
interface IEventParameter {
    name: string;
    value: string | number | Date | boolean;
}
interface IDiagnostics {
    isInMonitorSession(): boolean;
    traceError(componentName: string, message: string, parameters?: IEventParameter[], keepOriginalContent?: boolean): void;
    traceWarning(componentName: string, message: string, parameters?: IEventParameter[], keepOriginalContent?: boolean): void;
    traceInfo(componentName: string, message: string, parameters?: IEventParameter[], keepOriginalContent?: boolean): void;
    traceDebug(componentName: string, message: string, parameters?: IEventParameter[], keepOriginalContent?: boolean): void;
}
interface IAccessibilityComponentWrapperProps {
    id: string;
    keyboardShortcuts?: IKeyboardShortcut[];
    parentComponent?: React.Component<any, any>;
    rootElementId?: string;
    shouldManageFocus?: boolean;
}
interface IDataSetExposedParameter extends CustomControlInterfaces.IDataSet, CustomControlInterfaces.IDataSetData, CustomControlInterfaces.IDataSetNeededByLegacy {
    error: boolean;
    errorMessage: string;
    innerError?: string;
    loading: boolean;
    columns: IDataSetExposedColumn[];
    sortedRecordIds: string[];
    records: {
        [id: string]: IDataSetExposedRecord;
    };
    sorting: IDataSetExposedColumnSortStatus[];
    filtering: IDataSetExposedFiltering;
    paging: IDataSetExposedPaging;
    linking: IDataSetExposedLinking;
    addColumn?: (name: string, entityAlias?: string) => void;
    refresh(): void;
    getViewId(): string;
    getTargetEntityType(): string;
    getTitle(): string;
    retrieveRecordCommand(recordIds: string[], specificCommands?: string[], filterByPriority?: boolean, useNestedFormat?: boolean): Promise<CustomControlInterfaces.ICommandObjectWrapper[]>;
    openDatasetItem(entityReference: CustomControlInterfaces.CustomControlEntityReference): void;
    setSelectedRecordIds(ids: string[]): void;
    getSelectedRecordIds(): string[];
    clearSelectedRecordIds(): void;
}
interface IDataSetExposedColumn extends CustomControlInterfaces.IDataSetColumn {
    name: string;
    displayName: string;
    dataType: string;
    alias: string;
    order: number;
    visualSizeFactor: number;
    isHidden?: boolean;
    imageProviderWebresource?: string;
    imageProviderFunctionName?: string;
    isPrimary?: boolean;
    disableSorting?: boolean;
}
interface IDataSetExposedRecord extends CustomControlInterfaces.IDataSetRecord {
    getRecordId(): string;
    getValue(columnName: string): string | Date | number | boolean | ControlAndClientApiInterfaces.LookupValue[];
    getNamedReference(): CustomControlInterfaces.CustomControlEntityReference;
}
interface IDataSetExposedColumnSortStatus extends CustomControlInterfaces.IDataSetColumnSortStatus {
    name: string;
    sortDirection: CustomControlInterfaces.ColumnSortDirection;
}
interface IDataSetExposedFiltering extends CustomControlInterfaces.IDataSetFiltering {
    getFilter(): IExposedFilterExpression;
    setFilter(expression: IExposedFilterExpression): void;
    clearFilter(): void;
}
interface IExposedFilterExpression extends CustomControlInterfaces.IFilterExpression {
    hint?: string;
    conditions: CustomControlInterfaces.ConditionExpression[];
    filterOperator: CustomControlInterfaces.FilterOperator;
    filters?: IExposedFilterExpression[];
}
interface IDataSetExposedPaging extends CustomControlInterfaces.IDataSetPaging, CustomControlInterfaces.DataSetPagingData {
    totalResultCount: number;
    firstPageNumber: number;
    lastPageNumber: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageNumber?: number;
    loadNextPage(loadOnlyNewPage?: boolean): void;
    loadPreviousPage(loadOnlyNewPage?: boolean): void;
    reset(): void;
    setPageSize(pageSize: number): void;
    loadExactPage(pageNumber: number): void;
}
interface IDataSetExposedLinking extends CustomControlInterfaces.IDataSetLinking {
    getLinkedEntities(): ILinkEntityExposedExpression[];
    addLinkedEntity(expression: ILinkEntityExposedExpression): void;
}
interface ILinkEntityExposedExpression extends CustomControlInterfaces.ILinkEntityExpression {
    name: string;
    from: string;
    to: string;
    linkType: string;
    alias: string;
}
export { Component, FormFactor, Calendar, IOrgSettings, ICustomControlExposedOrgSettings, CustomControlExposedUserAgent, DateFormattingInfo, NumberFormattingInfo, AccessibilityInternalData, IAccessibility, IAccessibilityComponentWrapperProps, IClient, IUserSettings, PrimitiveControls, IFormatting, IContextInfo, IMode, IConnectors, IConnector, IConnectorAction, IPage, ICommunicationChannel, ILearningPath, INavigation, IDevice, IEventParameter, IDiagnostics, IExternalContext, IResources, IPerformance, IDesignBag, IFluentDesignBag, IThemingBagLookup, IThemingBagBorders, IThemingBagShadows, IThemingBagMeasures, IThemingBagBreakpoints, IThemingBagFontSizes, IThemingBagFontFamilies, IThemingBagSpacings, IThemingBagGrayColors, IThemingBagLinkColors, IThemingBagBaseColors, IThemingBagStatusColors, IThemingBagColors, IThemingBagTextBox, IThemingBag, PopupType, IPopupProps, IPopupService, IFactory, IUtility, IPropBag, CustomControl, VirtualControl, StandardControl, ReactControl, supportedPrimitives as SupportedPrimitives, IDataSetExposedColumn, IDataSetExposedRecord, IDataSetExposedColumnSortStatus, IExposedFilterExpression, IDataSetExposedFiltering, IDataSetExposedPaging, ILinkEntityExposedExpression, IDataSetExposedLinking, IDataSetExposedParameter, IDataSetExposedParameter as IDataSet, RequiredLevel, BaseAttributes, ActionCollection, BusinessRuleNotification, SecurityValues, ImeMode, ControlNotifications, ITimerParameter, BaseProperty, TimerProperty, OptionSetValue, TwoOptionAttributes, TwoOptionsProperty, OptionSetAttributes, MultiSelectOptionSetProperty, OptionSetProperty, EnumProperty, BaseStringAttributes, SingleLineAttributes, StringProperty, SingleLineProperty, DateTimeAttributes, DateTimeProperty, BaseNumberAttributes, WholeNumberAttributes, NumberProperty, WholeNumberProperty, DecimalNumberAttributes, DecimalNumberProperty, RollupControlAttributes, LookupAttributes, IFetchXmlValueEncodeOptions, EncloseWithWildcardOption, IEventBag, FileProperty, };
