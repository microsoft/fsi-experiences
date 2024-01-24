import { TASK_ALIAS, TASK_DEFINITION_ALIAS } from './PCFOnboardingApplicationTasks.const';
import { TASK_TYPE } from '@fsi/onboarding-application/constants/Fields.const';

export const fetchDetailsInEntity = (entityName: string, recordId: string) =>
    [
        '<fetch>',
        `<entity name="${entityName}">`,
        '<filter>',
        `<condition attribute="${entityName}id" operator="eq" value="${recordId}" />`,
        '</filter>',
        '</entity>',
        '</fetch>',
    ].join('');

export const fetchTaskByTaskDefinitionIdQuery = ({ applicationId, taskDefinitionId, level }) => `
<fetch>
  <entity name="task">
    <attribute name="statuscode" />
    <attribute name="activityid" />
    <attribute name="regardingobjectid" alias="regardingobject" />
    <attribute name="statecode" />
    <link-entity name="msfsi_taskdefinition" from="msfsi_taskdefinitionid" to="msfsi_taskdefinition" alias="${TASK_DEFINITION_ALIAS}">
      <attribute name="msfsi_processstage"/>
      <attribute name="msfsi_name"/>
      <filter>
      ${level ? `<condition attribute="msfsi_associationtype" operator="eq" value="${level}" />` : ''}
      <condition attribute="msfsi_tasktype" operator="eq" value="${TASK_TYPE.Verification}" />
      </filter>
    </link-entity>
    <filter>
      <condition attribute="msfsi_taskdefinition" operator="eq" value="${taskDefinitionId}" />
      <condition attribute="regardingobjectid" operator="eq" value="${applicationId}"/>
    </filter>
  </entity>
</fetch>`;

export const fetchApplicantsAndTasksQuery = ({ applicationId, taskDefinitionId }) => `
<fetch>
  <entity name="msfsi_relatedpartycontract">
    <attribute name="msfsi_relatedpartycontractid" />
    <attribute name="msfsi_name" />
    <attribute name="msfsi_relatedparty_role" />
    <attribute name="msfsi_isprimary" />
    <filter>
      <condition attribute="msfsi_contractpart" operator="eq" value="${applicationId}"/>
    </filter>
    <order attribute="msfsi_isprimary" descending="true" />
    <order attribute="msfsi_name" />
    ${
        taskDefinitionId
            ? `<link-entity name="task" from="msfsi_relatedpartycontract" to="msfsi_relatedpartycontractid" alias="${TASK_ALIAS}">
                <attribute name="regardingobjectid" />
                <attribute name="activityid" />
                <attribute name="statuscode" />
                <attribute name="statecode" />
                <attribute name="subject" />
                <link-entity name="msfsi_taskdefinition" from="msfsi_taskdefinitionid" to="msfsi_taskdefinition" alias="${TASK_DEFINITION_ALIAS}">
                  <attribute name="msfsi_processstage"/>
                  <attribute name="msfsi_tasktype" />
                  <attribute name="msfsi_name" />
                </link-entity>
                <filter>
                  <condition attribute="msfsi_taskdefinition" operator="eq" value="${taskDefinitionId}" />   
                </filter>
              </link-entity>`
            : ''
    }
  </entity>
</fetch>`;
