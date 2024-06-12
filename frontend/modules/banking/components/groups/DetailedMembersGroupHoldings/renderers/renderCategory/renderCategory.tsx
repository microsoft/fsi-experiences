/* istanbul ignore file */
import React from 'react';
import { IGroupFinancialHolding } from '../../../../../interfaces/Groups/IGroupFinancialHolding';
import renderText from '../renderText';

const renderCategory =
    ({ fhPickLists }) =>
    (groupHolding: IGroupFinancialHolding) =>
        groupHolding ? renderText({ text: fhPickLists.fhCategoryTypes.get(groupHolding.category), name: 'category' }) : '';

export default renderCategory;
