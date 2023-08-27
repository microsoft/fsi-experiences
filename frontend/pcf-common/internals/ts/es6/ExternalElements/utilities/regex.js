/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
export function escapeRegExp(text) {
    return text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
