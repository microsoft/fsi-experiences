namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.OptionSets;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch.Requests;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Query;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;

    public abstract class BuildFHEntityCollectionBase<T> : BuildEntityCollectionBasePlugin<T>
    {
        protected List<string> fhEntitiesNames;
        private readonly List<string> fhCategoriesEntitiesNames = new List<string>() {
            msfsi_FH_Account.EntitySchemaName,
            msfsi_FH_Creditline.EntitySchemaName,
            msfsi_FH_Investment.EntitySchemaName,
            msfsi_FH_Loan.EntitySchemaName,
            msfsi_FH_Saving.EntitySchemaName
        };

        protected void FetchFHByQuery(PluginParameters pluginParameters, T inputParams)
        {
            if (fhEntitiesNames.Exists(entityName => this.GetUserPermissionForEntity(entityName, EntityFetchConstants.Read, pluginParameters) == false))
            {
                pluginParameters.ExecutionContext.OutputParameters[EntityFetchConstants.OutputParameterName] = BuildErrorResponse();
                pluginParameters.LoggerService.LogError("There is no permission for financial holding or customer financial holding entity.",
                    ((int)FSIErrorCodes.FSIErrorCode_Unauthorized));

                return;
            }

            var permissions = BuildPermissionsDictionary(pluginParameters);
            try
            {
                var fhCategoriesOptionSetFromEnv = RequestsDAO.getFhOptionSet(pluginParameters, "msfsi_financialholdingcategory");
                var query = this.BuildEntityQuery(inputParams, permissions, fhCategoriesOptionSetFromEnv);
                var collection = string.IsNullOrEmpty(query) ?
                    new EntityCollection() : pluginParameters.OrganizationService.RetrieveMultiple(new FetchExpression(query));

                var entityCollectionDictionary = BuildEntityCollectionDictionary(FilterInactiveEntries(collection), inputParams, permissions, fhCategoriesOptionSetFromEnv, pluginParameters);

                pluginParameters.ExecutionContext.OutputParameters[EntityFetchConstants.OutputParameterName] = JsonConvert.SerializeObject(entityCollectionDictionary);
            }
            catch
            {
                ErrorManager.TraceAndThrow(pluginParameters, PluginErrorMessagesIds.RetailBankingComponents.FHFetchError,
                    FSIErrorCodes.FSIErrorCode_UnexpectedError, this.ErrorFileName);
            }
        }

        private EntityCollection FilterInactiveEntries(EntityCollection collection)
        {
            
            var filteredEntities = new List<Entity>();
            foreach (var entity in collection.Entities)
            {
                if (
                    (entity.TryGetAttributeValue<AliasedValue>($"FH_ACCOUNT.{nameof(msfsi_FH_Account.StateCode).GetAttributeLogicalName<msfsi_FH_Account>()}", out var accountStateAliased) && 
                    ((OptionSetValue)accountStateAliased?.Value)?.Value == (int)msfsi_FH_AccountState.Inactive) ||
                    (entity.TryGetAttributeValue<AliasedValue>($"FH_CREDIT.{nameof(msfsi_FH_Creditline.StateCode).GetAttributeLogicalName<msfsi_FH_Creditline>()}", out var creditStateAliased) &&
                    ((OptionSetValue)creditStateAliased?.Value)?.Value == (int)msfsi_FH_CreditlineState.Inactive) ||
                    (entity.TryGetAttributeValue<AliasedValue>($"FH_INVESTMENT.{nameof(msfsi_FH_Investment.StateCode).GetAttributeLogicalName<msfsi_FH_Investment>()}", out var investmentStateAliased) && 
                    ((OptionSetValue)investmentStateAliased?.Value)?.Value == (int)msfsi_FH_InvestmentState.Inactive) ||
                    (entity.TryGetAttributeValue<AliasedValue>($"FH_LOAN.{nameof(msfsi_FH_Loan.StateCode).GetAttributeLogicalName<msfsi_FH_Loan>()}", out var loanStateAliased) && 
                    ((OptionSetValue)loanStateAliased?.Value)?.Value == (int)msfsi_FH_LoanState.Inactive) ||
                    (entity.TryGetAttributeValue<AliasedValue>($"FH_SAVING.{nameof(msfsi_FH_Saving.StateCode).GetAttributeLogicalName<msfsi_FH_Saving>()}", out var savingStateAliased) && 
                    ((OptionSetValue)savingStateAliased?.Value)?.Value == (int)msfsi_FH_SavingState.Inactive) ||
                    (entity.TryGetAttributeValue<AliasedValue>($"FH.{nameof(msfsi_financialholding.StateCode).GetAttributeLogicalName<msfsi_financialholding>()}", out var holdingStateAliased) &&
                    ((OptionSetValue)holdingStateAliased?.Value)?.Value == (int)msfsi_financialholdingState.Inactive))
                {
                    continue;
                }

                filteredEntities.Add(entity);
            }
           
            return new EntityCollection(filteredEntities);
        }

        private Dictionary<string, bool> BuildPermissionsDictionary(PluginParameters pluginParameters)
        {
            var permissions = new Dictionary<string, bool>();
            fhCategoriesEntitiesNames.ForEach(entityName => permissions.Add(entityName, this.GetUserPermissionForEntity(entityName, "Read", pluginParameters)));
            return permissions;
        }

        private Dictionary<string, string> BuildEntityCollectionDictionary(
            EntityCollection entityCollection,
            T inputParams,
            Dictionary<string, bool> permissions,
            int[] fhCategoriesOptionSetFromEnv,
            PluginParameters pluginParameters
            )
        {
            try
            {
                var serializedFhEntityCollection = JsonConvert.SerializeObject(entityCollection.Entities, Formatting.Indented, new JsonSerializerSettings
                {
                    Converters = new List<JsonConverter>() { new AliasedValueJsonConverter(), new OptionSetJsonConverter(), new MoneyJsonConverter() }
                });

                return (new Dictionary<string, string>()
                {
                    {"entities", serializedFhEntityCollection },
                    {"metadata",  JsonConvert.SerializeObject(BuildMetadata(inputParams, permissions, fhCategoriesOptionSetFromEnv))}
                });
            }
            catch (Exception e)
            {
                ErrorManager.UnLocalizedTraceAndThrow(e.Message, pluginParameters.LoggerService);
                throw;
            }
        }

        protected List<int> CalculateViewedFhCategories(Dictionary<string, bool> permissions, Dictionary<string, bool> hideShowEntities, int[] fhCategoriesOptionSet)
        {
            var FhViewedCategories = new List<int>();
            foreach (var category in fhCategoriesOptionSet)
            {
                var filterByManifestExists = hideShowEntities.TryGetValue(category.ToString(), out var isEntityVisibleByManifest);
                if (!EntityFetchConstants.FhCategoryOptionSetValueToEntityName.TryGetValue(category, out var categoryName))
                {
                    continue;
                }

                if (!permissions.TryGetValue(categoryName, out var isEntityHasPermission))
                {
                    continue;
                }

                var shouldEntityBeShownByManifest = isEntityVisibleByManifest || !filterByManifestExists;
                if (!shouldEntityBeShownByManifest || !isEntityHasPermission)
                {
                    continue;
                }

                FhViewedCategories.Add(category);
            }

            return FhViewedCategories;
        }

        protected string BuildFhCategoriesFilteringQuery(List<int> fhCategoriesToShow)
        {
            return string.Join(Environment.NewLine, fhCategoriesToShow.Select(category =>
            {
                if (!FhCategoriesFilter.TryGetValue(category, out var categoryFilter))
                {
                    return string.Empty;
                }

                return categoryFilter;
            }));
        }

        private Dictionary<string, HttpStatusCode> BuildMetadata(T inputParams, Dictionary<string, bool> permissions, int[] fhCategoriesOptionSetFromEnv)
        {
            var metadata = new Dictionary<string, HttpStatusCode>();
            var inputParamsWithEntitiesHidden = inputParams as BuildFHRequestBase;
            if (inputParamsWithEntitiesHidden == null)
            {
                return metadata;
            }

            foreach (var fhCategory in EntityFetchConstants.FhCategoryOptionSetValueToEntityName.Keys)
            {
                var metadataForCategory = HttpStatusCode.OK;
                var filterByManifestExists = inputParamsWithEntitiesHidden.HideShowEntities.TryGetValue(fhCategory.ToString(), out var isEntityVisible);

                if (!fhCategoriesOptionSetFromEnv.Contains(fhCategory))
                {
                    metadataForCategory = HttpStatusCode.NotFound;
                }
                else if (!permissions[EntityFetchConstants.FhCategoryOptionSetValueToEntityName[fhCategory]])
                {
                    metadataForCategory = HttpStatusCode.Forbidden;
                }
                else if (!(isEntityVisible || !filterByManifestExists))
                {
                    metadataForCategory = HttpStatusCode.NoContent;
                }

                metadata.Add(EntityFetchConstants.FhCategoryOptionSetValueToEntityName[fhCategory], metadataForCategory);
            }

            return metadata;
        }

        private readonly Dictionary<int, string> FhCategoriesFilter = new Dictionary<int, string>()
        {
            {
                ((int)msfsi_FinancialHoldingCategory.Accounts),
                $@"<link-entity name='msfsi_fh_account' from='msfsi_fh_accountid' to='msfsi_details' link-type='outer' alias='FH_ACCOUNT' >
                    {AttributeToXml(EntityFetchConstants.fhAccountAttributes)}
                </link-entity>"
            },
            {
                ((int)msfsi_FinancialHoldingCategory.Linesofcredit),
                $@"<link-entity name='msfsi_fh_creditline' from='msfsi_fh_creditlineid' to='msfsi_details' link-type='outer' alias='FH_CREDIT' >
                    {AttributeToXml(EntityFetchConstants.fhCreditAttributes)}
                </link-entity>"
            },
            {
                ((int)msfsi_FinancialHoldingCategory.Investments),
                $@"<link-entity name='msfsi_fh_investment' from='msfsi_fh_investmentid' to='msfsi_details' link-type='outer' alias='FH_INVESTMENT' >
                    {AttributeToXml(EntityFetchConstants.fhInvestmentAttributes)}
                </link-entity>"
            },
            {
                ((int)msfsi_FinancialHoldingCategory.Loans),
                $@"<link-entity name='msfsi_fh_loan' from='msfsi_fh_loanid' to='msfsi_details' link-type='outer' alias='FH_LOAN' >
                    {AttributeToXml(EntityFetchConstants.fhLoanAttributes)}
                </link-entity>"
            },
            {
                ((int)msfsi_FinancialHoldingCategory.Longtermsavings),
                $@"<link-entity name='msfsi_fh_saving' from='msfsi_fh_savingid' to='msfsi_details' link-type='outer' alias='FH_SAVING' >
                    {AttributeToXml(EntityFetchConstants.fhSavingAttributes)}
                </link-entity>"
            },
        };

        protected static string AttributeToXml(string[] attributes)
        {
            return string.Join(Environment.NewLine, attributes.Select(attr => $"<attribute name='{attr}' />"));
        }

        protected static string OptionSetToFilterXml(List<int> options)
        {
            return string.Join(Environment.NewLine, options.Select(optionCode =>
                $"<condition attribute='msfsi_financialholdingcategory' operator='eq' value='{optionCode}'/>"));
        }

        protected string BuildErrorResponse()
        {
            return JsonConvert.SerializeObject(EntityFetchConstants.ErrorResponse);
        }
    }
}
