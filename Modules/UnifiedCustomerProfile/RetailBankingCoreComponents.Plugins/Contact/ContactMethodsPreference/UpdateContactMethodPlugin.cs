namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using Xrm.Sdk;

    public class UpdateContactMethodPlugin : ContactMethodPlugin
    {
      
        protected override int? GetPreferredContactMethod(Entity entity, EntityImageCollection preEntity)
        {
            OptionSetValue preferred;
            if (entity.Attributes.ContainsKey(ContactPreferencesConstants.preferredConstactMethodCode))
            {
                preferred = entity.Attributes[ContactPreferencesConstants.preferredConstactMethodCode] as OptionSetValue;
            }
            else
            {
                preferred = preEntity["contact"][ContactPreferencesConstants.preferredConstactMethodCode] as OptionSetValue;
            }
            return preferred?.Value;
        }

        protected override bool GetDoNotValue(Entity entity, EntityImageCollection preEntity, string fieldName)
        {
            if (entity.Attributes.ContainsKey(fieldName))
            {
                return (bool)entity.Attributes[fieldName];
            }
            return (bool)preEntity["contact"][fieldName];

        }
    }
}
