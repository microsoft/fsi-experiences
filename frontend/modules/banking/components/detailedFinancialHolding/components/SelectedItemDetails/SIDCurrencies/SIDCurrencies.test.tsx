import React from 'react';
import { render } from '@testing-library/react';
import SIDCurrencies from './SIDCurrencies';
import getStructure, {
    AccountHeaderProps,
    CreditHeaderProps,
    InvestmentHeaderProps,
    LoanHeaderProps,
    SavingHeaderProps,
} from '../../../utilities/SIDComponentStructure';
import { getDetailedFHMock } from '../../../DetailedFHData.mock';
import { SECONDARY_CURR_CODE } from '@fsi/core-components/dist/context/currency/ICurrenciesDetails.mock';
import { defaultUseTranslation } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

const translate = defaultUseTranslation(namespaces.DETAILED_FH_CONTROL);

describe('SIDCurrencies', () => {
    const getEntityByCategoryCode = (code: number, fhCode?: string) => {
        const list = Array.from(getDetailedFHMock().values());
        const entity = list.find(item => item.category === code);
        return (
            entity && {
                ...entity,
                fhCode: fhCode || entity.fhCode,
            }
        );
    };

    it('Should render currencies with different currency', async () => {
        const entity = getEntityByCategoryCode(104800004);
        entity!.balanceDefault = -1000;
        entity!.balanceDefaultDisplay = 1000;
        entity!.currencyId = SECONDARY_CURR_CODE;

        const { getByText } = render(
            <SIDCurrencies
                entity={entity}
                data={
                    getStructure({ entity, translate, metadata: FHMetadataMock })?.header as
                        | InvestmentHeaderProps
                        | AccountHeaderProps
                        | LoanHeaderProps
                        | SavingHeaderProps
                        | CreditHeaderProps
                }
            />
        );

        const value = '4,444.00';

        expect(getByText(value)).toBeVisible();
        expect(getByText(SECONDARY_CURR_CODE)).toBeVisible();

        expect(getByText('1,000.00')).toBeVisible();
        expect(getByText('Amount in USD')).toBeVisible();
    });

    it('Should render account currencies', async () => {
        const entity = getEntityByCategoryCode(104800004);
        const { getByText, getByTestId } = render(
            <SIDCurrencies
                data={
                    getStructure({ entity, translate, metadata: FHMetadataMock })?.header as
                        | InvestmentHeaderProps
                        | AccountHeaderProps
                        | LoanHeaderProps
                        | SavingHeaderProps
                        | CreditHeaderProps
                }
            />
        );

        const value = '4,444.00';

        expect(getByText(value)).toBeVisible();
    });

    it('Should render loan currencies', async () => {
        const entity = getEntityByCategoryCode(104800001);
        const { getByText } = render(
            <SIDCurrencies
                data={
                    getStructure({ entity, translate, metadata: FHMetadataMock })?.header as
                        | InvestmentHeaderProps
                        | AccountHeaderProps
                        | LoanHeaderProps
                        | SavingHeaderProps
                        | CreditHeaderProps
                }
            />
        );

        const value = '7,245.00';
        expect(getByText(value)).toBeVisible();
    });

    it('Should render long term saving currencies', async () => {
        const entity = getEntityByCategoryCode(104800003);
        const { getByText } = render(
            <SIDCurrencies
                data={
                    getStructure({ entity, translate, metadata: FHMetadataMock })?.header as
                        | InvestmentHeaderProps
                        | AccountHeaderProps
                        | LoanHeaderProps
                        | SavingHeaderProps
                        | CreditHeaderProps
                }
            />
        );

        const value = '5,555.00';

        expect(getByText(value)).toBeVisible();
    });

    it('Should render credit line currencies', async () => {
        const entity = getEntityByCategoryCode(104800000);
        const { getByText } = render(
            <SIDCurrencies
                data={
                    getStructure({ entity, translate, metadata: FHMetadataMock })?.header as
                        | InvestmentHeaderProps
                        | AccountHeaderProps
                        | LoanHeaderProps
                        | SavingHeaderProps
                        | CreditHeaderProps
                }
            />
        );

        const value = '0.00';
        expect(getByText(value)).toBeVisible();
    });

    it('Should render investment currencies', async () => {
        const entity = getEntityByCategoryCode(104800002);
        const { getByText } = render(
            <SIDCurrencies
                data={
                    getStructure({ entity, translate, metadata: FHMetadataMock })?.header as
                        | InvestmentHeaderProps
                        | AccountHeaderProps
                        | LoanHeaderProps
                        | SavingHeaderProps
                        | CreditHeaderProps
                }
            />
        );

        const value = '1,234.00';
        expect(getByText(value)).toBeVisible();
    });
});
