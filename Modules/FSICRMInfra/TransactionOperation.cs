namespace Microsoft.CloudForFSI.Infra
{
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Messages;

    public class TransactionCollectionOperation
    {
        public OrganizationRequestCollection requests { get; }

        public TransactionCollectionOperation()
        {
            requests = new OrganizationRequestCollection();
        }

        public void AddCreateRequest(Entity entity)
        {
            requests.Add(new CreateRequest() { Target = entity });
        }

        public void AddUpdateRequest(Entity entity, bool isConcurrencyBehavior = false)
        {
            requests.Add(new UpdateRequest() 
            { 
                Target = entity, 
                ConcurrencyBehavior = isConcurrencyBehavior ? ConcurrencyBehavior.IfRowVersionMatches : ConcurrencyBehavior.Default
            });
        }

        public void AddDeleteRequest(EntityReference entityReference)
        {
            requests.Add(new DeleteRequest() { Target = entityReference });
        }
    }
}
