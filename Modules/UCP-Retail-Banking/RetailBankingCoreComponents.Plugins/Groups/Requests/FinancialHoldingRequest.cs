namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using System;
    using Newtonsoft.Json;

    public class FinancialHoldingRequest : BaseEntityRequest
    {
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty("groupHoldingId")]
        public Guid GroupHoldingId { get; set; }

        [JsonProperty("type", Required = Required.Always)]
        public int Type { get; set; }

        [JsonProperty("category", Required = Required.Always)]
        public int Category { get; set; }

        [JsonProperty("balance", Required = Required.Always)]
        public double Balance { get; set; }

        public override int GetHashCode() => base.GetHashCode() + this.GroupHoldingId.GetHashCode() + this.Name.GetHashCode() + this.Balance.GetHashCode();
        
        public override bool Equals(object obj)
        {
            var fh = obj as FinancialHoldingRequest;
            return base.Equals(fh) && this.Name == fh.Name && this.GroupHoldingId == fh.GroupHoldingId && this.Category == fh.Category && this.Type == fh.Type && this.Balance == fh.Balance;
        }
    }
}