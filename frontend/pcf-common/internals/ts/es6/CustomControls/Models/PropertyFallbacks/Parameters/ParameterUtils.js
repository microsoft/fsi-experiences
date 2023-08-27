function generateDummySystemParameters() {
    var deviceSizeMode = {
        Usage: 1,
        Static: true,
        Type: "WholeNumber.None",
        Value: 0,
        Primary: false,
    };
    var viewportSizeMode = {
        Usage: 1,
        Static: true,
        Type: "WholeNumber.None",
        Value: 0,
        Primary: false,
    };
    var scope = {
        Usage: 1,
        Static: true,
        Type: "WholeNumber.None",
        Value: 1,
        Primary: false,
    };
    var syncError = {
        Usage: 1,
        Static: true,
        Type: "TwoOptions",
        Value: false,
        Primary: false,
    };
    var isEmpty = {
        Usage: 1,
        Static: true,
        Type: "TwoOptions",
        Value: false,
        Primary: false,
    };
    return {
        deviceSizeMode: deviceSizeMode,
        viewportSizeMode: viewportSizeMode,
        scope: scope,
        syncError: syncError,
        isEmpty: isEmpty,
    };
}
export { generateDummySystemParameters };
