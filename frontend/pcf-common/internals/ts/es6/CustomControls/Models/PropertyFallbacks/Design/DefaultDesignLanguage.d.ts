import { IBaseThemeColors, IBasePalette, IBaseThemeComponents, IBaseDesignLanguage } from "./DesignLanguageBaseInterfaces";
import { IThemeMapElement } from "../../CustomControlDataInterfaces";
export declare const DEFAULT_BASE_PALETTE: IBasePalette;
export declare function GenerateBaseColorReferences(Palette: IBasePalette): {
    Palette: IBasePalette;
    Patterns: IThemeMapElement;
};
export declare const DEFAULT_COLORS: {
    Palette: IBasePalette;
    Patterns: IThemeMapElement;
};
export declare function GenerateBaseComponentValues(colors: IBaseThemeColors): {
    TextInput: {
        PrefixBackgroundColor: string;
        PrefixForegroundColor: string;
        SuffixBackgroundColor: string;
        SuffixForegroundColor: string;
        Disabled: {
            TextColor: string;
            BackgroundColor: string;
            BorderColor: string;
            LinkColor: string;
        };
        View: {
            TextColor: string;
            BackgroundColor: string;
            BorderColor: string;
            LinkColor: string;
        };
        Edit: {
            TextColor: string;
            BackgroundColor: string;
            BorderColor: string;
            LinkColor: string;
            Valid: {
                Hover: {
                    BorderColor: string;
                };
                Focus: {
                    BorderColor: string;
                };
                Open: {
                    BorderColor: string;
                };
            };
            Invalid: {
                BorderColor: string;
                ErrortextColor: string;
            };
        };
    };
    Link: {
        Enabled: {
            TextColor: string;
            Hover: {
                TextColor: string;
            };
        };
        Disabled: {
            TextColor: string;
        };
    };
    ButtonPrimary: {
        BackgroundColor: string;
        TextColor: string;
        Disabled: {
            BackgroundColor: string;
            TextColor: string;
        };
        Enabled: {
            Hover: {
                BackgroundColor: string;
                TextColor: string;
            };
            Pressed: {
                BackgroundColor: string;
                TextColor: string;
            };
        };
    };
    ButtonSecondary: {
        BackgroundColor: string;
        TextColor: string;
        BorderColor: string;
        Disabled: {
            BackgroundColor: string;
            TextColor: string;
        };
        Enabled: {
            Hover: {
                BackgroundColor: string;
                TextColor: string;
            };
            Pressed: {
                BackgroundColor: string;
                TextColor: string;
            };
        };
    };
    Label: {
        TextColor: string;
        Disabled: {
            TextColor: string;
        };
    };
    Dropdown: {
        TextColor: string;
        BorderColor: string;
        Disabled: {
            TextColor: string;
            BackgroundColor: string;
            BorderColor: string;
        };
        Enabled: {
            TextColor: string;
            BackgroundColor: string;
            Valid: {
                Hover: {
                    BorderColor: string;
                };
                Focus: {
                    BorderColor: string;
                };
                Open: {
                    BorderColor: string;
                };
            };
            Invalid: {
                BorderColor: string;
            };
        };
    };
    DropdownMenu: {
        BackgroundColor: string;
        Menuitem: {
            BackgroundColor: string;
            BorderColor: string;
            Disabled: {
                TextColor: string;
            };
            Enabled: {
                Hover: {
                    TextColor: string;
                    BackgroundColor: string;
                    BorderColor: string;
                };
                Focus: {
                    TextColor: string;
                    BackgroundColor: string;
                    BorderColor: string;
                };
                Selected: {
                    TextColor: string;
                    BackgroundColor: string;
                    BorderColor: string;
                };
            };
        };
    };
    Gauge: {
        TextColor: string;
        BackgroundColor: string;
        FullArcColor: string;
        EmptyArcColor: string;
    };
    CommandBar: {
        BackgroundColor: string;
        Command: {
            TextColor: string;
            IconColor: string;
            Hover: {
                BackgroundColor: string;
            };
            Pressed: {
                BackgroundColor: string;
            };
            Focus: {
                BorderColor: string;
            };
        };
    };
    Form: {
        PivotColor: string;
        FooterCommand: {
            TextColor: string;
            BackgroundColor: string;
            IconColor: string;
            DividerColor: string;
            Hover: {
                BackgroundColor: string;
            };
            Press: {
                BackgroundColor: string;
            };
            Focus: {
                BorderColor: string;
            };
        };
    };
    MessageBar: {
        Info: {
            TextColor: string;
            BackgroundColor: string;
            IconColor: string;
        };
        SevereWarning: {
            TextColor: string;
            BackgroundColor: string;
            IconColor: string;
        };
        Blocked: {
            TextColor: string;
            BackgroundColor: string;
            IconColor: string;
        };
        Locked: {
            TextColor: string;
            BackgroundColor: string;
            IconColor: string;
        };
    };
    Grid: {
        ColumnHeader: {
            TextColor: string;
            BackgroundColor: string;
            CheckmarkIconColor: string;
            SortFilterIconColor: string;
            DividerColor: string;
            Focus: {
                BorderColor: string;
            };
        };
        Cell: {
            TextColor: string;
            BackgroundColor: string;
            LinkColor: string;
            Hover: {
                TextColor: string;
                BackgroundColor: string;
            };
            Selected: {
                TextColor: string;
                BackgroundColor: string;
                CheckmarkIconColor: string;
            };
            Focus: {
                BorderColor: string;
            };
        };
        Footer: {
            TextColor: string;
            BackgroundColor: string;
            IconColor: string;
            Focus: {
                BorderColor: string;
            };
            Disabled: {
                IconColor: string;
            };
        };
    };
    AppHeader: {
        TextColor: string;
        BackgroundColor: string;
        IconColor: string;
        Hover: {
            BackgroundColor: string;
        };
        Pressed: {
            BackgroundColor: string;
            IconColor: string;
        };
        Focus: {
            BorderColor: string;
        };
    };
    Navigation: {
        Rest: {
            TextColor: string;
            IconColor: string;
            BackgroundColor: string;
            DividerColor: string;
            Hover: {
                TextColor: string;
                IconColor: string;
                BackgroundColor: string;
            };
            Focus: {
                BorderColor: string;
            };
        };
        Selected: {
            TextColor: string;
            IconColor: string;
            BackgroundColor: string;
            PivotColor: string;
            Focus: {
                BorderColor: string;
            };
        };
    };
    Dashboard: {
        TextColor: string;
        BackgroundColor: string;
        ViewSelector: {
            TextColor: string;
            ChevronColor: string;
            ChevronBackgroundColor: string;
            Hover: {
                ChevronBackgroundColor: string;
            };
            Pressed: {
                ChevronBackgroundColor: string;
            };
            Open: {
                ChevronBackgroundColor: string;
            };
        };
        Card: {
            TextColor: string;
            BackgroundColor: string;
            DividerColor: string;
            ActionButton: {
                Rest: {
                    TextColor: string;
                    IconColor: string;
                    BackgroundColor: string;
                    BorderColor: string;
                    Focus: {
                        BorderColor: string;
                    };
                    Hover: {
                        TextColor: string;
                        IconColor: string;
                        BackgroundColor: string;
                    };
                };
                Selected: {
                    TextColor: string;
                    IconColor: string;
                    BackgroundColor: string;
                    BorderColor: string;
                    Focus: {
                        BorderColor: string;
                    };
                    Hover: {
                        BackgroundColor: string;
                    };
                };
                Disabled: {
                    TextColor: string;
                    IconColor: string;
                    BackgroundColor: string;
                };
            };
        };
    };
};
export declare function GenerateFluentDL(colors: IBaseThemeColors, componentValues: IBaseThemeComponents): IBaseDesignLanguage;
export declare const DEFAULT_FLUENT_DL: IBaseDesignLanguage;
