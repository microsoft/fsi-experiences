namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;
    
    public partial class msfsi_loan_application : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_loan_application_StatusCode.Inactive;
            this.StateCode = msfsi_loan_applicationState.Inactive;
        }
    }
}