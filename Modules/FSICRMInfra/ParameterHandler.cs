namespace Microsoft.CloudForFSI.Infra
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Crm.Sdk.Messages;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Xrm.Sdk;
    using Xrm.Sdk.PluginTelemetry;
    using Xrm.Sdk.Query;

    public class ParameterHandler
    {
        public static void ThrowIfNullOrEmpty(string param, PluginParameters pluginParameters)
        {
            if (string.IsNullOrWhiteSpace(param))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.ParameterCantBeNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_NullArgument,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(param) });
            }
        }

        public static void ThrowIfGuidIsDefault(Guid guid, PluginParameters pluginParameters)
        {
            if (guid == default)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.GuidCantBeNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_NullArgument,
                    PluginErrorMessagesIds.Infra.ResourceFileName);
            }
        }

        public static bool IsNullOrEmpty<T>(List<T> list)
        {
            return !list?.Any() ?? true;
        }

        public static QueryExpression GetQueryParametersAsQueryExpression(
            object parameterCollection, 
            PluginParameters pluginParameters)
        {
            QueryExpression queryExpression = null;

            if (parameterCollection is QueryExpression)
            {
                pluginParameters.LoggerService.LogInformation("Received input parameters as QueryExpression", "ParameterHandler");
                queryExpression = (QueryExpression)parameterCollection;
            }

            else if (parameterCollection is FetchExpression)
            {
                pluginParameters.LoggerService.LogInformation("Received input parameters as FetchExpression", "ParameterHandler");
                queryExpression = ConvertFetchExpressionToQueryExpression(parameterCollection as FetchExpression, pluginParameters);
            }

            else
            {
               ErrorManager.TraceAndThrow(pluginParameters,
                   PluginErrorMessagesIds.Infra.InputParametersNeitherQueryNorFetch,
                   FSIErrorCodes.FSIErrorCode_UnsupportedQueryExpression,
                   PluginErrorMessagesIds.Infra.ResourceFileName);
            }

            return queryExpression;
        }

        // Source: https://carldesouza.com/convert-fetchxml-queryexpression-dynamics-365-web-api/
        public static QueryExpression ConvertFetchExpressionToQueryExpression(FetchExpression fetchExpression, PluginParameters pluginParameters)
        {
            var fetchXmlToQueryExpressionRequest = new FetchXmlToQueryExpressionRequest()
            {
                FetchXml = fetchExpression.Query
            };

            try
            {
                var fetchXmlToQueryExpressionResponse = (pluginParameters.OrganizationService.Execute(fetchXmlToQueryExpressionRequest) as FetchXmlToQueryExpressionResponse);
                return fetchXmlToQueryExpressionResponse.Query;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.FailedToConvertQuery,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] {exception.Message});
                throw;
            }
        }
    }
}
