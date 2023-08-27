'use strict';

const tabName = 'LOAN_INFORMATION_TAB';
const sectMortgage = 'LOAN_INF_MORTGAGE_SECTION';
const sectInformation = 'LOAN_INFORMATION_SECTION';
const sectCollaterals = 'COLLATERALS_SECTION';
const loanApplicationEntityName = 'msfsi_loanapplication';
const loanCategory = {
    Secured: 104800000,
    Unsecured: 104800001,
    Mortgage: 104800002,
};
const loanStatusReason = {
    InReviewInactive: 104800008,
    InReviewActive: 104800001,
    OnHoldInactive: 104800010,
    OnHoldActive: 104800003,
};
const statusReasonName = 'statuscode';

var loanApplication = window.loanApplication || {};

(function () {
    this.isSmallScreen = false;
    var originalStatusReason = '';
    var isStatusChanged = false;

    this.handleFormReload = function (id, formContext) {
        if (isStatusChanged) {
            const tabs = formContext.ui.tabs.getAll();
            parent.formFirstTabName = tabs[0].getName();
            parent.lastTabOpenedName = tabs.find(tab => tab.getDisplayState() === 'expanded').getName();
            Xrm.Navigation.openForm({
                entityName: loanApplicationEntityName,
                entityId: id,
            });
        }
    };
    (this.loanApplicationForm = function (executionContext) {
        var formContext = executionContext.getFormContext();
        originalStatusReason = formContext.getAttribute('statuscode').getValue();
        formContext.getAttribute('msfsi_lookupplaceholder').setSubmitMode('never');
        parent.tabsManager = formContext.ui.tabs;
        if (parent.lastTabOpenedName && parent.formFirstTabName) {
            formContext.ui.tabs.get(parent.formFirstTabName).setDisplayState('collapsed');
            formContext.ui.tabs.get(parent.lastTabOpenedName).setDisplayState('expanded');
        }
        loanApplication.lockFieldsAccordingToStatusReason(executionContext);
        if (!formContext.data.entity.getId()) return false;

        var entityName = formContext.data.entity.getEntityName();
        var id = formContext.data.entity.getId();

        Xrm.WebApi.retrieveRecord(entityName, id, '?$select=msfsi_loancategory').then(function (callback) {
            if (!callback) return false;

            var loanCategoryNumber = callback.msfsi_loancategory;
            loanApplication.setTabVisibility(formContext, loanCategoryNumber);
        });
    }),
        (this.lockFieldsAccordingToStatusReason = function (executionContext) {
            var formContext = executionContext.getFormContext();
            var statusCode = formContext.getAttribute(statusReasonName).getValue();
            if (
                statusCode != loanStatusReason.InReviewActive &&
                statusCode != loanStatusReason.InReviewInactive &&
                statusCode != loanStatusReason.OnHoldActive &&
                statusCode != loanStatusReason.OnHoldInactive
            ) {
                formContext.ui.controls.get().forEach(control => control.setDisabled(true));
                formContext.ui.tabs.get('PARTIES_INFORMATION_TAB').sections.get('parties_form').setVisible(false);
                formContext.ui.tabs.get('PARTIES_INFORMATION_TAB').sections.get('readonly_form_section').setVisible(true);
            }
        }),
        (this.setTabVisibility = function (formContext, loanCategoryNumber) {
            var tab = formContext.ui.tabs.get(tabName);
            switch (loanCategoryNumber) {
                case loanCategory.Mortgage:
                    tab.sections.get(sectMortgage).setVisible(true);
                    tab.sections.get(sectInformation).setVisible(false);
                    tab.sections.get(sectCollaterals).setVisible(true);
                    break;
                case loanCategory.Secured:
                    tab.sections.get(sectMortgage).setVisible(false);
                    tab.sections.get(sectInformation).setVisible(true);
                    tab.sections.get(sectCollaterals).setVisible(true);
                    break;
                case loanCategory.Unsecured:
                    tab.sections.get(sectMortgage).setVisible(false);
                    tab.sections.get(sectInformation).setVisible(true);
                    tab.sections.get(sectCollaterals).setVisible(false);
                    break;
                default:
                    tab.sections.get(sectMortgage).setVisible(false);
                    tab.sections.get(sectInformation).setVisible(true);
                    tab.sections.get(sectCollaterals).setVisible(false);
                    break;
            }
        }),
        (this.validateEntityName = function (primaryControl) {
            var formContext = primaryControl.getFormContext();
            let entityName = formContext.data.entity.getEntityName();

            if (entityName === loanApplicationEntityName) return true;
            else return false;
        }),
        (this.enableRuleShowLoansButton = function (formContext) {
            return this.isSmallScreen;
        }),
        (this.showLoansList = function (formContext) {
            const channel = `loans-list-show`;
            const message = JSON.stringify({
                channel,
                data: {
                    message: 'showList',
                    time: Date.now(),
                },
            });
            // send response to outside of the iframe
            parent.parent.postMessage(message, window.origin);
        }),
        (this.notifyFormIsLoaded = function (executionContext) {
            // only for HTML outside of the iframe
            const channel = `on-loanapp-form-load-outer-channel`;
            const message = JSON.stringify({
                channel,
                data: {
                    message: 'isLoaded',
                    time: Date.now(),
                },
            });
            // send response to outside of the iframe
            parent.parent.postMessage(message, window.origin);
        }),
        (this.notifyLoanChange = function (executionContext) {
            const formContext = executionContext.getFormContext();
            const id = formContext.data.entity
                .getId()
                .replace(/[{()}]/g, '')
                .toLowerCase();
            const channel = `loanapp-change-${id}`;
            const message = JSON.stringify({
                channel,
                data: {
                    message: id,
                    time: Date.now(),
                },
            });
            parent.postMessage(message, window.origin);
            loanApplication.handleFormReload(id, formContext);
        }),
        (this.formOnLoadFromSave = function (executionContext) {
            const formContext = executionContext.getFormContext();
            formContext.data.entity.addOnPostSave(this.notifyLoanChange);
        }),
        (this.handleStageChanged = function (executionContext) {
            const formContext = executionContext.getFormContext();
            const channel = 'loan-stage-change';
            const id = formContext.data.entity
                .getId()
                .replace(/[{()}]/g, '')
                .toLowerCase();
            const message = JSON.stringify({
                channel,
                data: {
                    message: id,
                    time: Date.now(),
                },
            });
            parent.parent.postMessage(message, window.origin);
            loanApplication.handleFormReload(id, formContext);
        }),
        (this.formStageChanged = function (executionContext) {
            const formContext = executionContext.getFormContext();
            formContext.data.process.addOnStageChange(this.handleStageChanged);
        });

    this.onMatchMediaChangeHandler = function (formContext, e) {
        this.isSmallScreen = e.matches;

        formContext.ui.refreshRibbon(true);
    };
    this.handleLoanStatusChanged = function (executionContext) {
        const formContext = executionContext.getFormContext();
        const currentStatusReason = formContext.getAttribute('statuscode').getValue();
        isStatusChanged = originalStatusReason !== currentStatusReason;
    };
    this.onLoanStatusChanged = function (executionContext) {
        const formContext = executionContext.getFormContext();
        formContext.getAttribute('statuscode').addOnChange(this.handleLoanStatusChanged);
    };

    this.formOnLoad = function (executionContext) {
        this.loanApplicationForm(executionContext);
        this.formStageChanged(executionContext);
        this.notifyFormIsLoaded(executionContext);
        this.onLoanStatusChanged(executionContext);

        const formContext = executionContext.getFormContext();

        const onMatchMediaChangeHandlerBound = this.onMatchMediaChangeHandler.bind(this, formContext);

        // NOTE: Changing this @media query you will also have to change the @media query break point in `LoanOnboarding.const.ts`
        const matchMediaObj = parent.parent.matchMedia('screen and (max-width: 1000px)');
        matchMediaObj.addEventListener('change', onMatchMediaChangeHandlerBound);

        // call once, on form load
        this.onMatchMediaChangeHandler(formContext, matchMediaObj);
    };
}.call(loanApplication));
