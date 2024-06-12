namespace Microsoft.CloudForFSI.Infra.Plugins.Validation.CommonValidationRules
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class ValidationConstants
    {
        public static bool IsGuidList(List<string> list)
        {
            return list != null && list.All(element => IsGuidElement(element));
        }

        public static bool IsGuidElement(string stringForm)
        {
            return stringForm != null && Guid.TryParse(stringForm, out var _);
        }
    }
}
