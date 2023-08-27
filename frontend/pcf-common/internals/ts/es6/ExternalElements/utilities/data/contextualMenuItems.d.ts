/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
export declare const items: ({
    key: string;
    name: string;
    icon: string;
    ariaLabel: string;
    "data-automation-id": string;
    subMenuProps: {
        items: ({
            key: string;
            name: string;
            icon: string;
            "data-automation-id": string;
        } | {
            key: string;
            name: string;
            icon: string;
            "data-automation-id"?: undefined;
        })[];
    };
    href?: undefined;
    onClick?: undefined;
    disabled?: undefined;
} | {
    key: string;
    name: string;
    icon: string;
    href: string;
    "data-automation-id": string;
    ariaLabel?: undefined;
    subMenuProps?: undefined;
    onClick?: undefined;
    disabled?: undefined;
} | {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
    ariaLabel?: undefined;
    "data-automation-id"?: undefined;
    subMenuProps?: undefined;
    href?: undefined;
    disabled?: undefined;
} | {
    key: string;
    name: string;
    icon: string;
    disabled: boolean;
    onClick: () => void;
    ariaLabel?: undefined;
    "data-automation-id"?: undefined;
    subMenuProps?: undefined;
    href?: undefined;
})[];
export declare const textOnlyItems: {
    key: string;
    name: string;
    onClick: () => void;
}[];
export declare const iconOnlyItems: ({
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
    disabled?: undefined;
} | {
    key: string;
    icon: string;
    disabled: boolean;
    onClick: () => void;
    name?: undefined;
})[];
export declare const overflowItems: {
    key: string;
    name: string;
    icon: string;
}[];
export declare const farItems: {
    key: string;
    name: string;
    icon: string;
    onClick: () => void;
}[];
