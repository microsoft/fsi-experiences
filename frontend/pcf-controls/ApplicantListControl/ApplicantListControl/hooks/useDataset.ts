import { useMemo } from 'react';

const useDataset = ({ context }) => {
    const { columns, records } = context.parameters.list;
    const columnNames = columns.map(column => column.name);
    const data = useMemo(
        () =>
            Object.keys(records).map(recordId => ({
                id: recordId,
                properties: columnNames.reduce((acc, columnName) => {
                    const value = records[recordId].getFormattedValue(columnName);

                    return { ...acc, [columnName]: typeof value === 'string' ? value : value.name };
                }, {}),
            })),
        [columnNames, records]
    );

    return data;
};

export default useDataset;
