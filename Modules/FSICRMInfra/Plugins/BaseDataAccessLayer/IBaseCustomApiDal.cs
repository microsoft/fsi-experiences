namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Query;
    using System;
    using System.Collections.Generic;

    public interface IBaseCustomApiDal : IBaseDal
    {
        bool TryGetInputParameter<T>(string parameterName, out T parameterValue);
        bool TryGetArrayInputParameter<T>(string parameterName, out List<T> parameterValue);
        void SetOutput<T>(string outputParameterName, T outputValue);
        PluginResult<Entity> RetrieveEntity(string entityLogicalName, Guid id, ColumnSet columnSet);
        PluginResult<EntityCollection> FetchFromQuery(string query);
    }
}
