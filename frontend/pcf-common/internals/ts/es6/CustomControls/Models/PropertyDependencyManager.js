var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as CCFUtilities from "../Models/CustomControlUtilityPointers";
var PropertyDependencyManager = (function () {
    function PropertyDependencyManager(ownProps) {
        this._dependencyMapForSchema = {};
        this._propertyValues = {};
        if (!ownProps || !ownProps.manifest || !ownProps.authoringMode) {
            return;
        }
        this._dependencyMapForSchema = this._getDependencyMapForSchema(ownProps.manifest);
        for (var paramName in this._dependencyMapForSchema) {
            this._propertyValues[paramName] = null;
        }
    }
    PropertyDependencyManager.prototype.handleDependencyUpdate = function (ownProps, getOutputSchema, propertyBag) {
        if (!ownProps || !ownProps.manifest || !ownProps.authoringMode || !getOutputSchema) {
            return Promise.resolve();
        }
        var updatedMap = {};
        var updateSchemaNeeded = false;
        var targetArray = [];
        for (var paramName in this._dependencyMapForSchema) {
            var newRawValue = this._getRawValue(ownProps, paramName);
            var rawValHasEquals = !CCFUtilities.IsNullOrUndefined(newRawValue) && newRawValue.equals;
            if (rawValHasEquals
                ? !newRawValue.equals(this._propertyValues[paramName])
                : newRawValue !== this._propertyValues[paramName]) {
                this._propertyValues[paramName] = newRawValue;
                updatedMap[paramName] = newRawValue;
                updateSchemaNeeded = true;
                this._dependencyMapForSchema[paramName].forEach(function (target) {
                    if (targetArray.indexOf(target) === -1) {
                        targetArray.push(target);
                    }
                });
            }
        }
        if (!updateSchemaNeeded) {
            return Promise.resolve();
        }
        var authoringInfoDic = {};
        for (var paramName in this._dependencyMapForSchema) {
            authoringInfoDic[paramName] = {
                value: this._propertyValues[paramName],
                isAuthoringSource: updatedMap[paramName] || false,
            };
        }
        return getOutputSchema(propertyBag, authoringInfoDic).then(function (newSchema) {
            var schema = __assign({}, newSchema);
            for (var targetName in schema) {
                if (targetArray.indexOf(targetName) === -1) {
                    delete schema[targetName];
                }
            }
            if (Object.keys(schema).length > 0) {
                return ownProps.actions.handleOutputSchemaChange(schema);
            }
            return Promise.resolve();
        });
    };
    PropertyDependencyManager.prototype._getRawValue = function (ownProps, paramKey) {
        if (!ownProps ||
            !ownProps.dynamicData ||
            !ownProps.dynamicData.parameters ||
            !ownProps.dynamicData.parameters[paramKey] ||
            !ownProps.dynamicData.parameters[paramKey].hasOwnProperty("raw")) {
            return null;
        }
        return ownProps.dynamicData.parameters[paramKey].raw;
    };
    PropertyDependencyManager.prototype._getDependencyMapForSchema = function (manifest) {
        var dependencyMapForSchema = {};
        if (manifest.PropertyDependencies && manifest.PropertyDependencies.length > 0) {
            manifest.PropertyDependencies.forEach(function (propertyDependency) {
                var dependencyInput = propertyDependency.Input;
                var dependencyOutput = propertyDependency.Output;
                if (dependencyInput && dependencyOutput && propertyDependency.RequiredFor === "schema") {
                    if (!dependencyMapForSchema[dependencyInput]) {
                        dependencyMapForSchema[dependencyInput] = [];
                    }
                    if (dependencyMapForSchema[dependencyInput].indexOf(dependencyOutput) === -1) {
                        dependencyMapForSchema[dependencyInput].push(dependencyOutput);
                    }
                }
            });
        }
        return dependencyMapForSchema;
    };
    return PropertyDependencyManager;
}());
export { PropertyDependencyManager };
