import { TaskStatus, TASK_TYPE } from '../../constants/Fields.const';
import { TaskNavigationTypes } from '../../constants/TaskNavigationTypes.const';
import { ITask, ITaskDefinition, ITaskNavigation, ITasksGroupObject } from '../ITask';
import { ASSOCIATION_TYPE, CanceledGroupOrder } from '../../constants/OnboardingApplicationTasks.const';

export const mockBPFName = 'mock_bpf';
export const mockBPFStage = '1';
export const mockStageName = '1';

export const mockGroups = [
    { name: 'Application Info', order: 1 },
    { name: 'Canceled tasks', order: CanceledGroupOrder },
    { name: 'Parties info', order: 2 },
];

export const mockEmptyTasks = [];

export const openTabNavigation: ITaskNavigation = {
    type: TaskNavigationTypes.OpenATab,
    details: 'tab_name',
};
export const reviewFormNavigation: ITaskNavigation = {
    type: TaskNavigationTypes.ReviewAForm,
    taskForm: { formId: 'a', entityName: 'a' },
};

const taskDefinition_Group0_Application_ReviewForm_NoStage: ITaskDefinition = {
    id: '1',
    name: 'Verify Application',
    applicationName: '1',
    group: mockGroups[0],
    associationType: ASSOCIATION_TYPE.Application,
    taskNavigation: { ...reviewFormNavigation },
    taskType: TASK_TYPE.Verification,
};

const taskDefinition_Group1_Primary_OpenTab_Stage1: ITaskDefinition = {
    id: '2',
    name: 'Verify personal details',
    applicationName: '2',
    group: mockGroups[2],
    associationType: ASSOCIATION_TYPE.Primary,
    processStage: '1',
    taskNavigation: { ...openTabNavigation },
    taskType: TASK_TYPE.Verification,
};

const taskDefinition_GroupCanceled_Role_NoNav_Stage1: ITaskDefinition = {
    id: '3',
    name: 'Verify personal details',
    applicationName: '3',
    group: mockGroups[1],
    associationType: ASSOCIATION_TYPE.Role,
    processStage: '1',
    taskType: TASK_TYPE.Verification,
};

const taskDefinition_Group1_Application_NoNav_Stage2: ITaskDefinition = {
    id: '4',
    name: 'Verify personal details',
    applicationName: '4',
    group: mockGroups[1],
    associationType: ASSOCIATION_TYPE.Application,
    processStage: '2',
    taskType: TASK_TYPE.Verification,
};

const emptyComment = {
    comment: undefined,
    commentModifiedOn: undefined,
    commentModifiedBy: undefined,
    updateComment: () => Promise.resolve(),
};

const comment = {
    comment:
        'Tried to reach him several times, Customer is in a long vacation till May 2023. Try again in May , And ask for another optional Co-signers',
    commentModifiedBy: 'Hayden Reyes',
    commentModifiedOn: new Date('2022-11-11'),
    updateComment: () => Promise.resolve(),
};

const task_Pending_Group0_Application_ReviewForm_NoStage: ITask = {
    taskDefinition: { ...taskDefinition_Group0_Application_ReviewForm_NoStage },
    id: '0',
    modifiedBy: 'Mona Cane',
    status: TaskStatus.Pending,
    updateStatus: () => Promise.resolve(),
    ...comment,
};

export const task_Canceled_GroupCanceled_Role_NoNav_Stage1: ITask = {
    taskDefinition: { ...taskDefinition_GroupCanceled_Role_NoNav_Stage1 },
    relatedParty: {
        id: '1',
        name: 'Mona Cane',
        role: 'Owner',
        isPrimary: false,
    },
    id: '1',
    modifiedBy: 'Mona Cane',
    status: TaskStatus.Canceled,
    updateStatus: () => Promise.resolve(),
    ...emptyComment,
};

