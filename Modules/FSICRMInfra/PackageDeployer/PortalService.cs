namespace Microsoft.CloudForFSI.Infra.PackageDeployer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.Xrm.Sdk;
    using Microsoft.Xrm.Sdk.Query;
    using Microsoft.Xrm.Tooling.Connector;
    using Microsoft.Xrm.Tooling.PackageDeployment.CrmPackageExtentionBase;

    public class PortalService
    {
        private TraceLogger _packageLog { get; set; }
        private CrmServiceClient _crmServiceClient { get; set; }

        private readonly Dictionary<int, string> websiteIdLanguageMap = new Dictionary<int, string>
        {
            { 1028, "63b8436c-915e-4490-8fa6-62c1c31f2f83" },
            { 1033, "8022730e-f647-4121-8755-3d281235c23f" },
            { 1036, "398f8ef4-463e-4f7a-85ed-ec8591486504" },
            { 1031, "3b3c95cb-d7df-45d6-ab6e-df44fae912aa" },
            { 1040, "01011c5a-1794-4bf1-9853-f1397d4ab5bf" },
            { 1043, "a30e8fa8-c8fb-4295-bccf-f6e811d3c813" },
            { 1046, "f2e7857c-1afc-47bc-8a25-8296d1b3b8a9" },
            { 3082, "87e908c1-41e6-4181-bdc7-a89010c4559c" },
        };

        public PortalService(CrmServiceClient CrmSvc, TraceLogger packageLog)
        {
            this._packageLog = packageLog;
            this._crmServiceClient = CrmSvc;
        }

        public virtual Guid GetWebsiteIdByLCID(int lcid)
        {
            string websiteId;

            if (this.websiteIdLanguageMap.TryGetValue(lcid, out websiteId))
            {
                return Guid.Parse(websiteId);
            }

            throw new Exception("Website not found for lcid: {lcid}");
        }

        public void HandleNullWebsiteLanguage(int lcid)
        {
            var webSiteId = this.GetWebsiteIdByLCID(lcid);
            try
            {
                var websiteLanguage = this.FetchWebsiteLanguage(webSiteId);
                if (websiteLanguage == null)
                {
                    this._packageLog.Log("No Website Language record retrieved from CDS");
                    return;
                }

                if (websiteLanguage.GetAttributeValue<EntityReference>("adx_portallanguageid") != null)
                {
                    this._packageLog.Log("Website language already up to date. Nothing to do here.");
                    return;
                }

                var portalLanguage = this.FetchPortalLanguage(lcid);
                if (portalLanguage == null)
                {
                    this._packageLog.Log("Unable to retrieve existing portal language record from CDS");
                    return;
                }

                this.UpdatePortalLanguage(websiteLanguage, portalLanguage);
            }
            catch (Exception ex)
            {
                this._packageLog.Log(string.Format("Website Language update process failed with ERROR: {0}", ex.Message));
            }
        }

        private void UpdatePortalLanguage(Entity websiteLanguage, Entity portalLanguage)
        {
            this._packageLog.Log(string.Format("Portal Language {0} found with GUID of {1}", portalLanguage.GetAttributeValue<string>("adx_name"), portalLanguage.Id.ToString()));
            websiteLanguage.Attributes["adx_portallanguageid"] = portalLanguage.ToEntityReference();
            this._packageLog.Log("Updating website language with correct portal language record");
            this._crmServiceClient.Update(websiteLanguage);
        }

        private Entity FetchPortalLanguage(int lcid)
        {
            this._packageLog.Log(string.Format("Retrieved Website Languages Portal language ID value is null"));
            var portalLanguageFetchXml = string.Format(@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                                          <entity name='adx_portallanguage'>
                                                            <attribute name='adx_name' />
                                                            <attribute name='adx_lcid' />
                                                            <attribute name='adx_portallanguageid' />
                                                            <order attribute='adx_name' descending='false' />
                                                            <filter type='and'>
                                                              <condition attribute='statecode' operator='eq' value='0' />
                                                              <condition attribute='adx_lcid' operator='eq' value='{0}' />
                                                            </filter>
                                                          </entity>
                                                        </fetch>", lcid);
            this._packageLog.Log(string.Format("Retrieving Portal language for LCID {0} from CDS", lcid));
            return this._crmServiceClient.RetrieveMultiple(new FetchExpression(portalLanguageFetchXml)).Entities.FirstOrDefault();
        }

        private Entity FetchWebsiteLanguage(Guid webSiteId)
        {
            this._packageLog.Log(string.Format("Retrieving website language for Website with GUID {0} from CDS", webSiteId.ToString()));
            var webSiteLanguageFetchXml = string.Format(@"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                                                  <entity name='adx_websitelanguage'>
                                                                    <attribute name='adx_websitelanguageid' />
                                                                    <attribute name='adx_name' />
                                                                    <attribute name='adx_portallanguageid' />
                                                                    <filter type='and'>
                                                                      <condition attribute='adx_websiteid' operator='eq' value='{0}' />
                                                                    </filter>
                                                                  </entity>
                                                                </fetch>", webSiteId);
            return this._crmServiceClient.RetrieveMultiple(new FetchExpression(webSiteLanguageFetchXml)).Entities.FirstOrDefault();
        }
    }
}
