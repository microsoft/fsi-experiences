import {
    customerFHAttributes,
    financialHoldingAttributes,
    fhAccountAttributes,
    fhCreditAttributes,
    fhInvestmentAttributes,
    fhLoanAttributes,
    fhSavingAttributes,
    fiOverdraftAttributes,
    fiCardAttributes,
    fiDebitAttributes,
    fiStandingAttributes,
} from './FH.consts';
import { fhOwnerRoles, FH_NAME_TO_CATEGORY_MAP } from '../constants/FHValueMaps';
import { FH_INSTRUMENT_NAME_TO_TYPE } from '../constants/FHValueMaps';

export const attributeToXml = (attributes: string[]): string => {
    return attributes.map(attr => `<attribute name="${attr}" />`).join();
};

export const getFHCustomerFilter = (contactIds: string[]) =>
    contactIds.map(id => `<condition attribute="msfsi_customerid" operator="eq" value="${id}"/>`);

const fhAccountLinkEntity = `
  <link-entity name="msfsi_fh_account" from="msfsi_fh_accountid" to="msfsi_details" link-type="outer" alias="FH_ACCOUNT" >
    ${attributeToXml(fhAccountAttributes)}
  </link-entity>
`;

const fhCreditLineLinkEntity = `
  <link-entity name="msfsi_fh_creditline" from="msfsi_fh_creditlineid" to="msfsi_details" link-type="outer" alias="FH_CREDIT" >
    ${attributeToXml(fhCreditAttributes)}
  </link-entity>
`;

const fhInvestmentLinkEntity = `
  <link-entity name="msfsi_fh_investment" from="msfsi_fh_investmentid" to="msfsi_details" link-type="outer" alias="FH_INVESTMENT" >
    ${attributeToXml(fhInvestmentAttributes)}
  </link-entity>
`;

const fhLoanLinkEntity = `
  <link-entity name="msfsi_fh_loan" from="msfsi_fh_loanid" to="msfsi_details" link-type="outer" alias="FH_LOAN" >
    ${attributeToXml(fhLoanAttributes)}
  </link-entity>
`;

const fhSavingLinkEntity = `
  <link-entity name="msfsi_fh_saving" from="msfsi_fh_savingid" to="msfsi_details" link-type="outer" alias="FH_SAVING" >
    ${attributeToXml(fhSavingAttributes)}
  </link-entity>
`;

const linkEntityQueryByType = {
    [FH_NAME_TO_CATEGORY_MAP.Credit]: fhCreditLineLinkEntity,
    [FH_NAME_TO_CATEGORY_MAP.Loans]: fhLoanLinkEntity,
    [FH_NAME_TO_CATEGORY_MAP.Investments]: fhInvestmentLinkEntity,
    [FH_NAME_TO_CATEGORY_MAP.Saving]: fhSavingLinkEntity,
    [FH_NAME_TO_CATEGORY_MAP.Account]: fhAccountLinkEntity,
};

export const getFHDetailsLinks = () => Object.values(linkEntityQueryByType).join('');
export const getFIDetailsLinks = () => `
  <link-entity name="msfsi_fi_card" from="msfsi_fi_cardid" to="msfsi_details" link-type="outer" alias="FHI_CARD" >
    ${attributeToXml(fiCardAttributes)}
  </link-entity>
  <link-entity name="msfsi_fi_directdebit" from="msfsi_fi_directdebitid" to="msfsi_details" link-type="outer" alias="FHI_DEBIT" >
    ${attributeToXml(fiDebitAttributes)}
  </link-entity>
  <link-entity name="msfsi_fi_overdraft" from="msfsi_fi_overdraftid" to="msfsi_details" link-type="outer" alias="FHI_OVERDRAFT" >
    ${attributeToXml(fiOverdraftAttributes)}
  </link-entity>
  <link-entity name="msfsi_fi_standingorder" from="msfsi_fi_standingorderid" to="msfsi_details" link-type="outer" alias="FHI_STANDING" >
    ${attributeToXml(fiStandingAttributes)}
  </link-entity>
`;

