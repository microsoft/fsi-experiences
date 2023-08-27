/// <reference types="react" />
import { Theme, ColorTokens, BrandVariants } from "@fluentui/react-components";
export declare const DEFAULT_DESIGN_BAG: ColorTokens;
export declare function generateTruncatedDesignBag(fullTheme: Theme): ColorTokens;
export declare function wrapElementInProviders(element: JSX.Element, theme?: any, brandVariants?: BrandVariants): JSX.Element;
