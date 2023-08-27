/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */
export var DefaultStatusTheme = {
    Alert1: {
        Text: "#FFFFFF",
        Fill: "#ea0600",
    },
    Alert2: {
        Text: "#000000",
        Fill: "#ff0c00",
    },
    Priority1: {
        Text: "#FFFFFF",
        Fill: "#b22912",
    },
    Priority2: {
        Text: "#000000",
        Fill: "#ff5b45",
    },
    Priority3: {
        Text: "#000000",
        Fill: "#f2c624",
    },
    Positive1: {
        Text: "#FFFFFF",
        Fill: "#358717",
    },
    Positive2: {
        Text: "#000000",
        Fill: "#47c21d",
    },
    Info1: {
        Text: "#FFFFFF",
        Fill: "#3b79b7",
    },
    Neutral1: {
        Text: "#FFFFFF",
        Fill: "#666666",
    },
};
export var DefaultThemingDataStatusColors = {
    neutral: "#FFFFFF",
    error: "#000000",
    warning: "#000000",
    success: "#000000",
    info: "#FFFFFF",
};
export var DefaultBaseColors = {
    Red: {
        red1: "#ffa2a2",
        red2: "#ff0c00",
        red3: "#ea0600",
        red4: "#bf0900",
        red5: "#800600",
    },
    Orange: {
        orange1: "#ffd5d2",
        orange2: "#ff9685",
        orange3: "#ff5b45",
        orange4: "#b22912",
        orange5: "#80281a",
    },
    Yellow: {
        yellow1: "#fae8a7",
        yellow2: "#f7cf52",
        yellow3: "#f2c624",
        yellow4: "#bf991f",
        yellow5: "#725a0d",
    },
    Green: {
        green1: "#bdf2a7",
        green2: "#70bc57",
        green3: "#47c21d",
        green4: "#358717",
        green5: "#1c6512",
    },
    Blue: {
        blue1: "#a8d0ff",
        blue2: "#6aa6ff",
        blue3: "#3b79b7",
        blue4: "#315fa2",
        blue5: "#25477a",
    },
    Teal: {
        teal1: "#99ebed",
        teal2: "#00ced3",
        teal3: "#00b7c3",
        teal4: "#008992",
        teal5: "#005c62",
    },
    Purple: {
        purple1: "#e9bbff",
        purple2: "#a350c4",
        purple3: "#8c2ab5",
        purple4: "#691b88",
        purple5: "#46125b",
    },
    Clay: {
        clay1: "#f4c0b9",
        clay2: "#e2614f",
        clay3: "#db3923",
        clay4: "#a42b1a",
        clay5: "#6e1d12",
    },
    Pink: {
        pink1: "#ffddf2",
        pink2: "#ffc7ea",
        pink3: "#ffa8da",
        pink4: "#b26491",
        pink5: "#652f4e",
    },
    Grey: {
        grey1: "#efefef",
        grey2: "#e2e2e2",
        grey3: "#d8d8d8",
        grey4: "#b3b3b3",
        grey5: "#666666",
        grey6: "#444444",
        grey7: "#333333",
    },
    Violet: {
        violet1: "#e6bdee",
        violet2: "#b860c1",
        violet3: "#a638b2",
        violet4: "#6a1e7a",
        violet5: "#47104c",
    },
    White: "#FFFFFF",
    Black: "#000000",
    Transparent: "#FFFFFF",
    CalculateContrast: function () {
        return undefined;
    },
};
export var DefaultThemingDataBaseColors = {
    white: "#FFFFFF",
    black: "#000000",
    red: "#ffa2a2",
    orange: "#ffd5d2",
    yellow: "#fae8a7",
    green: "#bdf2a7",
    blue: "#a8d0ff",
    teal: "#99ebed",
    purple: "#e9bbff",
};
export var DefaultThemingDataLinkColors = {
    default: "#1160B7",
    visited: "#F8FAFC",
    disabled: "#666666",
};
export var DefaultLinkColors = {
    Normal: {
        Text: "#1160B7",
        Fill: "#FFFFFF",
    },
    Hover: {
        Text: "#E7EFF7",
        Fill: "#FFFFFF",
    },
    Visited: {
        Text: "#F8FAFC",
        Fill: "#FFFFFF",
    },
    Pressed: {
        Text: "#25477a",
        Fill: "#FFFFFF",
    },
    Disabled: {
        Text: "#666666",
        Fill: "#666666",
    },
};
export var DefaultThemingDataGrayColors = {
    gray01: "#efefef",
    gray02: "#e2e2e2",
    gray03: "#d8d8d8",
    gray04: "#b3b3b3",
    gray05: "#666666",
    gray06: "#444444",
    gray07: "#333333",
    gray08: "#333333",
    gray09: "#333333",
};
export var DefaultThemingDataColors = {
    whitebackground: "#FFFFFF",
    defaulttheming: "#3B79B7",
    navbarshelf: "#FFFFFF",
    header: "#F26151",
    globallink: "#1160B7",
    selectedlinkeffect: "#F26158",
    hoverlinkeffect: "#E7EFF7",
    processcontrol: "#41A053",
    defaultentity: "#666666",
    defaultcustomentity: "#00CCA3",
    controlshade: "#FFFFFF",
    controlborder: "#BDC3C7",
    statustheme: DefaultStatusTheme,
    status: DefaultThemingDataStatusColors,
    baseColor: DefaultBaseColors,
    base: DefaultThemingDataBaseColors,
    links: DefaultThemingDataLinkColors,
    linkstheme: DefaultLinkColors,
    grays: DefaultThemingDataGrayColors,
};
export var DefaultThemingDataTextBox = {
    fonticonsize: "1em",
    fontweight: 400,
    contentfontweight: 600,
    fontsize: "1em",
    errorfontsize: "0.9em",
    spacing: "0.25em",
    containerspacing: "0.75em",
    rightmargin: "2em",
    lineheight: "1.5em",
    linethickness: "1px",
    errorlinethickness: "2px",
    horizontalpadding: "0.5em",
    verticalpadding: "0.5em",
    maxlength: 200,
    labelcolor: "#444444",
    contentcolor: "#000000",
    linecolor: "#DDDDDD",
    hoverboxcolor: "#0072C6",
    backgroundcolor: "#F2F8FF",
    errorbackgroundcolor: "#FFF5F5",
    redcolor: "#EA0600",
    bluecolor: "#0000FF",
    restmodecolor: "#FFFFFF",
};
export var DefaultThemingDataSpacings = {
    xshorizontal: "0.5em",
    shorizontal: "0.5em",
    bhorizontal: "1em",
    mhorizontal: "2em",
    lhorizontal: "2.5em",
    xlhorizontal: "3.5em",
    xxlhorizontal: "4.5em",
    xsvertical: "0.5em",
    svertical: "0.5em",
    bvertical: "1em",
    mvertical: "2em",
    lvertical: "2.5em",
    xlvertical: "3.5em",
    xxlvertical: "4.5em",
};
export var DefaultThemingDataFontFamilies = {
    semilight: "'SegoeUI-Light', 'Segoe UI Semilight', 'Segoe UI Regular', 'Segoe UI'",
    semibold: "'SegoeUI-Semibold', 'Segoe UI Semibold', 'Segoe UI Regular', 'Segoe UI'",
    regular: "'Segoe UI Regular', 'Segoe UI'",
    bold: "'SegoeUI-Bold', 'Segoe UI Bold', 'Segoe UI'",
};
export var DefaultThemingDataFontSizes = {
    xsfontsize: "0.750rem",
    sfontsize: "0.875rem",
    bfontsize: "1rem",
    mfontsize: "1rem",
    lfontsize: "1.25rem",
    xlfontsize: "1.5rem",
    font225: "2.25rem",
    font200: "2.00rem",
    font175: "1.75rem",
    font150: "1.50rem",
    font125: "1.25rem",
    font115: "1.15rem",
    font100: "1.00rem",
    font085: "0.85rem",
    font075: "0.75rem",
};
export var DefaultThemingDataBreakpoints = {
    dimensionxs: "320",
    dimensions: "480",
    dimensionm: "768",
    dimensionl: "1024",
    dimensionxl: "1024",
};
export var DefaultThemingDataMeasures = {
    measure025: "0.25rem",
    measure050: "0.5rem",
    measure075: "0.75rem",
    measure100: "1.00rem",
    measure125: "1.25rem",
    measure150: "1.50rem",
    measure175: "1.75rem",
    measure200: "2.00rem",
    measure225: "2.25rem",
    measure250: "2.50rem",
    measure300: "3.00rem",
    measure350: "3.50rem",
    measure400: "4.00rem",
    measure450: "4.50rem",
    measure500: "5.00rem",
    measure550: "5.50rem",
    measure600: "6.00rem",
};
export var DefaultThemingDataLookup = {
    tagpadding: "6px",
    tagmargin: "-5px",
    tagbackgroundcolor: "#ECF4FA",
};
export var DefaultThemingDataBorders = {
    border01: "1px solid #efefef",
    border02: "1px solid #d8d8d8",
    border03: "1px dashed black",
};
export var DefaultThemingDataShadows = {
    shadow01: "0px 2px 4px 0px rgba(0, 0, 0, 0.5);",
};
export var DefaultThemingDataButtons = {
    button01primary: {
        borderColor: "transparent",
        backgroundColor: "#3b79b7",
        height: "2.50rem",
        minWidth: "6.00rem",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "1.00rem",
        paddingRight: "1.00rem",
        ":focus": {
            outline: "1px dashed black",
        },
        ":hover": {
            backgroundColor: "#25477a",
        },
        ":active": {
            backgroundColor: "#25477a",
            outline: "1px solid #25477a",
            border: "1px solid white",
            ":disabled": {
                outline: 0,
                border: "1px solid transparent",
            },
        },
        ":disabled": {
            backgroundColor: "#666666",
            cursor: "not-allowed",
            "> span": {
                color: "#efefef",
            },
        },
    },
    button01secondary: {
        border: "1px solid #3b79b7",
        backgroundColor: "#FFFFFF",
        height: "2.50rem",
        minWidth: "6.00rem",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "1.00rem",
        paddingRight: "1.00rem",
        ":focus": {
            outline: "1px dashed black",
        },
        ":hover": {
            backgroundColor: "#25477a",
            borderColor: "transparent",
            "> span": {
                color: "#FFFFFF",
            },
            ":disabled": {
                "> span": {
                    color: "#efefef",
                },
            },
        },
        ":active": {
            backgroundColor: "#25477a",
            outline: "1px solid #25477a",
            border: "1px solid white",
            borderColor: "transparent",
            "> span": {
                color: "#FFFFFF",
            },
            ":disabled": {
                outline: 0,
                border: "1px solid transparent",
            },
        },
        ":disabled": {
            backgroundColor: "#666666",
            cursor: "not-allowed",
            borderColor: "transparent",
            "> span": {
                color: "#efefef",
            },
        },
    },
    buttonprimarytext: {
        fontSize: "1.00rem",
        fontFamily: "'Segoe UI Regular', 'Segoe UI'",
        color: "#FFFFFF",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    buttonsecondarytext: {
        fontSize: "1.00rem",
        fontFamily: "'Segoe UI Regular', 'Segoe UI'",
        color: "#3b79b7",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    actioniconbutton01: {
        height: "2.50rem",
        width: "2.50rem",
        borderStyle: "none",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "> span": {
            fontSize: "1.00rem",
            color: "#333333",
        },
        ":focus": {
            outline: "1px dashed black",
        },
        ":hover": {
            backgroundColor: "#efefef",
        },
        ":disabled": {
            cursor: "not-allowed",
            "> span": {
                color: "#b3b3b3",
            },
        },
    },
    button02primary: {
        borderColor: "transparent",
        backgroundColor: "#3b79b7",
        height: "1.50rem",
        minWidth: "4.00rem",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        ":focus": {
            outline: "1px dashed black",
        },
        ":hover": {
            backgroundColor: "#25477a",
        },
        ":active": {
            backgroundColor: "#25477a",
            outline: "1px solid #25477a",
            border: "1px solid white",
            ":disabled": {
                outline: 0,
                border: "1px solid transparent",
            },
        },
        ":disabled": {
            backgroundColor: "#666666",
            cursor: "not-allowed",
            "> span": {
                color: "#efefef",
            },
        },
    },
    button02secondary: {
        border: "1px solid #3b79b7",
        backgroundColor: "#FFFFFF",
        height: "1.50rem",
        minWidth: "4.00rem",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        ":focus": {
            outline: "1px dashed black",
        },
        ":hover": {
            backgroundColor: "#25477a",
            borderColor: "transparent",
            "> span": {
                color: "#FFFFFF",
            },
            ":disabled": {
                "> span": {
                    color: "#efefef",
                },
            },
        },
        ":active": {
            backgroundColor: "#25477a",
            outline: "1px solid #25477a",
            border: "1px solid white",
            borderColor: "transparent",
            "> span": {
                color: "#FFFFFF",
            },
            ":disabled": {
                outline: 0,
                border: "1px solid transparent",
            },
        },
        ":disabled": {
            backgroundColor: "#666666",
            cursor: "not-allowed",
            borderColor: "transparent",
            "> span": {
                color: "#efefef",
            },
        },
    },
};
export var DefaultThemingData = {
    defaultThemingData: {
        normalfontfamily: "'SegoeUI', 'Segoe UI'",
        normalfontcolor: "#F26197",
        normalfontsize: "13px",
        solidborderstyle: "solid",
        noneborderstyle: "none",
        colors: DefaultThemingDataColors,
        textbox: DefaultThemingDataTextBox,
        spacings: DefaultThemingDataSpacings,
        fontfamilies: DefaultThemingDataFontFamilies,
        fontsizes: DefaultThemingDataFontSizes,
        breakpoints: DefaultThemingDataBreakpoints,
        measures: DefaultThemingDataMeasures,
        lookup: DefaultThemingDataLookup,
        borders: DefaultThemingDataBorders,
        shadows: DefaultThemingDataShadows,
        buttons: DefaultThemingDataButtons,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getEntityColor: function (entityLogicalName) {
        return "blue";
    },
    fullScreenOverrideStyle: undefined,
};
//# sourceMappingURL=DefaultThemingData.js.map