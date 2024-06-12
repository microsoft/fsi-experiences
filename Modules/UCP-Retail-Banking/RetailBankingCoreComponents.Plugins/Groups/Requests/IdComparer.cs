namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using System.Collections.Generic;

    public class IdComparer : IEqualityComparer<BaseEntityRequest>
    {
        public bool Equals(BaseEntityRequest entity1, BaseEntityRequest entity2)
        {
            return entity1 != null && entity2 != null && entity1.Id.Equals(entity2.Id);
        }

        public int GetHashCode(BaseEntityRequest entity)
        {
            return entity.Id.GetHashCode();
        }
    }
}
