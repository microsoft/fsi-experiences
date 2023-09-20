namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using Xrm.Sdk;

    public class ContactMethodValidator
    {
        public static void ValidateContactMethods(ContactPreferences contactPreferences)
        {
            if (contactPreferences.ContactMethodCode == ContactPreferencesConstants.Email && contactPreferences.DoNotEmail ||
                contactPreferences.ContactMethodCode == ContactPreferencesConstants.Phone && contactPreferences.DoNotPhone ||
                contactPreferences.ContactMethodCode == ContactPreferencesConstants.Fax && contactPreferences.DoNotFax ||
                contactPreferences.ContactMethodCode == ContactPreferencesConstants.PostalMail && contactPreferences.DoNotPostalMail)
            {
                throw new InvalidPluginExecutionException("Preferred Contact Method must be set to an allowed channel");
            }
        }
    }
}
