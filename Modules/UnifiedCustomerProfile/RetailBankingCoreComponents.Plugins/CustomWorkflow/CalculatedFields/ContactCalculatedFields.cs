namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.CustomWorkflow.CalculatedFields
{
    using Newtonsoft.Json;

    class ContactCalculatedFields
    {
        [JsonProperty("assets")]
        public double Assets { get; set; }
    }
}