export const getContactFHMainQueryXML = (contactIds: string[], externalFilter = '') => `
<fetch>
  <entity name="msfsi_customerfinancialholding" >
    ${attributeToXml(customerFHAttributes)}
    <filter type="or">
      ${getFHCustomerFilter(contactIds)}
    </filter>
    <filter>
      <condition attribute='statecode' operator='eq' value='0'/>
    </filter>
    <link-entity name="msfsi_financialholding" from="msfsi_financialholdingid" to="msfsi_financialholdingid" alias="FH" >
      ${attributeToXml(financialHoldingAttributes)}
      ${externalFilter}
      ${getFHDetailsLinks()}
    </link-entity>
  </entity>
</fetch>
`;

export const getInstrumentsMainQueryXML = (contactIds: string[]) => `
<fetch>
  <entity name="msfsi_customerfinancialholding" >
    <filter type="or">
      ${getFHCustomerFilter(contactIds)}
    </filter>
    <filter>
      <condition attribute='statecode' operator='eq' value='0'/>
    </filter>
    <link-entity name="msfsi_financialholding" from="msfsi_financialholdingid" to="msfsi_financialholdingid" alias="FH" >
      <link-entity name="msfsi_financialholdinginstrument" from="msfsi_financialholding" to="msfsi_financialholdingid" alias="FHI" >
        <attribute name="msfsi_financialholding" />
        <attribute name="statecode" />
        ${getFIDetailsLinks()}
      </link-entity>
    </link-entity>
  </entity>
</fetch>
`;

export const fhOtherCustomerQuery = (contactId: string) => {
    return [
        '<fetch>',
        "  <entity name='msfsi_customerfinancialholding'>",
        "    <attribute name='msfsi_customerid' />",
        "    <attribute name='msfsi_customeridname' />",
        "    <attribute name='msfsi_financialholdingrole' />",
        "    <attribute name='msfsi_customerfinancialholdingid' />",
        "    <attribute name='msfsi_financialholdingidname' />",
        "    <attribute name='statecode' />",
        "    <filter type='and'>",
        "      <condition attribute='msfsi_customerid' operator='eq' value='",
        contactId,
        "'/>",
        "      <condition attribute='msfsi_financialholdingrole' operator='not-in'>",
        ...fhOwnerRoles.map(r => `<value>${r}</value>`),
        '      </condition>',
        "     <condition attribute='statecode' operator='eq' value='0'/>",
        '    </filter>',
        "    <link-entity name='msfsi_financialholding' from='msfsi_financialholdingid' to='msfsi_financialholdingid' link-type='outer' alias='FH'>",
        "      <attribute name='msfsi_name' />",
        "      <attribute name='msfsi_financialholdingid' />",
        "      <attribute name='msfsi_financialholdingcategory' />",
        "      <link-entity name='msfsi_customerfinancialholding' from='msfsi_financialholdingid' to='msfsi_financialholdingid' link-type='inner' alias='CFH'>",
        "        <attribute name='msfsi_financialholdingrole' />",
        "        <filter type='and'>",
        "          <condition attribute='msfsi_customerid' operator='neq' value='",
        contactId,
        "'/>",
        "         <condition attribute='msfsi_financialholdingrole' operator='in'>",
        ...fhOwnerRoles.map(r => `<value>${r}</value>`),
        '         </condition>',
        '        </filter>',
        "        <link-entity name='contact' from='contactid' to='msfsi_customerid' link-type='outer' alias='Customer'>",
        "          <attribute name='entityimage_url' />",
        "          <attribute name='fullname' />",
        "          <attribute name='contactid' />",
        '        </link-entity>',
        '      </link-entity>',
        '    </link-entity>',
        '  </entity>',
        '</fetch>',
    ].join('');
};

export const fhRelatedCustomersQuery = (fhId: string) => {
    return [
        '<fetch>',
        "  <entity name='msfsi_financialholding'>",
        "    <attribute name='msfsi_financialholdingid' />",
        "    <attribute name='statecode' />",
        "    <filter type='and'>",
        "      <condition attribute='msfsi_financialholdingid' operator='eq' value='",
        fhId,
        "'/>",
        "<condition attribute='statecode' operator='eq' value='0'/>",
        '    </filter>',
        "    <link-entity name='msfsi_customerfinancialholding' from='msfsi_financialholdingid' to='msfsi_financialholdingid' link-type='outer' alias='CFH'>",
        "      <attribute name='msfsi_customerid' />",
        "      <attribute name='msfsi_financialholdingrole' />",
        "      <link-entity name='contact' from='contactid' to='msfsi_customerid' link-type='outer' alias='Customer'>",
        "        <attribute name='fullname' />",
        "        <attribute name='entityimage_url' />",
        "        <attribute name='entityimage' />",
        '      </link-entity>',
        '    </link-entity>',
        '  </entity>',
        '</fetch>',
    ].join('');
};

