var _instance;
var CustomControlSeeMoreStyleHelper = (function () {
    function CustomControlSeeMoreStyleHelper() {
        this._disablingScrollStyle = false;
        this._popupCount = 0;
    }
    CustomControlSeeMoreStyleHelper.getInstance = function () {
        if (!_instance) {
            _instance = new CustomControlSeeMoreStyleHelper();
        }
        return _instance;
    };
    CustomControlSeeMoreStyleHelper.prototype.seeMoreOpen = function () {
        this._popupCount++;
        this.setDisableScrollStyle(true);
    };
    CustomControlSeeMoreStyleHelper.prototype.seeMoreClose = function () {
        this._popupCount--;
        this.setDisableScrollStyle(false);
    };
    CustomControlSeeMoreStyleHelper.prototype.getPopupCount = function () {
        return this._popupCount;
    };
    CustomControlSeeMoreStyleHelper.prototype.getDisableScrollStyle = function () {
        return this._disablingScrollStyle;
    };
    CustomControlSeeMoreStyleHelper.prototype.setDisableScrollStyle = function (value) {
        if (this._disablingScrollStyle !== value) {
            this._disablingScrollStyle = value;
            var webkitValues = document.querySelectorAll(value ? ".webkitScroll" : ".webkitScrollAuto");
            for (var i = 0; i < webkitValues.length; i++) {
                if (value) {
                    webkitValues[i].classList.add("webkitScrollAuto");
                    webkitValues[i].classList.remove("webkitScroll");
                }
                else {
                    webkitValues[i].classList.add("webkitScroll");
                    webkitValues[i].classList.remove("webkitScrollAuto");
                }
            }
            var forceStack = document.querySelectorAll(value ? ".forceNewStackContext" : ".forceNewStackContextInert");
            for (var i = 0; i < forceStack.length; i++) {
                if (value) {
                    forceStack[i].classList.add("forceNewStackContextInert");
                    forceStack[i].classList.remove("forceNewStackContext");
                }
                else {
                    forceStack[i].classList.add("forceNewStackContext");
                    forceStack[i].classList.remove("forceNewStackContextInert");
                }
            }
        }
    };
    return CustomControlSeeMoreStyleHelper;
}());
export { CustomControlSeeMoreStyleHelper };
