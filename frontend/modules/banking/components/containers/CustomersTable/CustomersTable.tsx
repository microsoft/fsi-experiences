import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react/lib/components/DetailsList';
import React, { FC } from 'react';
import ICustomerFH from '../../../interfaces/FHEntity/CustomerFH';
import { LinkablePersona } from '@fsi/core-components/dist/components/atoms/LinkablePersona';
import type { ICustomersTableProps } from './CustomersTable.interface';
import { customerTableStyles, emptyStateStyles } from './CustomersTable.style';
import { Loading } from '@fsi/core-components/dist/components/atoms/Loading';
import { detailsListOverflowXHiddenStyles } from '@fsi/core-components/dist/styles/DetailsList.style';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';

import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { getOptionSetText } from '../../../utilities/EntityMetadata';

const CustomersTable: FC<ICustomersTableProps> = props => {
    const { customers, customersLoadingState, roleMetaData, isCompact } = props;

    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const _columns: IColumn[] = [
        {
            key: 'column1',
            name: translate('CONTACT'),
            fieldName: 'name',
            minWidth: 50,
            isResizable: true,
            className: customerTableStyles.customerColumn,
            isIconOnly: false,
            onRender: (item: ICustomerFH) => (
                <LinkablePersona
                    personas={[
                        {
                            personaName: item.contact.fullName,
                            imageUrl: item.contact.contactImgUrl,
                            data: { ...item.contact, id: item.contact.contactId },
                        },
                    ]}
                    personaProps={{ secondaryText: isCompact ? getOptionSetText(item.role, roleMetaData) : undefined }}
                />
            ),
        },
        ...(isCompact
            ? []
            : [
                  {
                      key: 'column2',
                      name: translate('ROLE'),
                      fieldName: 'role',
                      minWidth: 100,
                      maxWidth: 150,
                      className: customerTableStyles.roleColumn,
                      isResizable: true,
                      isIconOnly: false,
                      onRender: item => <span data-testid="customer-role">{getOptionSetText(item.role, roleMetaData)}</span>,
                  },
              ]),
    ];

    const customersTable = (items: ICustomerFH[]) => {
        return (
            <div className="tableWrapper" data-testid={'customers-table'}>
                <DetailsList
                    items={items}
                    columns={_columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    selectionMode={SelectionMode.none}
                    isHeaderVisible={true}
                    styles={detailsListOverflowXHiddenStyles}
                />
            </div>
        );
    };

    if (customersLoadingState === LoadingState.Error) {
        return (
            //empty table with headers for design porposes
            <>
                {customersTable([])}
                <div style={{ height: '120px' }}>
                    <ErrorState iconSize={48} styles={emptyStateStyles} />
                </div>
            </>
        );
    }

    if (customersLoadingState !== LoadingState.Success) {
        return (
            <div
                style={{
                    padding: '15px 0px',
                }}
            >
                <Loading />
            </div>
        );
    }

    if (customers.length === 0) {
        return <></>;
    }

    return customersTable(customers);
};

export default CustomersTable;
