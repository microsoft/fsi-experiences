'use strict';
const MeetingDefaultChannel = 'msfsi_meetingdefaultchannel';
const MeetingChannelLimitation = 'msfsi_meetingchannellimitation';
const OnlineOnly = 104800000;
const OnLocationOnly = 104800001;
const OnlineOrOnLocation = 104800002;
var MeetingDefaultMethod = window.MeetingDefaultMethod || {};

(function () {
    this.formOnLoadAndOnChangeField = function (executionContext) {
        const formContext = executionContext.getFormContext();
        this.hideMeetingDefaultChannelOption(formContext);
    };

    this.hideMeetingDefaultChannelOption = function (formContext) {
        if (!formContext) {
            return;
        }
        const meetingDefaultChannelControl = formContext.getControl(MeetingDefaultChannel);
        const meetingChannelLimitationControl = formContext.getControl(MeetingChannelLimitation);

        if (!meetingChannelLimitationControl || !meetingDefaultChannelControl) {
            return;
        }

        const meetingDefaultChannelTypes = formContext.getAttribute(MeetingDefaultChannel).getOptions();
        const channelLimitationValue = meetingChannelLimitationControl.getAttribute().getValue();
        meetingDefaultChannelControl.clearOptions();

        if (channelLimitationValue === OnlineOnly) {
            const meetingDefaultType = meetingDefaultChannelTypes?.find(option => option.value === OnlineOnly);
            meetingDefaultType && meetingDefaultChannelControl.addOption(meetingDefaultType);
        }

        if (channelLimitationValue === OnLocationOnly) {
            const meetingDefaultType = meetingDefaultChannelTypes?.find(option => option.value === OnLocationOnly);
            meetingDefaultType && meetingDefaultChannelControl.addOption(meetingDefaultType);
        }

        if (channelLimitationValue === OnlineOrOnLocation) {
            for (let i = 0; i < meetingDefaultChannelTypes.length; i++) {
                meetingDefaultChannelControl.addOption(meetingDefaultChannelTypes[i]);
            }
        }
    };
}.call(MeetingDefaultMethod));
