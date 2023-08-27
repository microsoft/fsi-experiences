namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;
    
    public partial class msfsi_loanbusinessprocessflow : IDeactivatable
    {
        public void Deactivate()
        {
            this.StateCode = msfsi_loanbusinessprocessflowState.Inactive;
        }
    }
}