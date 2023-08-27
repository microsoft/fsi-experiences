import * as platformLibraryVersions from "../../resources/PlatformLibraryVersions.json";
declare type PlatformLibraryName = keyof typeof platformLibraryVersions;
declare type PlatformLibraryVersion = typeof platformLibraryVersions[PlatformLibraryName][number];
declare type PlatformLibrary = PlatformLibraryVersion & {
    libName: PlatformLibraryName;
};
export declare const getLatestPlatformLibrariesData: () => PlatformLibrary[];
export declare const getAllPlatformLibrariesData: () => PlatformLibrary[];
export declare const getMatchingPlatformLibraryData: (libName: PlatformLibraryName, libVersion: string) => PlatformLibraryVersion | undefined;
export {};
