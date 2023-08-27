/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var commonSemanticColors = {
    link: '#8D308D',
    linkHovered: '#501b50'
};
export var DefaultGrayscalePalette = {
    white: '#fff',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#bab8b7',
    neutralSecondary: '#a3a2a0',
    neutralPrimaryAlt: '#8d8b8a',
    neutralDark: '#605e5d',
    neutralPrimary: '#323130',
    black: '#000'
};
export var PowerAppsGrayscalePalette = {
    white: '#fff',
    neutralLighterAlt: '#FAF9F8',
    neutralLighter: '#F3F2F1',
    neutralLight: '#EDEBE9',
    neutralQuaternaryAlt: '#E1DFDD',
    neutralQuaternary: '#D2D0CE',
    neutralTertiaryAlt: '#C8C6C4',
    neutralTertiary: '#BEBBB8',
    neutralSecondary: '#A19F9D',
    neutralPrimaryAlt: '#8A8886',
    neutralDark: '#605E5C',
    neutralPrimary: '#323130',
    black: '#000'
};
export var DefaultTheme = {
    palette: __assign({ themePrimary: '#0078d4', themeLighterAlt: '#f3f9fd', themeLighter: '#d0e7f8', themeLight: '#a9d3f2', themeTertiary: '#5ca9e5', themeSecondary: '#1a86d9', themeDarkAlt: '#006cbe', themeDark: '#005ba1', themeDarker: '#004377' }, DefaultGrayscalePalette),
    semanticColors: __assign({}, commonSemanticColors)
};
export var DesignDocsTheme = {
    palette: {
        themePrimary: '#9a4bd8',
        themeLighterAlt: '#fbf7fd',
        themeLighter: '#eedff9',
        themeLight: '#dfc4f4',
        themeTertiary: '#c18ee8',
        themeSecondary: '#a65fdd',
        themeDarkAlt: '#8c44c3',
        themeDark: '#763aa5',
        themeDarker: '#572a79'
    },
    semanticColors: __assign(__assign({}, commonSemanticColors), { errorBackground: '#fde7e9', blockingBackground: '#fed9cc', warningBackground: '#fff4ce', successBackground: '#dff6dd' })
};
export var PowerAppsTheme = {
    palette: __assign({ themePrimary: '#742774', themeSecondary: '#8d308d', themeTertiary: '#d98fd9', themeLighterAlt: '#faf2fa', themeLighter: '#f6e4f6', themeLight: '#edcaed', themeDarkAlt: '#672367', themeDark: '#501b50', themeDarker: '#3f153f', neutralTertiaryAlt: '#666', neutralTertiary: '#666' }, PowerAppsGrayscalePalette),
    semanticColors: __assign({}, commonSemanticColors)
};
export var PowerBITheme = {
    palette: __assign(__assign({ themePrimary: '#f2c811', themeSecondary: '#f4cf2c', themeTertiary: '#f7de6d', themeLighterAlt: '#fefdf5', themeLighter: '#fdf6d7', themeLight: '#fbeeb5', themeDarkAlt: '#dab50f', themeDark: '#a98c0c', themeDarker: '#7a6816' }, PowerAppsGrayscalePalette), { neutralTertiaryAlt: '#666', neutralTertiary: '#666' }),
    semanticColors: __assign({}, commonSemanticColors)
};
export var PowerAutomateTheme = {
    palette: __assign(__assign({ themePrimary: '#0066ff', themeSecondary: '#1975ff', themeTertiary: '#94bfff', themeLight: '#cce0ff', themeLighter: '#e6f0ff', themeLighterAlt: '#f2f7ff', themeDarker: '#00388c', themeDark: '#0047b3', themeDarkAlt: '#005ce6' }, PowerAppsGrayscalePalette), { neutralTertiaryAlt: '#666', neutralTertiary: '#666' }),
    semanticColors: __assign({}, commonSemanticColors)
};
export var PowerVirtualAgentTheme = {
    palette: __assign(__assign({ themePrimary: '#0b556a', themeSecondary: '#0f677b', themeTertiary: '#14848f', themeLight: '#73e3df', themeLighter: '#cff6f9', themeLighterAlt: '#f1fbfe', themeDarker: '#062d37', themeDark: '#073845', themeDarkAlt: '#0a4a5c' }, PowerAppsGrayscalePalette), { neutralTertiaryAlt: '#666', neutralTertiary: '#666' }),
    semanticColors: __assign({}, commonSemanticColors)
};
export var Dynamics365Theme = {
    palette: __assign(__assign({ themePrimary: '#2266e3', themeSecondary: '#1f6cf9', themeTertiary: '#9cbeff', themeLight: '#ccdeff', themeLighter: '#e7efff', themeLighterAlt: '#f0f5ff', themeDarker: '#053385', themeDark: '#0742ab', themeDarkAlt: '#0b53ce' }, PowerAppsGrayscalePalette), { neutralTertiaryAlt: '#666', neutralTertiary: '#666' }),
    semanticColors: __assign({}, commonSemanticColors)
};
export var FlowTheme = {
    palette: __assign(__assign({ themePrimary: '#0066ff', themeLighterAlt: '#f2f7ff', themeLighter: '#e6f0ff', themeLight: '#cce0ff', themeTertiary: '#94bfff', themeSecondary: '#1975ff', themeDarkAlt: '#005ce6' }, PowerAppsGrayscalePalette), { themeDark: '#0047b3', themeDarker: '#00388c' }),
    semanticColors: __assign({}, commonSemanticColors)
};
export var TeamsTheme = {
    palette: {
        themePrimary: '#6061aa',
        themeSecondary: '#6f70b5',
        themeTertiary: '#9797cd',
        themeLight: '#c7c8e6',
        themeLighter: '#e1e1f2',
        themeLighterAlt: '#f7f7fc',
        themeDark: '#494a82',
        themeDarker: '#363660',
        themeDarkAlt: '#56579a',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#b6b0b0',
        neutralSecondary: '#9f9797',
        neutralPrimaryAlt: '#877f7f',
        neutralPrimary: '#282424',
        neutralDark: '#585151',
        black: '#403b3b',
        white: '#fff'
    },
    semanticColors: {
        buttonBackground: 'transparent',
        buttonBackgroundHovered: '#bdbdbd',
        buttonBackgroundPressed: '#a7a7a7',
        buttonText: '#252424',
        buttonTextPressed: '#252424',
        buttonTextHovered: '#252424',
        buttonBorder: '#bdbdbd'
    }
};
var DefaultDarkPalette = {
    themePrimary: '#2899f5',
    themeSecondary: '#0078d4',
    themeTertiary: '#235a85',
    themeLight: '#004c87',
    themeLighter: '#043862',
    themeLighterAlt: '#092c47',
    themeDarker: '#82c7ff',
    themeDark: '#6cb8f6',
    themeDarkAlt: '#3aa0f3',
    neutralDark: '#faf9f8',
    neutralPrimary: '#f3f2f1',
    neutralPrimaryAlt: '#c8c6c4',
    neutralSecondary: '#a19f9d',
    neutralSecondaryAlt: '#979693',
    neutralTertiary: '#797775',
    neutralTertiaryAlt: '#484644',
    neutralQuaternary: '#3b3a39',
    neutralQuaternaryAlt: '#323130',
    neutralLight: '#292827',
    neutralLighter: '#252423',
    neutralLighterAlt: '#201f1e',
    black: '#ffffff',
    white: '#1b1a19',
    redDark: '#F1707B'
};
export var DefaultDarkTheme = {
    palette: DefaultDarkPalette,
    semanticColors: {
        buttonText: DefaultDarkPalette.black,
        buttonTextPressed: DefaultDarkPalette.neutralDark,
        buttonTextHovered: DefaultDarkPalette.neutralPrimary,
        bodySubtext: DefaultDarkPalette.white,
        disabledBackground: DefaultDarkPalette.neutralQuaternaryAlt,
        inputBackgroundChecked: DefaultDarkPalette.themePrimary,
        menuBackground: DefaultDarkPalette.neutralLighter,
        menuItemBackgroundHovered: DefaultDarkPalette.neutralQuaternaryAlt,
        menuItemBackgroundPressed: DefaultDarkPalette.neutralQuaternary,
        menuDivider: DefaultDarkPalette.neutralTertiaryAlt,
        menuIcon: DefaultDarkPalette.themeDarkAlt,
        menuHeader: DefaultDarkPalette.black,
        menuItemText: DefaultDarkPalette.neutralPrimary,
        menuItemTextHovered: DefaultDarkPalette.neutralDark
    }
};
export var PowerAppsPurplePalette = PowerAppsTheme.palette;
export var FlowBluePalette = FlowTheme.palette;
