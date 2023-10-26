namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using System.Collections.Generic;
    using Newtonsoft.Json;

    public class UpdateGroupRequest
    {
        [JsonProperty("oldGroup", Required = Required.Always)]
        public GroupRequest OldGroup { get; set; }

        [JsonProperty("updatedGroup", Required = Required.Always)]
        public GroupRequest UpdatedGroup { get; set; }

        [JsonProperty("otherMembers", Required = Required.Always)]
        public ICollection<GroupMemberRequest> OtherMembers { get; set; }
    }
}