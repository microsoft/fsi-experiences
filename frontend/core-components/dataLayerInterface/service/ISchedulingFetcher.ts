import { ILocation, IMeetingType, ITimeSlotsResponse, ITimeSlotResource, ITopic, IBooking } from '../entity/Scheduling';

export interface ISchedulingFetcher {
    fetchTopics: () => Promise<ITopic[]>;
    fetchMeetingTypes: (subjectId?: string) => Promise<IMeetingType[]>;
    fetchLocations: (meetingTypeId: string) => Promise<ILocation[]>;
    fetchTimeSlots: (meetingTypeId: string, branchId: string, startTime: Date, endTime: Date) => Promise<ITimeSlotsResponse>;
    createBooking: (
        startTime: Date,
        endTime: Date,
        requirementGroupId: string,
        resourceAssignments: ITimeSlotResource[],
        isOnlineMeeting?: boolean
    ) => Promise<IBooking[]>;
}
