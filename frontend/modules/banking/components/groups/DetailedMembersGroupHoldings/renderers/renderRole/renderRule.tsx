import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import renderText from '../renderText';

const renderRole =
    ({ fhPickLists }) =>
    (groupHolding: IGroupFinancialHolding) =>
        /*istanbul ignore next */ groupHolding ? renderText({ text: fhPickLists.roles.get(groupHolding.role || 0), name: 'role' }) : '';

export default renderRole;
