namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_applicationliability : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_applicationliability_StatusCode.Inactive;
            this.StateCode = msfsi_applicationliabilityState.Inactive;
        }
    }
}