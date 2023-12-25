namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;
    
    public partial class msfsi_contactemployment : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_contactemployment_StatusCode.Inactive;
            this.StateCode = msfsi_contactemploymentState.Inactive;
        }
    }
}