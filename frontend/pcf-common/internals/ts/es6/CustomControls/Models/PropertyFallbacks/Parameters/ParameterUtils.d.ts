declare function generateDummySystemParameters(): {
    deviceSizeMode: {
        Usage: CustomControlInterfaces.PropertyUsage;
        Static: boolean;
        Type: string;
        Value: number;
        Primary: boolean;
    };
    viewportSizeMode: {
        Usage: CustomControlInterfaces.PropertyUsage;
        Static: boolean;
        Type: string;
        Value: number;
        Primary: boolean;
    };
    scope: {
        Usage: CustomControlInterfaces.PropertyUsage;
        Static: boolean;
        Type: string;
        Value: number;
        Primary: boolean;
    };
    syncError: {
        Usage: CustomControlInterfaces.PropertyUsage;
        Static: boolean;
        Type: string;
        Value: boolean;
        Primary: boolean;
    };
    isEmpty: {
        Usage: CustomControlInterfaces.PropertyUsage;
        Static: boolean;
        Type: string;
        Value: boolean;
        Primary: boolean;
    };
};
export { generateDummySystemParameters };
