import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { useEffect, useState } from 'react';
import { IPieChartData } from '@fsi/core-components/components/containers/DataPieChart/DataPieChart.interface';

const liabilitiesColors = [NeutralColors.gray140, NeutralColors.gray70, NeutralColors.gray120, NeutralColors.black, NeutralColors.gray40];

const useCalculatedFinancialProducts = ({ financialProducts, categories }) => {
    const [data, setData] = useState<{
        assets: IPieChartData[];
        liabilities: IPieChartData[];
    }>({ assets: [], liabilities: [] });
    const theme = useTheme();

    useEffect(() => {
        const {
            palette: { themePrimary, themeDark, themeLight, themeDarker, themeTertiary },
        } = theme;
        const assetsColors = [themePrimary, themeDark, themeLight, themeDarker, themeTertiary];
        const assetsMap: Map<number, number> = new Map();
        const liabilitiesMap: Map<number, number> = new Map();
        const updatedData: {
            assets: IPieChartData[];
            liabilities: IPieChartData[];
        } = { assets: [], liabilities: [] };

        const updatedMap = (map: Map<number, number>, category: number, value: number) => {
            const oldVal = map.get(category) || 0;
            map.set(category, oldVal + value);
        };

        financialProducts &&
            financialProducts.forEach(fp => {
                if (fp.balanceDefault !== 0) {
                    if (fp.balanceDefault >= 0) {
                        updatedMap(assetsMap, fp.category, fp.balanceDefault);
                    } else {
                        updatedMap(liabilitiesMap, fp.category, fp.balanceDefault);
                    }
                }
            });

        const organizeArray = (map: Map<number, number>, colorsArray: string[], pushArray: { category: string; color: string; value: number }[]) => {
            const array = Array.from(map.entries());
            array.sort((a, b) => b[1] - a[1]);
            array.forEach(([key, val], index) => {
                pushArray.push({
                    category: categories.get(key) || '',
                    color: colorsArray[index],
                    value: val,
                });
            });
        };

        organizeArray(assetsMap, assetsColors, updatedData.assets);
        organizeArray(liabilitiesMap, liabilitiesColors, updatedData.liabilities);

        setData(updatedData);
    }, [financialProducts, theme]);

    return data;
};

export default useCalculatedFinancialProducts;
