namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;
    
    public partial class msfsi_loan_applicationcollateral : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_loan_applicationcollateral_StatusCode.Inactive;
            this.StateCode = msfsi_loan_applicationcollateralState.Inactive;
        }
    }
}