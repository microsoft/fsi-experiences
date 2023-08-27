/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
export var TeamsStyles = {
    Button: {
        tokens: function (props) {
            return [
                {
                    iconSize: 16,
                    iconWeight: 700,
                    textWeight: 400
                },
                !props.circular && {
                    borderRadius: 3,
                    borderWidth: 2,
                    contentPadding: '4px 32px'
                },
                props.circular && {
                    borderWidth: 1
                },
                !props.disabled && {
                    iconColor: '#252424',
                    borderColorHovered: 'transparent',
                    borderColorPressed: 'transparent'
                },
                props.expanded && {
                    borderColor: 'transparent'
                },
                props.circular &&
                    !props.disabled && {
                    backgroundColorHovered: '#464775',
                    backgroundColorPressed: '#464775',
                    textColorHovered: '#fff',
                    textColorPressed: '#fff',
                    iconColorHovered: '#fff',
                    iconColorPressed: '#fff'
                },
                props.primary &&
                    !props.disabled && {
                    iconColor: 'white'
                }
            ];
        }
    }
};
