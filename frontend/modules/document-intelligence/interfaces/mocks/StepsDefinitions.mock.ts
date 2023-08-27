import { StepTypes } from '../../constants/StepTypes.const';
import { IStepDefinition } from '../IDocumentInsight';

export const stepDefinitionExtract = {
    id: 'step-def1',
    name: 'Extract',
    type: StepTypes.Extraction,
    order: 1,
    link: 'https://www.microsoft.com',
    fields: [
        {
            displayName: 'First Name',
            required: true,
            id: 'field1',
            order: 1,
        },
        {
            displayName: 'Last Name',
            required: true,
            id: 'field2',
            order: 2,
        },
    ],
} as IStepDefinition;

export const stepDefinitionVerify = {
    id: 'step-def2',
    name: 'Verify',
    type: 2,
    link: 'https://www.microsoft.com',
    order: 2,
    fields: [],
} as IStepDefinition;

export const stepDefinitionReview = {
    id: 'step-def3',
    name: 'Review',
    type: 3,
    order: 3,
    fields: [],
} as IStepDefinition;

export const stepDefinitionApprove = {
    id: 'step-def4',
    name: 'Approve',
    type: 4,
    order: 4,
    fields: [],
} as IStepDefinition;

export const stepDefinitionEnrichment = {
    id: 'step-def5',
    name: 'Enrichment',
    type: StepTypes.Enrichment,
    order: 5,
    fields: [],
} as IStepDefinition;

export const stepDefinitionUnclear = {
    id: 'step-def6',
    name: 'Unclear',
    type: 6,
    order: 6,
    fields: [],
} as IStepDefinition;

export const stepsDefinitions = [
    stepDefinitionExtract,
    stepDefinitionVerify,
    stepDefinitionEnrichment,
    stepDefinitionReview,
    stepDefinitionApprove,
    stepDefinitionUnclear,
];
