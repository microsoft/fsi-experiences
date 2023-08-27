namespace Microsoft.CloudForFSI.Infra
{
    using System;
    using System.Collections.Generic;

    public sealed class CustomerInsightsColumns
    {
        public string ContactId { get; set; }
        public string CustomerId { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public Dictionary<string, string> CiValueDictionary { get; set; }
    }

    public sealed class CustomerInsightsColumnsBuilder
    {
        private readonly CustomerInsightsColumns _CustomerInsightsColumns = new CustomerInsightsColumns();
        public CustomerInsightsColumnsBuilder WithContactId(string contactId)
        {
            _CustomerInsightsColumns.ContactId = contactId;
            return this;
        }

        public CustomerInsightsColumnsBuilder WithModifiedOn(DateTime? modifiedOn)
        {
            _CustomerInsightsColumns.ModifiedOn = modifiedOn;
            return this;
        }

        public CustomerInsightsColumnsBuilder WithCiValueDictionaryAndCustomerId(Dictionary<string, string> ciValueDictionary, string customerIdJsonFieldColumn)
        {
            string customerId = null;

            if (ciValueDictionary != null && ciValueDictionary.ContainsKey(customerIdJsonFieldColumn))
            {
                customerId = ciValueDictionary[customerIdJsonFieldColumn];
            }
            _CustomerInsightsColumns.CiValueDictionary = ciValueDictionary;
            _CustomerInsightsColumns.CustomerId = customerId;

            return this;
        }

        public CustomerInsightsColumns Build()
        {
            return _CustomerInsightsColumns;
        }
    }
}
