namespace Microsoft.CloudForFSI.Infra
{
    public enum FSIErrorCodes
    {
        FSIErrorCode_NoError = 0,
        FSIErrorCode_MissingCiTable = 1,
        FSIErrorCode_MissingFSIConfigTable = 2,
        FSIErrorCode_CiCustomerIdNotFound = 3,
        FSIErrorCode_ConfigurationError = 4,
        FSIErrorCode_FailedToGetModelOutputs = 5,
        FSIErrorCode_UnsupportedQueryExpression = 6,
        FSIErrorCode_MissingEntityTable = 7,
        FSIErrorCode_LocalizationError = 8, 
        FSIErrorCode_UnexpectedError = 9,
        FSIErrorCode_IllegalUserInput = 10,
        FSIErrorCode_InvalidPluginParameters = 11,
        FSIErrorCode_PluginRegisteredIncorrectly = 12,
        FSIErrorCode_FailedToUpdateModel = 13,
        FSIErrorCode_RetrieveBadModelOutput = 14,
        FSIErrorCode_NullArgument = 15,
        FSIErrorCode_Unauthorized = 16
    }
}
