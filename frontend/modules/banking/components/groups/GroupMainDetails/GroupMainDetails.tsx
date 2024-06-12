import React, { FC, useContext, useMemo, useState } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Separator } from '@fluentui/react/lib/Separator';
import { Text } from '@fluentui/react/lib/Text';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { GroupsContext } from '../contexts/GroupsContext';
import { IGroup } from '../../../interfaces/Groups';
import Tag from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import { GroupsTypes } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { GROUPS_HOLDINGS_VIEW_KEYS } from '../DetailedMembersGroupHoldings/DetailedMembersGroupHoldings.const';
import { DetailedMembersGroupHoldingsWrapper } from '../DetailedMembersGroupHoldings/DetailedMembersGroupHoldingsWrapper';
import FinancialDataSummaryWrapper from '../FinancialDataSummary/FinancialDataSummaryWrapper';
import {
    groupMainDetailsTextBold,
    groupMainDetailsText,
    groupMainDetailsStyles,
    groupMainDetailsTitleStyles,
    groupMainDetailsTagStyles,
    groupMainDetailsEditIconStyles,
    groupMainDetailsTableControlStyles,
    groupMainDetailsTableTitleStyles,
    groupMainDetailsFhSummaryStyles,
    groupMainDetailsMessageStyles,
    scrollableWrapper,
    membersWrapper,
    groupHeaderWrapperStyles,
    rightHeaderWrapper,
    groupMainDetailsHeaderStyles,
    iconStyle,
    inlineStack,
    groupPivotHeaderStyles,
    pivotStyles,
    messageBarStyles,
    childrenGap,
} from './GroupMainDetails.style';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import HighlightMessageBar from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import isNil from 'lodash/isNil';
import CustomersTable from '../../containers/CustomersTable/CustomersTable';
import ICustomerFH from '../../../interfaces/FHEntity/CustomerFH';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { useResponsiveColumns } from '@fsi/core-components/dist/hooks';

export interface IGroupMainDetailsProps {
    group: IGroup;
    isPrimary: boolean;
    onEditIconClick: (group: IGroup | null, step: number) => void;
    rolesOptionSet?: EntityMetadataWithOptionSet;
    onDeleteGroupClick: () => void;
    readonly?: boolean;
}

