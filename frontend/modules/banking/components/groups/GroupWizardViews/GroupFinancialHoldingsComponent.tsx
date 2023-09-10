import React, { FC, useContext, useEffect, useState } from 'react';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Separator } from '@fluentui/react/lib/Separator';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { IGroupMember, IGroupFinancialHolding } from '../../../interfaces/Groups';
import { GroupsContext } from '../contexts/GroupsContext';
import { GROUPS_HOLDINGS_VIEW_KEYS } from '../DetailedMembersGroupHoldings/DetailedMembersGroupHoldings.const';
import differenceWith from 'lodash/differenceWith';
import LoadingComponent from '../LoadingComponent';
import { DetailedMembersGroupHoldingsWrapper } from '../DetailedMembersGroupHoldings/DetailedMembersGroupHoldingsWrapper';
import { rootStyles } from './GroupWizardViews.style';
import { UpdateMessageBarFunction } from '@fsi/core-components/dist/components/atoms/WizardStep/WizardStep.interface';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export interface IGroupFinancialHoldingsComponentProps {
    members: IGroupMember[];
    groupId: string;
    financialHoldings?: IGroupFinancialHolding[];
    onDataChanged: (financialHoldings: IGroupFinancialHolding[]) => void;
    onUpdateMessageBar: UpdateMessageBarFunction;
}

export const GroupFinancialHoldingsComponent: FC<IGroupFinancialHoldingsComponentProps> = ({
    members,
    groupId,
    financialHoldings,
    onDataChanged,
    onUpdateMessageBar,
}) => {
    const groupsContext = useContext(GroupsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const translateFH = useTranslation(namespaces.FINANCIAL_HOLDINGS);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [allHoldings, setAllHoldings] = useState<IGroupFinancialHolding[]>([]);
    const [selectedKey, setSelectedKey] = useState(GROUPS_HOLDINGS_VIEW_KEYS.members);

    useEffect(() => {
        onUpdateMessageBar(MessageBarType.info, { regular: translate('SELECT_FINANCIAL_HOLDING') });
        setIsLoading(true);
        const loadOptions = async () => {
            if (members.length !== 0) {
                try {
                    const holdings = await groupsContext.getMemberFinancialHoldings(members, groupId);
                    setAllHoldings(holdings);
                } catch (err) {
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsError(true);
                setIsLoading(false);
            }
        };
        loadOptions();
    }, []);

    const onFinancialHoldingChanged = (groupHoldings: IGroupFinancialHolding[], isChecked?: boolean) => {
        if (isChecked === undefined || !financialHoldings) return;
        if (isChecked) {
            onDataChanged([...financialHoldings, ...groupHoldings]);
        } else {
            const newArray: IGroupFinancialHolding[] = differenceWith(
                financialHoldings,
                groupHoldings,
                (first: IGroupFinancialHolding, second: IGroupFinancialHolding) => first.id === second.id
            );
            onDataChanged(newArray);
        }
    };

    return (
        <Stack horizontalAlign="start" styles={rootStyles} data-testid="group-fh">
            <Stack horizontal verticalAlign="center" horizontalAlign="space-between" styles={{ root: { width: '100%' } }} wrap>
                <Stack.Item>
                    <Text styles={{ root: { marginTop: '32px', fontSize: FontSizes.size20, fontWeight: FontWeights.regular } }}>
                        {translate('GROUP_FINANCIAL_HOLDINGS_WITH_COUNT', { financialHoldings: `(${financialHoldings?.length || 0})` })}
                    </Text>
                </Stack.Item>
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: '18px' }}>
                    <Text>{translate('GROUP_BY')}:</Text>
                    <Pivot
                        selectedKey={selectedKey}
                        onLinkClick={(item, e) => /* istanbul ignore next */ setSelectedKey(item?.props.itemKey!)}
                        headersOnly={true}
                    >
                        <PivotItem headerText={translateFH('CATEGORY')} itemKey={GROUPS_HOLDINGS_VIEW_KEYS.category}></PivotItem>
                        <PivotItem headerText={translateFH('OWNER')} itemKey={GROUPS_HOLDINGS_VIEW_KEYS.members}></PivotItem>
                    </Pivot>
                </Stack>
            </Stack>
            <Separator styles={{ root: { width: '100%', padding: '21px 0px 0x 0x', height: '2px' } }} />
            <Stack.Item styles={{ root: { width: '100%' } }}>
                {!isLoading && !isError && (
                    <DetailedMembersGroupHoldingsWrapper
                        selectedFinancialHoldings={financialHoldings}
                        allFinancialHoldings={allHoldings}
                        selectedKey={selectedKey}
                        fhPickLists={groupsContext.fhPickLists}
                        onFHChanged={onFinancialHoldingChanged}
                    />
                )}
                {isLoading && <LoadingComponent msg={translate('LOADING_FINANCIAL_HOLDINGS')} />}
                {isError && <ErrorState iconSize={100} />}
            </Stack.Item>
        </Stack>
    );
};
