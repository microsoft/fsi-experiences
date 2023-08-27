namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_LoanApplicationAsset : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_LoanApplicationAsset_StatusCode.Inactive;
            this.StateCode = msfsi_LoanApplicationAssetState.Inactive;
        }      
    }
}
