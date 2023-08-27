/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
var _a, _b, _c;
export var items = [
    (_a = {
            key: 'newItem',
            name: 'New',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate'
        },
        _a['data-automation-id'] = 'newItemMenu',
        _a.subMenuProps = {
            items: [
                (_b = {
                        key: 'emailMessage',
                        name: 'Email message',
                        icon: 'Mail'
                    },
                    _b['data-automation-id'] = 'newEmailButton',
                    _b),
                {
                    key: 'calendarEvent',
                    name: 'Calendar event',
                    icon: 'Calendar'
                }
            ]
        },
        _a),
    (_c = {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            href: 'https://mytenenat.sharepoint.com/teams/IT/BPU/'
        },
        _c['data-automation-id'] = 'uploadButton',
        _c),
    {
        key: 'share',
        name: 'Share',
        icon: 'Share',
        onClick: function () {
            return;
        }
    },
    {
        key: 'download',
        name: 'Download',
        icon: 'Download',
        onClick: function () {
            return;
        }
    },
    {
        key: 'disabled',
        name: 'Disabled...',
        icon: 'Cancel',
        disabled: true,
        onClick: function () {
            return;
        }
    }
];
export var textOnlyItems = [
    {
        key: 'upload',
        name: 'Upload',
        onClick: function () {
            return;
        }
    },
    {
        key: 'share',
        name: 'Share',
        onClick: function () {
            return;
        }
    },
    {
        key: 'download',
        name: 'Download',
        onClick: function () {
            return;
        }
    }
];
export var iconOnlyItems = [
    {
        key: 'upload',
        name: '',
        icon: 'Upload',
        onClick: function () {
            return;
        }
    },
    {
        key: 'share',
        name: '',
        icon: 'Share',
        onClick: function () {
            return;
        }
    },
    {
        key: 'download',
        name: '',
        icon: 'Download',
        onClick: function () {
            return;
        }
    },
    {
        key: 'move',
        name: '',
        icon: 'MoveToFolder',
        onClick: function () {
            return;
        }
    },
    {
        key: 'copy',
        name: '',
        icon: 'Copy',
        onClick: function () {
            return;
        }
    },
    {
        key: 'rename',
        name: '',
        icon: 'Edit',
        onClick: function () {
            return;
        }
    },
    {
        key: 'disabled',
        icon: 'Cancel',
        disabled: true,
        onClick: function () {
            return;
        }
    }
];
export var overflowItems = [
    {
        key: 'move',
        name: 'Move to...',
        icon: 'MoveToFolder'
    },
    {
        key: 'copy',
        name: 'Copy to...',
        icon: 'Copy'
    },
    {
        key: 'rename',
        name: 'Rename...',
        icon: 'Edit'
    }
];
export var farItems = [
    {
        key: 'sort',
        name: 'Sort',
        icon: 'SortLines',
        onClick: function () {
            return;
        }
    },
    {
        key: 'tile',
        name: 'Grid view',
        icon: 'Tiles',
        onClick: function () {
            return;
        }
    },
    {
        key: 'info',
        name: 'Info',
        icon: 'Info',
        onClick: function () {
            return;
        }
    }
];
