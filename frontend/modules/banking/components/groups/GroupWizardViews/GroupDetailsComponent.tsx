import React, { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Stack } from '@fluentui/react/lib/Stack';
import { IGroup } from '../../../interfaces/Groups';
import { GroupsContext } from '../contexts/GroupsContext';
import { GroupsTypes } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import { rootStyles } from './GroupWizardViews.style';
import { mainHouseholdCheckboxStyles, mainHouseholdToolTipStyles } from './GroupDetailsComponent.style';
import { UpdateMessageBarFunction } from '@fsi/core-components/dist/components/atoms/WizardStep/WizardStep.interface';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export interface IGroupDetailsComponentProps {
    group: IGroup;
    isPrimaryDisabled?: boolean;
    isGroupsTypeDisabled?: boolean;
    onDataChanged: (fields: string[], val: any[]) => void;
    onUpdateMessageBar: UpdateMessageBarFunction;
    hasOtherMainGroup: (type: number, id: string) => boolean;
}

export const GroupDetailsComponent: FC<IGroupDetailsComponentProps> = ({
    isPrimaryDisabled,
    isGroupsTypeDisabled,
    group,
    onDataChanged,
    onUpdateMessageBar,
    hasOtherMainGroup,
}) => {
    const groupsContext = useContext(GroupsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);

    const getOptions = (): IDropdownOption[] =>
        Array.from(groupsContext.pickLists.groupTypes.keys()).map(k => {
            const text = groupsContext.pickLists.groupTypes.get(k);
            const option: IDropdownOption = {
                key: k,
                text: text ? text : '',
            };
            return option;
        });

    const isChecked = (): boolean => {
        const mainMember = group.members.find(m => m.customer.id === groupsContext.mainCustomer.id);
        return mainMember?.IsPrimaryGroup || false;
    };

    const updateDefaultMessageBar = () =>
        onUpdateMessageBar(MessageBarType.info, {
            bold: translate('SET_UP_YOUR_GROUP'),
            regular: translate('SELECT_NAME_AND_TYPE'),
        });

    const updateMessageBar = () =>
        isChecked() && hasOtherMainGroup(group.type, group.id)
            ? onUpdateMessageBar(MessageBarType.warning, { regular: translate('MAIN_HOUSEHOLD_CHANGED') })
            : updateDefaultMessageBar();

    useEffect(() => {
        updateMessageBar();
    }, []);

    const onChecked = (checked: boolean | undefined) => {
        const mainMember = group.members.find(m => m.customer.id === groupsContext.mainCustomer.id);
        if (mainMember && group.members.length !== 0 && /* istanbul ignore next */ checked !== undefined) {
            mainMember.IsPrimaryGroup = checked;
            updateMessageBar();
            onDataChanged(['members'], [[...group.members]]);
        }
    };

    const mainHouseholdTooltip = useMemo(
        () => ({
            content: translate('MAIN_HOUSEHOLD_TOOLTIP'),
            directionalHint: DirectionalHint.bottomCenter,
            styles: mainHouseholdToolTipStyles,
        }),
        []
    );

    const handleTypeChanged = useCallback(
        type => {
            // change group member field "IsPrimaryGroup" to false if group is not of type household
            const mainCustomer = group.members.find(member => member.customer.id === groupsContext.mainCustomer.id);
            if (mainCustomer) {
                mainCustomer.IsPrimaryGroup = type === GroupsTypes.household ? !hasOtherMainGroup(GroupsTypes.household, group.id) : false;
            }

            // reset members role if type changed
            const members = group.members.map(m => ({
                ...m,
                role: 0,
            }));

            updateDefaultMessageBar();
            onDataChanged(['members', 'type'], [members, type]);
        },
        [group]
    );

    return (
        <Stack horizontalAlign="start" tokens={{ childrenGap: '13px' }} data-testid="group-details" styles={rootStyles}>
            <TextField
                styles={{ root: { width: 198 } }}
                id="name"
                label={translate('GROUP_TITLE')}
                required={group.name.length === 0}
                placeholder={translate('GROUP_TITLE')}
                value={group.name}
                onChange={(e: any, val) => onDataChanged([e.target.id], [val])}
                data-testid="group-details-text"
            />
            <Dropdown
                styles={{ root: { width: 198 } }}
                data-testid={'group-type-dropdown'}
                id="type"
                defaultSelectedKey={group.type}
                label={translate('GROUP_TYPE')}
                options={getOptions()}
                disabled={isGroupsTypeDisabled}
                onChange={(e: any, val) => handleTypeChanged(/*istanbul ignore next*/ val?.key)}
            />
            {group.type === GroupsTypes.household && (
                <Stack horizontal tokens={{ childrenGap: '5px' }} styles={mainHouseholdCheckboxStyles} data-testid={'main-household-checkbox'}>
                    <Checkbox
                        label={translate('SET_AS_MAIN_HOUSEHOLD')}
                        disabled={isPrimaryDisabled}
                        checked={isChecked()}
                        onChange={(e, val) => onChecked(val)}
                    />
                    <Indicator
                        tooltipProps={mainHouseholdTooltip}
                        size={12}
                        iconName="info"
                        data-testid={`main-household-info`}
                        iconAriaLabel={translate('ARIA_LABEL_INFO')}
                    />
                </Stack>
            )}
        </Stack>
    );
};
