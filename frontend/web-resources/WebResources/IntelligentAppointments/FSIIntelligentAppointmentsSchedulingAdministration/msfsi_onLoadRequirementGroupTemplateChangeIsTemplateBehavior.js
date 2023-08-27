"use strict";
var IsTemplate = "msdyn_istemplate";
var RequirementGroupControl="msdyn_requirementgrouptemplateid";
var RequirementGroup = window.RequirementGroup || {};
(function () {
  this.formOnload = function (executionContext) {
    var formContext = executionContext.getFormContext();
    this.changeIsTemplateValue(formContext);
  };
  this.changeIsTemplateValue = function (formContext) {
    if (formContext) {
      formContext.getAttribute(IsTemplate).setValue(true);
      formContext.getControl(RequirementGroupControl).setVisible(false);
    }
  };
}).call(RequirementGroup);