namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_LoanApplicationLiability : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationLiability_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationLiabilityState.Inactive;
        }     
    }
}
