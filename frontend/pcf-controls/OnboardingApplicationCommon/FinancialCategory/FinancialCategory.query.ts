import { OnboardingFinancialTypeEntityName, PartyContractMetadata } from './FinancialCategoryFetcher.const';

export type FinancialCategoryMetadata = {
    alias: string;
    value: string;
    type: string;
    entity: string;
    id: string;
    fetchXML: (applicationId: string) => string;
    connectedContactEntity?: string;
};

export const FinancialCategoriesMetadata: {
    [key: string]: FinancialCategoryMetadata;
} = {
    asset: {
        alias: 'asset',
        value: 'msfsi_value',
        type: 'msfsi_assettype',
        entity: 'msfsi_applicationasset',
        id: 'msfsi_applicationassetid',
        connectedContactEntity: 'msfsi_applicationcontactasset',
        fetchXML: (applicationId: string) => `<fetch>
        <entity name='${PartyContractMetadata.entity}'>
        <attribute name="msfsi_name" />
        <filter>
        <condition attribute='msfsi_contractpart' operator='eq' value='${applicationId}' />
        </filter>
        <attribute name='${PartyContractMetadata.id}' />
        <link-entity name='msfsi_applicationcontactasset' from='msfsi_relatedparty' to='${PartyContractMetadata.id}' link-type='outer'>
        <link-entity name='msfsi_applicationasset' from='msfsi_applicationassetid' to='msfsi_applicationasset' link-type='outer' alias='asset'>
        <attribute name='msfsi_value' alias='value'/>
        <attribute name="msfsi_description" alias="description" />
        <attribute name="msfsi_applicationassetid" alias="id" />
        <attribute name="msfsi_name" alias="name" />
        <attribute name="msfsi_assettype" alias="type" />
        <attribute name='transactioncurrencyid' alias='currencyId'/>
        <order attribute="modifiedon" descending="true" />
        </link-entity>
        </link-entity>
        </entity>
        </fetch>`,
    },
    liability: {
        alias: 'liability',
        value: 'msfsi_balance',
        type: 'msfsi_liabilitytype',
        entity: 'msfsi_applicationliability',
        id: 'msfsi_applicationliabilityid',
        connectedContactEntity: 'msfsi_applicationcontactliability',
        fetchXML: (applicationId: string) => `<fetch>
            <entity name='${PartyContractMetadata.entity}'>
            <attribute name="msfsi_name" />
            <filter>
            <condition attribute='msfsi_contractpart' operator='eq' value='${applicationId}'/>
            </filter>
            <attribute name='${PartyContractMetadata.id}' />
            <link-entity name='msfsi_applicationcontactliability' from='msfsi_relatedparty' to='${PartyContractMetadata.id}' link-type='outer'>
            <link-entity name='msfsi_applicationliability' from='msfsi_applicationliabilityid' to='msfsi_applicationliability' link-type='outer' alias='liability'>
            <attribute name="msfsi_description" alias="description" />
            <attribute name="msfsi_name" alias="name" />
            <attribute name='msfsi_balancedisplayvalue' alias='value' />
            <attribute name="msfsi_applicationliabilityid" alias="id" />
            <attribute name='msfsi_liabilitytype' alias='type' />
            <attribute name='transactioncurrencyid' alias='currencyId' />
            <order attribute="modifiedon" descending="true" />
            </link-entity>
            </link-entity>
            </entity>
            </fetch>`,
    },
    income: {
        alias: 'income',
        value: 'msfsi_incomeamount',
        type: 'msfsi_incometype',
        entity: 'msfsi_applicationincome',
        id: 'msfsi_applicationincomeid',
        fetchXML: (applicationId: string) => `<fetch>
        <entity name="msfsi_relatedpartycontract" >
        <attribute name="msfsi_relatedpartycontractid" />
        <attribute name="msfsi_name" />
        <attribute name="msfsi_contractpart" />
        <link-entity name="msfsi_applicationincome" from="msfsi_relatedparty" to="msfsi_relatedpartycontractid" visible="true" >
        <filter>
        <condition attribute="msfsi_application" operator="eq" value="${applicationId}" />
        </filter>
        <attribute name="transactioncurrencyid" alias="currencyId" />
        <attribute name="msfsi_incometype" alias="type" />
        <attribute name="msfsi_incomeamount" alias="value" />
        <attribute name="msfsi_description" alias="description" />
        <attribute name="msfsi_name" alias="name" />
        <attribute name="msfsi_applicationincomeid" alias="id" />
        <order attribute="modifiedon" descending="true" />
        </link-entity>
        </entity>
        </fetch>`,
    },
    expense: {
        alias: 'expense',
        value: 'msfsi_expenseamount',
        type: 'msfsi_expensetype',
        entity: 'msfsi_applicationexpense',
        id: 'msfsi_applicationexpenseid',
        fetchXML: (applicationId: string) => `<fetch>
        <entity name="msfsi_relatedpartycontract" >
        <attribute name="msfsi_relatedpartycontractid" />
        <attribute name="msfsi_name" />
        <attribute name="msfsi_contractpart" />
        <link-entity name="msfsi_applicationexpense" from="msfsi_relatedparty" to="msfsi_relatedpartycontractid" visible="true" >
        <filter>
        <condition attribute="msfsi_application" operator="eq" value="${applicationId}" />
        </filter>
        <attribute name="transactioncurrencyid" alias="currencyId" />
        <attribute name="msfsi_expensetype" alias="type" />
        <attribute name="msfsi_expenseamount" alias="value" />
        <attribute name="msfsi_description" alias="description" />
        <attribute name="msfsi_name" alias="name" />
        <attribute name="msfsi_applicationexpenseid" alias="id" />
        <order attribute="modifiedon" descending="true" />
        </link-entity>
        </entity>
        </fetch>`,
    },
};

export type FinancialCategory = keyof typeof FinancialCategoriesMetadata;

export const OnboardingFinancialMetadata: {
    alias: string;
    typeB: string;
    entity: string;
    id: string;
    name: string;
    fetchXML: (businessScenario: string, financialCategory: string) => string;
} = {
    alias: 'onboarding financial type',
    typeB: 'msfsi_businessscenario',
    entity: 'msfsi_onboardingfinancialtype',
    id: 'msfsi_onboardingfinancialtypeid',
    name: 'msfsi_name',
    fetchXML: (businessScenario: string, financialCategory: string) => `<fetch>
            <entity name='${OnboardingFinancialTypeEntityName}'>
            <attribute name="msfsi_businessscenario" />
            <attribute name="msfsi_financialcategory" />
            <attribute name="msfsi_name" alias="name" />
            <attribute name="msfsi_onboardingfinancialtypeid" alias="id" />
            <filter>
            <condition attribute="msfsi_businessscenario" operator="eq" value="${businessScenario}" />
            <condition attribute="msfsi_financialcategory" operator="eq" value="${financialCategory}" />
            </filter>
            </entity>
            </fetch>`,
};
