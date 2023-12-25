import {
    ANNOTATION_FIELD_NAMES,
    DOC_PIPELINE_STEP_FIELD_NAMES,
    PIPELINE_STEP_DEFINITION_FIELD_NAMES,
    DOCUMENT_TABLES,
    DOC_DEFINITION_FIELD_NAMES,
    DOC_REQUEST_FIELD_NAMES,
    DOC_PIPELINE_FIELD_NAMES,
    STEP_FIELD_DEFINITION_FIELD_NAMES,
    STEP_FIELD_DEFINITION_ALIAS,
} from './DocumentIntelligence.const';

export const getDocumentFileQuery = (documentId: string, allFiles?: boolean) => `
<fetch ${allFiles ? '' : `count='1'`} >
    <entity name='${DOCUMENT_TABLES.ANNOTATION}'>
        <filter>
            <condition attribute='${ANNOTATION_FIELD_NAMES.REGARDING_ID}' operator='eq' value='${documentId}'/>
            <condition attribute='${ANNOTATION_FIELD_NAMES.IS_DOCUMENT}' operator='eq' value='true'/>
        </filter>
        <attribute name='${ANNOTATION_FIELD_NAMES.FILE_ID}' />
        <attribute name='${ANNOTATION_FIELD_NAMES.FILE_BODY}' />
        <attribute name='${ANNOTATION_FIELD_NAMES.FILE_TYPE}' />
        <order attribute='${ANNOTATION_FIELD_NAMES.CREATED_ON}' descending='true' />
    </entity>
</fetch>
`;

export const getDocumentPipelineStepsQuery = (pipelineId: string) => `
<fetch>
    <entity name='${DOCUMENT_TABLES.DOC_PIPELINE_STEP}'>
        <filter>
            <condition attribute='${DOC_PIPELINE_STEP_FIELD_NAMES.PIPELINE}' operator='eq' value='${pipelineId}'/>
        </filter>
        <attribute name='${DOC_PIPELINE_STEP_FIELD_NAMES.ID}' />
        <attribute name='${DOC_PIPELINE_STEP_FIELD_NAMES.PIPELINE}' />
        <attribute name='${DOC_PIPELINE_STEP_FIELD_NAMES.STATE}' />
        <attribute name='${DOC_PIPELINE_STEP_FIELD_NAMES.DOC_STATE}' />
        <attribute name='${DOC_PIPELINE_STEP_FIELD_NAMES.OUTPUT}' />
        <attribute name='${DOC_PIPELINE_STEP_FIELD_NAMES.DEFINITION}' />
    </entity>
</fetch>
`;

export const getStepsDefinitionQuery = (documentDefinitionId: string) => `
<fetch>
    <entity name='${DOCUMENT_TABLES.PIPELINE_STEP_DEFINITION}'>
        <filter>
            <condition attribute='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.DOCUMENT_DEFINITIN}' operator='eq' value='${documentDefinitionId}'/>
            <condition attribute='statecode' operator='eq' value='0'/>
        </filter>
        <attribute name='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.ID}' />
        <attribute name='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.NAME}' />
        <attribute name='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.TYPE}' />
        <attribute name='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.LINK}' />
        <attribute name='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.ORDER}' />
        <link-entity name='${DOCUMENT_TABLES.STEP_FIELD_DEFINITION}' from='${STEP_FIELD_DEFINITION_FIELD_NAMES.STEP_DEFINITION}' to='${PIPELINE_STEP_DEFINITION_FIELD_NAMES.ID}'  alias='${STEP_FIELD_DEFINITION_ALIAS}' link-type='outer'>
            <filter>
                <condition attribute='statecode' operator='eq' value='0'/>
            </filter>
            <attribute name='${STEP_FIELD_DEFINITION_FIELD_NAMES.ID}' />
            <attribute name='${STEP_FIELD_DEFINITION_FIELD_NAMES.DISPLAY_NAME}' />
            <attribute name='${STEP_FIELD_DEFINITION_FIELD_NAMES.REQUIRED}' />
            <attribute name='${STEP_FIELD_DEFINITION_FIELD_NAMES.READ_ONLY}' />
            <attribute name='${STEP_FIELD_DEFINITION_FIELD_NAMES.ORDER}' />
            <order attribute="${STEP_FIELD_DEFINITION_FIELD_NAMES.ORDER}" />
            <order attribute="${STEP_FIELD_DEFINITION_FIELD_NAMES.DISPLAY_NAME}" />
        </link-entity>
        <order attribute="${PIPELINE_STEP_DEFINITION_FIELD_NAMES.ORDER}" />
    </entity>
</fetch>
`;

export const getDocumentDefinitionQuery = (businessScenario?: string) => `
<fetch>
    <entity name='${DOCUMENT_TABLES.DOC_DEFINITION}'>
        <filter type="and">
            ${
                businessScenario
                    ? `<condition attribute='${DOC_DEFINITION_FIELD_NAMES.RELEVANT_SCENARIOS}' operator="contain-values" >
                        <value>${businessScenario}</value>
                       </condition>`
                    : ''
            }
            <condition attribute='statecode' operator='eq' value='0'/>
        </filter>
        <attribute name='${DOC_DEFINITION_FIELD_NAMES.ID}' />
        <attribute name='${DOC_DEFINITION_FIELD_NAMES.NAME}' />
        <attribute name='${DOC_DEFINITION_FIELD_NAMES.DESCRIPTION}' />
        <attribute name='${DOC_DEFINITION_FIELD_NAMES.TYPE}' />
    </entity>
</fetch>
`;

export const getDocumentRequestQuery = (documentId: string) => `
<fetch>
    <entity name='${DOCUMENT_TABLES.DOCUMENT_REQUEST}'>
        <filter>
            <condition attribute='${DOC_REQUEST_FIELD_NAMES.ID}' operator='eq' value='${documentId}'/>
        </filter>
        ${Object.values(DOC_REQUEST_FIELD_NAMES).map(column => `  <attribute name='${column}' />`)}
        <link-entity name='${DOCUMENT_TABLES.DOC_DEFINITION}' from='${DOC_DEFINITION_FIELD_NAMES.ID}' to='${
    DOC_REQUEST_FIELD_NAMES.DEFINITION
}'  alias='${DOCUMENT_TABLES.DOC_DEFINITION}' link-type='outer'>
            <attribute name='${DOC_DEFINITION_FIELD_NAMES.NAME}' />
            <attribute name='${DOC_DEFINITION_FIELD_NAMES.TYPE}' />
            <attribute name='${DOC_DEFINITION_FIELD_NAMES.HAS_AUTOMATED_FLOW}' />
        </link-entity> 
    <link-entity name='${DOCUMENT_TABLES.DOC_PIPELINE}' from='${DOC_PIPELINE_FIELD_NAMES.ID}' to='${DOC_REQUEST_FIELD_NAMES.PIPELINE}'  alias='${
    DOCUMENT_TABLES.DOC_PIPELINE
}' link-type='outer'>
        ${Object.values(DOC_PIPELINE_FIELD_NAMES).map(column => `  <attribute name='${column}' />`)}
        </link-entity>
    </entity>
</fetch>
`;
