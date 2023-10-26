namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json;

    public class GroupRequest : BaseEntityRequest
    {
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty("primaryMember")]
        public Guid PrimaryMember { get; set; }

        [JsonProperty("type", Required = Required.Always)]
        public GroupType Type { get; set; }

        [JsonProperty("members", Required = Required.Always)]
        public IEnumerable<GroupMemberRequest> Members { get; set; }

        [JsonProperty("financialHoldings")]
        public IEnumerable<FinancialHoldingRequest> FinancialHoldings { get; set; }

        [JsonProperty("creationDate")]
        public string CreationDate { get; set; }

        [JsonProperty("version", Required = Required.Always)]
        public long Version { get; set; }

        public override int GetHashCode() => base.GetHashCode() + this.Name.GetHashCode() + this.CreationDate.GetHashCode() + this.Version.GetHashCode();

        public override bool Equals(object obj)
        {
            var group = obj as GroupRequest;
            return base.Equals(group) && this.Name == group.Name && this.PrimaryMember == group.PrimaryMember && this.Type == group.Type && this.CreationDate == group.CreationDate && this.Version == group.Version && this.Members.SequenceEqual(group.Members) && this.FinancialHoldings.SequenceEqual(group.FinancialHoldings);
        }
    }
}