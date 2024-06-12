namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;
    
    public partial class msfsi_loan_applicationcollateralvaluation : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_loan_applicationcollateralvaluation_StatusCode.Inactive;
            this.StateCode = msfsi_loan_applicationcollateralvaluationState.Inactive;
        }
    }
}