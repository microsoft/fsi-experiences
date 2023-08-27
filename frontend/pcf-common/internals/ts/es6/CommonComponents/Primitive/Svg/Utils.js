function getSvg(url, token) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var svgString = xhr.responseText;
                if (/<svg[\s\S]*>/i.test(svgString)) {
                    resolve(_convertStringToSvgElement(svgString));
                }
                else {
                    reject(new Error("Provided file isn't a valid SVG"));
                }
            }
        };
        xhr.open("GET", url, true);
        token && xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.send();
    });
    function _convertStringToSvgElement(svgString) {
        var domParser = new DOMParser();
        var parsedData = domParser.parseFromString(svgString, "text/xml");
        return parsedData.getElementsByTagName("svg")[0];
    }
}
function parseSvg(url, token) {
    return getSvg(url, token).then(function (svg) {
        var svgProps = null;
        if (svg) {
            sanitizeSvgInPlace(svg);
            svgProps = getSvgAttrsAsReactProps(svg);
            svgProps.dangerouslySetInnerHTML = { __html: getInnerXML(svg) };
            svgProps = Object.freeze(svgProps);
        }
        return svgProps;
    });
    function sanitizeSvgInPlace(element) {
        var scriptTags = element.getElementsByTagName("script");
        for (var i = scriptTags.length - 1; i >= 0; i--) {
            scriptTags[i].parentNode.removeChild(scriptTags[i]);
        }
    }
    function getInnerXML(element) {
        var serializer = new XMLSerializer();
        return Array.prototype.reduce.call(element.childNodes, function (acc, child) { return acc + serializer.serializeToString(child); }, "");
    }
    function getSvgAttrsAsReactProps(element) {
        var props = {};
        for (var i = 0; i < element.attributes.length; i++) {
            var name_1 = element.attributes[i].name;
            var value = element.attributes[i].value;
            if (name_1 === "style") {
                value = convertStyleStringToReactStyles(value);
            }
            else if (name_1 === "class") {
                name_1 = "className";
            }
            props[name_1] = value;
        }
        return props;
        function convertStyleStringToReactStyles(styleStr) {
            if (!styleStr) {
                return null;
            }
            var rules = styleStr.split(";").filter(function (x) { return x && x.indexOf(":") !== -1; });
            var style = {};
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                var splittedRule = rule.split(":");
                var key = splittedRule[0].trim().replace(/-\S/g, function (str) { return str[1].toUpperCase(); });
                var value = splittedRule[1].trim();
                style[key] = value;
            }
            return style;
        }
    }
}
export { parseSvg };
