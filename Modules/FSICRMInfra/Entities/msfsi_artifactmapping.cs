namespace Microsoft.CloudForFSI.Tables
{
    using ErrorMessages.Localization;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infra;
    using Infra.CustomWorkflow;
    using Infra.ErrorManagers;
    using Infra.Plugins;
    using Microsoft.CloudForFSI.OptionSets;
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public partial class msfsi_artifactmapping : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        public Dictionary<string, msfsi_ArtifactSubType?> GetArtifactsMapping(string artifactType, PluginParameters pluginParameters)
        {
            ParameterHandler.ThrowIfNullOrEmpty(artifactType, pluginParameters);

            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingFSIConfigTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { this.LogicalName });
            }

            var filterExpression = new FilterExpression
            {
                Conditions =
                {
                    new ConditionExpression
                    {
                        AttributeName = nameof(this.msfsi_artifacttype).ToLower(),
                        Operator = ConditionOperator.Equal,
                        Values = { (int)Enum.Parse(typeof(msfsi_ArtifactType), artifactType) }
                    }
                }
            };

            var result = pluginParameters.OrganizationService.RetrieveMultiple(
                new QueryExpression
                {
                    EntityName = EntityLogicalName,
                    ColumnSet = new ColumnSet(nameof(this.msfsi_ciartifactname).ToLower(), nameof(this.msfsi_fsiartifactname).ToLower()),
                    Criteria = filterExpression
                }).Entities
                .Where(entity => entity != null)
                .Select(entity => entity.ToEntity<msfsi_artifactmapping>())
                .ToDictionary(
                    artifactMapping => artifactMapping.msfsi_ciartifactname,
                    artifactMapping => artifactMapping.msfsi_fsiartifactname);

            return result;
        }
    }
}
