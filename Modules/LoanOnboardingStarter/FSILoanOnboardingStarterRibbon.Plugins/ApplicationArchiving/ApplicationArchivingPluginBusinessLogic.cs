namespace Microsoft.CloudForFSI.LoanOnboardingStarterRibbon.Plugins
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.CloudForFSI.ErrorMessages.Localization;
    using Microsoft.CloudForFSI.Infra;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class ApplicationArchivingPluginBusinessLogic : IPluginBusinessLogic
    {
        private readonly IApplicationArchivingDal dataAccessLayer;
        private readonly ILoggerService logger;

        public ApplicationArchivingPluginBusinessLogic(ILoggerService logger, IApplicationArchivingDal dataAccessLayer)
        {
            this.dataAccessLayer = dataAccessLayer;
            this.logger = logger;
        }

        public PluginResult Execute()
        {
            if (IsApplicationActive())
            {
                logger.LogInformation("Active entity update. Exiting", this.GetType().Name);
                return PluginResult.Ok();
            }

            if (!this.dataAccessLayer.IsSchemaExists(msfsi_application.EntityLogicalName))
            {
                return PluginResult.Fail(
                    PluginErrorMessagesIds.Infra.EntityDoesNotExist,
                    FSIErrorCodes.FSIErrorCode_MissingCiTable,
                    PluginErrorMessagesIds.Infra.ResourceFileName,
                    new[] { msfsi_application.EntityLogicalName });
            }

            var entitiesToDeactivate = GetRelatedEntities();

            if (entitiesToDeactivate.Any())
            {
                ChangeStatusToInactive(entitiesToDeactivate);

                dataAccessLayer.SaveEntitiesInOneTransaction(entitiesToDeactivate);
            }

            return PluginResult.Ok();
        }

        private bool IsApplicationActive()
        {
            return dataAccessLayer.Application.StateCode == msfsi_applicationState.Active;
        }

        private List<Entity> GetRelatedEntities()
        {
            var entitiesToInactive = new List<Entity>();
            entitiesToInactive.AddRange(GetIncomes());
            entitiesToInactive.AddRange(GetExpenses());

            entitiesToInactive.AddRange(GetAssets());
            entitiesToInactive.AddRange(GetLiabilities());

            entitiesToInactive.AddRange(GetTasks());

            var partyContracts = GetPartyContracts();
            entitiesToInactive.AddRange(partyContracts);

            if (partyContracts.Any())
            {
                var partyContractsIds = partyContracts.Select(c => c.Id).ToList();
                entitiesToInactive.AddRange(GetPartyContractsAssets(partyContractsIds));
                entitiesToInactive.AddRange(GetPartyContractsLiabilities(partyContractsIds));

                var contactsIds = partyContracts.Select(c => (c as msfsi_relatedpartycontract).Id).ToList();
                entitiesToInactive.AddRange(GetEmployments(contactsIds));
            }

            var documentRequests = GetDocumentRequests();

            if (documentRequests.Any())
            {
                var documentRequestsIds = new List<Guid>();
                documentRequests.ForEach(c => {
                    if (c is msfsi_documentrequest documentRequest && documentRequest.msfsi_document != null && documentRequest.msfsi_document.Id != null)
                    {
                        documentRequestsIds.Add(documentRequest.msfsi_document.Id);
                    }
                });
                entitiesToInactive.AddRange(GetDocuments(documentRequestsIds));
            }

            var collaterals = GetLoanApplicationCollaterals();
            if (collaterals.Any())
            {
                var collateralsIds = collaterals.Select(c => c.Id).ToList();
                entitiesToInactive.AddRange(GetLoanApplicationCollateralValuation(collateralsIds));
            }

            entitiesToInactive.AddRange(documentRequests);
            entitiesToInactive.AddRange(collaterals);

            var application = GetApplication();

            if (application.Any())
            {
                var loanApplicationId = (application.FirstOrDefault() as msfsi_application).msfsi_detailsid.Id;
                entitiesToInactive.AddRange(GetLoanApplication(loanApplicationId));
            }

            return entitiesToInactive;
        }

        private void ChangeStatusToInactive(List<Entity> entitiesToInactive)
        {
            foreach (var entity in entitiesToInactive)
            {
                (entity as IDeactivatable).Deactivate();
            }
        }

        private List<Entity> GetPartyContracts()
        {
            return dataAccessLayer.GetRelatedEntities(
               msfsi_relatedpartycontract.EntityLogicalName,
               nameof(msfsi_relatedpartycontract.msfsi_contractpart).GetAttributeLogicalName<msfsi_relatedpartycontract>(),
               new string[]
               {
                    nameof(msfsi_relatedpartycontract.Id).GetAttributeLogicalName<msfsi_relatedpartycontract>(),
                    nameof(msfsi_relatedpartycontract.StatusCode).GetAttributeLogicalName<msfsi_relatedpartycontract>(),
                    nameof(msfsi_relatedpartycontract.StateCode).GetAttributeLogicalName<msfsi_relatedpartycontract>(),
               }) ?? new List<Entity>();
        }

        private List<Entity> GetApplication()
        {
            return dataAccessLayer.QueryByGuid(
            msfsi_application.EntityLogicalName,
            nameof(msfsi_application.Id).GetAttributeLogicalName<msfsi_application>(),
            dataAccessLayer.Application.Id,
            new string[]
            {
                nameof(msfsi_application.Id).GetAttributeLogicalName<msfsi_application>(),
                nameof(msfsi_application.StatusCode).GetAttributeLogicalName<msfsi_application>(),
                nameof(msfsi_application.StateCode).GetAttributeLogicalName<msfsi_application>(),
                nameof(msfsi_application.msfsi_detailsid).GetAttributeLogicalName<msfsi_application>(),
            }) ?? new List<Entity>();
        }

        private List<Entity> GetLoanApplication(Guid loanApplicationId)
        {
            return dataAccessLayer.QueryByGuid(
               msfsi_loan_application.EntityLogicalName,
               nameof(msfsi_loan_application.Id).GetAttributeLogicalName<msfsi_loan_application>(),
               loanApplicationId,
               new string[]
               {
                    nameof(msfsi_loan_application.Id).GetAttributeLogicalName<msfsi_loan_application>(),
                    nameof(msfsi_loan_application.StatusCode).GetAttributeLogicalName<msfsi_loan_application>(),
                    nameof(msfsi_loan_application.StateCode).GetAttributeLogicalName<msfsi_loan_application>(),
               }) ?? new List<Entity>();
        }

        private List<Entity> GetLoanApplicationCollaterals()
        {
            return dataAccessLayer.GetRelatedEntities(
               msfsi_loan_applicationcollateral.EntityLogicalName,
               nameof(msfsi_loan_applicationcollateral.msfsi_loanapplication).GetAttributeLogicalName<msfsi_loan_applicationcollateral>(),
               new string[]
               {
                    nameof(msfsi_loan_applicationcollateral.Id).GetAttributeLogicalName<msfsi_loan_applicationcollateral>(),
                    nameof(msfsi_loan_applicationcollateral.StatusCode).GetAttributeLogicalName<msfsi_loan_applicationcollateral>(),
                    nameof(msfsi_loan_applicationcollateral.StateCode).GetAttributeLogicalName<msfsi_loan_applicationcollateral>(),
               }) ?? new List<Entity>();
        }

        private List<Entity> GetLoanApplicationCollateralValuation(List<Guid> collateralsIds)
        {
            return dataAccessLayer.GetSubRelatedEntities(
               msfsi_loan_applicationcollateralvaluation.EntityLogicalName,
               collateralsIds,
               nameof(msfsi_loan_applicationcollateralvaluation.msfsi_loan_applicationcollateral).GetAttributeLogicalName<msfsi_loan_applicationcollateralvaluation>(),
               new string[]
               {
                    nameof(msfsi_loan_applicationcollateralvaluation.Id).GetAttributeLogicalName<msfsi_loan_applicationcollateralvaluation>(),
                    nameof(msfsi_loan_applicationcollateralvaluation.StatusCode).GetAttributeLogicalName<msfsi_loan_applicationcollateralvaluation>(),
                    nameof(msfsi_loan_applicationcollateralvaluation.StateCode).GetAttributeLogicalName<msfsi_loan_applicationcollateralvaluation>(),
               }) ?? new List<Entity>();
        }

        private List<Entity> GetEmployments(List<Guid> contactIds)
        {
            return dataAccessLayer.QueryByGuidList(
               msfsi_contactemployment.EntityLogicalName,
               nameof(msfsi_contactemployment.msfsi_relatedpartycontract).GetAttributeLogicalName<msfsi_contactemployment>(),
               contactIds,
               new string[]
               {
                    nameof(msfsi_contactemployment.Id).GetAttributeLogicalName<msfsi_contactemployment>(),
                    nameof(msfsi_contactemployment.StatusCode).GetAttributeLogicalName<msfsi_contactemployment>(),
                    nameof(msfsi_contactemployment.StateCode).GetAttributeLogicalName<msfsi_contactemployment>()
               }) ?? new List<Entity>();
        }

        private List<Entity> GetAssets()
        {
            return dataAccessLayer.GetRelatedEntities(
                msfsi_applicationasset.EntityLogicalName,
                nameof(msfsi_applicationasset.msfsi_application).GetAttributeLogicalName<msfsi_applicationasset>(),
                new string[]
                {
                    nameof(msfsi_applicationasset.Id).GetAttributeLogicalName<msfsi_applicationasset>(),
                    nameof(msfsi_applicationasset.StatusCode).GetAttributeLogicalName<msfsi_applicationasset>(),
                    nameof(msfsi_applicationasset.StateCode).GetAttributeLogicalName<msfsi_applicationasset>()
                }) ?? new List<Entity>();
        }

        private List<Entity> GetLiabilities()
        {
            return dataAccessLayer.GetRelatedEntities(
                msfsi_applicationliability.EntityLogicalName,
                nameof(msfsi_applicationliability.msfsi_application).GetAttributeLogicalName<msfsi_applicationliability>(),
                new string[]
                {
                    nameof(msfsi_applicationliability.Id).GetAttributeLogicalName<msfsi_applicationliability>(),
                    nameof(msfsi_applicationliability.StatusCode).GetAttributeLogicalName<msfsi_applicationliability>(),
                    nameof(msfsi_applicationliability.StateCode).GetAttributeLogicalName<msfsi_applicationliability>()
                }) ?? new List<Entity>();
        }

        private List<Entity> GetDocumentRequests()
        {
            return dataAccessLayer.GetRelatedEntities(
               msfsi_documentrequest.EntityLogicalName,
               nameof(msfsi_documentrequest.msfsi_context).GetAttributeLogicalName<msfsi_documentrequest>(),
               new string[]
               {
                    nameof(msfsi_documentrequest.Id).GetAttributeLogicalName<msfsi_documentrequest>(),
                    nameof(msfsi_documentrequest.StatusCode).GetAttributeLogicalName<msfsi_documentrequest>(),
                    nameof(msfsi_documentrequest.StateCode).GetAttributeLogicalName<msfsi_documentrequest>(),
                    nameof(msfsi_documentrequest.msfsi_document).GetAttributeLogicalName<msfsi_documentrequest>()
               }) ?? new List<Entity>();
        }

        private List<Entity> GetDocuments(List<Guid> requestsIds)
        {
            return dataAccessLayer.QueryByGuidList(
               msfsi_document.EntityLogicalName,
               nameof(msfsi_document.Id).GetAttributeLogicalName<msfsi_document>(),
               requestsIds,
               new string[]
               {
                    nameof(msfsi_document.Id).GetAttributeLogicalName<msfsi_document>(),
                    nameof(msfsi_document.StatusCode).GetAttributeLogicalName<msfsi_document>(),
                    nameof(msfsi_document.StateCode).GetAttributeLogicalName<msfsi_document>()
               }) ?? new List<Entity>();
        }

        private List<Entity> GetExpenses()
        {
            return dataAccessLayer.GetRelatedEntities(
               msfsi_applicationexpense.EntityLogicalName,
               nameof(msfsi_applicationexpense.msfsi_application).GetAttributeLogicalName<msfsi_applicationexpense>(),
               new string[]
               {
                    nameof(msfsi_applicationexpense.Id).GetAttributeLogicalName<msfsi_applicationexpense>(),
                    nameof(msfsi_applicationexpense.StatusCode).GetAttributeLogicalName<msfsi_applicationexpense>(),
                    nameof(msfsi_applicationexpense.StateCode).GetAttributeLogicalName<msfsi_applicationexpense>()
               }) ?? new List<Entity>();
        }

        private List<Entity> GetIncomes()
        {
            return dataAccessLayer.GetRelatedEntities(
               msfsi_applicationincome.EntityLogicalName,
               nameof(msfsi_applicationincome.msfsi_application).GetAttributeLogicalName<msfsi_applicationincome>(),
               new string[]
               {
                    nameof(msfsi_applicationincome.Id).GetAttributeLogicalName<msfsi_applicationincome>(),
                    nameof(msfsi_applicationincome.StatusCode).GetAttributeLogicalName<msfsi_applicationincome>(),
                    nameof(msfsi_applicationincome.StateCode).GetAttributeLogicalName<msfsi_applicationincome>()
               }) ?? new List<Entity>();
        }

        private List<Entity> GetPartyContractsAssets(List<Guid> partyContractsIds)
        {
            return dataAccessLayer.GetSubRelatedEntities(
               msfsi_applicationcontactasset.EntityLogicalName,
               partyContractsIds,
               nameof(msfsi_applicationcontactasset.msfsi_relatedparty).GetAttributeLogicalName<msfsi_applicationcontactasset>(),
               new string[]
               {
                    nameof(msfsi_applicationcontactasset.Id).GetAttributeLogicalName<msfsi_applicationcontactasset>(),
                    nameof(msfsi_applicationcontactasset.StatusCode).GetAttributeLogicalName<msfsi_applicationcontactasset>(),
                    nameof(msfsi_applicationcontactasset.StateCode).GetAttributeLogicalName<msfsi_applicationcontactasset>()
               }) ?? new List<Entity>();
        }

        private List<Entity> GetPartyContractsLiabilities(List<Guid> partyContractsIds)
        {
            return dataAccessLayer.GetSubRelatedEntities(
               msfsi_applicationcontactliability.EntityLogicalName,
               partyContractsIds,
               nameof(msfsi_applicationcontactliability.msfsi_relatedparty).GetAttributeLogicalName<msfsi_applicationcontactliability>(),
               new string[]
               {
                    nameof(msfsi_applicationcontactliability.Id).GetAttributeLogicalName<msfsi_applicationcontactliability>(),
                    nameof(msfsi_applicationcontactliability.StatusCode).GetAttributeLogicalName<msfsi_applicationcontactliability>(),
                    nameof(msfsi_applicationcontactliability.StateCode).GetAttributeLogicalName<msfsi_applicationcontactliability>()
               }) ?? new List<Entity>();
        }
        private List<Entity> GetTasks()
        {
            return dataAccessLayer.GetRelatedEntities(
               Task.EntityLogicalName,
               nameof(Task.RegardingObjectId).GetAttributeLogicalName<Task>(),
               new string[]
               {
                    nameof(Task.Id).GetAttributeLogicalName<Task>(),
                    nameof(Task.StatusCode).GetAttributeLogicalName<Task>(),
                    nameof(Task.StateCode).GetAttributeLogicalName<Task>()
               }) ?? new List<Entity>();
        }
    }
}
