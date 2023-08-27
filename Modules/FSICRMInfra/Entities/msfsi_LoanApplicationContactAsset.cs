namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_LoanApplicationContactAsset : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationContactAsset_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationContactAssetState.Inactive;
        }
    }
}
