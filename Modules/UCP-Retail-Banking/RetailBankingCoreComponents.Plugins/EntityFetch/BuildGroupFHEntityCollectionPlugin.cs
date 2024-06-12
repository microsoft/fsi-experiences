namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch.Requests;
    using Microsoft.Xrm.Sdk;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class BuildGroupFHEntityCollectionPlugin : BuildFHEntityCollectionBase<BuildGFHRequest>, IPlugin
    {
        protected override void ExecuteAction(PluginParameters pluginParameters, BuildGFHRequest inputParams)
        {
            this.fhEntitiesNames = new List<string>() {
                msfsi_customerfinancialholding.EntityLogicalName,
                msfsi_financialholding.EntityLogicalName,
                msfsi_GroupFinancialHolding.EntitySchemaName
            };
            this.FetchFHByQuery(pluginParameters, inputParams);
        }

        protected override string BuildEntityQuery(BuildGFHRequest inputParams, Dictionary<string, bool> permissions, int[] fhCategoriesOptionSetFromEnv)
        {
            var fhFilteredCategoryList = this.CalculateViewedFhCategories(permissions, inputParams.HideShowEntities, fhCategoriesOptionSetFromEnv);
            return fhFilteredCategoryList.Count == 0 ? string.Empty :
            $@"
                <fetch>
                    <entity name='msfsi_groupfinancialholding'>
                        <attribute name='msfsi_groupfinancialholdingid' alias='GFH.msfsi_groupfinancialholdingid'/>
                        <attribute name='statecode'/>
                        <filter type='and'>
                            <condition attribute='msfsi_group' operator='eq' value='{inputParams.GroupId}' />
                            <condition attribute='{nameof(msfsi_GroupFinancialHolding.StateCode).GetAttributeLogicalName<msfsi_GroupFinancialHolding>()}' operator='eq' value='{(int)msfsi_GroupFinancialHoldingState.Active}'/>
                        </filter>
                        <link-entity name='msfsi_financialholding' from='msfsi_financialholdingid' to='msfsi_financialholding' alias='FH'>
                            {AttributeToXml(EntityFetchConstants.financialHoldingAttributes)}
                            <filter type='or'>
                                { OptionSetToFilterXml(fhFilteredCategoryList) }
                            </filter>
                            { this.BuildFhCategoriesFilteringQuery(fhFilteredCategoryList) }
                            <link-entity name='msfsi_customerfinancialholding' from='msfsi_financialholdingid' to='msfsi_financialholdingid' alias='CFH' link-type='outer'>
                                { AttributeToXml(EntityFetchConstants.customerFHAttributes) }
                                <filter>
                                    <condition attribute='msfsi_financialholdingrole' operator='in'>
                                        { this.RolesToConditions(EntityFetchConstants.RolesIncludedInGroup) }
                                    </condition>
                                </filter>
                            </link-entity>
                        </link-entity>
                    </entity>
                </fetch>
            ";
        }

        private string RolesToConditions(List<int> roles)
        {
            return string.Join(Environment.NewLine, roles.Select(role =>
                $"<value>{role}</value>)"));
        }
    }
}
