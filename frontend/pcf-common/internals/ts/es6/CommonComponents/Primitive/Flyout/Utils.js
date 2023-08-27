import { FlyoutDirection } from "./FlyoutDirection";
import { COMPONENT_NAME } from "../../../CustomControls/Utilities/TelemetryManager";
import { instance as XrmProxy } from "../../../CustomControls/Utilities/XrmProxy";
var NATIVE_SHIM = "topBar-mobile";
function getDocumentViewportSize() {
    return {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
    };
}
function getDocumentViewportOffset() {
    var mobileTopBar = document.getElementById(NATIVE_SHIM);
    var documentContentSize = getDocumentContentSize();
    var documentSize = getDocumentViewportSize();
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop,
        right: documentContentSize.width - documentSize.width - document.body.scrollLeft,
        bottom: mobileTopBar
            ? mobileTopBar.offsetHeight
            : documentContentSize.height - documentSize.height - document.body.scrollTop,
    };
}
function getDocumentContentSize() {
    return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
    };
}
function getElementFullSize(element) {
    return {
        width: element.offsetWidth - element.clientWidth + element.scrollWidth,
        height: element.offsetHeight - element.clientHeight + element.scrollHeight,
    };
}
function calculateClipping(position, size, documentSize, documentOffset) {
    if (documentSize === void 0) { documentSize = getDocumentViewportSize(); }
    if (documentOffset === void 0) { documentOffset = getDocumentViewportOffset(); }
    var result = {};
    var localSize = {
        width: size.maxWidth && size.width && size.maxWidth > 0 && size.maxWidth < size.width
            ? size.maxWidth
            : size.width
                ? size.width
                : 0,
        height: size.maxHeight && size.height && size.maxHeight > 0 && size.maxHeight < size.height
            ? size.maxHeight
            : size.height
                ? size.height
                : 0,
    };
    if (typeof position.left === "number") {
        result.width = Math.max(documentOffset.left - position.left, 0);
        result.width += Math.max(position.left + localSize.width - documentSize.width - documentOffset.left, 0);
    }
    else if (typeof position.right === "number") {
        result.width = Math.max(documentOffset.right - position.right, 0);
        result.width += Math.max(position.right + localSize.width - documentSize.width - documentOffset.right, 0);
    }
    if (typeof position.top === "number") {
        result.height = Math.max(documentOffset.top - position.top, 0);
        result.height += Math.max(position.top + localSize.height - documentSize.height - documentOffset.top, 0);
    }
    else if (typeof position.bottom === "number") {
        result.height = Math.max(documentOffset.bottom - position.bottom, 0);
        result.height += Math.max(position.bottom + localSize.height - documentSize.height - documentOffset.bottom, 0);
    }
    return result;
}
function calculateMaximumSize(position, documentSize, documentOffset) {
    if (documentSize === void 0) { documentSize = getDocumentViewportSize(); }
    if (documentOffset === void 0) { documentOffset = getDocumentViewportOffset(); }
    var result = {};
    if (typeof position.left === "number") {
        result.maxWidth = Math.floor(documentSize.width + documentOffset.left - position.left);
    }
    else if (typeof position.right === "number") {
        result.maxWidth = Math.floor(documentSize.width + documentOffset.right - position.right);
    }
    if (typeof position.top === "number" || typeof position.bottom === "number") {
        result.maxHeight = Math.floor(documentSize.height + documentOffset.top - position.top);
    }
    return result;
}
function isOutOfRange(flyoutNode, container) {
    return (flyoutNode.getBoundingClientRect().top < container.getBoundingClientRect().top ||
        flyoutNode.getBoundingClientRect().bottom > container.getBoundingClientRect().bottom);
}
function getDirectionPriorities(initialDirection) {
    switch (initialDirection) {
        case FlyoutDirection.down:
            return [
                FlyoutDirection.down,
                FlyoutDirection.downleft,
                FlyoutDirection.up,
                FlyoutDirection.upleft,
                FlyoutDirection.right,
                FlyoutDirection.rightup,
                FlyoutDirection.left,
                FlyoutDirection.leftup,
            ];
        case FlyoutDirection.downleft:
            return [
                FlyoutDirection.downleft,
                FlyoutDirection.down,
                FlyoutDirection.upleft,
                FlyoutDirection.up,
                FlyoutDirection.right,
                FlyoutDirection.rightup,
                FlyoutDirection.left,
                FlyoutDirection.leftup,
            ];
        case FlyoutDirection.right:
            return [
                FlyoutDirection.right,
                FlyoutDirection.rightup,
                FlyoutDirection.left,
                FlyoutDirection.leftup,
                FlyoutDirection.down,
                FlyoutDirection.downleft,
                FlyoutDirection.up,
                FlyoutDirection.upleft,
            ];
        case FlyoutDirection.rightup:
            return [
                FlyoutDirection.rightup,
                FlyoutDirection.right,
                FlyoutDirection.leftup,
                FlyoutDirection.left,
                FlyoutDirection.down,
                FlyoutDirection.downleft,
                FlyoutDirection.up,
                FlyoutDirection.upleft,
            ];
        case FlyoutDirection.up:
            return [
                FlyoutDirection.up,
                FlyoutDirection.upleft,
                FlyoutDirection.down,
                FlyoutDirection.downleft,
                FlyoutDirection.right,
                FlyoutDirection.rightup,
                FlyoutDirection.left,
                FlyoutDirection.leftup,
            ];
        case FlyoutDirection.upleft:
            return [
                FlyoutDirection.upleft,
                FlyoutDirection.up,
                FlyoutDirection.downleft,
                FlyoutDirection.down,
                FlyoutDirection.right,
                FlyoutDirection.rightup,
                FlyoutDirection.left,
                FlyoutDirection.leftup,
            ];
        case FlyoutDirection.left:
            return [
                FlyoutDirection.left,
                FlyoutDirection.leftup,
                FlyoutDirection.right,
                FlyoutDirection.rightup,
                FlyoutDirection.down,
                FlyoutDirection.downleft,
                FlyoutDirection.up,
                FlyoutDirection.upleft,
            ];
        case FlyoutDirection.leftup:
            return [
                FlyoutDirection.leftup,
                FlyoutDirection.left,
                FlyoutDirection.rightup,
                FlyoutDirection.right,
                FlyoutDirection.down,
                FlyoutDirection.downleft,
                FlyoutDirection.up,
                FlyoutDirection.upleft,
            ];
        default:
            var jsonDirection = "";
            try {
                jsonDirection = JSON.stringify(initialDirection);
            }
            catch (exception) {
                jsonDirection = "Unable to parse initial direction";
            }
            var error = new Error("Unexpected initial direction: " + jsonDirection);
            XrmProxy.Reporting.reportFailure(COMPONENT_NAME + ".Primitive.Flyout", error);
            throw error;
    }
}
function calculateFlyoutPreferredPosition(size, preferredDirection, anchorElement, secondaryPreferred) {
    if (!size) {
        return {
            Position: calculateFlyoutPosition(size, preferredDirection, anchorElement),
            Direction: preferredDirection,
        };
    }
    var priorityList;
    if (secondaryPreferred !== null && secondaryPreferred !== preferredDirection) {
        priorityList = getDirectionPriorities(secondaryPreferred);
        priorityList.splice(priorityList.indexOf(preferredDirection), 1);
        priorityList.unshift(preferredDirection);
    }
    else {
        priorityList = getDirectionPriorities(preferredDirection);
    }
    var directionBest = preferredDirection;
    var clippingBest;
    var positionBest;
    for (var _i = 0, priorityList_1 = priorityList; _i < priorityList_1.length; _i++) {
        var direction = priorityList_1[_i];
        var position = calculateFlyoutPosition(size, direction, anchorElement);
        var clipping = calculateClipping(position, size);
        if (clipping.height === 0 && clipping.width === 0) {
            positionBest = position;
            directionBest = direction;
            clippingBest = clipping;
            break;
        }
        if (!clippingBest) {
            positionBest = position;
            directionBest = direction;
            clippingBest = clipping;
        }
        else {
            var clippingBestSum = clippingBest.width + clippingBest.height;
            var clippingSum = clipping.width + clipping.height;
            if (clippingSum < clippingBestSum) {
                positionBest = position;
                directionBest = direction;
                clippingBest = clipping;
            }
        }
    }
    return {
        Position: positionBest,
        Direction: directionBest,
    };
}
function calculateFlyoutPosition(size, flyoutDirection, anchorElement) {
    var itemOffset = getOffset(anchorElement, document.body);
    var itemRectVp = anchorElement.getBoundingClientRect();
    var bodySize = getDocumentViewportSize();
    var itemRect = {
        top: itemOffset.top,
        left: itemOffset.left,
        width: itemRectVp.width,
        height: itemRectVp.height,
        right: itemOffset.left + itemRectVp.width,
        bottom: itemOffset.top + itemRectVp.height,
    };
    var top = itemRect.top;
    var left = itemRect.right;
    var right = null;
    var bottom = null;
    function getMaxWidth() {
        return size.maxWidth && size.maxWidth < size.width ? size.maxWidth : size.width;
    }
    function getMaxHeight() {
        return size.maxHeight && size.maxHeight < size.height ? size.maxHeight : size.height;
    }
    switch (flyoutDirection) {
        case FlyoutDirection.rightup:
            if (size && size.height) {
                top = itemRect.bottom - getMaxHeight();
            }
            else {
                top = undefined;
                bottom = bodySize.height - itemRect.bottom;
            }
            break;
        case FlyoutDirection.up:
            if (size && size.height) {
                top = itemRect.top - getMaxHeight();
            }
            else {
                bottom = bodySize.height - itemRect.top;
                top = undefined;
            }
            left = itemRect.left;
            break;
        case FlyoutDirection.upleft:
            if (size && size.height) {
                top = itemRect.top - getMaxHeight();
            }
            else {
                bottom = bodySize.height - itemRect.top;
                top = undefined;
            }
            if (size && size.width) {
                left = itemRect.right - getMaxWidth();
            }
            else {
                left = undefined;
                right = bodySize.width - itemRect.right;
            }
            break;
        case FlyoutDirection.down:
            top = itemRect.bottom;
            left = itemRect.left;
            break;
        case FlyoutDirection.downleft:
            top = itemRect.bottom;
            if (size && size.width) {
                left = itemRect.right - getMaxWidth();
            }
            else {
                left = undefined;
                right = bodySize.width - itemRect.right;
            }
            break;
        case FlyoutDirection.left:
            top = itemRect.top;
            if (size && size.width) {
                left = itemRect.left - getMaxWidth();
            }
            else {
                right = bodySize.width - itemRect.left;
            }
            break;
        case FlyoutDirection.leftup:
            if (size && size.height) {
                top = itemRect.bottom - getMaxHeight();
            }
            else {
                top = undefined;
                bottom = bodySize.height - itemRect.bottom;
            }
            if (size && size.width) {
                left = itemRect.left - getMaxWidth();
            }
            else {
                right = bodySize.width - itemRect.left;
            }
            break;
    }
    return { left: left, top: top, right: right, bottom: bottom };
}
function getOffset(element, topParent) {
    if (topParent === void 0) { topParent = document.body; }
    var topParentRect = topParent.getBoundingClientRect();
    var elementRect = element.getBoundingClientRect();
    return { top: elementRect.top - topParentRect.top, left: elementRect.left - topParentRect.left };
}
function isScrollable(element) {
    var computedStyle = window.getComputedStyle(element);
    return (element &&
        computedStyle &&
        (computedStyle.overflow === "auto" ||
            computedStyle.overflow === "scroll" ||
            computedStyle.overflowX === "auto" ||
            computedStyle.overflowX === "scroll" ||
            computedStyle.overflowY === "auto" ||
            computedStyle.overflowY === "scroll"));
}
function getScrollableAncestors(element, topParent) {
    var result = [];
    element = element && element.parentElement;
    while (element && element !== topParent) {
        if (isScrollable(element))
            result.push(element);
        element = element.parentElement;
    }
    return result;
}
export { calculateFlyoutPosition, calculateFlyoutPreferredPosition, calculateClipping, calculateMaximumSize, isScrollable, isOutOfRange, getScrollableAncestors, getDocumentViewportOffset, getElementFullSize, getDocumentContentSize, };
