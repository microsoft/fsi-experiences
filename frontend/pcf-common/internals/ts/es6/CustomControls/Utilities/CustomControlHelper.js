import { instance as XrmProxyInstance } from "./XrmProxy";
import { IsNullOrEmptyString, IsNullOrUndefined, IsArray } from "../Models/CustomControlUtilityPointers";
import { ManifestType } from "../Utilities/ManifestType";
import { COMPONENT_NAME } from "../Utilities/TelemetryManager";
import { FIELD_SECTION_ITEM_ID } from "../Utilities/DefaultControlMapper";
var CUSTOM_CONTROL_ID_SEPARATOR = "-";
var DEFAULT_OPENRECORD_BUTTONID = "Mscrm.OpenRecordItem";
function buildUniqueCustomControlId(props, id, absoluteId) {
    if (absoluteId) {
        return absoluteId;
    }
    if (!id) {
        return id;
    }
    var childDomId = buildChildDomId(props);
    return (childDomId ? childDomId + CUSTOM_CONTROL_ID_SEPARATOR : "") + id;
}
function buildChildDomId(props) {
    if (props.configuration && props.configuration.CustomControlId === FIELD_SECTION_ITEM_ID) {
        return buildFieldSectionItemChildDomId(props);
    }
    var domId = "";
    if (props.descriptor) {
        domId = props.descriptor.DomId ? props.descriptor.DomId : "";
    }
    var controlId = props.controlId ? props.controlId : "";
    return (domId ? domId + CUSTOM_CONTROL_ID_SEPARATOR : "") + (controlId || "");
}
function buildFieldSectionItemChildDomId(props) {
    return props.descriptor.DomId + CUSTOM_CONTROL_ID_SEPARATOR + props.descriptor.Id;
}
function buildTesthookId(props, testhookId) {
    var controlId = props && props.controlId ? props.controlId : "";
    if (!testhookId) {
        return controlId || "";
    }
    return (controlId ? controlId + CUSTOM_CONTROL_ID_SEPARATOR : "") + testhookId;
}
function buildTabIndexValue(props) {
    if (!IsNullOrUndefined(props) &&
        !IsNullOrUndefined(props.propBagData) &&
        !IsNullOrUndefined(props.propBagData.accessibilityData) &&
        !IsNullOrUndefined(props.propBagData.accessibilityData.assignedTabIndex)) {
        return props.propBagData.accessibilityData.assignedTabIndex;
    }
    return 0;
}
function buildTooltipValue(props) {
    var _a, _b, _c;
    return (_c = (_b = (_a = props === null || props === void 0 ? void 0 : props.propBagData) === null || _a === void 0 ? void 0 : _a.accessibilityData) === null || _b === void 0 ? void 0 : _b.assignedTooltip) !== null && _c !== void 0 ? _c : null;
}
var isHighContrastEnabled;
function getHighContrastEnabled() {
    if (isHighContrastEnabled === undefined) {
        var msHighContrastMediaQuery = window.matchMedia("(-ms-high-contrast: active)");
        var forceColorsMediaQuery = window.matchMedia("(forced-colors: active)");
        var prefersContrastMediaQuery = window.matchMedia("(prefers-contrast: more)");
        if (msHighContrastMediaQuery.matches || forceColorsMediaQuery.matches || prefersContrastMediaQuery.matches) {
            isHighContrastEnabled = true;
        }
        else {
            var htmlTag = document.getElementsByTagName("html");
            isHighContrastEnabled = htmlTag[0].getAttribute("hc") != null;
        }
    }
    return isHighContrastEnabled;
}
function focusElementById(props, id, isAbsoluteId) {
    var identifier = _extractAccessibilityIdentifier(props, id, isAbsoluteId);
    if (!identifier || identifier === null) {
        return;
    }
    var element = document.getElementById(identifier);
    if (!element || element === null) {
        return;
    }
    element.focus();
}
function blurElementById(props, id, isAbsoluteId) {
    var identifier = _extractAccessibilityIdentifier(props, id, isAbsoluteId);
    if (!identifier || identifier === null) {
        return;
    }
    var element = document.getElementById(identifier);
    if (!element || element === null) {
        return;
    }
    element.blur();
}
function _extractAccessibilityIdentifier(props, id, isAbsoluteId) {
    if (!id) {
        return;
    }
    return isAbsoluteId === true ? id : buildUniqueCustomControlId(props, id);
}
function createCrmUri(url, data) {
    var organizationUniqueName = data.organizationUniqueName ? data.organizationUniqueName : "";
    var usePathBasedUrls = data.usePathBasedUrls ? data.usePathBasedUrls : false;
    if (usePathBasedUrls && organizationUniqueName) {
        return "/" + organizationUniqueName + url;
    }
    return url;
}
function openDatasetItemAction(ownProps, param, paramKey, runCustomOpenRecord, entityReference, openDataSetItemOptions) {
    if (!entityReference) {
        return;
    }
    var entityName = entityReference.entityType || entityReference.entityName || entityReference.LogicalName;
    var entityReferenceId = entityReference.id || (entityReference.Id && entityReference.Id.toString());
    var recordSetQueryKey = getRecordSetQueryFromProps(ownProps, paramKey);
    var openFormAction = function () {
        try {
            var options = { entityName: entityName, entityId: entityReferenceId, recordSetQueryKey: recordSetQueryKey };
            if (ownProps.parentDefinedControlProps &&
                ownProps.parentDefinedControlProps.propertyBagOverrides &&
                ownProps.parentDefinedControlProps.propertyBagOverrides.openForm) {
                ownProps.parentDefinedControlProps.propertyBagOverrides.openForm(options, null, ownProps.id);
            }
            else if (options.entityName) {
                XrmProxyInstance.openForm(options, null, ownProps.id);
            }
            else {
                throw new Error("EntityName was not passed in to method, cannot call openForm");
            }
        }
        catch (e) {
            var jsonOwnProps = "";
            try {
                jsonOwnProps = JSON.stringify(ownProps);
            }
            catch (exception) {
                jsonOwnProps = "Unable to parse ownProps";
            }
            try {
                if (ownProps.propBagMethods.navigation && ownProps.propBagMethods.navigation.openEditForm) {
                    ownProps.propBagMethods.navigation.openEditForm(entityReference, null, null, null, null, ownProps.id);
                }
            }
            catch (exception) {
                XrmProxyInstance.Reporting.reportFailure(COMPONENT_NAME + ".Utilities", e, "propBagMethods.navigation.openEditForm failed", [
                    { name: "ownProps", value: jsonOwnProps },
                    { name: "APIName", value: COMPONENT_NAME + ".Utilities.CustomControlHelper.openDatasetItemAction" },
                ]);
            }
            XrmProxyInstance.Reporting.reportFailure(COMPONENT_NAME + ".Utilities", e, "XrmProxyInstance.openForm failed", [
                { name: "ownProps", value: jsonOwnProps },
                { name: "APIName", value: COMPONENT_NAME + "Utilities.CustomControlHelper.openFormAction" },
            ]);
        }
    };
    if ((entityName !== param.getTargetEntityType() && param.getTargetEntityType() !== "activitypointer") ||
        !param.records.hasOwnProperty(entityReferenceId)) {
        openFormAction();
        return;
    }
    if (XrmProxyInstance.Utils.isFeatureEnabled("GridOverrideOpenRecord") && runCustomOpenRecord) {
        runCustomOpenRecord(ownProps.id, entityName, entityReferenceId, ownProps.contextToken).then(function (hasCustomOpenAction) {
            if (!hasCustomOpenAction) {
                runStandardOpenRecord();
            }
            else {
                XrmProxyInstance.Reporting.reportSuccess(COMPONENT_NAME + ".Utilities", [
                    { name: "hasCustomOpenAction", value: hasCustomOpenAction },
                    { name: "entityName", value: entityName },
                    { name: "APIName", value: COMPONENT_NAME + ".Utilities.CustomControlHelper.runCustomOpenRecord" },
                ]);
            }
        }, function (e) {
            XrmProxyInstance.Reporting.reportFailure(COMPONENT_NAME + ".Utilities", e, "runCustomOpenRecord failed", [
                { name: "APIName", value: COMPONENT_NAME + ".Utilities.CustomControlHelper.runCustomOpenRecord" },
                { name: "entityName", value: entityName },
            ]);
        });
    }
    else {
        runStandardOpenRecord();
    }
    function runStandardOpenRecord() {
        if (param.retrieveRecordCommand) {
            var successCallback = function (commandObjectWrappers) {
                if (commandObjectWrappers && commandObjectWrappers.length > 0) {
                    commandObjectWrappers[0].execute();
                }
                else {
                    openFormAction();
                }
            };
            var failureCallback = function () {
                openFormAction();
            };
            var openRecordId = openDataSetItemOptions && openDataSetItemOptions.CommandButtonId
                ? openDataSetItemOptions.CommandButtonId
                : DEFAULT_OPENRECORD_BUTTONID;
            param
                .retrieveRecordCommand([entityReferenceId], [openRecordId], false, false, false)
                .then(successCallback, failureCallback);
        }
        else {
            openFormAction();
        }
    }
}
function isEmptyFilterExpressionArrays(filtersArray) {
    return IsNullOrUndefined(filtersArray) || filtersArray.length === 0;
}
function isEmptyConditionExpressionArrays(conditionsArray) {
    return IsNullOrUndefined(conditionsArray) || conditionsArray.length === 0;
}
function isEmptyFiltering(filteringObj) {
    return (IsNullOrUndefined(filteringObj) ||
        IsNullOrUndefined(filteringObj.filterOperator) ||
        (isEmptyConditionExpressionArrays(filteringObj.conditions) && isEmptyFilterExpressionArrays(filteringObj.filters)));
}
function areEntityAliasSame(str1, str2) {
    if (IsNullOrEmptyString(str1) && IsNullOrEmptyString(str2)) {
        return true;
    }
    if (IsNullOrEmptyString(str1) || IsNullOrEmptyString(str2)) {
        return false;
    }
    return str1 === str2;
}
function areValueSame(value1, value2) {
    if (IsNullOrUndefined(value1) && IsNullOrUndefined(value2)) {
        return true;
    }
    if (IsNullOrUndefined(value1) || IsNullOrUndefined(value2)) {
        return false;
    }
    var processValue1 = typeof value1 === "number" ? value1.toString(10) : value1;
    var processValue2 = typeof value2 === "number" ? value2.toString(10) : value2;
    if (typeof processValue1 !== typeof processValue2) {
        return false;
    }
    if (typeof processValue1 === "string") {
        return value1 === value2;
    }
    else if (IsArray(processValue1) && IsArray(processValue2)) {
        if (processValue1.length !== processValue2.length) {
            return false;
        }
        for (var idx = 0; idx < processValue1.length; idx++) {
            var item1 = processValue1[idx];
            var item2 = processValue2[idx];
            if (!areValueSame(item1, item2)) {
                return false;
            }
        }
    }
    else {
        return false;
    }
}
function areFilteringObjEqual(firstFilteringObj, secondFilteringObj, columnAliasMap) {
    if (isEmptyFiltering(firstFilteringObj) && isEmptyFiltering(secondFilteringObj)) {
        return true;
    }
    if (isEmptyFiltering(firstFilteringObj) || isEmptyFiltering(secondFilteringObj)) {
        return false;
    }
    if (firstFilteringObj.filterOperator !== secondFilteringObj.filterOperator) {
        return false;
    }
    var firstFilterConditions = firstFilteringObj.conditions;
    var secondFilterConditions = secondFilteringObj.conditions;
    if (isEmptyConditionExpressionArrays(firstFilterConditions) &&
        isEmptyConditionExpressionArrays(secondFilterConditions)) {
        var firstFilterFilters = firstFilteringObj.filters;
        var secondFilterFilters = secondFilteringObj.filters;
        if (isEmptyFilterExpressionArrays(firstFilterFilters) && isEmptyFilterExpressionArrays(secondFilterFilters)) {
            return true;
        }
        if (isEmptyFilterExpressionArrays(firstFilterFilters) || isEmptyFilterExpressionArrays(secondFilterFilters)) {
            return false;
        }
        if (firstFilterFilters.length !== secondFilterFilters.length) {
            return false;
        }
        for (var idx = 0; idx < firstFilterFilters.length; idx++) {
            var filterFromFirst = firstFilterFilters[idx];
            var filterFromSecond = secondFilterFilters[idx];
            if (!areFilteringObjEqual(filterFromFirst, filterFromSecond, columnAliasMap)) {
                return false;
            }
        }
    }
    else if (isEmptyConditionExpressionArrays(firstFilterConditions) ||
        isEmptyConditionExpressionArrays(secondFilterConditions)) {
        return false;
    }
    else {
        if (firstFilterConditions.length !== secondFilterConditions.length) {
            return false;
        }
        for (var idx = 0; idx < firstFilterConditions.length; idx++) {
            var conditionFromFirst = firstFilterConditions[idx];
            var conditionFromSecond = secondFilterConditions[idx];
            if (!areFilteringAttributeNamesEquivalent(conditionFromFirst.attributeName, conditionFromSecond.attributeName, columnAliasMap) ||
                conditionFromFirst.conditionOperator !== conditionFromSecond.conditionOperator ||
                !areEntityAliasSame(conditionFromFirst.entityAliasName, conditionFromSecond.entityAliasName) ||
                !areValueSame(conditionFromFirst.value, conditionFromSecond.value)) {
                return false;
            }
        }
    }
    return true;
}
function areFilteringAttributeNamesEquivalent(filterName1, filterName2, columnAliasMap) {
    if (columnAliasMap) {
        var filterAlias1 = columnAliasMap.hasOwnProperty(filterName1) ? columnAliasMap[filterName1] : filterName1;
        var filterAlias2 = columnAliasMap.hasOwnProperty(filterName2) ? columnAliasMap[filterName2] : filterName2;
        return filterAlias1 === filterAlias2;
    }
    return filterName1 === filterName2;
}
function areSortingObjEqual(firstSortingObj, secondSortingObj) {
    if (IsNullOrUndefined(firstSortingObj) && IsNullOrUndefined(secondSortingObj)) {
        return true;
    }
    if (IsNullOrUndefined(firstSortingObj) || IsNullOrUndefined(secondSortingObj)) {
        return false;
    }
    if (firstSortingObj.length !== secondSortingObj.length) {
        return false;
    }
    for (var idx = 0; idx < firstSortingObj.length; idx++) {
        var firstSortStatus = firstSortingObj[idx];
        var secondSortStatus = secondSortingObj[idx];
        if (firstSortStatus.name !== secondSortStatus.name ||
            firstSortStatus.sortDirection !== secondSortStatus.sortDirection) {
            return false;
        }
    }
    return true;
}
function getRecordSetQueryFromProps(ownProps, paramKey) {
    var params = paramKey && ownProps.dynamicData ? ownProps.dynamicData.parameters[paramKey] : null;
    return ownProps.actions && ownProps.actions.getRecordSetQueryKey && params !== null
        ? ownProps.actions.getRecordSetQueryKey(params)
        : null;
}
function getParentIdFromProps(props) {
    var uniqueId = buildChildDomId(props);
    var idComponents = uniqueId.split(CUSTOM_CONTROL_ID_SEPARATOR);
    var i;
    for (i = 0; i < idComponents.length - 1; i++)
        if (idComponents[i] !== "id" && isNaN(Number(idComponents[i]))) {
            return idComponents[i];
        }
    return "";
}
function convertFetchXmlToFetchExpression(inputFetchXml) {
    try {
        if (!inputFetchXml) {
            return null;
        }
        var domParser = new DOMParser();
        var inputXmlDocument = domParser.parseFromString(inputFetchXml, "text/xml");
        if (inputXmlDocument) {
            var filters = [];
            var entityName = void 0;
            var entityElement = inputXmlDocument.querySelector("fetch>entity");
            if (entityElement) {
                entityName = entityElement.getAttribute("name");
            }
            var filterElement = inputXmlDocument.querySelector("fetch>entity>filter");
            if (filterElement) {
                var filterExpression_1 = generateFilteringExpression(filterElement);
                filters.push(filterExpression_1);
            }
            var linkEntityElements = inputXmlDocument.querySelectorAll("fetch>entity>link-entity");
            var linkEntities = convertFetchXmlLinkEntitiesToLinkEntityExpressions(linkEntityElements, filters);
            var filterExpression = filters.length === 0
                ? null
                : filters.length === 1
                    ? filters[0]
                    : {
                        conditions: [],
                        filterOperator: 0,
                        filters: filters,
                    };
            return {
                entityName: entityName,
                filters: filterExpression,
                linkEntities: linkEntities,
            };
        }
        XrmProxyInstance.Diagnostics.traceInfo(COMPONENT_NAME + ".convertFetchXmlToFetchExpression", "return null");
        return null;
    }
    catch (exception) {
        XrmProxyInstance.Reporting.reportFailure(COMPONENT_NAME + ".Utilities", exception, "convert xml failed", [
            { name: "inputFetchXml", value: inputFetchXml },
            { name: "APIName", value: COMPONENT_NAME + ".Utilities.CustomControlHelper.convertFetchXmlToFetchExpression" },
        ]);
    }
}
function convertFetchXmlLinkEntitiesToLinkEntityExpressions(linkEntityElements, filters) {
    var linkEntities = [];
    if ((linkEntityElements === null || linkEntityElements === void 0 ? void 0 : linkEntityElements.length) > 0) {
        var convertLinkEntities_1 = function (linkEntityElement, currentLinkEntities) {
            var alias = linkEntityElement.getAttribute("alias");
            var linkEntity = {
                name: linkEntityElement.getAttribute("name"),
                from: linkEntityElement.getAttribute("from"),
                to: linkEntityElement.getAttribute("to"),
                linkType: linkEntityElement.getAttribute("link-type"),
                alias: alias,
            };
            currentLinkEntities.push(linkEntity);
            for (var index in linkEntityElement.childNodes) {
                var linkChild = linkEntityElement.childNodes[index];
                if (filters && linkChild.nodeName === "filter") {
                    var filterExpression = generateFilteringExpression(linkChild, alias);
                    filters.push(filterExpression);
                }
                else if (linkChild.nodeName === "link-entity") {
                    linkEntity.nestedLinkEntities = [];
                    convertLinkEntities_1(linkChild, linkEntity.nestedLinkEntities);
                }
            }
        };
        for (var index in Array.from(linkEntityElements)) {
            var linkEntityElement = linkEntityElements[index];
            convertLinkEntities_1(linkEntityElement, linkEntities);
        }
    }
    return linkEntities;
}
function convertFetchXmlToFilterExpression(inputFetchXmlSnippet) {
    try {
        if (!inputFetchXmlSnippet) {
            return null;
        }
        var domParser = new DOMParser();
        var inputXmlDocument = domParser.parseFromString(inputFetchXmlSnippet, "text/xml");
        if (inputXmlDocument) {
            var filterElements = inputXmlDocument.getElementsByTagName("filter");
            if (!filterElements || filterElements.length === 0) {
                return null;
            }
            return generateFilteringExpression(filterElements[0]);
        }
        XrmProxyInstance.Diagnostics.traceInfo(COMPONENT_NAME + ".convertFetchXmlToFilterExpression", "return null");
        return null;
    }
    catch (exception) {
        XrmProxyInstance.Reporting.reportFailure(COMPONENT_NAME + ".Utilities", exception, "convert xml failed", [
            { name: "inputFetchXmlSnippet", value: inputFetchXmlSnippet },
            { name: "APIName", value: COMPONENT_NAME + ".Utilities.CustomControlHelper.convertFetchXmlToFilterExpression" },
        ]);
    }
}
function convertFetchExpressionToFetchXml(fetchExpression, xmlEncode) {
    if (xmlEncode === void 0) { xmlEncode = function (s) { return s; }; }
    if (!fetchExpression) {
        return "";
    }
    var entityName = fetchExpression.entityName, filters = fetchExpression.filters, linkEntities = fetchExpression.linkEntities;
    var filterXml = convertFilterExpressionToFetchXml(filters, xmlEncode);
    var linkXml = "";
    if (linkEntities) {
        for (var _i = 0, linkEntities_1 = linkEntities; _i < linkEntities_1.length; _i++) {
            var linkEntity = linkEntities_1[_i];
            linkXml += convertLinkEntityExpressionToFetchXml(linkEntity, xmlEncode);
        }
    }
    return "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\"><entity name=\"" + xmlEncode(entityName) + "\">" + linkXml + filterXml + "</entity></fetch>";
}
function convertFilterExpressionToFetchXml(filterExpression, xmlEncode) {
    if (!xmlEncode) {
        xmlEncode = function (s) { return s; };
    }
    var xml = "";
    if (IsNullOrUndefined(filterExpression) ||
        ((IsNullOrUndefined(filterExpression.filters) || filterExpression.filters.length === 0) &&
            (IsNullOrUndefined(filterExpression.conditions) || filterExpression.conditions.length === 0))) {
        return xml;
    }
    else if (!IsNullOrUndefined(filterExpression.conditions) && filterExpression.conditions.length > 0) {
        xml += '<filter type="' + getFilterOperator(filterExpression.filterOperator) + '"';
        xml += ">";
        for (var i = 0; i < filterExpression.conditions.length; i++) {
            var condition = filterExpression.conditions[i];
            xml += "<condition ";
            if (!IsNullOrEmptyString(condition.entityAliasName)) {
                xml += 'entityname="' + condition.entityAliasName + '" ';
            }
            if (condition.value == null) {
                xml +=
                    'attribute="' +
                        condition.attributeName +
                        '" operator="' +
                        getConditionOperator(condition.conditionOperator) +
                        '"/>';
            }
            else if (typeof condition.value === "string" || typeof condition.value === "number") {
                xml +=
                    'attribute="' +
                        condition.attributeName +
                        '" operator="' +
                        getConditionOperator(condition.conditionOperator) +
                        '" value="' +
                        xmlEncode(condition.value) +
                        '" />';
            }
            else {
                var argValues = condition.value;
                xml +=
                    'attribute="' +
                        condition.attributeName +
                        '" operator="' +
                        getConditionOperator(condition.conditionOperator) +
                        '">';
                for (var j = 0; j < argValues.length; j++) {
                    xml += "<value>" + xmlEncode(argValues[j]) + "</value>";
                }
                xml += "</condition>";
            }
        }
        xml += "</filter>";
    }
    else {
        if (filterExpression.filters.length > 0) {
            xml += '<filter type="' + getFilterOperator(filterExpression.filterOperator) + '">';
        }
        for (var i = 0; i < filterExpression.filters.length; i++) {
            xml += convertFilterExpressionToFetchXml(filterExpression.filters[i], xmlEncode);
        }
        if (filterExpression.filters.length > 0) {
            xml += "</filter>";
        }
    }
    return xml;
}
function convertLinkEntityExpressionToFetchXml(_a, xmlEncode) {
    var name = _a.name, alias = _a.alias, linkType = _a.linkType, to = _a.to, from = _a.from, nestedLinkEntities = _a.nestedLinkEntities;
    if (xmlEncode === void 0) { xmlEncode = function (s) { return s; }; }
    var xml = "<link-entity name=\"" + xmlEncode(name) + "\" from=\"" + xmlEncode(from) + "\" to=\"" + xmlEncode(to) + "\" link-type=\"" + xmlEncode(linkType) + "\" alias=\"" + xmlEncode(alias) + "\"";
    if ((nestedLinkEntities === null || nestedLinkEntities === void 0 ? void 0 : nestedLinkEntities.length) > 0) {
        xml += ">";
        for (var _i = 0, nestedLinkEntities_1 = nestedLinkEntities; _i < nestedLinkEntities_1.length; _i++) {
            var nestedLinkEntity = nestedLinkEntities_1[_i];
            xml += convertLinkEntityExpressionToFetchXml(nestedLinkEntity, xmlEncode);
        }
        xml += "</link-entity>";
    }
    else {
        xml += " />";
    }
    return xml;
}
function getFilterOperator(filterOperator) {
    switch (filterOperator) {
        case 0:
            return "and";
        case 1:
            return "or";
    }
}
function getConditionOperator(conditionOperator) {
    switch (conditionOperator) {
        case 0:
            return "eq";
        case 1:
            return "ne";
        case 2:
            return "gt";
        case 3:
            return "lt";
        case 4:
            return "ge";
        case 5:
            return "le";
        case 6:
            return "like";
        case 7:
            return "not-like";
        case 8:
            return "in";
        case 9:
            return "not-in";
        case 10:
            return "between";
        case 11:
            return "not-between";
        case 12:
            return "null";
        case 13:
            return "not-null";
        case 14:
            return "yesterday";
        case 15:
            return "today";
        case 16:
            return "tomorrow";
        case 17:
            return "last-seven-days";
        case 18:
            return "next-seven-days";
        case 19:
            return "last-week";
        case 20:
            return "this-week";
        case 21:
            return "next-week";
        case 22:
            return "last-month";
        case 23:
            return "this-month";
        case 24:
            return "next-month";
        case 25:
            return "on";
        case 26:
            return "on-or-before";
        case 27:
            return "on-or-after";
        case 28:
            return "last-year";
        case 29:
            return "this-year";
        case 30:
            return "next-year";
        case 31:
            return "last-x-hours";
        case 32:
            return "next-x-hours";
        case 33:
            return "last-x-days";
        case 34:
            return "next-x-days";
        case 35:
            return "last-x-weeks";
        case 36:
            return "next-x-weeks";
        case 37:
            return "last-x-months";
        case 38:
            return "next-x-months";
        case 39:
            return "last-x-years";
        case 40:
            return "next-x-years";
        case 41:
            return "eq-userid";
        case 42:
            return "ne-userid";
        case 43:
            return "eq-businessid";
        case 44:
            return "ne-businessid";
        case 49:
            return "contain-values";
        case 51:
            return "eq-userlanguage";
        case 53:
            return "olderthan-x-months";
        case 54:
            return "begins-with";
        case 55:
            return "not-begin-with";
        case 56:
            return "ends-with";
        case 57:
            return "not-end-with";
        case 58:
            return "this-fiscal-year";
        case 59:
            return "this-fiscal-period";
        case 60:
            return "next-fiscal-year";
        case 61:
            return "next-fiscal-period";
        case 62:
            return "last-fiscal-year";
        case 63:
            return "last-fiscal-period";
        case 64:
            return "last-x-fiscal-years";
        case 65:
            return "last-x-fiscal-periods";
        case 66:
            return "next-x-fiscal-years";
        case 67:
            return "next-x-fiscal-periods";
        case 68:
            return "in-fiscal-year";
        case 69:
            return "in-fiscal-period";
        case 70:
            return "in-fiscal-period-and-year";
        case 71:
            return "in-or-before-fiscal-period-and-year";
        case 72:
            return "in-or-after-fiscal-period-and-year";
        case 73:
            return "eq-userteams";
        case 74:
            return "eq-useroruserteams";
        case 75:
            return "above";
        case 76:
            return "under";
        case 77:
            return "not-under";
        case 78:
            return "eq-or-above";
        case 79:
            return "eq-or-under";
        case 80:
            return "eq-useroruserhierarchy";
        case 81:
            return "eq-useroruserhierarchyandteams";
        case 82:
            return "olderthan-x-years";
        case 83:
            return "olderthan-x-weeks";
        case 84:
            return "olderthan-x-days";
        case 85:
            return "olderthan-x-hours";
        case 86:
            return "olderthan-x-minutes";
        case 87:
            return "contain-values";
        case 88:
            return "not-contain-values";
    }
}
function generateFilteringExpression(inputFilterElement, alias) {
    if (!inputFilterElement || typeof inputFilterElement === "string") {
        return null;
    }
    var filterElement = inputFilterElement;
    var filterOperator = getNodeAttributeValueFromName(filterElement, "type");
    var convertedFilterOperator = convertFilterOperator(filterOperator);
    if (convertedFilterOperator === null || !filterElement.childNodes || filterElement.childNodes.length === 0) {
        return null;
    }
    var childFilterExpressions = [];
    var conditionExpressions = [];
    for (var index = 0; index < filterElement.childNodes.length; index++) {
        var currentElement = filterElement.childNodes.item(index);
        if (typeof currentElement === "string" ||
            (currentElement.nodeName !== "filter" && currentElement.nodeName !== "condition")) {
            continue;
        }
        if (currentElement.nodeName === "filter") {
            var generatedChildFilterExpression = generateFilteringExpression(currentElement, alias);
            if (generatedChildFilterExpression) {
                childFilterExpressions.push(generatedChildFilterExpression);
            }
        }
        else if (currentElement.nodeName === "condition") {
            var attributeValue = getNodeAttributeValueFromName(currentElement, "attribute");
            var operatorValue = getNodeAttributeValueFromName(currentElement, "operator");
            var entityNode = currentElement.parentElement && currentElement.parentElement.parentElement;
            var entityName = getNodeAttributeValueFromName(entityNode, "name");
            var entityAliasName = alias || getNodeAttributeValueFromName(currentElement, "entityname");
            var convertedConditionOperator = convertConditionOperator(operatorValue);
            if (convertedConditionOperator !== null && attributeValue) {
                var value = void 0;
                if (isOperatorSupportsMultipleValues(operatorValue)) {
                    value = [];
                    if (currentElement.childNodes) {
                        for (var valueElementIndex = 0; valueElementIndex < currentElement.childNodes.length; valueElementIndex++) {
                            var childValueElement = currentElement.childNodes.item(valueElementIndex);
                            if (typeof childValueElement === "string" || childValueElement.nodeName !== "value") {
                                continue;
                            }
                            var rawValueString = childValueElement.firstChild ? childValueElement.firstChild.nodeValue : null;
                            if (typeof rawValueString !== "string") {
                                continue;
                            }
                            var valueString = rawValueString.toString();
                            value.push(valueString);
                        }
                    }
                }
                else {
                    value = getNodeAttributeValueFromName(currentElement, "value");
                }
                var condtionExpression = {
                    attributeName: attributeValue,
                    conditionOperator: convertedConditionOperator,
                    entityName: entityName,
                    entityAliasName: entityAliasName,
                    value: value,
                };
                conditionExpressions.push(condtionExpression);
            }
        }
    }
    return {
        filters: childFilterExpressions,
        filterOperator: convertedFilterOperator,
        conditions: conditionExpressions,
    };
}
function isOperatorSupportsMultipleValues(operatorName) {
    return (operatorName === "in" ||
        operatorName === "not-in" ||
        operatorName === "in-fiscal-period-and-year" ||
        operatorName === "in-or-after-fiscal-period-and-year" ||
        operatorName === "in-or-before-fiscal-period-and-year" ||
        operatorName === "contain-values" ||
        operatorName === "not-contain-values");
}
function convertConditionOperator(conditionOperator) {
    if (!conditionOperator) {
        return null;
    }
    switch (conditionOperator) {
        case "eq":
            return 0;
        case "ne":
            return 1;
        case "neq":
            return 1;
        case "ge":
            return 4;
        case "gt":
            return 2;
        case "le":
            return 5;
        case "lt":
            return 3;
        case "on":
            return 25;
        case "on-or-before":
            return 26;
        case "on-or-after":
            return 27;
        case "like":
            return 6;
        case "not-like":
            return 7;
        case "in":
            return 8;
        case "not-in":
            return 9;
        case "between":
            return 10;
        case "not-between":
            return 11;
        case "null":
            return 12;
        case "not-null":
            return 13;
        case "yesterday":
            return 14;
        case "today":
            return 15;
        case "tomorrow":
            return 16;
        case "last-seven-days":
            return 17;
        case "next-seven-days":
            return 18;
        case "last-week":
            return 19;
        case "this-week":
            return 20;
        case "next-week":
            return 21;
        case "last-month":
            return 22;
        case "this-month":
            return 23;
        case "next-month":
            return 24;
        case "last-year":
            return 28;
        case "this-year":
            return 29;
        case "next-year":
            return 30;
        case "last-x-hours":
            return 31;
        case "next-x-hours":
            return 32;
        case "last-x-days":
            return 33;
        case "next-x-days":
            return 34;
        case "last-x-weeks":
            return 35;
        case "next-x-weeks":
            return 36;
        case "last-x-months":
            return 37;
        case "next-x-months":
            return 38;
        case "last-x-years":
            return 39;
        case "next-x-years":
            return 40;
        case "this-fiscal-year":
            return 58;
        case "this-fiscal-period":
            return 59;
        case "next-fiscal-year":
            return 60;
        case "next-fiscal-period":
            return 61;
        case "last-fiscal-year":
            return 62;
        case "last-fiscal-period":
            return 63;
        case "last-x-fiscal-years":
            return 64;
        case "last-x-fiscal-periods":
            return 65;
        case "next-x-fiscal-years":
            return 66;
        case "next-x-fiscal-periods":
            return 67;
        case "in-fiscal-year":
            return 68;
        case "in-fiscal-period":
            return 69;
        case "in-fiscal-period-and-year":
            return 70;
        case "in-or-before-fiscal-period-and-year":
            return 71;
        case "in-or-after-fiscal-period-and-year":
            return 72;
        case "above":
            return 75;
        case "under":
            return 76;
        case "not-under":
            return 77;
        case "eq-or-above":
            return 78;
        case "eq-or-under":
            return 79;
        case "olderthan-x-months":
            return 53;
        case "olderthan-x-years":
            return 82;
        case "olderthan-x-weeks":
            return 83;
        case "olderthan-x-days":
            return 84;
        case "olderthan-x-hours":
            return 85;
        case "olderthan-x-minutes":
            return 86;
        case "contain-values":
            return 87;
        case "not-contain-values":
            return 88;
        case "begins-with":
            return 54;
        case "ends-with":
            return 56;
        case "not-begin-with":
            return 55;
        case "not-end-with":
            return 57;
        case "eq-businessid":
            return 43;
        case "ne-businessid":
            return 44;
        case "eq-userlanguage":
            return 51;
        case "eq-useroruserhierarchy":
            return 80;
        case "eq-useroruserhierarchyandteams":
            return 81;
        case "eq-userteams":
            return 73;
        case "eq-useroruserteams":
            return 74;
        case "eq-userid":
            return 41;
        case "ne-userid":
            return 42;
    }
    return null;
}
function convertFilterOperator(filterOperator) {
    if (!filterOperator) {
        return 0;
    }
    switch (filterOperator) {
        case "and":
            return 0;
        case "or":
            return 1;
    }
    return null;
}
function getNodeAttributeValueFromName(inputNode, attribuetName) {
    if (!inputNode) {
        return null;
    }
    var nodeAttributeMap = inputNode.attributes.getNamedItem(attribuetName);
    return nodeAttributeMap ? nodeAttributeMap.value : null;
}
function isDataSetControl(manifest) {
    if (manifest && manifest.Properties && manifest.Properties.DataSetDefinitions) {
        var definitions = manifest.Properties
            .DataSetDefinitions;
        for (var dataSetKey in definitions) {
            if (manifest.Properties.DataSetDefinitions[dataSetKey] &&
                manifest.Properties.DataSetDefinitions[dataSetKey].Primary) {
                var manifestProperties = manifest.Properties
                    .Properties;
                var hasBoundProperty = false;
                for (var _i = 0, manifestProperties_1 = manifestProperties; _i < manifestProperties_1.length; _i++) {
                    var property = manifestProperties_1[_i];
                    if (property.Usage === 0) {
                        hasBoundProperty = true;
                        break;
                    }
                }
                if (!hasBoundProperty) {
                    return true;
                }
                return false;
            }
        }
    }
    return false;
}
function isQuickFormControl(configuration) {
    if (configuration && configuration.Parameters) {
        for (var paramKey in configuration.Parameters) {
            if (configuration.Parameters[paramKey] && configuration.Parameters[paramKey].Type === ManifestType.QuickForm) {
                return true;
            }
        }
    }
    return false;
}
function getRecordInfoFromControlProps(props) {
    var paramKey = _getQuickFormParameterNameFromConfig(props.configuration);
    var newProps = props.dynamicData.parameters[paramKey];
    var entityTypeName;
    var recordId;
    if (newProps && newProps.getLatestData) {
        var latestData = newProps.getLatestData();
        entityTypeName = latestData
            ? latestData.entityName
            : getEntityTypeFromQuickFormDefaultConfiguration(props.configuration);
        recordId = latestData ? latestData.recordId : getRecordIdFromQuickFormDefaultConfiguration(props.configuration);
    }
    return {
        recordId: recordId,
        entityTypeName: entityTypeName,
    };
}
function _getQuickFormParameterNameFromConfig(configuration) {
    if (configuration && configuration.Parameters) {
        for (var paramKey in configuration.Parameters) {
            if (configuration.Parameters[paramKey] &&
                configuration.Parameters[paramKey].Type === ManifestType.QuickForm &&
                configuration.Parameters[paramKey]
                    .Primary) {
                return paramKey;
            }
        }
    }
    return "value";
}
function _getQuickFormParameterValueFromDefaultConfiguration(configuration, index) {
    var valueParameter = "value";
    var result;
    if (configuration && configuration.Parameters && configuration.Parameters[valueParameter]) {
        var value = configuration.Parameters[valueParameter];
        var data = value.Value ? value.Value.split("|") : null;
        if (data && data.length > index) {
            result = data[index];
        }
    }
    return result;
}
function getEntityTypeFromQuickFormDefaultConfiguration(configuration) {
    var entityTypeIndex = 1;
    return _getQuickFormParameterValueFromDefaultConfiguration(configuration, entityTypeIndex);
}
function getRecordIdFromQuickFormDefaultConfiguration(configuration) {
    var recordIdIndex = 2;
    return _getQuickFormParameterValueFromDefaultConfiguration(configuration, recordIdIndex);
}
export { buildUniqueCustomControlId, buildChildDomId, focusElementById, blurElementById, createCrmUri, openDatasetItemAction, areFilteringObjEqual, areSortingObjEqual, buildTesthookId, buildTabIndexValue, buildTooltipValue, getParentIdFromProps, getRecordSetQueryFromProps, convertFetchXmlToFetchExpression, convertFetchXmlToFilterExpression, getHighContrastEnabled, convertFetchExpressionToFetchXml, convertFilterExpressionToFetchXml, getNodeAttributeValueFromName, isDataSetControl, isQuickFormControl, getRecordInfoFromControlProps, getEntityTypeFromQuickFormDefaultConfiguration, getRecordIdFromQuickFormDefaultConfiguration, };
