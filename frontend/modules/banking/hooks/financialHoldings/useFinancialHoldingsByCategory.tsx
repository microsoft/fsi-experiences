import { useMemo } from 'react';
import { IFinancialHoldingCard } from '../../components/FinancialHoldingCard';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import useFHData, { IUseFHDataResponse, IUseFHProps } from './useFHData';
import { FH_CATEGORY_TO_ENTITY_NAME, FH_NAME_TO_CATEGORY_MAP, fhOwnerRoles } from '../../constants/FHValueMaps';
import { FHBaseCategory, FHInvestment } from '../../interfaces/FHEntity';

interface IUseFinancialHoldingsByCategoryProps extends IUseFHProps {
    financialHoldingsCategory?: string;
}

interface IUseFinancialHoldingsByCategoryOutput extends Omit<IUseFHDataResponse, 'entities'> {
    entities: IFinancialHoldingCard[];
    isRestricted?: boolean;
}

const getPerformanceValue = (category: number, fhCategoryEntity?: FHBaseCategory): number | undefined => {
    if (!fhCategoryEntity || category !== FH_NAME_TO_CATEGORY_MAP.Investments) {
        return;
    }
    return (fhCategoryEntity as FHInvestment).fhPerformance;
};

const useFinancialHoldingsByCategory = ({
    fetcher,
    contactId,
    financialHoldingsCategory,
}: IUseFinancialHoldingsByCategoryProps): IUseFinancialHoldingsByCategoryOutput => {
    const { entities, metadata, categoriesMetadata, ...rest } = useFHData({
        fetcher,
        contactId,
        categoryId: financialHoldingsCategory,
        fetchFI: false,
    });

    const mappedEntities = useMemo(
        () =>
            entities.reduce((prevValue, { balance, category, name, type, currencyId, id, fhCategoryEntity, role }) => {
                const isOwnerOfFH = role && fhOwnerRoles.includes(role);

                if (`${category}` !== financialHoldingsCategory || !isOwnerOfFH) {
                    return prevValue;
                }

                return [
                    ...prevValue,
                    {
                        id,
                        value: balance,
                        name,
                        type: metadata?.types.optionSet[type].text,
                        currencyId,
                        performance: getPerformanceValue(category, fhCategoryEntity),
                    },
                ];
            }, [] as IFinancialHoldingCard[]),
        [entities, financialHoldingsCategory, metadata]
    );

    const isRestricted = categoriesMetadata?.[FH_CATEGORY_TO_ENTITY_NAME[Number(financialHoldingsCategory)]] === HttpStatusCode.FORBIDEN;

    return { ...rest, metadata, entities: mappedEntities, isRestricted };
};

export default useFinancialHoldingsByCategory;
