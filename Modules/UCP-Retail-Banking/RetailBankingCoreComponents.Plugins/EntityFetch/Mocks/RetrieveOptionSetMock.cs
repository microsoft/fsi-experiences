namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using System.Collections.Generic;
    using System.Linq;

    public sealed class RetrieveOptionSetMock
    {
        public List<int> options { get; set; }
        private static Dictionary<string, RetrieveOptionSetMock> instances = new Dictionary<string, RetrieveOptionSetMock>();

        public RetrieveOptionSetMock()
        {
            this.options = new List<int>();
        }

        public static RetrieveOptionSetMock RetrieveOptionSetInstances(string instanceIdentifier)
        {
            var doesInstanceExist = instances.TryGetValue(instanceIdentifier, out var instance);
            if (!doesInstanceExist)
            {
                instances.Add(instanceIdentifier, new RetrieveOptionSetMock());
                return instances[instanceIdentifier];
            }

            return instance;
        }

        public int[] GetOptions()
        {
            return this.options.ToArray();
        }

        public void SetOptions(int[] options)
        {
            this.options = options.ToList();
        }

        public void RemoveOptions(int option)
        {
            this.options.Remove(option);
        }

        public static void ClearInstance(string instanceId)
        {
            instances.Remove(instanceId);
        }
    }
}
