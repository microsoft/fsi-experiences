var SeeMoreStatus;
(function (SeeMoreStatus) {
    SeeMoreStatus[SeeMoreStatus["NotInUse"] = -1] = "NotInUse";
    SeeMoreStatus[SeeMoreStatus["PopFadeOutAndMove"] = 0] = "PopFadeOutAndMove";
    SeeMoreStatus[SeeMoreStatus["PopFadeIn"] = 1] = "PopFadeIn";
    SeeMoreStatus[SeeMoreStatus["PoppedOut"] = 2] = "PoppedOut";
    SeeMoreStatus[SeeMoreStatus["ReturnFadeOutAndMove"] = 3] = "ReturnFadeOutAndMove";
    SeeMoreStatus[SeeMoreStatus["ReturnFadeIn"] = 4] = "ReturnFadeIn";
})(SeeMoreStatus || (SeeMoreStatus = {}));
export { SeeMoreStatus };
