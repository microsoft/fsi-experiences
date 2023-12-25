namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.EntityFetch
{
    using Microsoft.Xrm.Sdk;
    using Newtonsoft.Json;
    using System;

    public class AliasedValueJsonConverter : JsonConverter
    {

        public AliasedValueJsonConverter()
        {
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var innerValue = ((Xrm.Sdk.AliasedValue)value).Value;
            serializer.Serialize(writer, innerValue);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException("Unnecessary because CanRead is false. The type will skip the converter.");
        }

        public override bool CanConvert(Type objectType)
        {
            return (objectType == typeof(AliasedValue));
        }
    }
}
