namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch.Requests;
    using Microsoft.Xrm.Sdk;
    using System.Collections.Generic;

    public class BuildFHEntityCollectionPlugin : BuildFHEntityCollectionBase<BuildFHRequest>, IPlugin
    {
        protected override void ExecuteAction(PluginParameters pluginParameters, BuildFHRequest inputParams)
        {
            this.fhEntitiesNames = new List<string>() {
                msfsi_customerfinancialholding.EntityLogicalName,
                msfsi_financialholding.EntityLogicalName
            };
            this.FetchFHByQuery(pluginParameters, inputParams);
        }

        protected override string BuildEntityQuery(BuildFHRequest inputParams, Dictionary<string, bool> permissions, int[] fhCategoriesOptionSetFromEnv)
        {
            var fhFilteredCategoryList = this.CalculateViewedFhCategories(permissions, inputParams.HideShowEntities, fhCategoriesOptionSetFromEnv);
            return fhFilteredCategoryList.Count == 0 ? string.Empty :
            $@"
            <fetch>
              <entity name='msfsi_customerfinancialholding'>
                { AttributeToXml(EntityFetchConstants.customerFHAttributes) }
                <filter type='and'>
                    <condition attribute='msfsi_customerid' operator='eq' value='{inputParams.ContactId}'/>
                    <condition attribute='{nameof(msfsi_customerfinancialholding.StateCode).ToLower()}' operator='eq' value='{(int)msfsi_customerfinancialholdingState.Active}'/>
                </filter>
                <link-entity name='msfsi_financialholding' from='msfsi_financialholdingid' to='msfsi_financialholdingid' alias='FH'>
                    { AttributeToXml(EntityFetchConstants.financialHoldingAttributes)  }
                    <filter type='or'>
                        { OptionSetToFilterXml(fhFilteredCategoryList) }
                    </filter>
                    { this.BuildFhCategoriesFilteringQuery(fhFilteredCategoryList) }
                </link-entity>
              </entity>
            </fetch>
            ";
        }
    }
}
