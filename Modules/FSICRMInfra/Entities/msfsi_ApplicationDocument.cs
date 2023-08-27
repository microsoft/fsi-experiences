namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;    

    public partial class msfsi_ApplicationDocument : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_ApplicationDocument_StatusCode.Inactive;
            this.StateCode = msfsi_ApplicationDocumentState.Inactive;
        }     
    }
}
