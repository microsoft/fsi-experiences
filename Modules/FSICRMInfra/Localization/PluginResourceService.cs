namespace Microsoft.CloudForFSI.Infra.Localization
{
    using ErrorManagers;
    using Logger;
    using Microsoft.Xrm.Sdk;
    using System;
    using System.Globalization;
    using System.Reflection;
    using System.Xml;
    using Xrm.Sdk.PluginTelemetry;

    /// <summary>
    /// This class retrieves labels for a given culture.
    /// </summary>
    /// <remarks>
    /// This class has to be thread-safe and cannot have state since it is instantiated
    /// only once and stored as a global variable inside the <c>Labels</c> class.
    /// </remarks>
    public class PluginResourceService
    {
        private readonly ILoggerService loggerService;
        private readonly IExecutionContext executionContext;
        private readonly IOrganizationService organizationService;

        /// <summary>
        /// Creates a new instance of the resource manager.
        /// </summary>
        /// <param name="executionContext">The execution context</param>
        /// <param name="organizationService">The organization service</param>
        /// <param name="loggerService">The tracing service</param>
        /// <remarks>
        /// This method's signature has to match that of <c>System.Resources.ResourceManager</c>
        /// because that type is replaced by this class in the generated labels file.
        /// </remarks>
        public PluginResourceService(IExecutionContext executionContext,
            IOrganizationService organizationService,
            ILoggerService loggerService)
        {
            if (loggerService == null)
            {
                ErrorManager.UnLocalizedTraceAndThrow("loggerService cannot be null", this.loggerService);
            }

            this.loggerService = loggerService;
            if (executionContext == null)
            {
                ErrorManager.UnLocalizedTraceAndThrow("ExecutionContext cannot be null", this.loggerService);
            }

            if (organizationService == null)
            {
                ErrorManager.UnLocalizedTraceAndThrow("OrganizationService cannot be null", this.loggerService);
            }

            this.executionContext = executionContext;
            this.organizationService = organizationService;
        }

        /// <summary>
        /// Retrieves the value for given a value ID. This method attempts to grab the localized sting in a Priority order based off the users UI Lang.
        /// </summary>
        /// <param name="valueId"> > The ID of the value to be retrieved. </param>
        /// <param name="fileName"> The resource file name to look in</param>
        /// <returns> Localized String </returns>
        public string GetResourceValueFromId(string valueId, string fileName)
        {
            this.CheckResourceValues(valueId, fileName);

            return this.GetErrorStringFromResource(valueId, fileName) ?? valueId;
        }

        /// <summary>
        /// Retrieves the value for given a value ID for a specified culture.
        /// </summary>
        /// <param name="valueId"> > The ID of the value to be retrieved. </param>
        /// <param name="fileName"> The resource file name to look in</param>
        /// <param name="culture"> The culture for retrieving the value</param>
        /// <returns> Localized String </returns>
        public string GetResourceValueInSpecificCultureFromId(string valueId, string fileName, int culture)
        {
            this.CheckResourceValues(valueId, fileName);
            var cultureInfo = new CultureInfo(culture);
            return this.GetValueFromCultureHierarchy(valueId, null, fileName, cultureInfo) ?? valueId;
        }

        private void CheckResourceValues(string valueId, string fileName)
        {
            if (string.IsNullOrEmpty(valueId))
            {
                ErrorManager.UnLocalizedTraceAndThrow("Cannot get localized error - value id is null or empty", this.loggerService);
            }

            if (string.IsNullOrEmpty(fileName))
            {
                ErrorManager.UnLocalizedTraceAndThrow($"{valueId} - Cannot get localized error - file name is null or empty", this.loggerService);
            }
        }

        /// <summary>
        /// Retrieves the value for given a value ID. This method attempts to grab the localized sting in a Priority order based off the users UI Lang.
        /// </summary>
        /// <param name="valueId"> > The ID of the value to be retrieved. </param>
        /// <param name="fileName"> The resource file name to look in</param>
        /// <returns> Localized String </returns>
        private string GetErrorStringFromResource(string valueId, string fileName)
        {
            try
            {
                var cultureProvider =
                    new CultureProvider(this.loggerService, this.organizationService, this.executionContext);
                return this.GetValueFromCultureHierarchy(valueId, cultureProvider, fileName);
            }
            catch (Exception e)
            {
                ErrorManager.UnLocalizedTraceAndThrow($"{valueId} - Cannot initialize culture provider with error {e.Message}", this.loggerService);
                return valueId;
            }
        }

        /// <summary>
        /// Iterates over each Allowed UI Language for user and returns localized string
        /// </summary>
        /// <param name="valueId"> value of string to localize </param>
        /// <param name="cultureProvider"> Inject CultureProvider to determine UI Language </param>
        /// <param name="fileName"> The resource file name to read from </param>
        /// <param name="cultureInfo"> A culture if we wish to get a specific language </param>
        /// <returns> Localized String </returns>
        private string GetValueFromCultureHierarchy(string valueId, CultureProvider cultureProvider, string fileName, CultureInfo cultureInfo = null)
        {
            string resourceValueFromId = null;

            try
            {
                do
                {
                    var localeInfo = cultureInfo?? cultureProvider.Current;
                    try
                    {
                        var valueResource = new ValueResource("msfsi_", fileName, this.organizationService, this.loggerService);
                        var resource = valueResource.GetResource(localeInfo.LCID);
                        if (resource != null)
                        {
                            var valueNode = resource.SelectSingleNode(string.Format(CultureInfo.InvariantCulture, "./root/data[@name='{0}']/value", valueId));
                            if (valueNode != null)
                            {
                                resourceValueFromId = valueNode.InnerText;
                                break;
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        // Swallow all exceptions and try the next possible language
                        this.loggerService.LogWarning($"Getting user UILanguage {localeInfo.Name} failed - {e.Message}");
                    }
                } while (cultureProvider.MoveNext());
            }
            catch (Exception e)
            {
                // Swallow all exceptions and default to DefaultLocaleId in all error scenarios
                this.loggerService.LogWarning($"An Error occurred getting UILanguage - {e.Message}");
            }

            return resourceValueFromId;
        }
    }
}
