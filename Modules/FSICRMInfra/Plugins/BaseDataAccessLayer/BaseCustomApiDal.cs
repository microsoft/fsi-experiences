namespace Microsoft.CloudForFSI.Infra.Plugins.BaseDataAccessLayer
{
    using System;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.Xrm.Sdk;
    using Newtonsoft.Json.Linq;
    using System.Collections.Generic;
    using Microsoft.Xrm.Sdk.Query;

    public class BaseCustomApiDal : BaseDal, IBaseCustomApiDal
    {
        public BaseCustomApiDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext)
            : base(logger, organizationService, executionContext) {}

        public bool TryGetInputParameter<T>(string parameterName, out T parameterValue)
        {
            return this.executionContext.InputParameters.TryGetValue(parameterName, out parameterValue) && parameterValue is T;
        }

        public bool TryGetArrayInputParameter<T>(string parameterName, out List<T> parameterValue)
        {
            try
            {
                // Deals with situations where platforms send an array wrapped in an object {array[]}
                parameterValue = JArray.FromObject(executionContext.InputParameters[parameterName]).ToObject<List<T>>();
                return true;
            }
            catch
            {
                parameterValue = new List<T>();
                this.logger.LogError($"Could not parse array from input parameter {parameterName}.");
                return false;
            }
        }

        public void SetOutput<T>(string outputParameterName, T outputValue)
        {
            this.executionContext.OutputParameters[outputParameterName] = outputValue;
        }

        public PluginResult<Entity> RetrieveEntity(string entityLogicalName, Guid id, ColumnSet columnSet)
        {
            var entity = this.organizationService.Retrieve(entityLogicalName, id, columnSet);
            if (entity == null)
            {
                return PluginResult.Fail<Entity>($"Could not retrieve {entityLogicalName} from the dataverse Env", Infra.FSIErrorCodes.FSIErrorCode_UnexpectedError, null);
            }

            return PluginResult.Ok<Entity>(entity);

        }

        public PluginResult<EntityCollection> FetchFromQuery(string query)
        {
            try
            {
                return (PluginResult.Ok(organizationService.RetrieveMultiple(new FetchExpression(query))));
            }
            catch (Exception ex)
            {
                logger.LogError($"There was a problem executing the query {query}.");
                return PluginResult.Fail<EntityCollection>($"There was a problem fetching data from DV: {ex.Message}", Infra.FSIErrorCodes.FSIErrorCode_UnexpectedError, string.Empty);
            }
        }
    }
}
