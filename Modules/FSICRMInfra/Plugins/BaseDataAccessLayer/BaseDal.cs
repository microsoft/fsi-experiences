namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Messages;
    using Microsoft.Xrm.Sdk.Metadata;
    using Microsoft.Xrm.Sdk.Metadata.Query;
    using Microsoft.Xrm.Sdk.Query;
    using Microsoft.CloudForFSI.Tables;

    public class BaseDal : IBaseDal
    {
        protected readonly ILoggerService logger;
        protected readonly IOrganizationService organizationService;
        protected readonly IPluginExecutionContext executionContext;

        public BaseDal(ILoggerService logger, IOrganizationService organizationService, IPluginExecutionContext executionContext)
        {
            this.logger = logger;
            this.organizationService = organizationService;
            this.executionContext = executionContext;
        }

        public PluginResult Update(Entity entity)
        {
            try
            {
                organizationService.Update(entity);
                return PluginResult.Ok();
            }
            catch (Exception ex)
            {
                return PluginResult.Fail($"Failed to execute the request: {ex.Message}", FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs, string.Empty);
            }
        }

        public PluginResult ExecuteInOneTransaction(OrganizationRequestCollection requests)
        {
            var requestWithResults = new ExecuteTransactionRequest
            {
                Requests = requests,
                ReturnResponses = true
            };

            try
            {
                organizationService.Execute(requestWithResults);
                return PluginResult.Ok();
            }
            catch (Exception ex)
            {
                return PluginResult.Fail($"Failed to execute the request: {ex.Message}", FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs, string.Empty);
            }
        }

        public void SaveEntitiesInOneTransaction(List<Entity> entities)
        {
            var requests = new OrganizationRequestCollection();
            requests.AddRange(entities.Select(entity => new UpdateRequest() { Target = entity }));
            ExecuteInOneTransaction(requests);
        }

        //the next 2 method can't be generic because Dynamics error
        public List<Entity> QueryByGuid(string entityName, string fieldToQuery, Guid value, string[] columns = null)
        {
            ColumnSet columnSet = columns != null ? new ColumnSet(columns) : new ColumnSet();

            var filterExpression = new FilterExpression();
            filterExpression.AddCondition(new ConditionExpression(fieldToQuery, ConditionOperator.Equal, value));

            var entities = organizationService.RetrieveMultiple(
                   new QueryExpression
                   {
                       EntityName = entityName,
                       ColumnSet = columnSet,
                       Criteria = filterExpression
                   })
               ?.Entities;

            return entities?.ToList() ?? new List<Entity>();
        }

        public List<Entity> QueryByGuidList(string entityName, string fieldToQuery, List<Guid> values, string[] columns, Dictionary<string, object> filters = default)
        {
            if (values == null || values.Count == 0)
            {
                return new List<Entity>();
            }

            var filterExpression = new FilterExpression();
            filterExpression.AddCondition(new ConditionExpression(fieldToQuery, ConditionOperator.In, values));
            filterExpression.Conditions.AddRange(
                filters?.Select(entry => new ConditionExpression(entry.Key, ConditionOperator.Equal, entry.Value)));

            var entities = organizationService.RetrieveMultiple(
                   new QueryExpression
                   {
                       EntityName = entityName,
                       ColumnSet = new ColumnSet(columns),
                       Criteria = filterExpression
                   })
               ?.Entities;

            return entities?.ToList() ?? new List<Entity>();
        }

        public bool IsSchemaExists(string entityName)
        {
            return GetExistingSchemas(new List<string>() { entityName }).Count > 0;
        }

        public EntityMetadataCollection GetExistingSchemas(List<string> entitiesNames)
        {
            if (ParameterHandler.IsNullOrEmpty(entitiesNames))
            {
                return new EntityMetadataCollection();
            }

            var entityFilter = new MetadataFilterExpression(LogicalOperator.Or);
            entitiesNames.ForEach(entityName => entityFilter.Conditions.Add(new MetadataConditionExpression("LogicalName", MetadataConditionOperator.Equals, entityName)));
            var properties = new MetadataPropertiesExpression()
            {
                AllProperties = false,
                PropertyNames = { "LogicalName" }
            };

            var entityQueryExpression = new EntityQueryExpression()
            {
                Criteria = entityFilter,
                Properties = properties
            };

            var retrieveMetadataChangesRequest = new RetrieveMetadataChangesRequest()
            {
                Query = entityQueryExpression
            };

            return ((RetrieveMetadataChangesResponse)organizationService.Execute(retrieveMetadataChangesRequest))?.EntityMetadata ?? new EntityMetadataCollection();
        }

        public IEnumerable<T> RetrieveRecords<T>(string entityName, string[] columns, Dictionary<string, object> filters = default) where T : Entity
        {
            var filterExpression = new FilterExpression();
            filterExpression.Conditions.AddRange(
                filters?.Select(entry => new ConditionExpression(entry.Key, ConditionOperator.Equal, entry.Value)));

            var entitiesCollection = organizationService.RetrieveMultiple(
                   new QueryExpression
                   {
                       EntityName = entityName,
                       ColumnSet = new ColumnSet(columns),
                       Criteria = filterExpression
                   });

            return entitiesCollection?.Entities?.ToList()?.Select(entity => entity.ToEntity<T>());
        }

        public T RetrieveRecord<T>(string entityName, Guid id, string[] columns) where T : Entity
        {
            try
            {
                var entity = organizationService.Retrieve(entityName, id, new ColumnSet(columns));

                return entity?.ToEntity<T>();
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<T> RetrieveRecords<T>(FetchExpression fetchXml) where T : Entity
        {
            var entitiesCollection = organizationService.RetrieveMultiple(fetchXml);
            return entitiesCollection?.Entities?.ToList()?.Select(entity => entity.ToEntity<T>());
        }

        public EnviromentValueResult RetrieveEnvironmentVariableValueOrDefault(string enviromentVariableName)
        {
            string field = nameof(EnvironmentVariableValue.Value).GetAttributeLogicalName<EnvironmentVariableValue>();
            var envVar = this.RetrieveEnvironmentVariableValue(enviromentVariableName);
            if (envVar == default)
            {
                field = nameof(EnvironmentVariableDefinition.DefaultValue).GetAttributeLogicalName<EnvironmentVariableDefinition>();
                envVar = this.RetrieveEnvironmentVariableDefualtValue(enviromentVariableName);
            }

            return new EnviromentValueResult() { Value = envVar, FieldToQuery = field };
        }

        private Entity RetrieveEnvironmentVariableValue(string enviromentVariableName)
        {
            var query = new QueryExpression()
            {
                EntityName = EnvironmentVariableValue.EntityLogicalName,
                ColumnSet = new ColumnSet(new string[] { nameof(EnvironmentVariableValue.Value).GetAttributeLogicalName<EnvironmentVariableValue>() })
            };
            var linkEnvVarDefinition = query.AddLink(EnvironmentVariableDefinition.EntityLogicalName, EnvironmentVariableDefinition.PrimaryIdAttribute, EnvironmentVariableDefinition.PrimaryIdAttribute);
            linkEnvVarDefinition.LinkCriteria.AddCondition(EnvironmentVariableDefinition.PrimaryNameAttribute, ConditionOperator.Equal, enviromentVariableName);

            var entitiesCollection = organizationService.RetrieveMultiple(query);
            return entitiesCollection?.Entities?.FirstOrDefault();
        }

        private Entity RetrieveEnvironmentVariableDefualtValue(string enviromentVariableName)
        {
            var filters = new Dictionary<string, object>() { { EnvironmentVariableDefinition.PrimaryNameAttribute, enviromentVariableName } };
            var entitiesCollection = this.RetrieveRecords<Entity>(EnvironmentVariableDefinition.EntityLogicalName, new string[] { nameof(EnvironmentVariableDefinition.DefaultValue).GetAttributeLogicalName<EnvironmentVariableDefinition>() }, filters);
            return entitiesCollection.FirstOrDefault();
        }
    }
}
