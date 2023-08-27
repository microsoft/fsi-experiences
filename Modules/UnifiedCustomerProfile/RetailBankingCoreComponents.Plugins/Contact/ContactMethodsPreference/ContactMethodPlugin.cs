namespace Microsoft.CloudForFSI.UnifiedCustomerProfile.Plugins.Contact.ContactMethodsPreference
{
    using System;
    using System.ServiceModel;
    using Xrm.Sdk;

    public abstract class ContactMethodPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                Entity entity = (Entity)context.InputParameters["Target"];
                var preEntity = context.PreEntityImages;

                if (entity.LogicalName != "contact")
                    return;

                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                try
                {
                    var preferredContactMethodCode = GetPreferredContactMethod(entity, preEntity);
                    var doNotPhone = GetDoNotValue(entity, preEntity, "donotphone");
                    var doNotEmail = GetDoNotValue(entity, preEntity, "donotemail");
                    var doNotFax = GetDoNotValue(entity, preEntity, "donotfax");
                    var doNotPostalMail = GetDoNotValue(entity, preEntity, "donotpostalmail");

                    var preferences = new ContactPreferences(preferredContactMethodCode, doNotPhone, doNotEmail, doNotFax, doNotPostalMail);

                    ContactMethodValidator.ValidateContactMethods(preferences);
                }

                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in ContactMethodPlugin.", ex);
                }

                catch (Exception ex)
                {
                    tracingService.Trace("Something went wrong in ContactMethodPlugin: {0}", ex.ToString());
                    throw new InvalidPluginExecutionException("An error occurred in ContactMethodPlugin.", ex);
                }
            }

        }
        protected abstract int? GetPreferredContactMethod(Entity entity, EntityImageCollection preEntity);

        protected abstract bool GetDoNotValue(Entity entity, EntityImageCollection preEntity, string fieldName);
    }
}
