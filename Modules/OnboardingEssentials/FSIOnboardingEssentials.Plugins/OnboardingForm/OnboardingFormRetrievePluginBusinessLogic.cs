namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.OnboardingForm
{
    using System;
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class OnboardingFormRetrievePluginBusinessLogic : IPluginBusinessLogic
    {
        private readonly IOnboardingFormDal _dataAccessLayer;
        private readonly IPluginExecutionContext _executionContext;
        private readonly ILoggerService _logger;
        private readonly Guid _entityId;

        public OnboardingFormRetrievePluginBusinessLogic(Guid entityId, ILoggerService logger, IPluginExecutionContext executionContext, IOnboardingFormDal dataAccessLayer)
        {
            this._dataAccessLayer = dataAccessLayer;
            this._executionContext = executionContext;
            this._logger = logger;
            this._entityId = entityId;
        }

        public PluginResult Execute()
        {
            var formEntity = _dataAccessLayer.GetFormEntities(_entityId);
            var onboardingFormEntities = GetOnboardingFormEntityCollection(formEntity);

            _executionContext.OutputParameters["BusinessEntity"] = onboardingFormEntities;

            return PluginResult.Ok();
        }

        private Entity GetOnboardingFormEntityCollection(IEnumerable<SystemForm> formEntities)
        {
            foreach (var entity in formEntities)
            {
                var onboardingFormEntity = _dataAccessLayer.GetOnboardingFormEntity(entity);
                return onboardingFormEntity;
            }

            return null;
        }
    }
}