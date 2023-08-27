var OrgSettings = (function () {
    function OrgSettings(customControlProperties, externalUtils) {
        var customControlExposedOrgSettings = customControlProperties.propBagData.clientData.orgSettingsData;
        var xrmOrgSettings = externalUtils.xrmProxy.OrgSettings;
        this.languageId = xrmOrgSettings.languageId;
        this.attributes = xrmOrgSettings.attributes;
        this.uniqueName = xrmOrgSettings.uniqueName;
        this.isAutoSaveEnabled = xrmOrgSettings.isAutoSaveEnabled;
        this.isRTL = customControlExposedOrgSettings.isRTL;
        this.fiscalYearStartDate = customControlExposedOrgSettings.fiscalYearStartDate;
        this.fiscalPeriodFormat = customControlExposedOrgSettings.fiscalPeriodFormat;
        this.fiscalPeriodType = customControlExposedOrgSettings.fiscalPeriodType;
        this.fiscalYearFormatYear = customControlExposedOrgSettings.fiscalYearFormatYear;
        this.fiscalYearFormatPrefix = customControlExposedOrgSettings.fiscalYearFormatPrefix;
        this.fiscalYearFormatSuffix = customControlExposedOrgSettings.fiscalYearFormatSuffix;
        this.fiscalYearDisplayCode = customControlExposedOrgSettings.fiscalYearDisplayCode;
        this.fiscalPeriodConnector = customControlExposedOrgSettings.fiscalPeriodConnector;
        this.showWeekNumber = customControlExposedOrgSettings.showWeekNumber;
        this.boundDashboardDefaultCardExpanded = customControlExposedOrgSettings.boundDashboardDefaultCardExpanded;
        this.allowUnresolvedPartiesOnEmailSend = customControlExposedOrgSettings.allowUnresolvedPartiesOnEmailSend;
        this.webResourceHash = customControlExposedOrgSettings.webResourceHash;
        this.enableBingMapsIntegration = customControlExposedOrgSettings.enableBingMapsIntegration;
        this.bingMapsApiKey = customControlExposedOrgSettings.bingMapsApiKey;
        this.availableBingMapLocales = customControlExposedOrgSettings.availableBingMapLocales;
        this.excludedCountriesForMaps = customControlExposedOrgSettings.excludedCountriesForMaps;
        this.bFDatacenter = customControlExposedOrgSettings.bFDatacenter;
        this.securitySettingForEmail = customControlExposedOrgSettings.securitySettingForEmail;
        this.appointmentRichEditorExperience = customControlExposedOrgSettings.appointmentRichEditorExperience;
        this.gridTotalRecordCountLimit = customControlExposedOrgSettings.gridTotalRecordCountLimit;
        this.lookupCharacterCountBeforeResolve = customControlExposedOrgSettings.lookupCharacterCountBeforeResolve;
        this.lookupResolveDelayMS = customControlExposedOrgSettings.lookupResolveDelayMS;
        this.advancedLookupEnabled = customControlExposedOrgSettings.advancedLookupEnabled;
        this.isCollaborationExperienceEnabled = customControlExposedOrgSettings.isCollaborationExperienceEnabled;
        this.pcfDatasetGridEnabled = customControlExposedOrgSettings.pcfDatasetGridEnabled;
        this.allowUsersHidingSystemViews = customControlExposedOrgSettings.allowUsersHidingSystemViews;
    }
    return OrgSettings;
}());
export { OrgSettings };
