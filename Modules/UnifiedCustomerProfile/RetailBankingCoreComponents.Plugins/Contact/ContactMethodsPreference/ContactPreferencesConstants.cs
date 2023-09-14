namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using System;
    using System.Collections.Generic;
    using Infra;
    using Plugins;

    public static class ContactPreferencesConstants
    {
        public const readonly string DoNotAllowEmail = "donotemail";
        public const readonly string DoNotAllowPhone = "donotphone";
        public const readonly string DoNotAllowFax = "donotfax";
        public const readonly string DoNotAllowPostalMail = "donotpostalmail";
        public static readonly string preferredConstactMethodCode = "preferredcontactmethodcode";
        public static readonly int Email = 2;
        public static readonly int Phone = 3;
        public static readonly int Fax = 4;
        public static readonly int PostalMail = 5;

    }
}