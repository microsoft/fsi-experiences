namespace Microsoft.CloudForFSI.Infra.Plugins
{
    using Localization;
    using Logger;
    using Xrm.Sdk;
    using System;
    using Xrm.Sdk.PluginTelemetry;

    public class PluginParameters
    {
        public IServiceProvider ServiceProvider;
        public IPluginExecutionContext ExecutionContext;
        public IOrganizationService OrganizationService;
        public ILoggerService LoggerService;
        public PluginResourceService PluginResourceService;
        public bool isDevelopment;
    }
}
