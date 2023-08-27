import { ManifestType } from "../../../Utilities/ManifestType";
var DEFAULT_ATTRIBUTES = {
    DisplayName: "",
    LogicalName: "",
    Type: "string",
    IsSecured: false,
    RequiredLevel: 0,
    MinValue: -100000000000,
    MaxValue: 100000000000,
    ImeMode: 0,
    MaxLength: 100,
    EntityLogicalName: "",
    Precision: 2,
    Format: "1",
    LanguageByCode: {},
    TimeZoneByCode: {},
    Behavior: 0,
    Targets: [],
    Options: null,
    DefaultValue: 1,
    lastUpdatedField: null,
    lastUpdatedValue: null,
    rollupStateField: null,
    rollupStateValue: 0,
    calculatedFieldValid: false,
    rollupValid: false,
    SourceType: null,
    recalculate: function () { },
};
function generateDefaultAttributeMetadata(type, overrides) {
    var typeSpecificAttributes = {};
    switch (type) {
        case ManifestType.SingleLineText:
            typeSpecificAttributes = {
                Format: "Text",
            };
            break;
        case ManifestType.SingleLineTextArea:
            typeSpecificAttributes = {
                Format: "TextArea",
            };
            break;
        case ManifestType.SingleLineEmail:
            typeSpecificAttributes = {
                Format: "Email",
            };
            break;
        case ManifestType.Multiple:
            typeSpecificAttributes = {
                Format: "2",
                Type: "memo",
                MaxLength: 2000,
            };
            break;
        case ManifestType.SingleLinePhone:
            typeSpecificAttributes = {
                Format: "Phone",
            };
            break;
        case ManifestType.SingleLineTickerSymbol:
            typeSpecificAttributes = {
                Format: "TickerSymbol",
                MaxLength: 10,
            };
            break;
        case ManifestType.SingleLineURL:
            typeSpecificAttributes = {
                Format: "Url",
            };
            break;
        case ManifestType.TwoOptions:
            typeSpecificAttributes = {
                DefaultValue: false,
                Type: "boolean",
                Options: [
                    {
                        Label: "No",
                        Value: 0,
                    },
                    {
                        Label: "Yes",
                        Value: 1,
                    },
                ],
            };
            break;
        case ManifestType.Decimal:
            typeSpecificAttributes = {
                Type: "decimal",
                MaxValue: 100000000000,
                MinValue: -100000000000,
            };
            break;
        case ManifestType.FP:
            typeSpecificAttributes = {
                Type: "double",
                MaxValue: 1000000000,
                MinValue: 0,
            };
            break;
        case ManifestType.Currency:
            typeSpecificAttributes = {
                Type: "money",
                MaxValue: 922337203685477,
                MinValue: -922337203685477,
            };
            break;
        case ManifestType.WholeNone:
            typeSpecificAttributes = {
                Type: "integer",
                MaxValue: 2147483647,
                MinValue: -2147483648,
                Precision: 0,
                Format: "0",
            };
            break;
        case ManifestType.DateAndTimeDateAndTime:
            typeSpecificAttributes = {
                Behavior: 3,
                Format: "datetime",
                Type: "datetime",
            };
            break;
        case ManifestType.DateAndTimeDateOnly:
            typeSpecificAttributes = {
                Behavior: 2,
                Format: "date",
                Type: "datetime",
            };
            break;
    }
    return Object.assign({}, DEFAULT_ATTRIBUTES, typeSpecificAttributes, overrides);
}
export { generateDefaultAttributeMetadata };
