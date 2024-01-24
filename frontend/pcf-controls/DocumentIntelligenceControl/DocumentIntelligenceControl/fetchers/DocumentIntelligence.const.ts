export const DOC_REQUEST_FIELD_NAMES = {
    ID: 'msfsi_documentrequestid',
    NAME: 'msfsi_name',
    STATE: 'msfsi_state',
    UPLOAD_DATE: 'msfsi_uploadedon',
    AUTO_UPDATED: 'msfsi_isautoupdated',
    STATE_DATE: 'msfsi_stateupdatedon',
    PIPELINE: 'msfsi_latestpipeline',
    DEFINITION: 'msfsi_documentdefinition',
    MODIFIED_BY: 'modifiedby',
    REGARDING: 'msfsi_regarding',
    CONTEXT: 'msfsi_context',
    DOCUMENT: 'msfsi_document',
    DESCRIPTION: 'msfsi_description',
    HAS_AUTOMATED_FLOW: 'msfsi_hasautomaticflow',
    INACTIVE_STATE_CODE: 'statecode',
};

export const DOCUMENT_FIELD_NAMES = {
    ID: 'msfsi_documentid',
    NAME: 'msfsi_name',
    SENT_DATE: 'msfsi_sentdate',
    TYPE: 'msfsi_type',
};

export const DOC_DEFINITION_FIELD_NAMES = {
    ID: 'msfsi_documentdefinitionid',
    NAME: 'msfsi_name',
    TYPE: 'msfsi_type',
    HAS_AUTOMATED_FLOW: 'msfsi_hasautomaticflow',
    DESCRIPTION: 'msfsi_description',
    RELEVANT_SCENARIOS: 'msfsi_relevantscenarios',
};

export const DOC_PIPELINE_FIELD_NAMES = {
    ID: 'msfsi_documentpipelineid',
    NAME: 'msfsi_name',
    DOCUMENT: 'msfsi_documentrequest',
    STATE: 'msfsi_pipelinestate',
    DOC_STATE: 'msfsi_pipelinedocumentstate',
};

export const DOC_PIPELINE_STEP_FIELD_NAMES = {
    ID: 'msfsi_documentpipelinestepid',
    NAME: 'msfsi_name',
    PIPELINE: 'msfsi_documentpipeline',
    STATE: 'msfsi_pipelinestepstate',
    DOC_STATE: 'msfsi_pipelinestepdocumentstate',
    DEFINITION: 'msfsi_pipelinestepdefinition',
    OUTPUT: 'msfsi_output',
};

export const PIPELINE_STEP_DEFINITION_FIELD_NAMES = {
    ID: 'msfsi_pipelinestepdefinitionid',
    NAME: 'msfsi_name',
    LINK: 'msfsi_infolink',
    TYPE: 'msfsi_type',
    ORDER: 'msfsi_order',
    DOCUMENT_DEFINITIN: 'msfsi_documentdefinition',
};

export const STEP_FIELD_DEFINITION_FIELD_NAMES = {
    ID: 'msfsi_externalname',
    DISPLAY_NAME: 'msfsi_displayname',
    REQUIRED: 'msfsi_requiredforapproval',
    ORDER: 'msfsi_order',
    STEP_DEFINITION: 'msfsi_stepdefinition',
    READ_ONLY: 'msfsi_readonly',
};

export const PIPELINE_MESSAGE_FIELD_NAMES = {
    ID: 'msfsi_pipelinedocumentstatemessageid',
    NAME: 'msfsi_name',
    TEXT: 'msfsi_statetext',
    DESCRIPTION: 'msfsi_statedescription',
    PIPELINE_STATE: 'msfsi_pipelinedocumentstate',
};

export const ANNOTATION_FIELD_NAMES = {
    FILE_ID: 'annotationid',
    FILE_BODY: 'documentbody',
    FILE_TYPE: 'mimetype',
    REGARDING_ID: 'objectid',
    CREATED_ON: 'createdon',
    IS_DOCUMENT: 'isdocument',
};

export const DOCUMENT_TABLES = {
    DOCUMENT_REQUEST: 'msfsi_documentrequest',
    DOCUMENT: 'msfsi_document',
    DOC_DEFINITION: 'msfsi_documentdefinition',
    DOC_PIPELINE: 'msfsi_documentpipeline',
    DOC_PIPELINE_STEP: 'msfsi_documentpipelinestep',
    PIPELINE_STEP_DEFINITION: 'msfsi_pipelinestepdefinition',
    STEP_FIELD_DEFINITION: 'msfsi_stepfielddefinition',
    PIPELINE_MESSAGE: 'msfsi_pipelinedocumentstatemessage',
    ANNOTATION: 'annotation',
};

export const REGARDING_DATASET_ALIASES = {
    NAME: 'regardingName',
    CONTEXT: 'regardingContext',
    ROLE: 'regardingRole',
    isPrimary: 'regardingIsPrimary',
};

export const STEP_FIELD_DEFINITION_ALIAS = 'step_field_definition';

export const UPLOAD_API_PARAM = {
    NAME: 'FileName',
    TYPE: 'FileType',
    BODY: 'FileBody',
};

export const DELETE_API_PARAM = {
    DELETE_REQUEST: 'DeleteRequest',
};

export const UPLOAD_API_NAME = 'msfsi_UploadDocument';

export const DELETE_API_NAME = 'msfsi_DeleteDocument';
