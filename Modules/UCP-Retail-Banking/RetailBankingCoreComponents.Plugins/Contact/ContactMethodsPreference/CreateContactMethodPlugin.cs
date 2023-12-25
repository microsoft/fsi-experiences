namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using Xrm.Sdk;

    public class CreateContactMethodPlugin : ContactMethodPlugin
    {
        protected override int? GetPreferredContactMethod(Entity entity, EntityImageCollection preEntity)
        {
            if (entity.Attributes.ContainsKey(ContactPreferencesConstants.preferredConstactMethodCode))
            {
                var preferred = entity.Attributes[ContactPreferencesConstants.preferredConstactMethodCode] as OptionSetValue;
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
