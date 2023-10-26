namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using Newtonsoft.Json;

    public class FinancialHoldingOwnerRequest : BaseEntityRequest
    {
        [JsonProperty("role")]
        public string Role { get; set; }

        public override int GetHashCode() => base.GetHashCode() + this.Role.GetHashCode();

        public override bool Equals(object obj)
        {
            var fhOwner = obj as FinancialHoldingOwnerRequest;
            return base.Equals(fhOwner) && this.Role == fhOwner.Role;
        }
    }
}