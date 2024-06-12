namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;
    public partial class msfsi_applicationcontactliability : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_applicationcontactliability_StatusCode.Inactive;
            this.StateCode = msfsi_applicationcontactliabilityState.Inactive;
        }
    }
}