namespace Microsoft.CloudForFSI.Infra
{
    using System;

    public static class Constants
    {
        public enum OperationType
        {
            Create,
            Update,
            Delete,
            Retrieve,
            RetrieveMultiple
        }
        public static class OperationTypes
        {
            public const string Create = "Create";
            public const string Update = "Update";
            public const string Delete = "Delete";
            public const string Retrieve = "Retrieve";
            public const string RetrieveMultiple = "RetrieveMultiple";
        }

        public static class ResourcesNames
        {
            public const string Infra = "InfraLabels";
            public const string RetailBanking = "RetailBankingLabels";
            public const string RetailBankingComponents = "RetailBankingComponentsLabels";
            public const string LoanOnboardingCore = "LoanOnboardingCoreLabels";
            public const string BankingCustomerIntelligence = "BankingCustIntelLabels";
            public const string IndustryCi = "IndustryCILabels";
            public const string OnboardingEssentialsTasks = "OnboardingEssentialsTasksLabels";
            public const string OnboardingEssentialsBase = "OnboardingEssentialsBaseLabels";
            public const string LoanOnboardingStarterRibbon = "LoanOnboardingStarterRibbonLabels";
        }

        public const string DeletePreImageAliasName = "PreImageAliasName";
        public const string UpdatePreImageAliasName = "PreImageAliasName";

        public const string TargetInputParamName = "Target";
        public const string RetrieveMultipleInputParamName = "Query";
        public const string RetrieveMultipleOutputParamName = "BusinessEntityCollection";
        public const string RetrieveInputParamName = "Query";
        public const string RetrieveOutputParamName = "BusinessEntity";
        public const string ContactTableLogicalName = "contact";

        public const string ErrorCodePropertyName = "error code";
        public const string PluginNamePropertyName = "plugin name";

        public static readonly Guid SystemAdministratorRoleId = new Guid("627090FF-40A3-4053-8790-584EDC5BE201");
        public static readonly Guid CoreBankingSystemTechnicalUserRoleGuid = new Guid("5aa201a2-bbb1-eb11-8236-000d3a3326ed");

    }
}