export const task_Done_Group0_Application_ReviewForm_NoStage: ITask = {
    taskDefinition: { ...taskDefinition_Group0_Application_ReviewForm_NoStage },
    id: '2',
    modifiedBy: 'Mona Cane',
    status: TaskStatus.Done,
    updateStatus: () => Promise.resolve(),
    ...emptyComment,
};

export const task_Done_Group1_Primary_OpenTab_Stage1: ITask = {
    taskDefinition: { ...taskDefinition_Group1_Primary_OpenTab_Stage1 },
    relatedParty: {
        id: '1',
        name: 'Mona Cane',
        isPrimary: true,
    },
    id: '3',
    modifiedBy: 'Mona Cane',
    status: TaskStatus.Done,
    updateStatus: () => Promise.resolve(),
    ...emptyComment,
};

const task_Pending_Group1_Primary_OpenTab_Stage1: ITask = {
    taskDefinition: { ...taskDefinition_Group1_Primary_OpenTab_Stage1 },
    relatedParty: {
        id: '1',
        name: 'Mona Cane',
        isPrimary: true,
    },
    id: '4',
    modifiedBy: 'Mona Cane',
    status: TaskStatus.Pending,
    updateStatus: () => Promise.resolve(),
    ...emptyComment,
};

const task_Pending_Group1_Application_NoNav_Stage2: ITask = {
    taskDefinition: { ...taskDefinition_Group1_Application_NoNav_Stage2 },
    id: '4',
    modifiedBy: 'Mona Cane',
    status: TaskStatus.Pending,
    updateStatus: () => Promise.resolve(),
    ...emptyComment,
};

export const mockTasks: ITask[] = [
    { ...task_Pending_Group0_Application_ReviewForm_NoStage },
    { ...task_Canceled_GroupCanceled_Role_NoNav_Stage1 },
    { ...task_Done_Group0_Application_ReviewForm_NoStage },
    { ...task_Done_Group1_Primary_OpenTab_Stage1 },
    { ...task_Pending_Group1_Primary_OpenTab_Stage1 },
    { ...task_Pending_Group1_Application_NoNav_Stage2 },
];

export const mockTasksWithBPFStage: ITask[] = [
    ...mockTasks.filter(task => !task.taskDefinition.processStage || task.taskDefinition.processStage === mockBPFStage),
];

export const mockHookResultTasks: ITasksGroupObject[] = [
    {
        group: { ...mockGroups[0] },
        tasks: [{ ...task_Pending_Group0_Application_ReviewForm_NoStage }, { ...task_Done_Group0_Application_ReviewForm_NoStage }],
    },
    {
        group: { ...mockGroups[2] },
        tasks: [{ ...task_Done_Group1_Primary_OpenTab_Stage1 }, { ...task_Pending_Group1_Primary_OpenTab_Stage1 }],
    },
    {
        group: { ...mockGroups[1] },
        tasks: [{ ...task_Canceled_GroupCanceled_Role_NoNav_Stage1 }, { ...task_Pending_Group1_Application_NoNav_Stage2 }],
    },
];

export const mockHookResultTasksWithStage1orNoStage: ITasksGroupObject[] = [
    {
        group: { ...mockGroups[0] },
        tasks: [{ ...task_Pending_Group0_Application_ReviewForm_NoStage }, { ...task_Done_Group0_Application_ReviewForm_NoStage }],
    },
    {
        group: { ...mockGroups[2] },
        tasks: [{ ...task_Done_Group1_Primary_OpenTab_Stage1 }, { ...task_Pending_Group1_Primary_OpenTab_Stage1 }],
    },
    {
        group: { ...mockGroups[1] },
        tasks: [{ ...task_Canceled_GroupCanceled_Role_NoNav_Stage1 }],
    },
];

export const mockHookResultCompletedTasks: ITasksGroupObject[] = [
    {
        group: { ...mockGroups[0] },
        tasks: [{ ...task_Done_Group0_Application_ReviewForm_NoStage }],
    },
    {
        group: { ...mockGroups[2] },
        tasks: [{ ...task_Done_Group1_Primary_OpenTab_Stage1 }],
    },
];
