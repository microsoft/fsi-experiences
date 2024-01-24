namespace Microsoft.CloudForFSI.Tables
{
    using OptionSets;

    public partial class msfsi_document : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_document_StatusCode.Inactive;
            this.StateCode = msfsi_documentState.Inactive;
        }
    }
}