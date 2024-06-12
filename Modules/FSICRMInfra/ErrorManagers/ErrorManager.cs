namespace Microsoft.CloudForFSI.Infra.ErrorManagers
{
    using Microsoft.CloudForFSI.Infra.Logger;
    using Plugins;
    using Xrm.Sdk;

    public class ErrorManager
    {              

        public static void TraceAndThrow(PluginParameters pluginParameters, string valueId, FSIErrorCodes errorCode, string errorFileName, object[] stringArgs = null)
        {
            if (pluginParameters?.PluginResourceService == null)
            {
                pluginParameters?.LoggerService?.LogError(valueId, (int)errorCode);
                throw new InvalidPluginExecutionException(OperationStatus.Failed, (int)errorCode, valueId);
            }

            stringArgs = stringArgs ?? new object[] { };
            var errorMessage = string.Format(
                pluginParameters.PluginResourceService.GetResourceValueFromId(
                    valueId,
                    errorFileName),
                stringArgs);

            var englishCultureForTraces = 1033;
            var traceEnglishErrorMessage = string.Format(pluginParameters.PluginResourceService.GetResourceValueInSpecificCultureFromId(
                    valueId,
                    errorFileName,
                    englishCultureForTraces),
                stringArgs);
            
            pluginParameters.LoggerService.LogError(traceEnglishErrorMessage, (int)errorCode);
            throw new InvalidPluginExecutionException(OperationStatus.Failed, (int)errorCode, errorMessage);
        }

        public static void UnLocalizedTraceAndThrow(string errorMessage, ILoggerService loggerService)
        {
            var errorCode = (int)FSIErrorCodes.FSIErrorCode_UnexpectedError;
            loggerService?.LogError(errorMessage, errorCode);
            throw new InvalidPluginExecutionException(OperationStatus.Failed, errorCode, errorMessage);
        }
    }
}
