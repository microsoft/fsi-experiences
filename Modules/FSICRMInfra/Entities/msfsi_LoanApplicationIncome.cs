namespace Microsoft.CloudForFSI.Tables
{
    using Microsoft.CloudForFSI.OptionSets;   

    public partial class msfsi_LoanApplicationIncome : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationIncome_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationIncomeState.Inactive;
        }
    }
}