namespace Microsoft.CloudForFSI.Infra.PackageDeployer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Crm.Sdk.Messages;
    using Xrm.Sdk.Query;
    using Xrm.Tooling.PackageDeployment.CrmPackageExtentionBase;
    using Xrm.Tooling.Connector;

    class LCIDService
    {
        public static int SupportLocal(int selectedLanguage, List<int> availableLanguages,
            Dictionary<string, object> runtimeSettings,
            TraceLogger traceLogger, CrmServiceClient crmServiceClient)
        {
            var lcid = GetSelectedLanguage(selectedLanguage, runtimeSettings, traceLogger, crmServiceClient);

            if (!availableLanguages.Contains(lcid))
            {
                /// Failing over to default lcid value of 1033
                traceLogger.Log($"The selected language code is not available: {lcid}. Setting to default 1033");
                lcid = 1033;
            }

            return lcid;
        }

        public static int GetSelectedLanguage(int selectedLanguage, Dictionary<string, object> runtimeSettings,
            TraceLogger traceLogger, CrmServiceClient crmServiceClient)
        {
            object lcidSetting;
            int lcid;

            if (runtimeSettings != null
                && runtimeSettings.TryGetValue("LCID", out lcidSetting)
                && int.TryParse(lcidSetting.ToString(), out lcid))
            {
                traceLogger.Log($"Overridden language code: {lcid}");

                return lcid;
            }

            if (TryGetOrganizationLcid(out lcid, crmServiceClient))
            {
                traceLogger.Log($"Organization base language code: {lcid}");

                return lcid;
            }

            traceLogger.Log($"Default language code: {selectedLanguage}");

            return selectedLanguage;
        }

        private static bool TryGetOrganizationLcid(out int lcid, CrmServiceClient crmServiceClient)
        {
            try
            {
                var provisionedLanguageRequest = new RetrieveProvisionedLanguagesRequest();
                var provisionedLanguageResponse = (RetrieveProvisionedLanguagesResponse)crmServiceClient.Execute(provisionedLanguageRequest);

                lcid = provisionedLanguageResponse.RetrieveProvisionedLanguages.FirstOrDefault();
                return true;
            }
            catch
            {
                lcid = 0;
                return false;
            }
        }
    }
}
