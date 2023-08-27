var RootAppProxy = (function () {
    function RootAppProxy() {
        this.IsAvailable = false;
        this._proxy = window.RootAppServices;
        this._alwaysRenderedControls = new Set();
        this.IsAvailable = !!this._proxy;
        if (!this.IsAvailable) {
            this._proxy = {
                PCF: {
                    forkPCFTree: false,
                    renderChildControl: function () {
                        return null;
                    },
                    rootPageId: "",
                    updateAlwaysRenderState: function () {
                        return null;
                    },
                },
                Commanding: {
                    createCommandManager: null,
                },
                Performance: {
                    WorkBlockTracker: {
                        trackWork: function () {
                            return function () {
                                return null;
                            };
                        },
                    },
                    PerformanceOutput: {
                        createEvent: function () {
                            return null;
                        },
                    },
                },
                Xrm: null,
            };
        }
        if (!this._proxy.PCF && this._proxy.renderChildControl) {
            this._proxy.PCF = {
                forkPCFTree: this._proxy.forkPCFTree,
                renderChildControl: this._proxy.renderChildControl,
                rootPageId: this._proxy.rootPageId,
                updateAlwaysRenderState: this._proxy.updateAlwaysRenderState,
            };
        }
    }
    Object.defineProperty(RootAppProxy.prototype, "PCF", {
        get: function () {
            return this._proxy.PCF;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootAppProxy.prototype, "Performance", {
        get: function () {
            return this._proxy.Performance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RootAppProxy.prototype, "Commanding", {
        get: function () {
            return this._proxy.Commanding;
        },
        enumerable: false,
        configurable: true
    });
    RootAppProxy.prototype.requestAlwaysRender = function (controlId, alwaysRenderState) {
        var originalPageState = !!this._alwaysRenderedControls.size;
        if (alwaysRenderState) {
            this._alwaysRenderedControls.add(controlId);
        }
        else {
            this._alwaysRenderedControls.delete(controlId);
        }
        if (originalPageState !== !!this._alwaysRenderedControls.size && this._proxy.PCF.updateAlwaysRenderState) {
            this._proxy.PCF.updateAlwaysRenderState(!!this._alwaysRenderedControls.size);
        }
    };
    return RootAppProxy;
}());
var instance = new RootAppProxy();
export { RootAppProxy, instance };
