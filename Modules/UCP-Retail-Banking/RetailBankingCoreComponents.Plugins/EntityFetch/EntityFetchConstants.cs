namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using System;
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.CloudForFSI.OptionSets;
    using Newtonsoft.Json;
    using System.Net;

    public static class EntityFetchConstants
    {
        public const string InputParameterName = "data";
        public const string OutputParameterName = "result";

        public static readonly IReadOnlyDictionary<Type, string> PluginTypeToMessageNames = new Dictionary<Type, string>
        {
            { typeof(BuildFHEntityCollectionPlugin), "msfsi_FHfetch" },
            { typeof(BuildGroupFHEntityCollectionPlugin), "msfsi_GFHfetch" }
        };

        public static readonly Dictionary<int, string> FhCategoryOptionSetValueToEntityName = new Dictionary<int, string>()
        {
            { ((int)msfsi_FinancialHoldingCategory.Accounts), msfsi_FH_Account.EntitySchemaName },
            { ((int)msfsi_FinancialHoldingCategory.Linesofcredit), msfsi_FH_Creditline.EntitySchemaName },
            { ((int)msfsi_FinancialHoldingCategory.Investments), msfsi_FH_Investment.EntitySchemaName },
            { ((int)msfsi_FinancialHoldingCategory.Loans), msfsi_FH_Loan.EntitySchemaName },
            { ((int)msfsi_FinancialHoldingCategory.Longtermsavings), msfsi_FH_Saving.EntitySchemaName }
        };

        public static readonly Dictionary<string, string> ErrorResponse = new Dictionary<string, string>()
        {
            {"entities", JsonConvert.SerializeObject(new object[]{ }) },
            {"metadata",
            JsonConvert.SerializeObject(
                new Dictionary<string, HttpStatusCode>()
                {
                    { msfsi_financialholding.EntitySchemaName, HttpStatusCode.Forbidden },
                    { msfsi_customerfinancialholding.EntitySchemaName, HttpStatusCode.Forbidden }
                }
            )}
        };

        public static readonly string Read = "Read";
        public static readonly string Write = "Write";
        public static readonly string Delete = "Delete";
        public static readonly string Create = "Create";

        public static readonly List<int> RolesIncludedInGroup = new List<int> {
            (int)msfsi_customerfinancialholding_msfsi_FinancialHoldingRole.Owner,
            (int)msfsi_customerfinancialholding_msfsi_FinancialHoldingRole.JointOwner
        };

        public static readonly string[] customerFHAttributes = new string[] { "msfsi_financialholdingid", "msfsi_customerid", "msfsi_financialholdingrole", "statecode" };
        public static readonly string[] financialHoldingAttributes = new string[] {
            "msfsi_financialholdingid",
            "msfsi_name",
            "msfsi_description",
            "msfsi_accountingclassification",
            "msfsi_financialholdingcategory",
            "msfsi_financialholdingcode",
            "statecode"
        };
        public static readonly string[] fhAccountAttributes = new string[] {
            "msfsi_balance",
            "msfsi_balancedefault",
            "msfsi_interesttype",
            "msfsi_blockedamount",
            "msfsi_delinquencystatus",
            "msfsi_accountingclassification",
            "msfsi_financialholdingtype",
            "msfsi_numberoftransactions",
            "msfsi_unclearedbalance",
            "msfsi_interestrate",
            "msfsi_name",
            "msfsi_dateoflasttransaction",
            "msfsi_fh_accountid",
            "msfsi_averagebalance",
            "msfsi_balanceexchangerate",
            "msfsi_availablebalance",
            "msfsi_balancedefault",
            "msfsi_balance",
            "msfsi_balancedisplayvalue",
            "msfsi_balancedefaultdisplayvalue",
            "msfsi_balanceexchangerate",
            "transactioncurrencyid",
            "statecode"
        };
        public static readonly string[] fhCreditAttributes = new string[] {
            "msfsi_balance",
            "msfsi_balancedefault",
            "msfsi_monthlypaymentpercentage",
            "msfsi_delinquencystatus",
            "msfsi_nextstatementdate",
            "msfsi_laststatementdate",
            "msfsi_accountingclassification",
            "msfsi_financialholdingtype",
            "msfsi_creditlimit",
            "msfsi_lastpaymentduedate",
            "msfsi_fh_creditlineid",
            "msfsi_interestrate",
            "msfsi_name",
            "msfsi_balanceexchangerate",
            "msfsi_nextpaymentdate",
            "msfsi_minimumpaymentdue",
            "msfsi_laststatementbalance",
            "msfsi_balancedefault",
            "msfsi_balance",
            "msfsi_balancedisplayvalue",
            "msfsi_balancedefaultdisplayvalue",
            "msfsi_balanceexchangerate",
            "transactioncurrencyid",
            "statecode"
        };
        public static readonly string[] fhInvestmentAttributes = new string[] {
            "msfsi_investmentobjectives",
            "msfsi_balance",
            "msfsi_balancedefault",
            "msfsi_fh_investmentid",
            "msfsi_accountingclassification",
            "msfsi_gainloss",
            "msfsi_cashbalance",
            "msfsi_financialholdingtype",
            "msfsi_investmentrisk",
            "msfsi_name",
            "msfsi_balanceexchangerate",
            "msfsi_openeddate",
            "msfsi_performance",
            "msfsi_performance1y",
            "msfsi_performance3y",
            "msfsi_portfolioname",
            "msfsi_investmenttimeframe",
            "msfsi_performanceytd",
            "msfsi_balancedefault",
            "msfsi_balance",
            "msfsi_balancedisplayvalue",
            "msfsi_balancedefaultdisplayvalue",
            "msfsi_balanceexchangerate",
            "transactioncurrencyid",
            "statecode"
        };
        public static readonly string[] fhLoanAttributes = new string[] {
            "msfsi_balance",
            "msfsi_modeofpayment",
            "msfsi_balancedefault",
            "msfsi_collectionrisk",
            "msfsi_numberofdeferralsmade",
            "msfsi_interesttype",
            "msfsi_interestarrears",
            "msfsi_delinquencystatus",
            "msfsi_feearrears",
            "msfsi_disbursedamount",
            "msfsi_numberofinstallmentspaid",
            "msfsi_capitalarrears",
            "msfsi_principalamount",
            "msfsi_installmentamount",
            "msfsi_financialholdingtype",
            "msfsi_totalarrear",
            "msfsi_nextpaymentamount",
            "msfsi_disbursementdate",
            "msfsi_interestrate",
            "msfsi_maturitydate",
            "msfsi_name",
            "msfsi_lastpaymentdate",
            "msfsi_balanceexchangerate",
            "msfsi_fh_loanid",
            "msfsi_nextpaymentdate",
            "msfsi_accountingclassification",
            "msfsi_lastpaymentamount",
            "msfsi_repaymentaccount",
            "msfsi_dayspastdue",
            "msfsi_overduedate",
            "msfsi_totalinterestpaid",
            "msfsi_loanstartdate",
            "msfsi_nextinterestreviewdate",
            "msfsi_interestreviewperiod",
            "msfsi_balancedefault",
            "msfsi_balance",
            "msfsi_balancedisplayvalue",
            "msfsi_balancedefaultdisplayvalue",
            "msfsi_balanceexchangerate",
            "transactioncurrencyid",
            "statecode"
        };
        public static readonly string[] fhSavingAttributes = new string[] {
            "msfsi_fh_savingid",
            "msfsi_balanceexchangerate",
            "msfsi_accruedinterest",
            "msfsi_term",
            "msfsi_interestrate",
            "msfsi_balancedefault",
            "msfsi_initialsource",
            "msfsi_accountingclassification",
            "msfsi_financialholdingtype",
            "msfsi_maturitydate",
            "msfsi_projectedinterestamount",
            "msfsi_maturityinstructionsdetails",
            "msfsi_name",
            "msfsi_balanceatmaturity",
            "msfsi_balance",
            "msfsi_blockedamount",
            "msfsi_balancedefault",
            "msfsi_balance",
            "msfsi_balancedisplayvalue",
            "msfsi_balancedefaultdisplayvalue",
            "msfsi_balanceexchangerate",
            "transactioncurrencyid",
            "statecode"
        };
    }
}