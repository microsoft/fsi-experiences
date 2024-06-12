import React from 'react';
import { IGroupMember } from '../../../../../interfaces/Groups';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';

const onRenderPrimaryMember =
    ({ group, onPrimaryMemberChanged }) =>
    (item: IGroupMember) =>
        (
            <ChoiceGroup
                data-testid={`group-primary-choice`}
                options={[{ key: item.id, text: '', ariaLabel: item.customer.name }]}
                ariaLabelledBy="is-primary-member"
                selectedKey={item.id === group.primaryMember ? item.id : ''}
                onChange={() => onPrimaryMemberChanged(item)}
            />
        );

export default onRenderPrimaryMember;
