import { ManifestType } from "./ManifestType";
import { ContainerControlType, retrieveContainerControlTypeByControlId } from "./DefaultControlMapper";
var LearningPathHelper = (function () {
    function LearningPathHelper() {
    }
    LearningPathHelper.registerToLearningPath = function (element, domAttribute, controlId) {
        if (element && domAttribute && controlId && element.getAttribute(domAttribute) !== controlId) {
            element.setAttribute(domAttribute, controlId);
        }
    };
    LearningPathHelper.getLearningPathControlId = function (bagProps) {
        if (!bagProps.configuration) {
            return null;
        }
        var lpControlId = bagProps.configuration.CustomControlId + "|" + bagProps.controlId;
        if (bagProps.personalizationConfiguration) {
            lpControlId += "|" + bagProps.personalizationConfiguration.entityTypeName;
        }
        var containerType = retrieveContainerControlTypeByControlId(bagProps.configuration.CustomControlId);
        switch (containerType) {
            case ContainerControlType.GridContainer:
            case ContainerControlType.ChartControl:
            case ContainerControlType.CalendarControl:
                lpControlId += _generateLpControlIdForccDataSetControl(bagProps);
                break;
            case ContainerControlType.DashboardContainer:
            case ContainerControlType.QuickCreateForm:
                if (bagProps.personalizationConfiguration && bagProps.personalizationConfiguration.formGuid) {
                    lpControlId += "|" + bagProps.personalizationConfiguration.formGuid.guid;
                }
                break;
            case ContainerControlType.WebresourceControl:
                lpControlId += _generateLpControlIdForWebresource(bagProps);
                break;
            case ContainerControlType.FieldSectionContainer:
            case ContainerControlType.TimelineContainer:
            case ContainerControlType.DummyControl:
            default:
                break;
        }
        return lpControlId;
    };
    LearningPathHelper.LEARNING_PATH_ATTRIBUTE = "data-lp-id";
    return LearningPathHelper;
}());
function _generateLpControlIdForWebresource(bagProps) {
    var lpControlId = "";
    var parameters = bagProps.configuration.Parameters;
    for (var name_1 in parameters) {
        var parameter = parameters[name_1];
        if (parameter.Type === ManifestType.WebResourceHtmlControl) {
            var webresourceParam = parameter;
            lpControlId += "|" + webresourceParam.ControlId;
        }
    }
    return lpControlId;
}
function _generateLpControlIdForccDataSetControl(bagProps) {
    var lpControlId = "";
    var parameters = bagProps.configuration.Parameters;
    for (var name_2 in parameters) {
        var parameter = parameters[name_2];
        if (parameter.Type === ManifestType.Grid) {
            var dataSetParam = parameter;
            if (dataSetParam.ViewId) {
                lpControlId += "|" + dataSetParam.ViewId;
            }
            if (dataSetParam.VisualizationId) {
                lpControlId += "|" + dataSetParam.VisualizationId;
            }
            if (dataSetParam.EntityName) {
                lpControlId += "|" + dataSetParam.EntityName;
            }
            if (dataSetParam.RelationshipName) {
                lpControlId += "|" + dataSetParam.RelationshipName;
            }
        }
    }
    return lpControlId;
}
export { LearningPathHelper };
