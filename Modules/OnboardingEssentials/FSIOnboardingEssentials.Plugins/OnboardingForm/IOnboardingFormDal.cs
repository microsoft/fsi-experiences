namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.OnboardingForm
{
    using System;
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public interface IOnboardingFormDal : IBasePluginDal
    {
        IEnumerable<SystemForm> GetFormEntities(Guid formId = default(Guid));

        Entity GetOnboardingFormEntity(SystemForm systemformEntity);

        IEnumerable<string> RetrieveExtensionEntitiesName(string entityName, string referencingAttribute);
    }
}