namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using System;
    using System.Collections.Generic;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Metadata;
    using Microsoft.Xrm.Sdk.Query;

    public class EnviromentValueResult
    {
        public Entity Value;
        public string FieldToQuery;
    }
    public interface IBaseDal
    {
        PluginResult ExecuteInOneTransaction(OrganizationRequestCollection requests);
        void SaveEntitiesInOneTransaction(List<Entity> entities);
        List<Entity> QueryByGuid(string entityName, string fieldToQuery, Guid value, string[] columns);
        List<Entity> QueryByGuidList(string entityName, string fieldToQuery, List<Guid> value, string[] columns, Dictionary<string, object> filters = default);
        bool IsSchemaExists(string entityName);
        EntityMetadataCollection GetExistingSchemas(List<string> entitiesNames);
        T RetrieveRecord<T>(string entityName, Guid id, string[] columns) where T : Entity;
        IEnumerable<T> RetrieveRecords<T>(string entityName, string[] columns, Dictionary<string, object> filters = default) where T : Entity;
        IEnumerable<T> RetrieveRecords<T>(FetchExpression fetchXml) where T : Entity;
        EnviromentValueResult RetrieveEnvironmentVariableValueOrDefault(string enviromentVariableName);
        PluginResult Update(Entity entity);
    }
}
