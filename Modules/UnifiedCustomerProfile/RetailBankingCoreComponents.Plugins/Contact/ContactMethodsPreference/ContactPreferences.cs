namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    public class ContactPreferences
    {
        public int? ContactMethodCode { get; }
        public bool DoNotPhone { get; }
        public bool DoNotEmail { get; }
        public bool DoNotFax { get; }
        public bool DoNotPostalMail { get; }

        public ContactPreferences(int? contactMethodCode, bool doNotPhone, bool doNotEmail, bool doNotFax, bool doNotPostalMail)
        {
            ContactMethodCode = contactMethodCode;
            DoNotPhone = doNotPhone;
            DoNotEmail = doNotEmail;
            DoNotFax = doNotFax;
            DoNotPostalMail = doNotPostalMail;
        }
 
    }
}