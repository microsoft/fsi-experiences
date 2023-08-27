import React from 'react';
import { render } from '@testing-library/react';
import SIDMain from './SIDMain';
import { getDetailedFHMock } from '../../../DetailedFHData.mock';
import { getCustomersMock } from '../../../../../components/containers/CustomersTable/Customer.mock';
import ICustomerFH from '../../../../../interfaces/FHEntity/CustomerFH';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { FHMetadataMock } from '../../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

describe('SIDMain', () => {
    const getEntityByCategoryCode = (code: number) => {
        const list = Array.from(getDetailedFHMock().values());
        return list.find(item => item.category === code);
    };

    const relatedCustomers: ICustomerFH[] = getCustomersMock();

    it('Should render account main form', async () => {
        const entity = getEntityByCategoryCode(104800004);

        const { getByText, queryByTestId, queryAllByTestId } = render(
            <SIDMain
                metadata={FHMetadataMock}
                selected={entity}
                relatedCustomers={relatedCustomers}
                relatedCustomersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-name-area/i)).toBeVisible();
        expect(queryAllByTestId(/footer-main-area/i)).toHaveLength(2);
        expect(queryAllByTestId(/non-overdraft-instrument-section/i)).toBeDefined();
        expect(queryAllByTestId(/overdraft-instrument-section/i)).toBeDefined();
        expect(queryByTestId(/contacts-card/i)).toBeVisible();
        expect(queryAllByTestId(/main-sid-databox/i)).toHaveLength(4);
    });

    it('Should render loan main form', async () => {
        const entity = getEntityByCategoryCode(104800001);
        const { queryAllByTestId, queryByTestId } = render(
            <SIDMain
                metadata={FHMetadataMock}
                selected={entity}
                relatedCustomers={relatedCustomers}
                relatedCustomersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-name-area/i)).toBeVisible();
        expect(queryAllByTestId(/footer-main-area/i)).toHaveLength(6);
        expect(queryByTestId(/contacts-card/i)).toBeVisible();
        expect(queryAllByTestId(/main-sid-databox/i)).toHaveLength(4);
    });

    it('Should render investment main form', async () => {
        const entity = getEntityByCategoryCode(104800002);
        const { queryAllByTestId, queryByTestId } = render(
            <SIDMain
                metadata={FHMetadataMock}
                selected={entity}
                relatedCustomers={relatedCustomers}
                relatedCustomersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-name-area/i)).toBeVisible();
        expect(queryAllByTestId(/footer-main-area/i)).toHaveLength(0);
        expect(queryByTestId(/contacts-card/i)).toBeVisible();
        expect(queryAllByTestId(/main-sid-databox/i)).toHaveLength(4);
    });

    it('Should render long term saving main form', async () => {
        const entity = getEntityByCategoryCode(104800003);
        const { getByText, queryAllByTestId, queryByTestId } = render(
            <SIDMain
                metadata={FHMetadataMock}
                selected={entity}
                relatedCustomers={relatedCustomers}
                relatedCustomersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-name-area/i)).toBeVisible();
        expect(queryAllByTestId(/footer-main-area/i)).toHaveLength(3);
        expect(queryByTestId(/contacts-card/i)).toBeVisible();
        expect(queryAllByTestId(/main-sid-databox/i)).toHaveLength(4);
    });

    it('Should render credit line main form', async () => {
        const entity = getEntityByCategoryCode(104800000);
        const { getByText, queryAllByTestId, queryByTestId } = render(
            <SIDMain
                metadata={FHMetadataMock}
                selected={entity}
                relatedCustomers={relatedCustomers}
                relatedCustomersLoadingState={LoadingState.Success}
            />
        );

        expect(queryByTestId(/header-name-area/i)).toBeVisible();
        expect(queryAllByTestId(/footer-main-area/i)).toHaveLength(3);
        expect(queryByTestId(/contacts-card/i)).toBeVisible();
        expect(queryAllByTestId(/main-sid-databox/i)).toHaveLength(4);
    });

    it('Should render chart main form', async () => {
        const entity = getEntityByCategoryCode(104800000);
        const { getByText } = render(
            <SIDMain
                metadata={FHMetadataMock}
                selected={entity}
                relatedCustomers={relatedCustomers}
                relatedCustomersLoadingState={LoadingState.Success}
                chart={{
                    header: 'TEST HEADER',
                    data: [{ category: 'TEST', value: 222, color: 'red' }],
                    emptyStateText: 'EMPTY TEXT TEST',
                }}
                isPreviewFeatures
            />
        );

        expect(getByText('TEST HEADER')).toBeInTheDocument();
    });

    it('Should render credit line main form without related customers', async () => {
        const entity = getEntityByCategoryCode(104800000);
        const { getByText, queryAllByTestId, queryByTestId } = render(
            <SIDMain metadata={FHMetadataMock} selected={entity} relatedCustomers={[]} relatedCustomersLoadingState={LoadingState.Success} />
        );

        expect(queryByTestId(/header-name-area/i)).toBeVisible();
        expect(queryAllByTestId(/footer-main-area/i)).toHaveLength(3);
        expect(queryByTestId(/contacts-wrapper/i)).toBeNull();
        expect(queryAllByTestId(/main-sid-databox/i)).toHaveLength(4);
    });

    it('Should render empty component', async () => {
        const { getByTestId } = render(
            <SIDMain metadata={FHMetadataMock} selected={undefined} relatedCustomers={[]} relatedCustomersLoadingState={LoadingState.Success} />
        );

        expect(getByTestId('empty-state')).toBeVisible();
    });

    it('Should render empty component 2', async () => {
        const entity = getEntityByCategoryCode(104800000);
        if (entity) {
            entity.category = 999;
        }
        const { getByTestId } = render(
            <SIDMain metadata={FHMetadataMock} selected={entity} relatedCustomers={[]} relatedCustomersLoadingState={LoadingState.Success} />
        );

        expect(getByTestId('error-state')).toBeVisible();
    });
});
