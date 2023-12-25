namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_documentrequest : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_documentrequest_StatusCode.Inactive;
            this.StateCode = msfsi_documentrequestState.Inactive;
        }
    }
}