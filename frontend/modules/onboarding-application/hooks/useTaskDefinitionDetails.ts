import { IRelatedParty } from './../interfaces/ITask';
import { isApplicationTask } from '../helpers/isApplicationLevel';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { TASK_TYPE } from '../constants/Fields.const';
import { useRelatedPartyInfo } from './useRelatedPartyInfo';
import { formatWithAssociateName } from '../helpers/formatWithAssociateName';

export interface ITaskDefinitionBasicFields {
    name: string;
    taskType?: string;
    associationType?: number;
    applicationName?: string;
}

export const useTaskDefinitionDetails = (translateStrings: string) => {
    const isVerificationType = type => type === TASK_TYPE.Verification;
    const translate = useTranslation(translateStrings);
    const { getRelatedPartyRole } = useRelatedPartyInfo();

    return ({ taskDefinition, applicant }: { taskDefinition: ITaskDefinitionBasicFields; applicant: IRelatedParty }) => {
        const taskName = isVerificationType(taskDefinition.taskType) ? `${taskDefinition.name} - ${translate('VERIFICATION')}` : taskDefinition.name;

        const isApplication = isApplicationTask(taskDefinition.associationType);
        const applicantRole = applicant && getRelatedPartyRole(applicant);

        const associatedName = isApplication ? `${taskDefinition.applicationName}` : `${applicant?.name} ${applicantRole}`;

        const parentheticalAssociatedName = associatedName.replace(applicantRole, `(${applicantRole})`);

        return {
            taskName,
            associatedName,
            formattedName: formatWithAssociateName(taskName, associatedName),
            parentheticalAssociatedName,
        };
    };
};
