interface DataSetMetadata {
    primaryEntityMetadata: EntityMetadata;
    relatedEntityMetadata: Dictionary<EntityMetadata>;
}
interface EntityMetadata {
    displayName: string;
    logicalName: string;
    primaryNameAttribute: string;
    primaryImageAttribute: string;
    primaryIdAttribute: string;
    privilegesByType: Dictionary<CrmDescriptors.SecurityPrivilegeMetadata>;
    description: string;
    entityPluralName: string;
    metadata: Dictionary<AttributeMetadata>;
    attributeNames: string[];
}
interface Guid {
    readonly guid: string;
}
interface EntityReference {
    readonly etn: string;
    readonly id: Guid;
    readonly name?: string;
}
interface AttributeMetadata {
    DisplayName: string;
    LogicalName: string;
    RequiredLevel: RequiredLevel;
    IsSecured: boolean;
    IsReadable: boolean;
    IsEditable: boolean;
    SourceType: number;
    SourceTypeMask?: number;
    Description: string;
    Type: AttributeType | string;
    SupportedAggregations?: AggregationFunction[];
    CanBeGrouped?: boolean;
}
declare enum AttributeType {
    Boolean = "boolean",
    Unknown = "unknown",
    Customer = "customer",
    Date = "date",
    DateTime = "datetime",
    Decimal = "decimal",
    Double = "double",
    Image = "image",
    Integer = "integer",
    Lookup = "lookup",
    ManagedProperty = "managedproperty",
    Memo = "memo",
    Money = "money",
    Owner = "owner",
    PartyList = "partylist",
    PickList = "picklist",
    State = "state",
    Status = "status",
    String = "string",
    UniqueIdentifier = "uniqueidentifier",
    CalendarRules = "calendarrules",
    Virtual = "virtual",
    BigInt = "bigint",
    EntityName = "entityname",
    EntityImage = "entityimage",
    AliasedValue = "aliasedvalue",
    Regarding = "regarding",
    MultiSelectPickList = "multiselectpicklist",
    File = "file",
    NavigationProperty = "navigationproperty",
    RichText = "RichText"
}
interface NumberMetadata extends AttributeMetadata {
    MinValue: number;
    MaxValue: number;
    ImeMode: ImeMode;
}
interface StringMetadata extends AttributeMetadata {
    MaxLength: number;
    ImeMode: ImeMode;
    Format: StringMetadataFormat | string;
}
declare enum StringMetadataFormat {
    emailDescriptionFormat = "0",
    emailBodyFormat = "1",
    richTextFormat = "9"
}
interface FloatingNumberMetadata extends NumberMetadata {
    Precision: number;
}
interface DecimalNumberMetadata extends NumberMetadata {
    Precision: number;
}
interface WholeNumberMetadata extends NumberMetadata {
    Format: string;
    LanguageByCode?: Dictionary<string>;
    TimeZoneByCode?: Dictionary<string>;
}
interface DateTimeMetadata extends AttributeMetadata {
    Behavior: DateTimeFieldBehavior;
    Format: string;
    ImeMode: ImeMode;
    SupportedDateGroupings?: DateGrouping[];
}
interface LookupMetadata extends AttributeMetadata {
    Targets: string[];
    ReferencingFieldName?: string;
}
interface OptionSetMetadata extends AttributeMetadata {
    Options: OptionMetadata[];
    DefaultValue: number;
}
interface TwoOptionMetadata extends AttributeMetadata {
    Options: [OptionMetadata, OptionMetadata];
    DefaultValue: boolean;
}
interface OptionMetadata {
    Label: string;
    Value: number;
    Color: string;
}
declare type DateGrouping = "year" | "quarter" | "month" | "week" | "day" | "fiscal-period" | "fiscal-year";
declare type AggregationFunction = "avg" | "count" | "countcolumn" | "max" | "min" | "sum";
declare type RequiredLevel = -1 | 0 | 1 | 2 | 3;
declare type ImeMode = 0 | 1 | 2 | 3;
declare enum DateTimeFieldBehavior {
    None = 0,
    UserLocal = 1,
    DateOnly = 2,
    TimeZoneIndependent = 3
}
interface Dictionary<V> {
    [key: string]: V;
}
declare enum MoneyPrecisionSource {
    attribute = 0,
    organization = 1,
    currency = 2
}
declare type ControlAttributesType = "money" | "double" | "decimal" | "float" | "datetime" | "integer" | "picklist" | "state" | "status" | "boolean" | "string" | "lookup" | "memo" | "multiselectpicklist";
interface ControlAttributes {
    Type: ControlAttributesType | string;
    Precision?: number;
    PrecisionSource?: MoneyPrecisionSource;
    Format?: string;
    Behavior?: DateTimeFieldBehavior;
    OptionSet?: CustomControlInterfaces.IOptionDescriptor[];
}
export { DataSetMetadata, EntityMetadata, Guid, EntityReference, AttributeMetadata, NumberMetadata, StringMetadata, FloatingNumberMetadata, DecimalNumberMetadata, WholeNumberMetadata, ControlAttributesType, MoneyPrecisionSource, DateTimeMetadata, LookupMetadata, OptionMetadata, TwoOptionMetadata, OptionSetMetadata, AggregationFunction, DateGrouping, RequiredLevel, ImeMode, DateTimeFieldBehavior, Dictionary, ControlAttributes, AttributeType, StringMetadataFormat, };
