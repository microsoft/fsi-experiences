import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { Pivot } from '@fluentui/react/lib/Pivot';
import { PivotItem } from '@fluentui/react/lib/Pivot';
import { DetailedFHTable } from '../DetailedFHTable/DetailedFHTable';
import { fhOwnerRoles } from '../../../../constants/FHValueMaps';
import { DetailedMembersGroupHoldingsWrapper, IFhPickListsProps } from '../../../groups/DetailedMembersGroupHoldings';
import { GROUPS_HOLDINGS_VIEW_KEYS } from '../../../groups/DetailedMembersGroupHoldings/DetailedMembersGroupHoldings.const';
import { detailedFHBodyPivotItemStyles, detailedFHBodyPivotStyles, detailedFHBodyPivotWrapperStyles } from './DetailedFHBody.style';
import { DetailedFHBodyProps } from './DetailedFHBody.interface';
import { toPickListMap } from '../../../../utilities/EntityMetadata';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { IndictableFH } from '../../../../interfaces/FHEntity/IndictableFH';
import { useResponsiveColumns } from '@fsi/core-components/dist/hooks';
import { ICustomerFH } from '../../../../interfaces/FHEntity/CustomerFH';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';

export interface DetailedFHCustomersState {
    relatedCustomers: ICustomerFH[] | undefined;
    relatedCustomersLoadingState: LoadingState;
}

export const DetailedFHBody: FC<DetailedFHBodyProps> = props => {
    const { metadata, fhStructure, fhItems, fetcher, contactId } = props;
    const { maxSixColumns } = useResponsiveColumns();
    const [selected, setSelected] = useState<IndictableFH | undefined>(undefined);

    const [fhCustomersState, setFHCustomersState] = useState<DetailedFHCustomersState>({
        relatedCustomers: undefined,
        relatedCustomersLoadingState: LoadingState.None,
    });

    const translate = useTranslation(namespaces.DETAILED_FH_CONTROL);
    const translateFH = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const ownersData = useMemo(() => {
        const owners = fhItems.filter(fh => fh.role && fhOwnerRoles.includes(fh.role));
        return owners;
    }, [fhItems]);

    const fhPickLists: IFhPickListsProps | undefined = useMemo(() => {
        if (!metadata) {
            return {
                fhCategoryTypes: new Map(),
                fhTypeTypes: new Map(),
                roles: new Map(),
            };
        }
        return {
            fhCategoryTypes: toPickListMap(metadata.categories.optionSet),
            fhTypeTypes: toPickListMap(metadata.types.optionSet),
            roles: toPickListMap(metadata.role.optionSet),
        };
    }, [metadata]);

    const removeSelection = useCallback(() => {
        setSelected(undefined);
    }, []);

    useEffect(() => {
        if (!selected) {
            setSelected(ownersData[0]);
        }
    }, []);

    useEffect(() => {
        if (!selected) {
            return;
        }

        setFHCustomersState({ relatedCustomers: undefined, relatedCustomersLoadingState: LoadingState.Loading });
        fetcher.fetchFHRelatedCustomers &&
            fetcher
                .fetchFHRelatedCustomers(selected?.id || '')
                .then((data: ICustomerFH[]) => {
                    setFHCustomersState(prevState => ({ ...prevState, relatedCustomers: data, relatedCustomersLoadingState: LoadingState.Success }));
                })
                .catch(error => {
                    setFHCustomersState(prevState => ({ ...prevState, relatedCustomersLoadingState: LoadingState.Error }));
                });
    }, [selected]);

    useEffect(() => {
        if (maxSixColumns) {
            removeSelection();
        } else {
            setSelected(ownersData[0]);
        }
    }, [maxSixColumns]);

    if (maxSixColumns && selected) {
        return (
            <DetailedFHTable
                fhCustomersState={fhCustomersState}
                isCompactView
                setSelected={setSelected}
                selected={selected}
                items={ownersData}
                contactId={contactId}
                metadata={metadata}
            />
        );
    }

    return (
        <Pivot
            aria-label={translate('FH_DETAILED_PIVOT_ARIA_LABEL')}
            styles={detailedFHBodyPivotStyles}
            data-testid={'fh-detailed-pivot-body'}
            className={detailedFHBodyPivotWrapperStyles}
            overflowBehavior="menu"
        >
            <PivotItem
                className={detailedFHBodyPivotItemStyles}
                headerText={translate('FH_CUSTOMER_HOLDING')}
                data-testid={'customer-holdings-pivot'}
            >
                <Divider />
                <DetailedFHTable
                    fhCustomersState={fhCustomersState}
                    isCompactView={maxSixColumns}
                    setSelected={setSelected}
                    selected={selected}
                    items={ownersData}
                    contactId={contactId}
                    metadata={metadata}
                />
            </PivotItem>
            <PivotItem
                className={detailedFHBodyPivotItemStyles}
                headerText={translate('FH_ASSOCIATED_HOLDING')}
                data-testid={'associated-holdings-pivot'}
            >
                <Divider />
                {fhStructure && (
                    <DetailedMembersGroupHoldingsWrapper
                        allFinancialHoldings={fhStructure}
                        fhPickLists={fhPickLists}
                        selectedKey={GROUPS_HOLDINGS_VIEW_KEYS.roleCategory}
                        metadata={metadata}
                        contactId={contactId}
                        emptyStateMessage={translateFH('THERE_ARE_NO_ASSOCIATED_HOLDINGS_FOR_THIS_CUSTOMER')}
                    />
                )}
            </PivotItem>
        </Pivot>
    );
};

export default DetailedFHBody;
