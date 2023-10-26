namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using Newtonsoft.Json;

    public class GroupMemberRequest : BaseEntityRequest
    {
        [JsonProperty("role", Required = Required.Always)]
        public int Role { get; set; }

        [JsonProperty("IsPrimaryGroup", Required = Required.Always)]
        public bool IsPrimaryGroup { get; set; }

        [JsonProperty("customer", Required = Required.Always)]
        public CustomerRequest Customer { get; set; }

        public override int GetHashCode() => base.GetHashCode() + this.Role.GetHashCode() + this.IsPrimaryGroup.GetHashCode() + this.Customer.GetHashCode();

        public override bool Equals(object obj)
        {
            var groupMember = obj as GroupMemberRequest;
            return base.Equals(groupMember) && this.Role == groupMember.Role && this.IsPrimaryGroup == groupMember.IsPrimaryGroup && this.Customer.Equals(groupMember.Customer);
        }
    }
}