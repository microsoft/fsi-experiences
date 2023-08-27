namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using Xrm.Sdk;

    public class CreateContactMethodPlugin : ContactMethodPlugin
    {
        protected override int? GetPreferredContactMethod(Entity entity, EntityImageCollection preEntity)
        {
            if (entity.Attributes.ContainsKey("preferredcontactmethodcode"))
            {
                var preferred = entity.Attributes["preferredcontactmethodcode"] as OptionSetValue;
                return preferred?.Value;
            }
            return null;
        }

        protected override bool GetDoNotValue(Entity entity, EntityImageCollection preEntity, string fieldName)
        {
            if (entity.Attributes.ContainsKey(fieldName))
            {
                return (bool)entity.Attributes[fieldName];
            }
            return true;
        }
    }
}
