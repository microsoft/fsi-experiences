/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Default ICustomControlHostDispatchPropsActions method implementation
export var DefaultDispatchPropsActions = {
    clearNestedChild: function (key) {
        return false;
    },
    createAccessibilityComponent: function (props) {
        return undefined;
    },
    createCommandManagerUXComponent: function () {
        return undefined;
    },
    createKeyboardShortcut: function (keyCombination, shortcutHandler, isGlobal, areaName, shortcutDescription, srcElementId) {
        return undefined;
    },
    createXrmForm: function (contextToken, pageId, entityTypeName, entityId) {
        return false;
    },
    createXrmGrid: function (contextToken, pageId, parameters, controlName) {
        return false;
    },
    registerNewControl: function (contextToken, pageId, controlName, controlId) {
        return false;
    },
    executeAddOnLoad: function (dataSetObjectWrapper, contextToken) {
        return undefined;
    },
    executeNotifyHandlersThatEventOccurred: function (notifyHandlersThatEventOccurredParameter) {
        // TODO: 1649854 [Lookup] Update executeNotifyHandlersThatEventOccurred return types
        return Promise.resolve();
    },
    getConnectorsApi: function (controlId) {
        return null;
    },
    getRecordSetQueryKey: function (dataSetObjectWrapper) {
        return "";
    },
    addSessionTab: function (sessionTab) {
        return Promise.resolve();
    },
    closeSessionTab: function (closedSessionTabIndex) {
        return Promise.resolve();
    },
    updateSessionTab: function (sessionTab) {
        return Promise.resolve();
    },
    closeAllSessionTabs: function () {
        return Promise.resolve();
    },
    dismissMessage: function () {
        return Promise.resolve();
    },
    initializeReferencePanelControl: function (controls) {
        return Promise.resolve();
    },
    cleanReferencePanelState: function () {
        return Promise.resolve();
    },
    markActiveTab: function (currentTab, isUnderOverflow) {
        return Promise.resolve();
    },
    // Tracked: better stubbing for this method. Corresponds to context.resources.getResource method
    getResource: function (resource) {
        return Promise.resolve();
    },
    initializeCommandManager: function (pageId, contextToken, controlId, commandManagerId) {
        var resolve;
        var promise = new Promise(function (_resolve) {
            resolve = _resolve;
            _resolve();
        });
        return { promise: promise, resolve: resolve };
    },
    loadManifest: function (customControlId, customControlName) {
        return Promise.resolve();
    },
    loadResources: function (customControl) {
        return Promise.resolve();
    },
    loadResourceStrings: function (customControl) {
        return Promise.resolve();
    },
    triggerOfflineMetadataSync: function () {
        return Promise.resolve();
    },
    retrieveFormWithAttributes: function (entityName, formId, formType) {
        return Promise.resolve();
    },
    refreshDataSetParameter: function (dataSetObjectWrapper, contextToken) {
        return undefined;
    },
    retrieveDataSetLookupCellParameter: function (dataSetParameter, dataSetLookupCellWrapper, contextToken) {
        return undefined;
    },
    renderNestedCustomControl: function (key, props, dataSetHostProps) {
        return undefined;
    },
    runCustomOpenRecord: function (record, contextToken) {
        return Promise.resolve(true);
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    renderReactSubtree: function (element, node) { },
    retrieveGridData: function (query) {
        return undefined;
    },
    retrieveLookupData: function (query) {
        return undefined;
    },
    retrieveLookupMetadataAction: function (lookupObjectWrapper) {
        return undefined;
    },
    addPendingCommandManagerId: function (pageId, contextToken, controlId, commandManagerId) {
        return undefined;
    },
    retrieveRecordCommand: function (allRecords, commandManagerId, contextToken, records, commandButtonIds, filterByPriority, useNestedFormat, controlConstructorName, refreshAllRules, pageId) {
        return undefined;
    },
    retrieveRecordDataForForm: function (entityReference, formId, processControlDataRequest, additionalColumns, isPrimaryAttributeRequested) {
        return Promise.resolve();
    },
    retrieveForm: function (entityReference, formId) {
        return Promise.resolve();
    },
    retrieveEntityData: function (etn) {
        return Promise.resolve();
    },
    retrieveChartDrilldownAttributes: function (etn) {
        return Promise.resolve();
    },
    retrieveView: function (entityTypeName, viewQueryType, viewType, viewId) {
        return undefined;
    },
    retrieveViewSelector: function (entityTypeName, viewQueryType) {
        return undefined;
    },
    save: function (snapshotId, columns) {
        return Promise.resolve();
    },
    saveEmbeddedEntity: function (pageId, entityTypeName, recordId, closestParentWithContext, columnSet) {
        return Promise.resolve();
    },
    setFieldControlPersonalization: function (personalizationConfig, personalizations) {
        return undefined;
    },
    setGridControlPersonalization: function (personalizationConfig, personalizations) {
        return undefined;
    },
    setDashboardControlPersonalization: function (personalizationConfig, personalizations) {
        return undefined;
    },
    setGenericControlPersonalization: function (customControlId, personalizations) {
        return undefined;
    },
    setGlobalControlPersonalization: function (customControlId, personalizations) {
        return undefined;
    },
    setPowerBISignedInState: function (pageId, signedInState) {
        return undefined;
    },
    setValue: function (entityReference, controlKeyValuePairs, snapshotId, pageId) {
        return Promise.resolve("");
    },
    setXrmObject: function (proxy) {
        return undefined;
    },
    updateFieldValue: function (pageId, controlNameValuePairs, suppressOnChange, entityTypeName, recordId, closestParentWithContext) {
        return undefined;
    },
    updateOutputs: function (pageId, entityTypeName, recordId, customControlId, closestControlParentWithSave, outputs, contextToken) {
        return undefined;
    },
    openPopup: function (popupId) {
        return Promise.resolve();
    },
    closePopup: function (popupId) {
        return Promise.resolve();
    },
    updateControlMemoizedDataSet: function (legacyDataSetWrapper, actions, recordId) {
        return undefined;
    },
    executeRollupRequest: function (target, fieldName, pageId) {
        return undefined;
    },
    isPresenceEnabledEntity: function (entityName) {
        return undefined;
    },
    getPresenceMappedField: function (entityName) {
        return undefined;
    },
};
/* eslint-enable @typescript-eslint/no-unused-vars */
//# sourceMappingURL=DefaultHostDispatchPropsActions.js.map