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
    using Xrm.Sdk;
    using Xrm.Sdk.Query;

    public partial class msfsi_churnlevelsconfig : Entity, System.ComponentModel.INotifyPropertyChanging, System.ComponentModel.INotifyPropertyChanged
    {
        private ColumnSet _columns;

        private SortedList<float, string> _valueThresholdNameMap;
        
        public void PopulateChurnLevelConfiguration(PluginParameters pluginParameters)
        {
            if (!EntityMetadataServices.IsSchemaExists(this.LogicalName, pluginParameters.OrganizationService))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingFSIConfigTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { this.LogicalName });
            }

            var ciCustomerMappingQuery = new QueryExpression
            {
                EntityName = EntityLogicalName,
                ColumnSet = this.GetColumnSet()
            };

            DataCollection<Entity> entities = default;
            try
            {
                entities = pluginParameters.OrganizationService.RetrieveMultiple(ciCustomerMappingQuery)?.Entities;
            }
            catch (Exception exception)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.RetrieveMultipleQueryFailed,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msfsi_churnlevelsconfig), exception.Message });
            }

            if (entities == null || entities.Count == 0)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.MissingConfigurationInChurnConfig,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new [] { nameof(msfsi_churnlevelsconfig) });
            }

            this._valueThresholdNameMap = new SortedList<float, string>(new ReversedComparer<float>());
            foreach (var entity in entities)
            {
                if (entity is msfsi_churnlevelsconfig churnLevelConfig)
                {
                    float value = default;
                    try
                    {
                        value = Convert.ToSingle(churnLevelConfig.msfsi_value);
                    }
                    catch (Exception exception)
                    {
                        ErrorManager.TraceAndThrow(pluginParameters,
                            PluginErrorMessagesIds.Infra.ParsingFailedForChurnLevel,
                            FSIErrorCodes.FSIErrorCode_ConfigurationError,
                            PluginErrorMessagesIds.Infra.ResourceFileName,
                            new object[] { churnLevelConfig.msfsi_value, exception.Message });
                    }

                    this._valueThresholdNameMap.Add(value, churnLevelConfig.msfsi_ThresholdLevel.ToString());
                }
            }
        }
        
        private ColumnSet GetColumnSet()
        {
            return this._columns ?? (this._columns = new ColumnSet("msfsi_value", "msfsi_thresholdlevel"));
        }

        public string GetLevelNameForScore(float scoreValue, PluginParameters pluginParameters)
        {
            if (this._valueThresholdNameMap == null)
            {
                this.PopulateChurnLevelConfiguration(pluginParameters);
            }

            if (this._valueThresholdNameMap == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.Infra.InitializationOfEntityFailed,
                    FSIErrorCodes.FSIErrorCode_ConfigurationError,
                    PluginErrorMessagesIds.Infra.ResourceFileName);
            }

            return this._valueThresholdNameMap.Keys
                .Where(value => scoreValue > value)
                .Select(value => this._valueThresholdNameMap[value])
                .FirstOrDefault();
        }

        private class ReversedComparer<TKey> : IComparer<float>
        {
            public int Compare(float x, float y)
            {
                return y.CompareTo(x);
            }
        }
    }
}
