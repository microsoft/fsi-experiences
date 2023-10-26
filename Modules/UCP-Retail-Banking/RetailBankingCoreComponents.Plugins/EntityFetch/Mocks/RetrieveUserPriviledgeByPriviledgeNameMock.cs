namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using System.Collections.Generic;

    public sealed class RetrieveUserPriviledgeByPriviledgeNameMock
    {
        public List<string> priviledges { get; set; }
        private static Dictionary<string, RetrieveUserPriviledgeByPriviledgeNameMock> instances = new Dictionary<string, RetrieveUserPriviledgeByPriviledgeNameMock>();

        public RetrieveUserPriviledgeByPriviledgeNameMock()
        {
            this.priviledges = new List<string>();
        }

        public static RetrieveUserPriviledgeByPriviledgeNameMock RetrieveUserPriviledgeInstances(string instanceId)
        {
            var doesInstanceExist = instances.TryGetValue(instanceId, out var instance);
            if (!doesInstanceExist)
            {
                instances.Add(instanceId, new RetrieveUserPriviledgeByPriviledgeNameMock());
                return instances[instanceId];
            }

            return instance;
        }

        public bool GetAccessRight(string permission)
        {
            return priviledges.Contains(permission);
        }

        public void SetPriviledges(List<string> priviledges)
        {
            this.priviledges = priviledges;
        }

        public void RemovePriviledge(string priviledge)
        {
            this.priviledges.Remove(priviledge);
        }

        public static void ClearInstance(string instanceId)
        {
            instances.Remove(instanceId);
        }
    }
}
