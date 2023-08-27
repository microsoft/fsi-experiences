var ManifestType = (function () {
    function ManifestType() {
    }
    ManifestType.TwoOptions = "TwoOptions";
    ManifestType.DateAndTimeDateOnly = "DateAndTime.DateOnly";
    ManifestType.DateAndTimeDateAndTime = "DateAndTime.DateAndTime";
    ManifestType.Decimal = "Decimal";
    ManifestType.FP = "FP";
    ManifestType.WholeNone = "Whole.None";
    ManifestType.WholeDuration = "Whole.Duration";
    ManifestType.WholeTimeZone = "Whole.TimeZone";
    ManifestType.WholeLanguage = "Whole.Language";
    ManifestType.LookupSimple = "Lookup.Simple";
    ManifestType.LookupCustomer = "Lookup.Customer";
    ManifestType.LookupOwner = "Lookup.Owner";
    ManifestType.LookupPartyList = "Lookup.PartyList";
    ManifestType.LookupRegarding = "Lookup.Regarding";
    ManifestType.LookupMultiEntity = "Lookup.MultiEntity";
    ManifestType.MultiSelectPicklist = "MultiSelectPicklist";
    ManifestType.Multiple = "Multiple";
    ManifestType.Currency = "Currency";
    ManifestType.Object = "Object";
    ManifestType.OptionSet = "OptionSet";
    ManifestType.StatusOptionSet = "StatusOptionSet";
    ManifestType.EntityNameOptionSet = "EntityNameOptionSet";
    ManifestType.SingleLineEmail = "SingleLine.Email";
    ManifestType.SingleLineText = "SingleLine.Text";
    ManifestType.SingleLineTextArea = "SingleLine.TextArea";
    ManifestType.SingleLineURL = "SingleLine.URL";
    ManifestType.SingleLineTickerSymbol = "SingleLine.Ticker";
    ManifestType.SingleLinePhone = "SingleLine.Phone";
    ManifestType.Grid = "Grid";
    ManifestType.BusinessProcessFlow = "BusinessProcessFlow";
    ManifestType.WebResourceHtmlControl = "WebResource.HTML";
    ManifestType.TimelineWall = "TimelineWall";
    ManifestType.QuickForm = "Form.QuickForm";
    ManifestType.Card = "Card";
    ManifestType.Dashboard = "Dashboard";
    ManifestType.Search = "Search";
    ManifestType.SearchWidget = "SearchWidget.SearchWidget";
    ManifestType.KbArticle = "KbArticle";
    ManifestType.KbContent = "KbContent";
    ManifestType.PowerBI = "PowerBI";
    ManifestType.MicrosoftFlow = "MicrosoftFlow";
    ManifestType.EmailEngagementRecipientActivity = "emailrecipientactivitycontrol";
    ManifestType.ReferencePanelSearchWidget = "SearchWidget.ReferencePanelSearchWidget";
    ManifestType.Timer = "Timer";
    ManifestType.SingleLineAddress = "SingleLine.Address";
    ManifestType.GlobalFilter = "GlobalFilter";
    ManifestType.AppliedFilters = "AppliedFilters";
    ManifestType.ReferencePanel = "ReferencePanel";
    ManifestType.EmailEngagementActions = "emailengagementactionscontrol";
    ManifestType.SocialInsightsControl = "SocialInsightsControl";
    ManifestType.File = "File";
    ManifestType.Image = "Image";
    ManifestType.ClassIdTypeMap = {
        "67fac785-cd58-4f9f-abb3-4b7ddc6ed5ed": "boolean",
        "b0c6723a-8503-4fd7-bb28-c8a06ac933c2": "boolean",
        "5b773807-9fb2-42db-97c3-7a91eff8adff": "datetime",
        "c3efe0c3-0ec6-42be-8349-cbd9079dfd8e": "decimal",
        "0a7ff475-b016-4687-9ce5-042bfdbd6519": "file",
        "0d2c745a-e5a8-4c8f-ba63-c6d3bb604660": "float",
        "7e548b0d-209c-477b-9dcd-f0f44472381d": "image",
        "aa987274-ce4e-4271-a803-66164311a958": "integer",
        "c6d124ca-7eda-4a60-aea9-7fb8d318b68f": "integer",
        "671a9387-ca5a-4d1e-8ab7-06e39ddcf6b5": "integer",
        "7c624a0b-f59e-493d-9583-638d34759266": "integer",
        "270bd3db-d9af-4782-9025-509e298dec0a": "lookup",
        "3246f906-1f71-45f7-b11f-d7be0f9d04c9": "lookup",
        "f3015350-44a2-4aa0-97b5-00166532b5e9": "lookup",
        "cbfb742c-14e7-4a17-96bb-1a13f7f64aa2": "partylist",
        "e0dece4b-6fc8-4a8f-a065-082708572369": "memo",
        "533b9e00-756b-4312-95a0-dc888637ac78": "money",
        "3ef39988-22bb-4f0b-bbbe-64b5a3748aee": "picklist",
        "5d68b988-0661-4db2-bc3e-17598ad3be6c": "status",
        "ada2203e-b4cd-49be-9ddf-234642b43b52": "text",
        "4273edbd-ac1d-40d3-9fb2-095c621b552d": "text",
        "8c10015a-b339-4982-9474-a95fe05631a5": "text",
        "71716b6c-711e-476c-8ab8-5d11542bfb47": "text",
        "1e1fc551-f7a8-43af-ac34-a8dc35c7b6d4": "text",
        "9c5ca0a1-ab4d-4781-be7e-8dfbe867b87e": "Timer",
    };
    ManifestType.ClassIdControlMap = {
        "fd2a7985-3187-444e-908d-6624b21f69c0": "iframe",
        "270bd3db-d9af-4782-9025-509e298dec0a": "lookup",
        "f3015350-44a2-4aa0-97b5-00166532b5e9": "regarding",
        "cbfb742c-14e7-4a17-96bb-1a13f7f64aa2": "partylist",
        "aa987274-ce4e-4271-a803-66164311a958": "duration",
        "c6d124ca-7eda-4a60-aea9-7fb8d318b68f": "integer",
        "0d2c745a-e5a8-4c8f-ba63-c6d3bb604660": "float",
        "533b9e00-756b-4312-95a0-dc888637ac78": "money",
        "c3efe0c3-0ec6-42be-8349-cbd9079dfd8e": "decimal",
        "ada2203e-b4cd-49be-9ddf-234642b43b52": "email",
        "6f3fb987-393b-4d2d-859f-9d0f0349b6ad": "emailbody",
        "4273edbd-ac1d-40d3-9fb2-095c621b552d": "text",
        "e0dece4b-6fc8-4a8f-a065-082708572369": "memo",
        "71716b6c-711e-476c-8ab8-5d11542bfb47": "url",
        "1e1fc551-f7a8-43af-ac34-a8dc35c7b6d4": "tickersymbol",
        "3ef39988-22bb-4f0b-bbbe-64b5a3748aee": "picklist",
        "5d68b988-0661-4db2-bc3e-17598ad3be6c": "status",
        "5b773807-9fb2-42db-97c3-7a91eff8adff": "datetime",
        "67fac785-cd58-4f9f-abb3-4b7ddc6ed5ed": "boolean",
        "b0c6723a-8503-4fd7-bb28-c8a06ac933c2": "boolean",
        "671a9387-ca5a-4d1e-8ab7-06e39ddcf6b5": "language",
        "e7a81278-8635-4d9e-8d4d-59480b391c5b": "subgrid",
        "7c624a0b-f59e-493d-9583-638d34759266": "timezone",
        "3246f906-1f71-45f7-b11f-d7be0f9d04c9": "connection",
        "821acf1a-7e46-4a0c-965d-fe14a57d78c7": "connectionroleojbjecttypecodelist",
        "9fdf5f91-88b1-47f4-ad53-c11efc01a01d": "webResourceHtml",
        "587cdf98-c1d5-4bde-8473-14a0bc7644a7": "webResourceImage",
        "080677db-86ec-4544-ac42-f927e74b491f": "webResourceSilverlight",
        "8c54228c-1b25-4909-a12a-f2b968bb0d62": "powerBITile",
        "06375649-c143-495e-a496-c962e5b4488e": "notes",
        "5c5600e0-1d6e-4205-a272-be80da87fd42": "quickformcollection",
        "b68b05f0-a46d-43f8-843b-917920af806a": "referencepanelquickformcollection",
        "02d4264b-47e2-4b4c-aa95-f439f3f4d458": "referencepanelsubgrid",
        "1f179106-fa28-4495-961e-f6bd93c21974": "interactionwall",
        "62b0df79-0464-470f-8af7-4483cfea0c7d": "bingmap",
        "86b9e25e-695e-4fef-ac69-f05cfa96739c": "socialInsight",
        "76b9e25e-695e-4fef-ac69-f05cfa96739c": "orgInsights",
        "9c5ca0a1-ab4d-4781-be7e-8dfbe867b87e": "timercontrol",
        "e616a57f-20e0-4534-8662-a101b5ddf4e0": "searchwidget",
        "03c5aed6-ee88-404e-b63c-4c53429c8bfb": "kbarticle",
        "1b9fc842-b45e-4fc1-b080-81e96b6d857f": "kbcontent",
        "7ccd1494-1f7a-4e3a-8bde-f32069daeb9f": "referencepanelsearchwidget",
        "ee9078c8-6946-4e2c-b8f8-35e65f4be6a8": "queuecontainer",
        "f130d8ae-ce5b-43c5-bed1-1a6a5856cf3d": "multiplepiechart",
        "6fae836f-fc01-48de-9b63-9b68a8fd86b8": "tagcontrol",
        "f9a8a302-114e-466a-b582-6771b2ae0d92": "customControl",
        "c8bfbbef-6851-4401-a0cc-7450062fe085": "aci",
        "8c10015a-b339-4982-9474-a95fe05631a5": "phone",
        "d2561f53-b292-42d9-b222-478e40ffe29f": "dashboard",
        "7c7059a6-74d9-4b02-80ad-19bc60426393": "search",
        "39354e4a-5015-4d74-8031-ea9eb73a1322": "label",
        "fff0e632-9d7b-4f21-bbc1-05d1567ad144": "globalfilter",
        "9c310a73-a360-42c5-8943-47a06f1b51ea": "appliedfilters",
        "7e548b0d-209c-477b-9dcd-f0f44472381d": "image",
        "0a7ff475-b016-4687-9ce5-042bfdbd6519": "file",
    };
    return ManifestType;
}());
export { ManifestType };
