'use strict';

var getEntityId = function (formcontext) {
    return formcontext.data.entity.getId().replace('{', '').replace('}', '');
};
var loanApplicationCore = window.loanApplicationCore || {};
(function () {
    (this.showHideCancelArchiveButton = function (formContext) {
        var stateCode = formContext.getAttribute('statecode').getValue();
        var loanApplicationId = getEntityId(formContext);
        if (stateCode === 0 && loanApplicationId) {
            return true;
        } else {
            return false;
        }
    }),
        (this.cancelAndArchiveLoanApplication = function (formContext) {
            var loanApplicationId = getEntityId(formContext);
            const loanArchiveSuccessChannelName = 'loan-archive-success';
            const msgToSend = JSON.stringify({
                channel: 'loan-archive',
                data: {
                    message: loanApplicationId,
                },
            });
            parent.parent.postMessage(msgToSend, window.origin);

            const handleSuccessfulArchiveMessage = function (event) {
                const isString = typeof event.data === 'string';
                const hasSameOrigin = event.origin === window.origin;

                if (isString && hasSameOrigin) {
                    const message = JSON.parse(event.data);
                    if (message.channel === loanArchiveSuccessChannelName && message.data.message === 'SUCCESS') {
                        parent.parent.removeEventListener('message', handleSuccessfulArchiveMessage);
                        formContext.data.refresh();
                    }
                }
            };

            parent.parent.addEventListener('message', handleSuccessfulArchiveMessage);
        });
}.call(loanApplicationCore));
