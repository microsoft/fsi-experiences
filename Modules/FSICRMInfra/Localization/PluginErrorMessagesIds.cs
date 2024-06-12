namespace Microsoft.CloudForFSI.ErrorMessages.Localization
{
    using Microsoft.CloudForFSI.Infra;

    internal static partial class PluginErrorMessagesIds
    {
        public static class Infra
        {
            public const string ResourceFileName = Constants.ResourcesNames.Infra;
            public static readonly string UnexpectedError = "UnexpectedError";
            public static readonly string InputParameterIsNotAnEntity = "InputParameterIsNotAnEntity";
            public static readonly string InputParameterIsNotOfCorrectType = "InputParameterIsNotOfCorrectType";
            public static readonly string NullPreviousEntityState = "NullPreviousEntityState";
            public static readonly string PrimaryEntityIdNotValue = "PrimaryEntityIdNotValue";
            public static readonly string MissingInputParams = "MissingInputParams";
            public static readonly string RetrieveMultipleMalformedInputParameter = "RetrieveMultipleMalformedInputParameter";
            public static readonly string PreviousStateManagerNullPreImage = "PreviousStateManagerNullPreImage";
            public static readonly string PreviousStateManagerStateNotAvailable = "PreviousStateManagerStateNotAvailable";
            public static readonly string PreviousStateManagerStateForEntityNotAvailable = "PreviousStateManagerStateForEntityNotAvailable";
            public static readonly string ContactQueryIdNullOrEmpty = "ContactQueryIdNullOrEmpty";
            public static readonly string EntityDoesNotExist = "EntityDoesNotExist";
            public static readonly string RetrieveMultipleFailed = "RetrieveMultipleFailed";
            public static readonly string RetrieveMultipleQueryFailed = "RetrieveMultipleQueryFailed";
            public static readonly string InitializationOfEntityFailed = "InitializationOfEntityFailed";
            public static readonly string GroupTypeIsEmpty = "GroupTypeIsEmpty";
            public static readonly string TableDoesNotExist = "TableDoesNotExist";
            public static readonly string InputParametersNeitherQueryNorFetch = "InputParametersNeitherQueryNorFetch";
            public static readonly string FailedToConvertQuery = "FailedToConvertQuery";
            public static readonly string ParameterCantBeNullOrEmpty = "ParameterCantBeNullOrEmpty";
            public static readonly string GuidCantBeNullOrEmpty = "GuidCantBeNullOrEmpty";
            public static readonly string WrongOperation = "WrongOperation";
        }
    }
}
