import { namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { defaultUseTranslation } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import FHLoan from '../../../interfaces/FHEntity/FHLoan';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { getDetailedFHMock } from '../DetailedFHData.mock';
import getStructure from './SIDComponentStructure';

const translate = defaultUseTranslation(namespaces.DETAILED_FH_CONTROL);

describe('SIDComponentStructure', () => {
    const getEntityByCategoryCode = (code: number) => {
        const list = Array.from(getDetailedFHMock().values());

        return list.filter(item => item.category === code);
    };

    const runStructureTestByCategoryCode = (code: number) => {
        const entities = getEntityByCategoryCode(code);

        entities.forEach(entity => {
            const structure = getStructure({ entity, translate, metadata: FHMetadataMock });
            expect(structure?.header).toBeDefined();
            expect(structure?.main).toBeDefined();
            expect(structure?.footer).toBeDefined();
            expect(structure?.instruments).toEqual(entity?.financialInstruments);
        });
    };

    // eslint-disable-next-line jest/expect-expect
    it('Should return account structure', async () => {
        runStructureTestByCategoryCode(104800004);
    });

    // eslint-disable-next-line jest/expect-expect
    it('Should return investment structure', async () => {
        runStructureTestByCategoryCode(104800002);
    });

    // eslint-disable-next-line jest/expect-expect
    it('Should return loan structure', async () => {
        runStructureTestByCategoryCode(104800001);
    });

    // eslint-disable-next-line jest/expect-expect
    it('Should return credit structure', async () => {
        runStructureTestByCategoryCode(104800000);
    });

    // eslint-disable-next-line jest/expect-expect
    it('Should return saving structure', async () => {
        runStructureTestByCategoryCode(104800003);
    });

    it('Should return undefined for unmapped category', async () => {
        const entity = getEntityByCategoryCode(104800003)[0];

        entity && (entity.category = 111111);

        expect(getStructure({ entity, translate, metadata: FHMetadataMock })).toBeUndefined();
    });

    it('Should return undefined for undefined entity', async () => {
        expect(getStructure({ entity: undefined, translate, metadata: FHMetadataMock })).toBeUndefined();
    });

    it('Should add DelinquencyStatus related rows', async () => {
        const entity = getEntityByCategoryCode(104800001)[0];

        entity && ((entity.fhCategoryEntity as FHLoan).fhDelinquencyStatus = true);

        expect(getStructure({ entity, translate, metadata: FHMetadataMock })?.footer).toHaveLength(10);
    });
});
