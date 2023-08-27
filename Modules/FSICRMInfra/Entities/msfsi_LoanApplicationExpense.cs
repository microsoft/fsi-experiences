namespace Microsoft.CloudForFSI.Tables
{
    using Microsoft.CloudForFSI.OptionSets;

    public partial class msfsi_LoanApplicationExpense : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationExpense_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationExpenseState.Inactive;
        }
    }
}
