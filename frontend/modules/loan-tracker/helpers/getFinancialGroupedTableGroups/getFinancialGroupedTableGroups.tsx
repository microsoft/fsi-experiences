/* istanbul ignore next*/
const getGroupInfo = ({ key, name, ariaLabel, total, count, startIndex = 0, level = 0 }) => ({
    key: `group-${key}-key`,
    name,
    ariaLabel: ariaLabel || name,
    total,
    startIndex,
    count,
    level,
});

export const getFinancialGroupedTableGroups = (...groups) => {
    return groups.map(group => getGroupInfo(group));
};
