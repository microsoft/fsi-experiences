namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_LoanApplicationCollateral : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationCollateral_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationCollateralState.Inactive;
        }    
    }
}
