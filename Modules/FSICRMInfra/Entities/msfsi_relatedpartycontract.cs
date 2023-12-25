namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_relatedpartycontract : IDeactivatable
    {
        public static string NameFieldName = nameof(msfsi_relatedpartycontract.msfsi_name).GetAttributeLogicalName<msfsi_relatedpartycontract>();
        public static string ContactFieldName = nameof(msfsi_relatedpartycontract.msfsi_contact).GetAttributeLogicalName<msfsi_relatedpartycontract>();
        public static string RoleFieldName = nameof(msfsi_relatedpartycontract.msfsi_relatedparty_role).GetAttributeLogicalName<msfsi_relatedpartycontract>();
        public static string ContractPartFieldName = nameof(msfsi_relatedpartycontract.msfsi_contractpart).GetAttributeLogicalName<msfsi_relatedpartycontract>();

        public void Deactivate()
        {
            this.StatusCode = msfsi_relatedpartycontract_StatusCode.Inactive;
            this.StateCode = msfsi_relatedpartycontractState.Inactive;
        }
    }
}
