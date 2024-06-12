namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using Newtonsoft.Json;

    public class CustomerRequest : BaseEntityRequest
    {
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty("address", Required = Required.Always)]
        public string Address { get; set; }

        [JsonProperty("income", Required = Required.Always)]
        public double Income { get; set; }

        public override int GetHashCode() => base.GetHashCode() + this.Name.GetHashCode() + this.Address.GetHashCode() + this.Income.GetHashCode();

        public override bool Equals(object obj)
        {
            var customer = obj as CustomerRequest;
            return base.Equals(customer) && this.Name == customer.Name && this.Address == customer.Address && this.Income == customer.Income;
        }
    }
}