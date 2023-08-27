'use strict';

var loanApplicationContact = window.loanApplicationContact || {};

(function () {
    (this.notifyLoanChange = function (executionContext) {
        const formContext = executionContext.getFormContext();
        const formContextId = formContext.data.entity
            .getId()
            .replace(/[{()}]/g, '')
            .toLowerCase();
        const loanApplicationId =
            window &&
            window.parent &&
            window.parent.Xrm &&
            window.parent.Xrm.Page.data.entity
                ?.getId()
                .replace(/[{()}]/g, '')
                .toLowerCase();
        if (formContextId === loanApplicationId) {
            //meaning - the form wasn't opened as part of the loan application form
            return;
        }
        const channel = `loanapp-change-${loanApplicationId}`;
        const message = JSON.stringify({
            channel,
            data: {
                message: loanApplicationId,
                time: Date.now(),
            },
        });
        parent.postMessage(message, window.origin);

        // NOTE: the following channel is only for the elements outside of the `<iframe>` that's why `parent.parent.postMessage`
        const loanAppDataChangeChannel = `loan-data-changed-outside-channel`;
        const loanAppDataChangeMessage = JSON.stringify({
            channel: loanAppDataChangeChannel,
            data: {
                message: loanApplicationId,
                time: Date.now(),
            },
        });
        parent.parent.postMessage(loanAppDataChangeMessage, window.origin);
    }),
        (this.formOnLoadFromSave = function (executionContext) {
            const formContext = executionContext.getFormContext();
            formContext.data.entity.addOnPostSave(this.notifyLoanChange);
        });
}.call(loanApplicationContact));
