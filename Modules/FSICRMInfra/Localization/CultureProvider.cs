namespace Microsoft.CloudForFSI.Infra.Localization
{
    using ErrorManagers;
    using Logger;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Query;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Windows.Navigation;
    using Xrm.Sdk.PluginTelemetry;

    public class CultureProvider : IEnumerator<CultureInfo>
    {
        private const int DefaultLocaleId = 1033;  // English Default
        private readonly ILoggerService loggerService;
        private readonly IOrganizationService organizationService;
        private readonly IExecutionContext executionContext;
        private readonly List<CultureInfo> enumeratorElements;
        private int enumeratorElementsIndex;

        public CultureInfo Current
        {
            get
            {
                if (this.enumeratorElementsIndex < 0)
                {
                    throw new NullReferenceException("Culture provider has no elements");
                }

                return this.enumeratorElements[this.enumeratorElementsIndex];
            }
        }

        object IEnumerator.Current => this.Current;

        /// <summary>
        /// Creates a new instance of the class using the execution context.
        /// </summary>
        public CultureProvider(ILoggerService loggerService,
            IOrganizationService organizationService,
            IExecutionContext executionContext)
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
            
            this.organizationService = organizationService;
            this.executionContext = executionContext;

            this.enumeratorElements = this.GetUserApplicationCulturesInfo();
            this.enumeratorElementsIndex = this.enumeratorElements.Count > 0 ? 0 : -1;
        }

        /// <summary>
        /// Retrieves the cultures should be considered in order of importance.
        /// </summary>
        /// <returns> The cultures that should be used according to the current user. </returns>
        private List<int> GetUserApplicationCultures()
        {
            var userCulturesList = new List<int>();
            var userCulture = this.GetCurrentUserCulture();
            userCulturesList.Add(userCulture);
            if (userCulture != DefaultLocaleId)
            {
                // We always fallback to the locale ID that we are sure we have the labels in.
                userCulturesList.Add(DefaultLocaleId);
            }

            return userCulturesList;
        }

        /// <summary>
        /// Retrieves instances of <c>CultureInfo</c> that should be considered in order of importance
        /// when localizing data for the user.
        /// </summary>
        /// <returns>The <c>CultureInfo</c> that should be used according to the current user and organization.</returns>
        public List<CultureInfo> GetUserApplicationCulturesInfo()
        {
            var userCulturesInfo = new List<CultureInfo>();
            foreach (var localeId in this.GetUserApplicationCultures())
            {
                userCulturesInfo.Add(new CultureInfo(localeId));
            }

            return userCulturesInfo;
        }

        /// <summary>
        /// Fetches the culture ID of the current user.
        /// </summary>
        /// <returns>The culture ID of the current user.</returns>
        private int GetCurrentUserCulture()
        {
            var localeId = DefaultLocaleId;

            try
            {
                var userContext = this.organizationService.Retrieve("usersettings", executionContext.UserId, new ColumnSet("uilanguageid"));
                if (userContext != null)
                {
                    var userInterfaceLanguageId = userContext["uilanguageid"];
                    if (userContext.Contains("uilanguageid") && userContext["uilanguageid"] != null)
                    {
                        localeId = (int)userInterfaceLanguageId;
                    }
                }
            }
            catch (Exception e)
            {
                // Swallow all execptions and default to DefaultLocaleId in all error scenarios
                this.loggerService.LogWarning($"Getting user UILanguage failed {e.Message}");
            }

            return localeId;
        }

        public void Dispose()
        {
            this.enumeratorElements.Clear();
            this.enumeratorElementsIndex = -1;
        }

        public bool MoveNext()
        {
            if (this.enumeratorElementsIndex + 1 >= this.enumeratorElements.Count)
            {
                return false;
            }

            this.enumeratorElementsIndex = this.enumeratorElementsIndex + 1;
            return true;
        }

        public void Reset()
        {
            if (this.enumeratorElements.Count > 0)
            {
                this.enumeratorElementsIndex = 0;
            }
        }
    }
}
