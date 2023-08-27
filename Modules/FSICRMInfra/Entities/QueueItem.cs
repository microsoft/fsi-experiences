namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;
	
    public partial class QueueItem : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = QueueItem_StatusCode.Inactive;
            this.StateCode = QueueItemState.Inactive;
        }
    }
}