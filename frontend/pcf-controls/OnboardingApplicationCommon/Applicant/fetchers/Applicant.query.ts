import { PartyContractMetadata } from '../../FinancialCategory/FinancialCategoryFetcher.const';

export const getApplicationMetadata = (partyContractId: string) =>
    `<fetch>
    <entity name="${PartyContractMetadata.entity}" >
        <attribute name="msfsi_contractpart" alias="applicationId" />
        <attribute name="msfsi_name" alias="applicantName" />
        <attribute name="statecode" alias="partyStatus" />
        <filter>
            <condition entityname="msfsi_relatedpartycontract" attribute="msfsi_relatedpartycontractid" operator="eq" value="${partyContractId}" />
        </filter>
        <link-entity name="msfsi_application" from="msfsi_applicationid" to="msfsi_contractpart" alias="application" >
            <attribute name="msfsi_businessscenario" alias="type" />
            <attribute name="statecode" alias="status" />
            <attribute name="statuscode" alias="statusReason" />
        </link-entity>
    </entity>
    </fetch>`;
