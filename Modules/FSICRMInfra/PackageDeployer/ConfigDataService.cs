namespace Microsoft.CloudForFSI.Infra.PackageDeployer
{
    using System.Collections.Generic;
    using Xrm.Tooling.PackageDeployment.CrmPackageExtentionBase;

    class ConfigDataService
    {
        public static bool skipConfigData(Dictionary<string, object> runtimeSettings, TraceLogger traceLogger)
        {
            var skipData = false;

            if (runtimeSettings != null)
            {
                traceLogger.Log($"Runtime Settings populated.  Count = {runtimeSettings.Count}");

                foreach (var setting in runtimeSettings)
                {
                    traceLogger.Log($"Key={setting.Key} | Value={setting.Value.ToString()}");
                }

                if (runtimeSettings.ContainsKey("SkipConfigData"))
                {
                    bool.TryParse((string)runtimeSettings["SkipConfigData"], out skipData);
                }
            }

            return skipData;
        }
    }
}