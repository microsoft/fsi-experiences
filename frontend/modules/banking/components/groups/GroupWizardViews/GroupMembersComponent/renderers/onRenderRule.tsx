import React from 'react';
import { IGroupMember } from '../../../../../interfaces/Groups';
import { MemberRolesTypes } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { Dropdown } from '@fluentui/react/lib/Dropdown';

const onRenderRule =
    ({ translate, onRoleChanged, options }) =>
    (item: IGroupMember) =>
        (
            <Dropdown
                defaultSelectedKey={item.role || MemberRolesTypes['Blank']}
                placeholder={translate('SELECT_ROLE')}
                ariaLabel={translate('SELECT_ROLE')}
                options={options}
                onChange={(e: any, val) => onRoleChanged(item, val?.key)}
            />
        );

export default onRenderRule;
