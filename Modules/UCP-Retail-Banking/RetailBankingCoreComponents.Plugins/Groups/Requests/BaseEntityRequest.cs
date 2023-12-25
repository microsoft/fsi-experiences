namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Groups.Requests
{
    using System;
    using System.ComponentModel;
    using Newtonsoft.Json;

    public abstract class BaseEntityRequest
    {
        [DefaultValue("")]
        [JsonProperty("id", Required = Required.Always, DefaultValueHandling = DefaultValueHandling.Ignore)]
        public Guid Id { get; set; }

        public override int GetHashCode() => this.Id.GetHashCode();

        public override bool Equals(object obj)
        {
            var baseEntity = obj as BaseEntityRequest;
            return baseEntity != null && this.Id.Equals(baseEntity.Id);
        }
    }
}