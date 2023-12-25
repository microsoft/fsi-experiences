namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;
    public partial class msfsi_applicationcontactasset : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_applicationcontactasset_StatusCode.Inactive;
            this.StateCode = msfsi_applicationcontactassetState.Inactive;
        }
    }
}