import React from 'react';
import { render } from '@testing-library/react';
import SIDFooter from './SIDFooter';
import getStructure from '../../../utilities/SIDComponentStructure';
import { getDetailedFHMock } from '../../../DetailedFHData.mock';
import { defaultUseTranslation } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

const translate = defaultUseTranslation(namespaces.DETAILED_FH_CONTROL);

describe('SIDFooter', () => {
    const getEntityByCategoryCode = (code: number) => {
        const list = Array.from(getDetailedFHMock().values());
        return list.find(item => item.category === code);
    };

    it('Should render account footer', async () => {
        const entity = getEntityByCategoryCode(104800004);
        const { queryAllByTestId } = render(<SIDFooter data={getStructure({ entity, translate, metadata: FHMetadataMock })?.footer} />);

        expect(queryAllByTestId(/footer-sid-databox/i)).toHaveLength(3);
        expect(queryAllByTestId(/footer-seperator/i)).toHaveLength(0);
    });

    it('Should render loan footer', async () => {
        const entity = getEntityByCategoryCode(104800001);
        const { queryAllByTestId } = render(<SIDFooter data={getStructure({ entity, translate, metadata: FHMetadataMock })?.footer} />);

        expect(queryAllByTestId(/footer-sid-databox/i)).toHaveLength(12);
        expect(queryAllByTestId(/footer-seperator/i)).toHaveLength(1);
    });

    it('Should render loan footer with capital arrears area', async () => {
        const list = Array.from(getDetailedFHMock().values());
        const entity = list.find(item => item.id === '37d32c40-006e-4cd0-a915-b85b48c9ffff');
        const { queryAllByTestId } = render(<SIDFooter data={getStructure({ entity, translate, metadata: FHMetadataMock })?.footer} />);

        expect(queryAllByTestId(/footer-sid-databox/i)).toHaveLength(16);
        expect(queryAllByTestId(/footer-seperator/i)).toHaveLength(2);
    });

    it('Should render long term saving footer', async () => {
        const entity = getEntityByCategoryCode(104800003);
        const { queryAllByTestId } = render(<SIDFooter data={getStructure({ entity, translate, metadata: FHMetadataMock })?.footer} />);

        expect(queryAllByTestId(/footer-sid-databox/i)).toHaveLength(5);
        expect(queryAllByTestId(/footer-seperator/i)).toHaveLength(0);
    });

    it('Should render credit line footer', async () => {
        const entity = getEntityByCategoryCode(104800000);
        const { queryAllByTestId } = render(<SIDFooter data={getStructure({ entity, translate, metadata: FHMetadataMock })?.footer} />);

        expect(queryAllByTestId(/footer-sid-databox/i)).toHaveLength(6);
        expect(queryAllByTestId(/footer-seperator/i)).toHaveLength(0);
    });

    it('Should render empty component', async () => {
        const { queryAllByTestId } = render(<SIDFooter data={undefined} />);

        expect(queryAllByTestId(/footer-sid-databox/i)).toHaveLength(0);
        expect(queryAllByTestId(/footer-seperator/i)).toHaveLength(0);
    });
});
