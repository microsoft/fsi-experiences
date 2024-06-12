function displayIconTooltip(rowData: any) {
    const data = JSON.parse(rowData);
    const calculatedPerformanceLifeTimeKey = Object.keys(data).find(key => key.endsWith('msfsi_performance'));
    if (!calculatedPerformanceLifeTimeKey) {
        return [];
    }

    const coldata = data[calculatedPerformanceLifeTimeKey];

    if (coldata) {
        if (coldata < 0) {
            return ['msfsi_negativePercentage'];
        }

        if (coldata > 0) {
            return ['msfsi_positivePercentage'];
        }
    }

    return ['msfsi_neutralPercentage'];
}
