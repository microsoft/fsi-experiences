export interface ITimeSlot {
    startTime: Date;
    endTime: Date;
    resourceAssignments: ITimeSlotResource[];
}

export interface ITimeSlotsResponse {
    requirementGroupId: string;
    timeslots: ITimeSlot[];
}

export interface ITimeSlotResource {
    requirementId: string;
    resourceId: string;
}
