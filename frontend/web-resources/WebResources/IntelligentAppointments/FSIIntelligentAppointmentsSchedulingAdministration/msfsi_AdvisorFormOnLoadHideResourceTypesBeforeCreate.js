"use strict";
const ResourceType = "resourcetype";
const UserResourceTypeValue = 3;

var BookableResource = window.BookableResource || {};

(function () {
    this.formOnLoad = function (executionContext) {
        const formContext = executionContext.getFormContext();
        this.hideResourceTypes(formContext);
    }

    this.hideResourceTypes = function (formContext) {
        if (formContext) {
            const resourceTypeControl = formContext.getControl(ResourceType);
            
            if (resourceTypeControl) {
                const userResourceType = resourceTypeControl.getOptions()?.find(option => option.value === UserResourceTypeValue);
                resourceTypeControl.clearOptions();
                userResourceType && resourceTypeControl.addOption(userResourceType)
            }
        }
    }
}).call(BookableResource);