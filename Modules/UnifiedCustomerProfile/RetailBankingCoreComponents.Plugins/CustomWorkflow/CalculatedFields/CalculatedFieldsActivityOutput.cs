namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.CustomWorkflow.CalculatedFields
{
    using Newtonsoft.Json;

    class CalculatedFieldsActivityOutput
    {
        public CalculatedFieldsActivityOutput()
        {
            this.Value = new ContactCalculatedFields();
        }

        [JsonProperty("value")]
        public ContactCalculatedFields Value { get; set; }
        
        [JsonProperty("contactId")]
        public string ContactId { get; set; }
    }
}
