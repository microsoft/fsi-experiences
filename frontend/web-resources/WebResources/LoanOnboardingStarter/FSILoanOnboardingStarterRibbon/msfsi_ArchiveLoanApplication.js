'use strict';

var getEntityId = function (formcontext) {
  return formcontext.data.entity.getId().replace('{', '').replace('}', '');
};

var ArchiveLoanApplication = window.ArchiveLoanApplication || {};

(function () {
  (this.showHideCancelArchiveButton = function (formContext) {
    var stateCode = formContext.getAttribute('statecode').getValue();
    var businessScenario = formContext.getAttribute('msfsi_businessscenario').getValue();
    var applicationId = getEntityId(formContext);
    if (stateCode === 0 && applicationId && businessScenario === 104800001) {
      return true;
    }

    return false;
  }),
    (this.cancelAndArchiveApplication = function (formContext) {
      var applicationId = getEntityId(formContext);
      const successChannelName = 'archive-application-success';
      const msgToSend = JSON.stringify({
        channel: 'archive-application',
        data: {
          message: applicationId,
        },
      });
      parent.parent.postMessage(msgToSend, window.origin);

      const handleSuccessfulArchiveMessage = function (event) {
        const isString = typeof event.data === 'string';
        const hasSameOrigin = event.origin === window.origin;

        if (isString && hasSameOrigin) {
          const message = JSON.parse(event.data);
          if (message.channel === successChannelName && message.data.message === 'SUCCESS') {
            parent.parent.removeEventListener('message', handleSuccessfulArchiveMessage);
            formContext.data.refresh();
          }
        }
      };

      parent.parent.addEventListener('message', handleSuccessfulArchiveMessage);
    });
}.call(ArchiveLoanApplication));
