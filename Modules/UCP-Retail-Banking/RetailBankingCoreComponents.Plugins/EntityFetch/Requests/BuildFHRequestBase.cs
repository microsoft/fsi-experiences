namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch.Requests
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class BuildFHRequestBase
    {
        [JsonProperty("hideShowEntities", Required = Required.Always)]
        public Dictionary<string, bool> HideShowEntities { get; set; }
    }
}
