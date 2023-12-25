import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import renderText from '../renderText/renderText';

const renderType =
    ({ fhPickLists }) =>
    (groupHolding: IGroupFinancialHolding) =>
        groupHolding ? renderText({ text: fhPickLists.fhTypeTypes.get(groupHolding.type), name: 'type' }) : '';

export default renderType;
