namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using Newtonsoft.Json;

    public class DeleteGroupRequest
    {
        [JsonProperty("group", Required = Required.Always)]
        public GroupRequest Group { get; set; }
    }
}