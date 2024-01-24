namespace Microsoft.CloudForFSI.Infra.Localization
{
    using ErrorManagers;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Query;
    using System;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml;
    using Xrm.Sdk.PluginTelemetry;
    using Microsoft.CloudForFSI.Infra.Logger;

    public class ValueResource
    {
        private const string LocalizedResourcesSuffix = "resx";
        private const string ResourceUniqueNamePrefix = "PluginResources";
        private readonly string mainValueFileName;
        private readonly IOrganizationService organizationService;
        private readonly ILoggerService loggerService;

        // Internal cache to avoid querying the resources too often.
        private readonly ConcurrentDictionary<KeyValuePair<int, string>, XmlDocument> ResourcesPerLocale = new ConcurrentDictionary<KeyValuePair<int, string>, XmlDocument>();
        private readonly string entityInitials;

        /// <summary>
        /// Creates a new instance of the class.
        /// </summary>
        /// <param name="entityInitials">the initials for entities in the solution</param>
        /// <param name="mainValueFileName">main file name for the values</param>
        /// <param name="organizationService">organization service</param>
        /// <param name="loggerService">tracing service</param>
        public ValueResource(string entityInitials, string mainValueFileName, IOrganizationService organizationService, ILoggerService loggerService)
        {
            if (loggerService == null)
            {
                ErrorManager.UnLocalizedTraceAndThrow("loggerService cannot be null", this.loggerService);
            }

            this.loggerService = loggerService;
            if (organizationService == null)
            {
                ErrorManager.UnLocalizedTraceAndThrow("OrganizationService cannot be null", this.loggerService);
            }

            if (string.IsNullOrEmpty(entityInitials))
            {
                ErrorManager.UnLocalizedTraceAndThrow("ValueResource cannot be created without an entity initial", this.loggerService);
            }

            if (string.IsNullOrEmpty(mainValueFileName))
            {
                ErrorManager.UnLocalizedTraceAndThrow("ValueResource cannot be created without a file name", this.loggerService);
            }

            this.entityInitials = entityInitials;
            this.mainValueFileName = mainValueFileName;
            this.organizationService = organizationService;
        }

        /// <summary>
        /// Fetches the XML document with the resource in a given culture.
        /// </summary>
        /// <param name="cultureId">The ID of the culture to retrieve the resource.</param>
        /// <returns>An XML document with the resource in the given culture; if no resource was found, null is returned.</returns>
        public XmlDocument GetResource(int cultureId)
        {
            XmlDocument resource;
            var resourceKey = new KeyValuePair<int, string>(cultureId, this.mainValueFileName);

            if (ResourcesPerLocale.ContainsKey(resourceKey))
            {
                resource = ResourcesPerLocale[resourceKey];
            }
            else
            {
                resource = this.GetResourceFromServer(cultureId);
                if (resource == null)
                {
                    ErrorManager.UnLocalizedTraceAndThrow($"Could not create resource for culture id {cultureId}.", this.loggerService);
                }

                ResourcesPerLocale[resourceKey] = resource;
            }

            return resource;
        }

        /// <summary>
        /// Builds the unique name of the web resource that contains the resource for a given culture.
        /// </summary>
        /// <param name="cultureId">The ID of the culture to be retrieved.</param>
        /// <returns>The unique name of the web resource containing the labels in the given culture.</returns>
        private string GetResourceUniqueName(int cultureId)
        {
            var resourceName = this.GetResourceFileName(cultureId);
            var resourcePath = string.Format("{0}{1}/{2}", this.entityInitials, ResourceUniqueNamePrefix, resourceName);
            return resourcePath;
        }

        /// <summary>
        /// Gets the name of the file containing the labels in a given culture. The name does not contain the path.
        /// </summary>
        /// <param name="cultureId">The ID of the culture to retrieve the file name for.</param>
        /// <returns>The name of the file containing the labels in the given culture.</returns>
        private string GetResourceFileName(int cultureId)
        {
            try
            {
                var culture = new CultureInfo(cultureId);
                var cultureName = culture.Name;

                var resourceName = string.Format("{0}.{1}.{2}", this.mainValueFileName, cultureName, LocalizedResourcesSuffix);
                return resourceName;
            }
            catch (Exception e)
            {
                ErrorManager.UnLocalizedTraceAndThrow($"Could not create resource file name. Check the culture Id - {e.Message}", this.loggerService);
            }

            return string.Empty;
        }

        /// <summary>
        /// Retrieves an XML document with the labels in a given culture from the server.
        /// </summary>
        /// <param name="cultureId">The culture to retrieve the labels for.</param>
        /// <returns>An XML document with the labels in the given culture; 
        /// if no resource exists for the given culture, null is returned.</returns>
        private XmlDocument GetResourceFromServer(int cultureId)
        {
            XmlDocument document = null;

            var bytes = this.RetrieveResourceContent(cultureId);
            if (bytes != null)
            {
                document = BuildXmlDocumentFromResourceContent(bytes);
            }

            return document;
        }

        /// <summary>
        /// Builds an <c>XmlDocument</c> from the data in the content of the web resource.
        /// </summary>
        /// <param name="bytes">The content of a web resource.</param>
        /// <returns>The <c>XmlDocument</c>.</returns>
        private static XmlDocument BuildXmlDocumentFromResourceContent(byte[] bytes)
        {
            var document = new XmlDocument
            {
                XmlResolver = null
            };

            using (var resourceContentStream = new MemoryStream(bytes))
            {
                using (var resourceContentReader = new StreamReader(resourceContentStream))
                {
                    document.Load(resourceContentReader);
                }
            }

            return document;
        }

        /// <summary>
        /// Retrieves the content of the web resource containing the labels for a given culture.
        /// </summary>
        /// <param name="localeId">The ID of the culture to retrieve the labels for.</param>
        /// <returns>The content of the web resource; null if no web resource was found.</returns>
        private byte[] RetrieveResourceContent(int localeId)
        {
            var webResourceName = this.GetResourceUniqueName(localeId);
            if (string.IsNullOrEmpty(webResourceName))
            {
                ErrorManager.UnLocalizedTraceAndThrow("Could not create resource name.", this.loggerService);
            }

            var query = new QueryByAttribute("webresource")
            {
                ColumnSet = new ColumnSet("content"),
                TopCount = 1
            };

            query.AddAttributeValue("name", webResourceName);

            var webResources = this.organizationService.RetrieveMultiple(query);
            if (webResources == null || webResources.Entities.Count == 0)
            {
#pragma warning disable CA1303 // Do not pass literals as localized parameters
                throw new NullReferenceException("Localization code found no valid resx files in webresources. Will default to english");
#pragma warning restore CA1303 // Do not pass literals as localized parameters
            }

            var webResource = webResources.Entities[0];
            byte[] bytes = null;

            if (webResource != null)
            {
                bytes = Convert.FromBase64String((string)webResource["content"]);
            }

            return bytes;
        }
    }
}
