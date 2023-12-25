namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch.Requests
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class BuildGFHRequest : BuildFHRequestBase
    {
        [JsonProperty("groupId", Required = Required.Always)]
        public string GroupId { get; set; }
    }
}
