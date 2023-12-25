import React from 'react';

const renderItemColumn =
    ({ renderColumn }) =>
    (item, index, column) => {
        const renderer = renderColumn[column.key];
        return renderer ? renderer(item) : '';
    };

export default renderItemColumn;
