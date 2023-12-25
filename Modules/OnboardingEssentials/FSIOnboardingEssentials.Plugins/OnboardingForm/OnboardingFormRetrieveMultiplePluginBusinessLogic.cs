namespace Microsoft.CloudForFSI.OnboardingEssentials.Plugins.OnboardingForm
{
    using System.Collections.Generic;
    using Microsoft.CloudForFSI.Infra.Logger;
    using Microsoft.CloudForFSI.Infra.Plugins;
    using Microsoft.CloudForFSI.Tables;
    using Microsoft.Xrm.Sdk;

    public class OnboardingFormRetrieveMultiplePluginBusinessLogic : IPluginBusinessLogic
    {
        private readonly IOnboardingFormDal _dataAccessLayer;
        private readonly IPluginExecutionContext _executionContext;
        private readonly ILoggerService _logger;

        public OnboardingFormRetrieveMultiplePluginBusinessLogic(ILoggerService logger, IPluginExecutionContext executionContext, IOnboardingFormDal dataAccessLayer)
        {
            this._dataAccessLayer = dataAccessLayer;
            this._executionContext = executionContext;
            this._logger = logger;
        }

        public PluginResult Execute()
        {
            var formsEntityCollection = _dataAccessLayer.GetFormEntities();
            var onboardingFormEntities = GetOnboardingFormEntityCollection(formsEntityCollection);

            _executionContext.OutputParameters["BusinessEntityCollection"] = onboardingFormEntities;

            return PluginResult.Ok();
        }

        private EntityCollection GetOnboardingFormEntityCollection(IEnumerable<SystemForm> formEntities)
        {
            var onboardingFormEntities = new EntityCollection();

            foreach (var entity in formEntities)
            {
                var onBoardingFormEntity = _dataAccessLayer.GetOnboardingFormEntity(entity);
                onboardingFormEntities.Entities.Add(onBoardingFormEntity);
            }

            return onboardingFormEntities;
        }
    }
}