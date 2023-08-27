var StringBuilder = (function () {
    function StringBuilder(initialText) {
        this._text = "";
        if (initialText) {
            this._text = initialText.toString();
        }
    }
    StringBuilder.prototype.append = function (text) {
        this._text += text;
    };
    StringBuilder.prototype.toString = function () {
        return this._text;
    };
    return StringBuilder;
}());
export { StringBuilder };
