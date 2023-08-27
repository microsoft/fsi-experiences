namespace Microsoft.CloudForFSI.Tables
{
    using Microsoft.CloudForFSI.OptionSets;

    public partial class msfsi_LoanApplicationContact : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationContact_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationContactState.Inactive;
        }   
    }
}