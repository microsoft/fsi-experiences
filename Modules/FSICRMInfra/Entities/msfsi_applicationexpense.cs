namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_applicationexpense : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_applicationexpense_StatusCode.Inactive;
            this.StateCode = msfsi_applicationexpenseState.Inactive;
        }
    }
}