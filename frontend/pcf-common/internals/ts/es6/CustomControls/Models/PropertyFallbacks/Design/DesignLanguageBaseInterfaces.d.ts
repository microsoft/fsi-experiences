import { IThemeMapElement, IThemeMap } from "../../CustomControlDataInterfaces";
interface IBasePalette extends IThemeMapElement {
    Primary01?: string;
    Primary02?: string;
    Primary03?: string;
    Primary04?: string;
    Primary05?: string;
    Primary06?: string;
    Primary07?: string;
    Primary08?: string;
    Primary09?: string;
    Secondary01?: string;
    Error01?: string;
    Error02?: string;
    Error03?: string;
    Error04?: string;
    Error05?: string;
    Error06?: string;
    Error07?: string;
    Error08?: string;
    Error09?: string;
    Error10?: string;
    Neutral01?: string;
    Neutral02?: string;
    Neutral03?: string;
    Neutral04?: string;
    Neutral05?: string;
    Neutral06?: string;
    Neutral07?: string;
    Neutral08?: string;
    Neutral09?: string;
    Neutral10?: string;
    Neutral11?: string;
    Neutral12?: string;
    Neutral13?: string;
    Neutral14?: string;
    Data01?: string;
    Data02?: string;
    Data03?: string;
    Data04?: string;
    Data05?: string;
    Data06?: string;
    Data07?: string;
    Data08?: string;
    Data09?: string;
    Data10?: string;
    Data11?: string;
    DataEmpty?: string;
}
interface IBaseThemeColors extends IThemeMapElement {
    Palette?: IBasePalette;
    Patterns?: {
        Contrast?: string;
        Text01?: string;
        Text02?: string;
        Text03?: string;
        Text04?: string;
        Background?: string;
        DisabledBackground?: string;
        DisabledForeground?: string;
        InputBorder?: string;
        InputFocusBorder?: string;
        KeyboardFocusBorder?: string;
        PivotColor?: string;
    };
}
interface IBaseThemeComponents extends IThemeMapElement {
    TextInput?: {
        PrefixBackgroundColor?: string;
        PrefixForegroundColor?: string;
        SuffixBackgroundColor?: string;
        SuffixForegroundColor?: string;
        Disabled?: {
            TextColor?: string;
            BackgroundColor?: string;
            BorderColor?: string;
            LinkColor?: string;
        };
        View?: {
            TextColor?: string;
            BackgroundColor?: string;
            BorderColor?: string;
            LinkColor?: string;
        };
        Edit?: {
            TextColor?: string;
            BackgroundColor?: string;
            BorderColor?: string;
            LinkColor?: string;
            Valid?: {
                Hover?: {
                    BorderColor?: string;
                };
                Focus?: {
                    BorderColor?: string;
                };
                Open?: {
                    BorderColor?: string;
                };
            };
            Invalid?: {
                BorderColor?: string;
                ErrortextColor?: string;
            };
        };
    };
    Link?: {
        Enabled?: {
            TextColor?: string;
            Hover?: {
                TextColor?: string;
            };
        };
        Disabled?: {
            TextColor?: string;
        };
    };
    ButtonPrimary?: {
        BackgroundColor?: string;
        TextColor?: string;
        Disabled?: {
            BackgroundColor?: string;
            TextColor?: string;
        };
        Enabled?: {
            Hover?: {
                BackgroundColor?: string;
                TextColor?: string;
            };
            Pressed?: {
                BackgroundColor?: string;
                TextColor?: string;
            };
        };
    };
    ButtonSecondary?: {
        BackgroundColor?: string;
        TextColor?: string;
        BorderColor?: string;
        Disabled?: {
            BackgroundColor?: string;
            TextColor?: string;
        };
        Enabled?: {
            Hover?: {
                BackgroundColor?: string;
                TextColor?: string;
            };
            Pressed?: {
                BackgroundColor?: string;
                TextColor?: string;
            };
        };
    };
    Label?: {
        TextColor?: string;
        Disabled?: {
            TextColor?: string;
        };
    };
    Dropdown?: {
        TextColor?: string;
        BorderColor?: string;
        Disabled?: {
            TextColor?: string;
            BackgroundColor?: string;
            BorderColor?: string;
        };
        Enabled?: {
            TextColor?: string;
            BackgroundColor?: string;
            Valid?: {
                Hover?: {
                    BorderColor?: string;
                };
                Focus?: {
                    BorderColor?: string;
                };
                Open?: {
                    BorderColor?: string;
                };
            };
            Invalid?: {
                BorderColor?: string;
            };
        };
    };
    DropdownMenu?: {
        BackgroundColor?: string;
        Menuitem?: {
            BackgroundColor?: string;
            BorderColor?: string;
            Disabled?: {
                TextColor?: string;
            };
            Enabled?: {
                Hover?: {
                    TextColor?: string;
                    BackgroundColor?: string;
                    BorderColor?: string;
                };
                Focus?: {
                    TextColor?: string;
                    BackgroundColor?: string;
                    BorderColor?: string;
                };
                Selected?: {
                    TextColor?: string;
                    BackgroundColor?: string;
                    BorderColor?: string;
                };
            };
        };
    };
    Gauge?: {
        TextColor?: string;
        BackgroundColor?: string;
        FullArcColor?: string;
        EmptyArcColor?: string;
    };
    CommandBar?: {
        BackgroundColor?: string;
        Command?: {
            TextColor?: string;
            IconColor?: string;
            Hover?: {
                BackgroundColor?: string;
            };
            Pressed?: {
                BackgroundColor?: string;
            };
            Focus?: {
                BorderColor?: string;
            };
        };
    };
    Form?: {
        PivotColor?: string;
        FooterCommand?: {
            TextColor?: string;
            BackgroundColor?: string;
            IconColor?: string;
            DividerColor?: string;
            Hover?: {
                BackgroundColor?: string;
            };
            Press?: {
                BackgroundColor?: string;
            };
            Focus?: {
                BorderColor?: string;
            };
        };
    };
    MessageBar?: {
        Info?: {
            TextColor?: string;
            BackgroundColor?: string;
            IconColor?: string;
        };
        SevereWarning?: {
            TextColor?: string;
            BackgroundColor?: string;
            IconColor?: string;
        };
        Blocked?: {
            TextColor?: string;
            BackgroundColor?: string;
            IconColor?: string;
        };
        Locked?: {
            TextColor?: string;
            BackgroundColor?: string;
            IconColor?: string;
        };
    };
    Grid?: {
        ColumnHeader?: {
            TextColor?: string;
            BackgroundColor?: string;
            CheckmarkIconColor?: string;
            SortFilterIconColor?: string;
            DividerColor?: string;
            Focus?: {
                BorderColor?: string;
            };
        };
        Cell?: {
            TextColor?: string;
            BackgroundColor?: string;
            LinkColor?: string;
            Hover?: {
                TextColor?: string;
                BackgroundColor?: string;
            };
            Selected?: {
                TextColor?: string;
                BackgroundColor?: string;
                CheckmarkIconColor?: string;
            };
            Focus?: {
                BorderColor?: string;
            };
        };
        Footer?: {
            TextColor?: string;
            BackgroundColor?: string;
            IconColor?: string;
            Focus?: {
                BorderColor?: string;
            };
            Disabled?: {
                IconColor?: string;
            };
        };
    };
    AppHeader?: {
        TextColor?: string;
        BackgroundColor?: string;
        IconColor?: string;
        Hover?: {
            BackgroundColor?: string;
        };
        Pressed?: {
            BackgroundColor?: string;
            IconColor?: string;
        };
        Focus?: {
            BorderColor?: string;
        };
    };
    Navigation?: {
        Rest?: {
            TextColor?: string;
            IconColor?: string;
            BackgroundColor?: string;
            DividerColor?: string;
            Hover?: {
                TextColor?: string;
                IconColor?: string;
                BackgroundColor?: string;
            };
            Focus?: {
                BorderColor?: string;
            };
        };
        Selected?: {
            TextColor?: string;
            IconColor?: string;
            BackgroundColor?: string;
            PivotColor?: string;
            Focus?: {
                BorderColor?: string;
            };
        };
    };
    Dashboard?: {
        TextColor?: string;
        BackgroundColor?: string;
        ViewSelector?: {
            TextColor?: string;
            ChevronColor?: string;
            ChevronBackgroundColor?: string;
            Hover?: {
                ChevronBackgroundColor?: string;
            };
            Pressed?: {
                ChevronBackgroundColor?: string;
            };
            Open?: {
                ChevronBackgroundColor?: string;
            };
        };
        Card?: {
            TextColor?: string;
            BackgroundColor?: string;
            DividerColor?: string;
            ActionButton?: {
                Rest?: {
                    TextColor?: string;
                    IconColor?: string;
                    BackgroundColor?: string;
                    BorderColor?: string;
                    Focus?: {
                        BorderColor?: string;
                    };
                    Hover?: {
                        TextColor?: string;
                        IconColor?: string;
                        BackgroundColor?: string;
                    };
                };
                Selected?: {
                    TextColor?: string;
                    IconColor?: string;
                    BackgroundColor?: string;
                    BorderColor?: string;
                    Focus?: {
                        BorderColor?: string;
                    };
                    Hover?: {
                        BackgroundColor?: string;
                    };
                };
                Disabled?: {
                    TextColor?: string;
                    IconColor?: string;
                    BackgroundColor?: string;
                };
            };
        };
    };
}
interface IBaseDesignLanguage extends IThemeMap {
    Colors: IBaseThemeColors;
    Components: IBaseThemeComponents;
}
export { IBasePalette, IBaseThemeColors, IBaseThemeComponents, IBaseDesignLanguage };
