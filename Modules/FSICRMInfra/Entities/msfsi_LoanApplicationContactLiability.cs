namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_LoanApplicationContactLiability : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationContactLiability_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationContactLiabilityState.Inactive;
        }
    }
}