namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;
    public partial class msfsi_applicationasset : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_applicationasset_StatusCode.Inactive;
            this.StateCode = msfsi_applicationassetState.Inactive;
        }
    }
}