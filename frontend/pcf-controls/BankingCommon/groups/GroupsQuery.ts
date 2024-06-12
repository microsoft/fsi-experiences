import { fhOwnerRoles } from '@fsi/banking/constants/FHValueMaps';
import { customerFHAttributes, financialHoldingAttributes } from '@fsi/banking/constants/FH.consts';
import { attributeToXml, getFHDetailsLinks, getFIDetailsLinks } from '@fsi/banking/constants/FHQuery';

export const getFetchFHByGroupXml = (groupId: string) =>
    encodeURIComponent(
        [
            `<fetch>`,
            `<entity name="msfsi_groupfinancialholding">`,
            `<attribute name="msfsi_groupfinancialholdingid" alias="GFH.msfsi_groupfinancialholdingid" />`,
            `<attribute name="statecode" />`,
            `<filter type='and'>`,
            `<condition attribute="msfsi_group" operator="eq" value="${groupId}"/>`,
            `<condition attribute='statecode' operator='eq' value='0'/>`,
            `</filter>`,
            `<link-entity name="msfsi_financialholding" from="msfsi_financialholdingid" to="msfsi_financialholding" alias="FH">`,
            attributeToXml(financialHoldingAttributes),
            getFHDetailsLinks(),
            `<link-entity name="msfsi_customerfinancialholding" from="msfsi_financialholdingid" to="msfsi_financialholdingid" alias="CFH" link-type="outer">`,
            attributeToXml(customerFHAttributes),
            `<filter>`,
            "<condition attribute='msfsi_financialholdingrole' operator='in'>",
            ...fhOwnerRoles.map(r => `<value>${r}</value>`),
            '</condition>',
            `</filter>`,
            `</link-entity>`,
            `</link-entity>`,
            `</entity>`,
            `</fetch>`,
        ].join('')
    );

export const geFetchInstrumentByGroupXml = (groupId: string) =>
    encodeURIComponent(
        [
            `<fetch>`,
            `<entity name="msfsi_groupfinancialholding">`,
            `<attribute name="msfsi_groupfinancialholdingid" alias="msfsi_groupfinancialholdingid"/>`,
            `<attribute name="statecode"/>`,
            `<filter type='and'>`,
            `<condition attribute="msfsi_group" operator="eq" value="${groupId}"/>`,
            `<condition attribute='statecode' operator='eq' value='0'/>`,
            `</filter>`,
            `<link-entity name="msfsi_financialholding" from="msfsi_financialholdingid" to="msfsi_financialholding" alias="FH">`,
            `<link-entity name="msfsi_financialholdinginstrument" from="msfsi_financialholding" to="msfsi_financialholdingid" alias="FHI" >`,
            `<attribute name="msfsi_financialholding" />`,
            getFIDetailsLinks(),
            `</link-entity>`,
            `</link-entity>`,
            `</entity>`,
            `</fetch>`,
        ].join('')
    );

export const getFetchGroupMemberXml = (groupId: string) =>
    encodeURIComponent(
        [
            `<fetch top="50">`,
            `<entity name="msfsi_groupmember">`,
            `<filter>`,
            `<condition attribute="msfsi_group" operator="eq" value="${groupId}"/>`,
            `</filter>`,
            `<attribute name="msfsi_groupmemberid"/>`,
            `<attribute name="msfsi_role"/>`,
            `<attribute name="msfsi_isprimarygroup"/>`,
            `<link-entity name="contact" from="contactid" to="msfsi_member" alias="C">`,
            `<attribute name="contactid"/>`,
            `<attribute name="address1_composite"/>`,
            `<attribute name="fullname"/>`,
            `<attribute name="annualincome"/>`,
            `<attribute name="entityimage_url"/>`,
            `</link-entity>`,
            `</entity>`,
            `</fetch>`,
        ].join('')
    );
