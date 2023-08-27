namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_employment : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_employment_StatusCode.Inactive;
            this.StateCode = msfsi_employmentState.Inactive;
        }
    }
}