const GroupMainDetails: FC<IGroupMainDetailsProps> = ({ readonly, group, isPrimary, onEditIconClick, rolesOptionSet, onDeleteGroupClick }) => {
    const groupsContext = useContext(GroupsContext);
    const { maxSixColumns, maxFourColumns, maxTwoColumns } = useResponsiveColumns();
    const [selectedKey, setSelectedKey] = useState(GROUPS_HOLDINGS_VIEW_KEYS.members);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const translateFH = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const groupMembers: ICustomerFH[] = useMemo(
        () =>
            group.members.map(member => ({
                contact: { fullName: member.customer.name, contactId: member.customer.id },
                role: member.role,
            })),
        [group.members]
    );

    const missingPrimaryMember = useMemo(() => {
        return group.members.every(m => m.id !== group.primaryMember);
    }, [group]);
    const missingFinancialHoldings = useMemo(() => {
        return isNil(group.financialHoldings) || group.financialHoldings.length === 0;
    }, [group]);

    const getAddressText = () => {
        const groupPrimaryMember = group.members.find(m => m.id === group.primaryMember);
        const addressText = groupPrimaryMember?.customer.address || 'Not available';
        return (
            <Stack styles={inlineStack} horizontal tokens={childrenGap}>
                <Text styles={groupMainDetailsTextBold}>{translate('ADDRESS')}:</Text>
                <Text styles={groupMainDetailsText} data-testid="group-main-details-address-text">
                    {addressText}
                </Text>
            </Stack>
        );
    };

    const getGroupDetailsText = () => {
        const members = (
            <Stack styles={inlineStack} horizontal tokens={childrenGap}>
                <Text styles={groupMainDetailsTextBold}>{group.members.length}</Text>
                <Text styles={groupMainDetailsText}>{translate('MEMBERS')}</Text>
            </Stack>
        );
        const fhs = (
            <Stack styles={inlineStack} horizontal tokens={childrenGap}>
                <Text styles={groupMainDetailsTextBold}>{group.financialHoldings?.length || 0}</Text>
                <Text styles={groupMainDetailsText}>{translate('FINANCIAL_HOLDINGS')}</Text>
            </Stack>
        );
        const type = (
            <Stack styles={inlineStack} horizontal tokens={childrenGap}>
                <Text styles={groupMainDetailsTextBold}>{groupsContext.pickLists.groupTypes.get(group.type)}</Text>
                <Text styles={groupMainDetailsText}>{translate('GROUP')}</Text>
            </Stack>
        );
        return (
            <Stack styles={inlineStack} horizontal tokens={childrenGap}>
                {type}
                <Text styles={groupMainDetailsTextBold}>•</Text>
                {members}
                <Text styles={groupMainDetailsTextBold}>•</Text>
                {fhs}
            </Stack>
        );
    };

    const getAnnualIncome = () => {
        let annualIncome = 0;
        group.members.map(m => {
            annualIncome += m.customer.income;
        });
        return annualIncome;
    };

    return (
        <Stack verticalFill styles={scrollableWrapper(maxSixColumns)}>
            <Stack tokens={{ childrenGap: 4 }}>
                {missingPrimaryMember && (
                    <Stack.Item styles={groupMainDetailsMessageStyles}>
                        <HighlightMessageBar
                            isMultiline
                            styles={messageBarStyles}
                            dismissButtonAriaLabel={translate('CLOSE')}
                            highlight={translate('MISSING_PRIMARY_MEMBER')}
                            regular={translate('MISSING_PRIMARY_MEMBER_INFO')}
                            messageBarType={MessageBarType.severeWarning}
                            messageBarIconProps={{ iconName: 'warning' }}
                        />
                    </Stack.Item>
                )}
                {missingFinancialHoldings && (
                    <Stack.Item styles={groupMainDetailsMessageStyles}>
                        <HighlightMessageBar
                            isMultiline
                            styles={messageBarStyles}
                            dismissButtonAriaLabel={translate('CLOSE')}
                            highlight={translate('MISSING_HOLDINGS_INFO')}
                            regular={translate('MISSING_HOLDINGS_SUB_INFO')}
                            messageBarType={MessageBarType.severeWarning}
                            messageBarIconProps={{ iconName: 'warning' }}
                        />
                    </Stack.Item>
                )}
            </Stack>
            <Stack styles={groupMainDetailsStyles} className={missingFinancialHoldings || missingPrimaryMember ? 'with-message-bar' : ''}>
                <Stack
                    role="heading"
                    aria-level={2}
                    horizontal
                    verticalAlign="end"
                    horizontalAlign="start"
                    tokens={{ childrenGap: '8px' }}
                    styles={groupHeaderWrapperStyles}
                >
                    <Text styles={groupMainDetailsTitleStyles}> {group.name} </Text>
                    <Stack horizontal tokens={{ childrenGap: '8px' }} verticalAlign="end" styles={rightHeaderWrapper}>
                        {isPrimary && (
                            <Stack.Item styles={groupMainDetailsTagStyles}>
                                {group.type === GroupsTypes.household && <Tag text={translate('MAIN_HOUSEHOLD')} />}
                            </Stack.Item>
                        )}
                        <IconButton
                            styles={groupMainDetailsEditIconStyles}
                            iconProps={{ iconName: 'Edit', 'aria-hidden': true }}
                            onClick={() => onEditIconClick(group, 0)}
                            data-testid="group-main-details-edit"
                            aria-label={translate('GROUPS_EDIT')}
                            title={translate('GROUPS_EDIT')}
                            disabled={readonly}
                        />
                    </Stack>
                </Stack>
                <Separator />
                {getAddressText()}
                {getGroupDetailsText()}
            </Stack>
            <Stack verticalFill styles={scrollableWrapper(maxSixColumns)}>
                <Stack.Item styles={groupMainDetailsFhSummaryStyles}>
                    <FinancialDataSummaryWrapper
                        financialProducts={group.financialHoldings}
                        annualIncome={getAnnualIncome()}
                        categories={groupsContext.fhPickLists.fhCategoryTypes}
                    />
                </Stack.Item>
                <Stack styles={groupMainDetailsTableControlStyles}>
                    <Stack styles={groupMainDetailsHeaderStyles} horizontal horizontalAlign="space-between" verticalAlign="center">
                        <Stack.Item styles={{ root: { textAlign: 'center' } }}>
                            <Text as="h2" styles={groupMainDetailsTableTitleStyles}>
                                {translate('GROUP_FINANCIAL_HOLDINGS')}
                            </Text>
                        </Stack.Item>
                        <Stack
                            horizontal
                            verticalAlign="center"
                            tokens={maxTwoColumns ? {} : { childrenGap: '14px' }}
                            styles={groupPivotHeaderStyles}
                        >
                            <Text>{translate('GROUP_BY')}:</Text>
                            <Pivot
                                selectedKey={selectedKey}
                                onLinkClick={(item, e) => /* istanbul ignore next */ setSelectedKey(item?.props.itemKey!)} //ignoring next since item can be null but we can't test this case (TS issue)
                                headersOnly={true}
                                styles={pivotStyles}
                            >
                                <PivotItem headerText={translateFH('CATEGORY')} itemKey={GROUPS_HOLDINGS_VIEW_KEYS.category}></PivotItem>
                                <PivotItem headerText={translateFH('OWNER')} itemKey={GROUPS_HOLDINGS_VIEW_KEYS.members}></PivotItem>
                            </Pivot>
                            <IconButton
                                styles={groupMainDetailsTagStyles}
                                iconProps={{ iconName: 'Edit', 'aria-hidden': true }}
                                onClick={() => onEditIconClick(group, 2)}
                                data-testid="group-main-details-edit-fh"
                                aria-label={translate('GROUPS_EDIT')}
                                title={translate('GROUPS_EDIT')}
                                disabled={readonly}
                            />
                        </Stack>
                    </Stack>
                    <Separator />
                    {group.financialHoldings ? (
                        <DetailedMembersGroupHoldingsWrapper
                            allFinancialHoldings={group.financialHoldings}
                            selectedKey={selectedKey}
                            fhPickLists={groupsContext.fhPickLists}
                        />
                    ) : (
                        <ErrorState iconSize={100} />
                    )}
                </Stack>
                <Stack styles={membersWrapper} data-testid="groups-members-wrapper">
                    <Stack horizontal horizontalAlign="space-between">
                        <Text styles={groupMainDetailsTableTitleStyles}>{translate('GROUPS_MEMBERS', { members: groupMembers.length })}</Text>
                        <Stack horizontal>
                            <IconButton
                                menuIconProps={{
                                    iconName: 'Delete',
                                    'aria-hidden': true,
                                    style: iconStyle,
                                }}
                                onClick={onDeleteGroupClick}
                                disabled={readonly}
                                data-testid="group-card-component-delete-button"
                                aria-label={translate('DELETE')}
                                title={translate('DELETE')}
                            />
                            <IconButton
                                menuIconProps={{
                                    iconName: 'Edit',
                                    'aria-hidden': true,
                                    style: iconStyle,
                                }}
                                onClick={() => onEditIconClick(group, 1)}
                                disabled={readonly}
                                data-testid="group-card-component-edit-button"
                                aria-label={translate('GROUPS_EDIT')}
                                title={translate('GROUPS_EDIT')}
                            />
                        </Stack>
                    </Stack>
                    <CustomersTable
                        isCompact={maxFourColumns}
                        roleMetaData={rolesOptionSet}
                        customers={groupMembers}
                        customersLoadingState={LoadingState.Success}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};
export default GroupMainDetails;
