import { ITopic } from './ITopic';

export interface IMeetingType extends ITopic {
    meetingSubjectIds: string[];
}
