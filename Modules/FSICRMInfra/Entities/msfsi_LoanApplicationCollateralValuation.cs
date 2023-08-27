namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_LoanApplicationCollateralValuation : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationCollateralValuation_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationCollateralValuationState.Inactive;
        }
    }
}
