var PopupType;
(function (PopupType) {
    PopupType[PopupType["Root"] = 1] = "Root";
    PopupType[PopupType["Nested"] = 2] = "Nested";
})(PopupType || (PopupType = {}));
var FormFactor;
(function (FormFactor) {
    FormFactor[FormFactor["None"] = 0] = "None";
    FormFactor[FormFactor["Slate"] = 1] = "Slate";
    FormFactor[FormFactor["Phone"] = 2] = "Phone";
    FormFactor[FormFactor["Desktop"] = 3] = "Desktop";
    FormFactor[FormFactor["MailApp"] = 4] = "MailApp";
})(FormFactor || (FormFactor = {}));
var supportedPrimitives = [
    "CRMICON",
    "ENTITYICON",
    "BOOLEAN",
    "BUTTON",
    "COMBOBOX",
    "CONTAINER",
    "HYPERLINK",
    "IMG",
    "FILEINPUT",
    "FLYOUT",
    "LABEL",
    "LIST",
    "LISTITEM",
    "LIVEPERSONACARDHOVERTARGET",
    "MICROSOFTICON",
    "POPUP",
    "SCROLLCONTAINER",
    "TABLE",
    "TABLEBODY",
    "TABLECAPTION",
    "TABLECELL",
    "TABLEFOOTER",
    "TABLEHEADER",
    "TABLEHEADERCELL",
    "TABLEROW",
    "TEXTINPUT",
    "IFRAME",
    "COMMANDBAR",
    "OPTION",
    "SELECT",
    "ENTITYIMAGE",
    "PROGRESSINDICATOR",
    "RADIO",
    "HORIZONTALSCROLL",
    "VIEWSELECTORCONTROL",
    "TEXT",
    "PRESENCEINDICATOR",
    "PLACEHOLDER",
];
export { FormFactor, PopupType, supportedPrimitives as SupportedPrimitives, };
