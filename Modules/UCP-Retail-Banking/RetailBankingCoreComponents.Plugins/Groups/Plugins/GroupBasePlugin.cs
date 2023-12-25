namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Plugins
{
    using ErrorMessages.Localization;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.ServiceModel;
    using Requests;
    using Microsoft.CloudForFSI.Infra.ErrorManagers;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using OptionSets;
    using Tables;
    using Xrm.Sdk;
    using Xrm.Sdk.Messages;
    using Xrm.Sdk.Query;
    using Newtonsoft.Json;
    using GroupConstants = Infra.GroupConstants;
    using FSIErrorCodes = Infra.FSIErrorCodes;

    public abstract class GroupBasePlugin<T> : BasePlugin
    {
        protected override string OperationName() => Constants.PluginTypeToMessageNames[this.GetType()];

        protected new string ErrorFileName => PluginErrorMessagesIds.RetailBankingComponents.ResourceFileName;

        protected abstract void ExecuteAction(PluginParameters pluginParameters, T request);

        protected override void RunBusinessLogic(PluginParameters pluginParameters)
        {
            try
            {
                pluginParameters.LoggerService.LogInformation($"{this.GetType().Name} execution started", this.GetType().Name);
                T request = default;
                try
                {
                    var jsonString = pluginParameters.ExecutionContext.InputParameters[Constants.InputParameterName].ToString();
                    request = JsonConvert.DeserializeObject<T>(jsonString);
                }
                catch
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.InputDataJsonFormatError,
                        FSIErrorCodes.FSIErrorCode_InvalidPluginParameters,
                        this.ErrorFileName);
                }

                this.ExecuteAction(pluginParameters, request);
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                if (ex.Detail.ErrorCode == (int)ErrorsEnum.ConcurrencyVersionMismatch ||
                    ex.Detail.ErrorCode == (int)ErrorsEnum.OptimisticConcurrencyNotEnabled ||
                    ex.Detail.ErrorCode == (int)ErrorsEnum.ConcurrencyVersionNotProvided)
                {
                    throw new InvalidPluginExecutionException(ex.Detail.Message, ex);
                }
                else
                {
                    throw new InvalidPluginExecutionException(ex.Message, ex);
                }
            }
            finally
            {
                pluginParameters.LoggerService.LogInformation($"{this.GetType().Name} execution ended", this.GetType().Name);
            }
        }

        protected override void ValidateInputParams(PluginParameters pluginParameters)
        {
            var inputParameters = pluginParameters.ExecutionContext.InputParameters;

            bool inputParameterMissing = inputParameters == null ||
                !inputParameters.Contains(Constants.InputParameterName) ||
                inputParameters[Constants.InputParameterName] == null;

            if (inputParameterMissing)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.InvalidInputParameter,
                    FSIErrorCodes.FSIErrorCode_PluginRegisteredIncorrectly,
                    this.ErrorFileName,
                    new [] { Constants.InputParameterName });
            }
        }

        protected int GetTotalCountOfGroupsCustomerBelongs(Guid contactId, int type, PluginParameters pluginParameters)
        {
            var fetchXml = string.Format(FetchXmlResources.CustomerTotalCountOfGroupsFetchXmlString, contactId.ToString(), type);

            var query = new FetchExpression(fetchXml);
            var results = pluginParameters.OrganizationService.RetrieveMultiple(query);
            var returnedResult = results.Entities.FirstOrDefault();
            return GetCount();

            int GetCount()
            {
                if (returnedResult == null || returnedResult.Attributes == null)
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupEntityDataNotFound,
                        FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                        this.ErrorFileName);
                }

                if (!returnedResult.Attributes.ContainsKey("count") && !returnedResult.Attributes.ContainsKey("G.GM.count"))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupCountGroupsCantBeRetrieved,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new object[] { contactId });
                }

                var countAttributeName = returnedResult.Attributes.Contains("count") ? "count" : "G.GM.count";
                if (!(returnedResult.Attributes[countAttributeName] is AliasedValue entityCount))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupCountGroupsCantBeReturned,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new object[] { contactId });
                    return 0;
                }

                if (!(entityCount.Value is int))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupCountGroupsCantBeConverted,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new object[] { contactId });
                }

                return Convert.ToInt32(entityCount.Value);
            }
        }

        protected UpdateRequest GetCustomerPrimaryGroupUpdateRequest(
            Guid contactId,
            GroupType type,
            PluginParameters pluginParameters)
        {
            var results = msfsi_GroupMember.GetContactGroupMembers(contactId.ToString(), Convert.ToInt32(type), isPrimary: false, pluginParameters);
            if (!results.Any())
            {
                return null;
            }

            var sortedList = results.OrderBy(entity => GetAliasedValue<DateTime>(entity, $"{GroupConstants.GroupTableAlias}.{nameof(msfsi_Group.CreatedOn).ToLower()}"));

            var groupMemberIdValue = GetAttributeValue<Guid>(sortedList.FirstOrDefault(), msfsi_GroupMember.PrimaryIdAttribute);

            var entityToUpdate = new msfsi_GroupMember
            {
                Id = groupMemberIdValue,
                msfsi_IsPrimaryGroup = true
            };

            return new UpdateRequest { Target = entityToUpdate };

            AttributeType GetAttributeValue<AttributeType>(Entity entity, string attributeName)
            {
                if (entity == null)
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupNoEntityInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName);
                }

                if (!entity.Attributes.ContainsKey(attributeName))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupNoAttributeNameInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new [] { attributeName });
                }

                if (!(entity.Attributes[attributeName] is AttributeType attribute))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupIncompatiableAttributeTypeInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new object[] { attributeName, typeof(AttributeType) });
                    throw new InvalidPluginExecutionException();
                }

                return attribute;
            }

            AttributeType GetAliasedValue<AttributeType>(Entity entity, string attributeName)
            {
                if (entity == null)
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupNoEntityInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName);
                }

                if (!entity.Attributes.ContainsKey(attributeName))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupNoAttributeNameInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new [] { attributeName });
                }

                var aliasedValue = entity.Attributes[attributeName] as AliasedValue;
                if (aliasedValue == null)
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupNoAttributeNameInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new [] { attributeName });
                }

                if (!(aliasedValue.Value is AttributeType attribute))
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupIncompatiableAttributeTypeInGetValue,
                        FSIErrorCodes.FSIErrorCode_RetrieveBadModelOutput,
                        this.ErrorFileName,
                        new object[] { attributeName, typeof(AttributeType) });
                    throw new InvalidPluginExecutionException();
                }

                return attribute;
            }
        }

        protected void ValidateGroupVersion(
            Guid groupId,
            long currentGroupVersion,
            PluginParameters pluginParameters)
        {
            try
            {
                var entity = pluginParameters.OrganizationService.Retrieve(msfsi_Group.EntityLogicalName, groupId, new ColumnSet("versionnumber"));

                if (currentGroupVersion.ToString() != entity.RowVersion)
                {
                    ErrorManager.TraceAndThrow(pluginParameters,
                        PluginErrorMessagesIds.RetailBankingComponents.GroupIsNotInTheMostUpdatedState,
                        FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                        this.ErrorFileName,
                        new object[] { groupId });
                }
            }
            catch
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupVersionRetrievalFailure,
                    FSIErrorCodes.FSIErrorCode_FailedToGetModelOutputs,
                    this.ErrorFileName,
                    new object[] { groupId });
            }
        }

        protected Entity InvokeTransactionRequest(ExecuteTransactionRequest requestWithResults, PluginParameters pluginParameters)
        {
            if (!(pluginParameters.OrganizationService.Execute(requestWithResults) is ExecuteTransactionResponse responseWithResults))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupTransactionResultError,
                    FSIErrorCodes.FSIErrorCode_FailedToUpdateModel,
                    this.ErrorFileName);
                return null;
            }

            if (responseWithResults.Responses == null || responseWithResults.Responses.Count == 0 || !(responseWithResults.Responses.Last() is RetrieveResponse lastResponse))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupTransactionResultEmpty,
                    FSIErrorCodes.FSIErrorCode_FailedToUpdateModel,
                    this.ErrorFileName);
                return null;
            }

            if (lastResponse.Entity == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupTransactionResultEntityError,
                    FSIErrorCodes.FSIErrorCode_FailedToUpdateModel,
                    this.ErrorFileName);
            }

            var groupRetrieved = lastResponse.Entity;
            if (groupRetrieved.Attributes == null || string.IsNullOrEmpty(groupRetrieved.RowVersion))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupTransactionResultEntityError,
                    FSIErrorCodes.FSIErrorCode_FailedToUpdateModel,
                    this.ErrorFileName);
            }

            return groupRetrieved;
        }

        protected msfsi_Group GetUpdatedGroupWithPrimaryMember(Guid groupId, Guid primaryMemberId)
        {
            return new msfsi_Group
            {
                Id = groupId,
                msfsi_primarymember = new EntityReference(msfsi_GroupMember.EntityLogicalName, primaryMemberId)
            };
        }

        protected IEnumerable<msfsi_GroupMember> GetNewGroupMembersEntities(
            string groupName,
            Guid groupId,
            GroupType groupType,
            IEnumerable<GroupMemberRequest> members,
            PluginParameters pluginParameters,
            bool isNewGroup = true)
        {
            if (string.IsNullOrEmpty(groupName))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupNameNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { groupId });
            }

            if (members == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupMembersNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { groupId });
            }

            return members.Select(groupMember =>
            {
                var groupsNumber = this.GetTotalCountOfGroupsCustomerBelongs(groupMember.Customer.Id, Convert.ToInt32(groupType), pluginParameters);
                var groupMemberEntity = new msfsi_GroupMember
                {
                    Id = groupMember.Id,
                    msfsi_Name = $"{groupName}_GM_{groupMember.Customer.Name}",
                    msfsi_Role = (msfsi_GroupMemberRole)groupMember.Role,
                    msfsi_IsPrimaryGroup = (groupsNumber == 0 && groupType == GroupType.Household) || groupMember.IsPrimaryGroup,
                    msfsi_member = new EntityReference(Contact.EntityLogicalName, groupMember.Customer.Id)
                };

                if (!isNewGroup)
                {
                    groupMemberEntity.msfsi_Group = new EntityReference(msfsi_Group.EntityLogicalName, groupId);
                }

                return groupMemberEntity;
            });
        }

        protected IEnumerable<msfsi_GroupFinancialHolding> GetNewGroupFinancialHoldingsEntities(
            string groupName,
            Guid groupId,
            IEnumerable<FinancialHoldingRequest> holdings,
            PluginParameters pluginParameters,
            bool isNewGroup = true)
        {
            if (string.IsNullOrEmpty(groupName))
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupNameNullOrEmpty,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { groupId });
            }

            if (holdings == null)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupFinancialHoldingsNull,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { groupId });
            }

            return holdings.Select(financialHolding =>
            {
                var groupFinancialHolding = new msfsi_GroupFinancialHolding
                {
                    msfsi_Name = $"{groupName}_GH_{financialHolding.Name}",
                    msfsi_FinancialHolding = new EntityReference(msfsi_financialholding.EntityLogicalName, financialHolding.Id)
                };

                if (!isNewGroup)
                {
                    groupFinancialHolding.msfsi_Group = new EntityReference(msfsi_Group.EntityLogicalName, groupId);
                }

                return groupFinancialHolding;
            });
        }

        protected void CheckGroupFieldsBeforeSentToOperation(GroupRequest group, PluginParameters pluginParameters)
        {
            if (group.PrimaryMember == null || group.PrimaryMember == Guid.Empty)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupPrimaryMemberMissing,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { group.Id });
            }

            if (group.FinancialHoldings == null || group.FinancialHoldings.Count() == 0)
            {
                ErrorManager.TraceAndThrow(pluginParameters,
                    PluginErrorMessagesIds.RetailBankingComponents.GroupFinancialHoldingsEmpty,
                    FSIErrorCodes.FSIErrorCode_IllegalUserInput,
                    this.ErrorFileName,
                    new object[] { group.Id });
            }
        }
    }
}