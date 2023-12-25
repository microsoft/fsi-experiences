import React from 'react';
import { render } from '@testing-library/react';
import SIDHeader from './SIDHeader';
import getStructure, {
    AccountHeaderProps,
    CreditHeaderProps,
    InvestmentHeaderProps,
    LoanHeaderProps,
    SavingHeaderProps,
} from '../../../utilities/SIDComponentStructure';
import { getDetailedFHMock } from '../../../DetailedFHData.mock';
import { defaultUseTranslation } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';

const translate = defaultUseTranslation(namespaces.DETAILED_FH_CONTROL);
const FH_TYPE_MAP = FHMetadataMock.types.optionSet;
const FH_CATEGORY_MAP = FHMetadataMock.categories.optionSet;

type AllCategoryHeaderProps = InvestmentHeaderProps | AccountHeaderProps | LoanHeaderProps | SavingHeaderProps | CreditHeaderProps;

describe('SIDHeader', () => {
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

    const fhNames = ['4ever', 'Sam Stuart Secured Loan', 'mumbo number 5', 'rock st3r'];
    const categoryNames = ['Accounts', 'Loans', 'Long-term savings', 'Lines of credit'];
    const typeNames = ['Checking', 'Secured', 'Provident fund', 'Revolving'];

    it('Should render account header with description', async () => {
        const entity = getEntityByCategoryCode(104800004);
        const { getByText, getByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                description={'Lorem ipsum dolor sit amet'}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(getByTestId(/header-id-area-/i)).toBeVisible();
        expect(getByTestId(/indicator-bar/i)).toBeVisible();
        expect(getByText(entity?.fhCode!)).toBeVisible();
        expect(getByText(fhNames[0])).toBeVisible();
        expect(getByText('Lorem ipsum dolor sit amet')).toBeVisible();
        expect(getByText(`${categoryNames[0]}`)).toBeVisible();
        expect(getByText('•')).toBeVisible();
        expect(getByText(`${typeNames[0]}`)).toBeVisible();
    });

    it('Should render loan header', async () => {
        const entity = getEntityByCategoryCode(104800001);
        const { getByText, queryByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-id-area-/i)).toBeNull();
        expect(queryByTestId('fh-header-description"')).toBeNull();
        expect(getByText(fhNames[1])).toBeVisible();
        expect(getByText(`${categoryNames[1]}`)).toBeVisible();
        expect(getByText('•')).toBeVisible();
        expect(getByText(`${typeNames[1]}`)).toBeVisible();
    });

    it('Should render loan header with loan id', async () => {
        const loanId = 'loan-123';
        const entity = getEntityByCategoryCode(104800001, loanId);
        const { getByText, queryByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-id-area-/i)).toBeVisible();
        expect(getByText(loanId)).toBeVisible();
    });

    it('Should render long term saving header', async () => {
        const entity = getEntityByCategoryCode(104800003);
        const { getByText, getByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(getByTestId(/header-id-area-/i)).toBeVisible();
        expect(getByText(entity?.fhCode!)).toBeVisible();
        expect(getByText(fhNames[2])).toBeVisible();
        expect(getByText(`${categoryNames[2]}`)).toBeVisible();
        expect(getByText('•')).toBeVisible();
        expect(getByText(`${typeNames[2]}`)).toBeVisible();
    });

    it('Should render credit line header', async () => {
        const entity = getEntityByCategoryCode(104800000);
        const { getByText, queryByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-id-area-/i)).toBeNull();
        expect(getByText(fhNames[3])).toBeVisible();
        expect(getByText(`${categoryNames[3]}`)).toBeVisible();
        expect(getByText('•')).toBeVisible();
        expect(getByText(`${typeNames[3]}`)).toBeVisible();
    });

    it('Should render credit line header with credit line id', async () => {
        const entity = getEntityByCategoryCode(104800000, 'credit-line-123');
        const { getByText, queryByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-id-area-/i)).toBeVisible();
        expect(getByText('credit-line-123')).toBeVisible();
    });

    it('Should render investment header', async () => {
        const entity = getEntityByCategoryCode(104800002);
        const { getByText, queryByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0].text}
                type={FH_TYPE_MAP[entity?.type || 0].text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-id-area-/i)).toBeVisible();
        expect(getByText('Investments')).toBeVisible();
        expect(getByText('•')).toBeVisible();
        expect(getByText('Brokerage')).toBeVisible();
    });

    it('Should render empty component', async () => {
        const entity = getEntityByCategoryCode(1);
        const { queryByTestId } = render(
            <SIDHeader
                contacts={[]}
                data={getStructure({ entity, translate, metadata: FHMetadataMock })?.header as AllCategoryHeaderProps}
                name={entity?.name}
                category={FH_CATEGORY_MAP[entity?.category || 0]?.text}
                type={FH_TYPE_MAP[entity?.type || 0]?.text}
                indicators={entity?.indicator}
                customersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/eader-name-area/i)).toBeNull();
    });
});
