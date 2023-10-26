namespace Microsoft.CloudForFSI.Infra
{
    using System.Collections.Generic;
    using System.Linq;

    public class CollectionDifference<T>
    {
        public IEnumerable<T> Added { get; }

        public IEnumerable<T> Updated { get; }

        public IEnumerable<T> Deleted { get; }

        public CollectionDifference(IEnumerable<T> oldCollection, IEnumerable<T> newCollection, IEqualityComparer<T> comparer)
        {
            if (oldCollection == null || newCollection == null)
            {
                this.Added = new List<T>();
                this.Updated = new List<T>();
                this.Deleted = new List<T>();
            }
            else
            { 
                this.Added = newCollection.Except(oldCollection, comparer);
                this.Updated = newCollection.Intersect(oldCollection, comparer);
                this.Deleted = oldCollection.Except(newCollection, comparer);
            }
        }
    }
}