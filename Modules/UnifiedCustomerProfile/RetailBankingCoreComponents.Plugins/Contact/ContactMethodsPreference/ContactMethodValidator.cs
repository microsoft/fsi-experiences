namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using Xrm.Sdk;

    public class ContactMethodValidator
    {
        public static void ValidateContactMethods(ContactPreferences contactPreferences)
        {
            if (contactPreferences.ContactMethodCode == 2 && contactPreferences.DoNotEmail ||
                contactPreferences.ContactMethodCode == 3 && contactPreferences.DoNotPhone ||
                contactPreferences.ContactMethodCode == 4 && contactPreferences.DoNotFax ||
                contactPreferences.ContactMethodCode == 5 && contactPreferences.DoNotPostalMail)
            {
                throw new InvalidPluginExecutionException("Preferred Contact Method must be set to an allowed channel");
            }
        }
    }
}
