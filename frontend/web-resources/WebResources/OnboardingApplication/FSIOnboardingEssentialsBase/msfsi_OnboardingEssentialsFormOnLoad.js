'use strict';

var onboardingEssentials  = window.onboardingEssentials  || {};

const BS_OPTION_SET = 'msfsi_businessscenario';
(function () {
    this.handleStageChanged = function (executionContext) {
        const stage = executionContext.getEventArgs().getStage().getId();
        const channel = 'stage-change';
        const message = JSON.stringify({
            channel,
            data: {
                message: stage,
            },
        });
        parent.postMessage(message, window.origin);
        // Remove when not using IFrame in queue
        parent.top.postMessage(message, window.origin);
    };

    this.formStageChanged = function (executionContext) {
        const formContext = executionContext.getFormContext();
        formContext.data.process.addOnStageChange(this.handleStageChanged);
    };

    this.listenToOpenTabMessage = function (formContext) {
        function openTab(event) {
            const isString = typeof event.data === 'string';
            const hasSameOrigin = event.origin === window.origin;
            if (isString && hasSameOrigin) {
                try {
                    const eventObj = JSON.parse(event.data);
                    if (eventObj.channel === 'open-tab-channel') {
                        const message = eventObj.data.message;
                        if (message.fieldName && message.fieldValue) {
                            const attribute = formContext.getAttribute(message.fieldName);
                            attribute?.setValue(message.fieldValue);
                            attribute?.fireOnChange();
                        }

                        formContext.ui.tabs.get(message.tabName)?.setFocus();
                    }
                } catch { }
            }
        }

        parent.addEventListener('message', openTab);
        // Remove when not using IFrame in queue
        parent.top.addEventListener('message', openTab);
    };

    this.formOnLoad = function (executionContext, disableScenarioFiltering) {
        this.formStageChanged(executionContext);

        const formContext = executionContext.getFormContext();
        formContext.getAttribute('msfsi_applicantlistplaceholder')?.setSubmitMode('never');
        formContext.getAttribute('msfsi_selectedtasksgroupplaceholder')?.setSubmitMode('never');
        this.listenToOpenTabMessage(formContext);


        if (!disableScenarioFiltering) {
            this.filterScenarioLookups(executionContext);
            this.filterOptionSet(executionContext);
        }
    };

    this.handlePostSave = function () {
        const channel = 'post-save';
        const message = JSON.stringify({
            channel,
            data: {
                message: '',
            },
        });
        parent.postMessage(message, window.origin);
        // Remove when not using IFrame in queue
        parent.top.postMessage(message, window.origin);
    };

    this.formOnLoadPostSave = function (executionContext) {
        const formContext = executionContext.getFormContext();
        formContext.data.entity.addOnPostSave(this.handlePostSave);
    };

    this.getBusinessScenarioLookups = function (formContext) {
        const entityType = formContext.entityReference.entityType;
        if (entityType === 'msfsi_relatedpartycontract') {
            return ['msfsi_relatedparty_role'];
        }

        if (entityType === 'msfsi_application') {
            return ['msfsi_category', 'msfsi_archivereason'];
        }

        return [];
    }

    this.getAppBusinessScenario = function () {
        return Number(Xrm.Utility?.getGlobalContext().getCurrentAppSetting('msfsi_businessscenario'));
    };

    this.filterOptionSet = function (executionContext) {
        const formContext = executionContext.getFormContext();

        const businessScenario = this.getAppBusinessScenario();
        if (!businessScenario) {
            return;
        }

        const optionSetControl = formContext.getControl(BS_OPTION_SET);
        if (!optionSetControl || optionSetControl.getControlType() !== 'optionset') {
            return;
        }
        const allOptions = optionSetControl.getOptions() || [];
        const scenarioOption = allOptions.filter(o => o.value === businessScenario)[0];
        if (scenarioOption) {
            optionSetControl.clearOptions();
            optionSetControl.addOption(scenarioOption);
        }

        if(scenarioOption && formContext.ui.getFormType() === 1){
            formContext.getAttribute(BS_OPTION_SET)?.setValue(businessScenario)
        }
    };

    this.disableEditingApplicationTasksFields = function (executionContext){
        const formContext = executionContext.getFormContext();
        if(formContext.ui.getFormType() !== 1){
            formContext.getControl('msfsi_category')?.setDisabled(true);
            formContext.getControl('msfsi_businessscenario')?.setDisabled(true);
        }
        formContext.getAttribute('msfsi_category').setRequiredLevel('required');
        formContext.getAttribute('msfsi_businessscenario').setRequiredLevel('required');
    }

    this.disableEditingPartyTasksFields = function (executionContext){
        const formContext = executionContext.getFormContext();
        if(formContext.ui.getFormType() !== 1){
            formContext.getControl('msfsi_relatedparty_role')?.setDisabled(true);
            formContext.getControl('msfsi_isprimary')?.setDisabled(true);
        }
    }

    this.filterScenarioLookups = function (executionContext) {
        const formContext = executionContext.getFormContext();
        const businessScenario = this.getAppBusinessScenario();
        if (!businessScenario) {
            return;
        }
        this.getBusinessScenarioLookups(formContext).forEach(lookup => {
            const lookupControl = formContext.getControl(lookup);
            lookupControl?.addPreSearch(() => {
                lookupControl?.addCustomFilter(`<filter type="and"><condition attribute="msfsi_businessscenario" operator="eq" value="${businessScenario}" /></filter>`)
            })
        });

    };

}.call(onboardingEssentials));
