/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
import { DefaultDarkTheme as DarkTheme } from './../../utilities/themes';
export var FabricDarkStyles = {
    DetailsList: {
        styles: {
            headerWrapper: {
                selectors: {
                    '.ms-DetailsHeader': {
                        borderColor: DarkTheme.palette.neutralQuaternary
                    }
                }
            }
        }
    },
    DetailsRow: {
        styles: {
            root: {
                borderColor: DarkTheme.palette.neutralQuaternaryAlt
            }
        }
    },
    VerticalDivider: {
        styles: {
            divider: {
                backgroundColor: DarkTheme.palette.neutralQuaternaryAlt
            },
            wrapper: {
                Backgroundcolor: DarkTheme.palette.green
            }
        }
    },
    DocumentCard: {
        styles: {
            root: {
                border: "1px solid " + DarkTheme.palette.neutralQuaternaryAlt,
                selectors: {
                    '.ms-DocumentCardPreview': {
                        borderRight: "1px solid " + DarkTheme.palette.neutralQuaternaryAlt
                    }
                }
            }
        }
    },
    DocumentCardPreview: {
        styles: {
            root: {
                borderBottom: "1px solid " + DarkTheme.palette.neutralQuaternaryAlt,
                borderRight: "1px solid " + DarkTheme.palette.neutralQuaternaryAlt
            }
        }
    },
    Persona: {
        styles: {
            intials: {
                color: DarkTheme.palette.black
            }
        }
    },
    PersonaCoin: {
        color: DarkTheme.palette.black,
        styles: {
            intials: {
                color: DarkTheme.palette.black
            },
            initials: {
                'ms-Persona-initials': {
                    color: DarkTheme.palette.black
                }
            }
        }
    },
    Panel: {
        styles: {
            main: {
                backgroundColor: DarkTheme.palette.neutralLighter
            },
            closeButton: {
                color: DarkTheme.palette.neutralSecondary,
                selectors: {
                    ':hover': {
                        color: DarkTheme.palette.neutralPrimary
                    }
                }
            }
        }
    },
    PeoplePickerItem: {
        styles: {
            root: {
                background: DarkTheme.palette.neutralQuaternaryAlt,
                selectors: {
                    ':hover': {
                        background: DarkTheme.palette.neutralQuaternary
                    }
                }
            },
            removeButton: {
                tokens: function (props) {
                    var selected = props.selected, theme = props.theme;
                    var palette = theme.palette;
                    return [
                        {
                            background: 'transparent',
                            selectors: {
                                ':active': {
                                    color: palette.white,
                                    backgroundColor: palette.themeDark
                                }
                            }
                        },
                        !selected && {
                            color: palette.neutralPrimary
                        },
                        selected && {
                            color: palette.white
                        }
                    ];
                }
            }
        }
    },
    SelectedPersona: {
        styles: {
            main: {
                backgroundColor: DarkTheme.palette.neutralLighter
            },
            closeButton: {
                color: DarkTheme.palette.neutralSecondary,
                selectors: {
                    ':hover': {
                        color: DarkTheme.palette.neutralPrimary
                    }
                }
            }
        }
    },
    SpinButton: {
        styles: {
            inputTextSelected: {
                color: DarkTheme.palette.black,
                background: DarkTheme.palette.themePrimary
            }
        }
    }
};
