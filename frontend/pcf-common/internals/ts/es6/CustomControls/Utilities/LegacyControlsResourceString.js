var LegacyControlsResourceString = (function () {
    function LegacyControlsResourceString() {
    }
    LegacyControlsResourceString.getControlsResourceKeyList = function (controlName) {
        if (!controlName) {
            return null;
        }
        switch (controlName) {
            case "MscrmControls.Calendar.CalendarControl":
                return [
                    "CustomControl_Calendar_AllDayItem",
                    "CustomControl_Calendar_Today",
                    "CustomControl_Calendar_WeekView",
                    "CustomControl_Calendar_MonthView",
                    "CustomControl_Calendar_DayView",
                    "CustomControl_Calendar_ErrorView_DefaultMessage",
                    "CustomControl_Calendar_ViewMore",
                ];
            case "MscrmControls.Containers.FieldSectionItem":
                return ["ProcessControl.RequiredStepTooltip"];
        }
        return null;
    };
    return LegacyControlsResourceString;
}());
export { LegacyControlsResourceString };
