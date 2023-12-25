export const fetchBusinessScenarioQuery = appId => `
<fetch>
  <entity name="appsetting">
    <attribute name="value" />
    <link-entity name="settingdefinition" from="settingdefinitionid" to="settingdefinitionid">
      <filter>
        <condition attribute="uniquename" operator="eq" value="msfsi_businessscenario" />
      </filter>
    </link-entity>
    <link-entity name="appmodule" from="appmoduleid" to="parentappmoduleid">
      <filter>
        <condition attribute="appmoduleid" operator="eq" value="${appId}" />
      </filter>
    </link-entity>
  </entity>
</fetch>`;

export const fetchBPFNameQuery = businessScenario => `
<fetch>
  <entity name="workflow">
    <attribute name="uniquename" />
    <link-entity name="msfsi_onboardingscenariodefinition" from="msfsi_businessprocessflow" to="workflowid">
      <filter>
        <condition attribute="msfsi_businessscenario" operator="eq" value="${businessScenario}" />
      </filter>
    </link-entity>
  </entity>
</fetch>`;

export const fetchActiveBPFStageQuery = (bpfName, appId) => `
<fetch>
  <entity name="${bpfName}">
    <attribute name="activestageid" alias="activestage"/>
    <filter>
      <condition attribute="bpf_msfsi_applicationid" operator="eq" value="${appId}" />
    </filter>
  </entity>
</fetch>`;

export const fetchActiveStageNameQuery = bpfStage => `
<fetch>
  <entity name="processstage">
    <attribute name="stagename" />
    <filter>
      <condition attribute="processstageid" operator="eq" value="${bpfStage}" />
    </filter>
  </entity>
</fetch>`;

export const getContractsCount = (applicationId: string) =>
    `<fetch>
                <entity name="msfsi_application" >
                    <filter>
                        <condition attribute="msfsi_applicationid" operator="eq" value="${applicationId}" />
                    </filter>
                    <link-entity name="msfsi_relatedpartycontract" from="msfsi_contractpart" to="msfsi_applicationid">
                        <attribute name="msfsi_relatedpartycontractid" alias="id" />
                    </link-entity>
                </entity>
            </fetch>`;
