/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */
import { DefaultFormattingData } from "./DefaultFormattingData";
import { DefaultThemingData } from "./DefaultThemingData";
/* eslint-disable @typescript-eslint/no-unused-vars */
export var DefaultClientData = {
    orgSettingsData: {
        isRTL: false,
        fiscalYearStartDate: new Date("2017-01-01T18:59:00.000Z"),
        fiscalPeriodFormat: 1,
        fiscalPeriodType: 2002,
        fiscalYearFormatYear: 1,
        fiscalYearFormatPrefix: 1,
        fiscalYearFormatSuffix: 3,
        fiscalYearDisplayCode: 1,
        fiscalPeriodConnector: "s",
        showWeekNumber: false,
        boundDashboardDefaultCardExpanded: false,
        organizationId: "{E534EEBD-1E20-4C07-894A-99CD76927368}",
        isActionCardEnabled: false,
        isEmailMonitoringAllowed: false,
        allowUnresolvedPartiesOnEmailSend: false,
    },
    languageCode: 1033,
    isRTL: false,
    showWeekNumber: false,
    locale: "en-US",
    userAgent: {
        isWin: true,
        isAndroid: false,
        isAndroidModern: false,
        isIos: false,
        isBrowserIE: false,
        isBrowserChrome: true,
        isBrowserFirefox: false,
    },
    usePathBasedUrls: false,
    organizationUniqueName: "OneFarm",
    disableScroll: false,
    formFactor: 2,
    fnoDetails: null,
};
export var DefaultUtilsData = {
    encoder: {
        CrmHtmlEncode: function () {
            return undefined;
        },
        CrmUrlEncode: function () {
            return undefined;
        },
    },
    dateTimeUtils: {
        getDSTAdjustmentMinutes: function (time, adjusters) {
            return 0;
        },
        getWeekOfYear: function (time, firstDayOfWeek, calendarWeekRule) {
            return 0;
        },
    },
    scheduleRender: function (render) {
        return undefined;
    },
    hasEntityPrivilege: function (entityTypeName, privilegeType, privilegeDepth) {
        return true;
    },
};
export var DefaultResourceData = {
    strings: {},
    stringsLoaded: true,
};
export var DefaultModeData = {
    entityTypeName: undefined,
    entityId: "4ff37e24-3c76-e711-8105-000d3aa167ac",
    entityRecordName: "A. Datum Corporation (sample)",
    isOffline: false,
};
export var DefaultPageData = {
    appId: "047efa7c-0976-e711-8104-000d3aa167ac",
    isPageReadOnly: false,
};
// Default IPropBagData data definition
export var DefaultHostPropBagData = {
    // ICommonPropBagData
    formattingData: DefaultFormattingData,
    clientData: DefaultClientData,
    utilsData: DefaultUtilsData,
    themingData: DefaultThemingData,
    // IPropBagData
    accessibilityData: {
        assignedTabIndex: 0,
        assignedTooltip: "Mock Tooltip",
    },
    resourcesData: DefaultResourceData,
    modeData: DefaultModeData,
    pageData: DefaultPageData,
};
/* eslint-enable @typescript-eslint/no-unused-vars */
//# sourceMappingURL=DefaultHostPropBagData.js.map