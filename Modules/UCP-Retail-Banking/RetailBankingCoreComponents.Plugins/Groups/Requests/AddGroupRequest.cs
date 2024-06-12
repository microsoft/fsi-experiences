namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class AddGroupRequest
    {
        [JsonProperty("group", Required = Required.Always)]
        public GroupRequest Group { get; set; }

        [JsonProperty("otherMembers", Required = Required.Always)]
        public ICollection<GroupMemberRequest> OtherMembers { get; set; }
    }
}