export const fhCardInstrumentQuery = (contactId: string) => {
    return `
    <fetch>
      <entity name="msfsi_customerfinancialholding" >
        ${attributeToXml(customerFHAttributes)}
        <filter type="and" >
        <condition attribute="msfsi_customerid" operator="eq" value="${contactId}" />
        <condition attribute='statecode' operator='eq' value='0'/>
        <condition entityname="FHI_CARD" attribute="msfsi_financialinstrumenttype" operator="eq" value="${FH_INSTRUMENT_NAME_TO_TYPE.card}" />
          <filter type="or" >
            <condition attribute='msfsi_financialholdingrole' operator='in'>
              ${fhOwnerRoles.map(r => `<value>${r}</value>`)}
            </condition>
            <condition entityname="FHI_CARD" attribute="msfsi_cardholder" operator="eq" value="${contactId}" />
          </filter>
        </filter>
        <link-entity name="msfsi_financialholding" from="msfsi_financialholdingid" to="msfsi_financialholdingid" alias="FH" >
          ${attributeToXml(financialHoldingAttributes)}  
          <link-entity name="msfsi_fh_creditline" from="msfsi_fh_creditlineid" to="msfsi_details" link-type="outer" alias="FH_CREDIT" >
            ${attributeToXml(fhCreditAttributes)}
          </link-entity>
          <link-entity name="msfsi_financialholdinginstrument" from="msfsi_financialholding" to="msfsi_financialholdingid" alias="FHI" >
            <attribute name="statecode" />
            <link-entity name="msfsi_fi_card" from="msfsi_fi_cardid" to="msfsi_details" link-type="outer" alias="FHI_CARD" >
              ${attributeToXml(fiCardAttributes)}
            </link-entity>
          </link-entity>
        </link-entity>
      </entity>
    </fetch>
    `;
};

export const fetchFHByIdQuery = ({ fhId, fhCategory }: { fhId: string; fhCategory?: number }): string => {
    const linkEntityString = linkEntityQueryByType[fhCategory || ''] || '';

    return `
  <fetch>
    <entity name="msfsi_financialholding" >
    <attribute name="msfsi_financialholdingcode" alias="FH.msfsi_financialholdingcode" />
    <attribute name="msfsi_financialholdingcategory" alias="FH.msfsi_financialholdingcategory" />
    <attribute name="msfsi_name" alias="FH.msfsi_name" />
    <attribute name="msfsi_description" alias="FH.msfsi_description" />
    <attribute name="msfsi_financialholdingid" alias="FH.msfsi_financialholdingid" />
    <attribute name="statecode" alias="FH.statecode" />
    <filter>
      <condition attribute="msfsi_financialholdingid" operator="eq" value="${fhId}" />
    </filter>
      ${linkEntityString}
    </entity>
  </fetch>
  `;
};

export const fetchFinancialProductsByFHId = ({ fhId }: { fhId: string }) => `
<fetch>
  <entity name="msfsi_financialholdinginstrument">
    <filter type="and">
      <condition attribute="msfsi_financialholding" operator="eq" value="${fhId}"/>
      <condition attribute="statecode" operator="eq" value="0"/>
    </filter>
    <link-entity name="msfsi_fi_position" from="msfsi_fi_positionid" to="msfsi_details" alias="FIP">
      <attribute name="msfsi_name" />
      <attribute name="msfsi_currentvalue" />
      <attribute name="statecode" />
    </link-entity>
    <link-entity name="msfsi_financialmarketproduct" from="msfsi_financialmarketproductid" to="msfsi_product" alias="FMP">
      <attribute name="msfsi_financialmarketproducttype" />
      <attribute name="statecode" />
    </link-entity>
  </entity>
</fetch>
`;
