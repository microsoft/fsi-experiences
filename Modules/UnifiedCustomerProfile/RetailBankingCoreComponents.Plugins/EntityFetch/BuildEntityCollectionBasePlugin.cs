namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.Xrm.Sdk;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ServiceModel;

    public abstract class BuildEntityCollectionBasePlugin<T> : BasePlugin
    {
        protected new string ErrorFileName => PluginErrorMessagesIds.RetailBankingComponents.ResourceFileName;
        protected HashSet<string> allowedPermissions = new HashSet<string> () { 
            EntityFetchConstants.Read, EntityFetchConstants.Write, EntityFetchConstants.Delete, EntityFetchConstants.Create };
        private const string priviledgeInitials = "prv";

        protected override string OperationName() => EntityFetchConstants.PluginTypeToMessageNames[this.GetType()];
        protected override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            try
            {
                pluginParameters.LoggerService.LogInformation($"{this.GetType().Name} execution started", this.GetType().Name);
                T inputParams = default;
                try
                {
                    var jsonInputParam = pluginParameters.ExecutionContext.InputParameters[EntityFetchConstants.InputParameterName].ToString();
                    inputParams = JsonConvert.DeserializeObject<T>(jsonInputParam);
                }
                catch
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.InputDataJsonFormatError,
                        FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                        this.ErrorFileName);
                }

                this.ExecuteAction(pluginParameters, inputParams);
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                ErrorManager.UnLocalizedTraceAndThrow(ex.Message, pluginParameters.LoggerService);
            }
            finally
            {
                pluginParameters.LoggerService.LogInformation($"{this.GetType().Name} execution ended", this.GetType().Name);
            }
        }

        protected abstract string BuildEntityQuery(T inputParams, Dictionary<string, bool> permissions, int[] categoriesOptionSet);
        protected abstract void ExecuteAction(PluginParameters pluginParameters, T inputParams);

        protected bool GetUserPermissionForEntity(string entityName, string permission, PluginParameters pluginParameters)
        {
            if (string.IsNullOrEmpty(entityName) || string.IsNullOrEmpty(permission))
            {
                pluginParameters.LoggerService.LogError("Entity name or permission is null or empty.",
                    ((int)FSIErrorCodes.FSIErrorCode_NullArgument));
                return false;
            }

            if(!allowedPermissions.Contains(permission))
            {
                pluginParameters.LoggerService.LogError("Permission is not Read, Write, Create or Delete.",
                    ((int)FSIErrorCodes.FSIErrorCode_Unauthorized));
                return false;
            }

            try
            {
                var privilegeName = string.Format("{0}{1}{2}", priviledgeInitials, permission, entityName);
                return RequestsDAO.GetEntityAccessRights(privilegeName, pluginParameters);
            }
            catch (Exception e)
            {
                pluginParameters.LoggerService.LogError(string.Format("Could not retrieve priveledge for entity {0}, permission {1}", entityName, permission),
                    ((int)FSIErrorCodes.FSIErrorCode_InvalidPluginParameters), e);
                return false;
            }
        }

        protected override void ValidateInputParams(PluginParameters pluginParameters)
        {
            if (!pluginParameters.ExecutionContext.InputParameters.Contains(EntityFetchConstants.InputParameterName) ||
                pluginParameters.ExecutionContext.InputParameters[EntityFetchConstants.InputParameterName] == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.InvalidInputParameter,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new[] { EntityFetchConstants.InputParameterName });
            }
        }
    }
}
