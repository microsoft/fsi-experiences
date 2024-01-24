namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_applicationincome : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_applicationincome_StatusCode.Inactive;
            this.StateCode = msfsi_applicationincomeState.Inactive;
        }
    }
}