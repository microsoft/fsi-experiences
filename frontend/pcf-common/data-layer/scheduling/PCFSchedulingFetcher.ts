import { CommonPCFContext } from '../../common-props';
import { PCFBaseExecuteWebAPI } from '../base/PCFBaseExecuteWebAPI';
import {
    SCHEDULING_LOCATIONS_CUSTOM_ACTION,
    SCHEDULING_MEETING_TYPES_CUSTOM_ACTION,
    SCHEDULING_MEETING_SUBJECTS_CUSTOM_ACTION,
    SCHEDULING_TIMESLOTS_CUSTOM_ACTION,
    SCHEDULING_CREATE_BOOKING_CUSTOM_ACTION,
} from './PCFSchedulingConstants';
import { ISchedulingFetcher } from '@fsi/core-components/dist/dataLayerInterface/service/ISchedulingFetcher';
import {
    IBooking,
    ILocation,
    IMeetingType,
    ITimeSlotsResponse,
    ITimeSlotResource,
    ITopic,
} from '@fsi/core-components/dist/dataLayerInterface/entity/Scheduling';
import { IExecuteRequest } from '../../data-layer/base/PCFBaseExecuteTypes';

export interface IExecuteMeetingTypeRequest extends IExecuteRequest {
    meetingSubjectId?: string;
}

export interface IExecuteLocationRequest extends IExecuteRequest {
    meetingTypeId: string;
}

export interface IExecuteTimeSlotRequest extends IExecuteRequest {
    meetingTypeId: string;
    branchId: string;
    startTime: Date;
    endTime: Date;
}

export interface IExecuteCreateBookingRequest extends IExecuteRequest {
    startTime: Date;
    endTime: Date;
    requirementGroupId: string;
    resourceAssignments: string;
    isOnlineMeeting?: boolean;
}

export class PCFSchedulingFetcher extends PCFBaseExecuteWebAPI implements ISchedulingFetcher {
    public constructor(context: CommonPCFContext) {
        super(context);
    }

    public async fetchTopics(): Promise<ITopic[]> {
        const result = await this.execute({
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: {},
                    operationType: 0,
                    operationName: SCHEDULING_MEETING_SUBJECTS_CUSTOM_ACTION,
                };
            },
        });

        return result.meetingSubjects ? JSON.parse(result.meetingSubjects) : [];
    }

    public async fetchMeetingTypes(meetingSubjectId?: string): Promise<IMeetingType[]> {
        const requestParams: IExecuteMeetingTypeRequest = {
            meetingSubjectId,
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: meetingSubjectId
                        ? {
                              meetingSubjectId: {
                                  typeName: 'Edm.String',
                                  structuralProperty: 1,
                              },
                          }
                        : {},
                    operationType: 0,
                    operationName: SCHEDULING_MEETING_TYPES_CUSTOM_ACTION,
                };
            },
        };

        const result = await this.execute(requestParams);

        return result.meetingTypes ? JSON.parse(result.meetingTypes) : [];
    }

    public async fetchLocations(meetingTypeId: string): Promise<ILocation[]> {
        if (!meetingTypeId) return [];

        const requestParams: IExecuteLocationRequest = {
            meetingTypeId,
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        meetingTypeId: {
                            typeName: 'Edm.String',
                            structuralProperty: 1,
                        },
                    },
                    operationType: 0,
                    operationName: SCHEDULING_LOCATIONS_CUSTOM_ACTION,
                };
            },
        };

        const result = await this.execute(requestParams);

        return result.locations ? JSON.parse(result.locations) : [];
    }

    public async fetchTimeSlots(meetingTypeId: string, branchId: string, startTime: Date, endTime: Date): Promise<ITimeSlotsResponse> {
        const defaultResponse: ITimeSlotsResponse = { requirementGroupId: '', timeslots: [] };

        if (!meetingTypeId || !branchId) return defaultResponse;

        const requestParams: IExecuteTimeSlotRequest = {
            meetingTypeId,
            branchId,
            startTime,
            endTime,
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        meetingTypeId: {
                            typeName: 'Edm.String',
                            structuralProperty: 1,
                        },
                        branchId: {
                            typeName: 'Edm.String',
                            structuralProperty: 1,
                        },
                        startTime: {
                            typeName: 'Edm.DateTimeOffset',
                            structuralProperty: 1,
                        },
                        endTime: {
                            typeName: 'Edm.DateTimeOffset',
                            structuralProperty: 1,
                        },
                    },
                    operationType: 0,
                    operationName: SCHEDULING_TIMESLOTS_CUSTOM_ACTION,
                };
            },
        };

        const result = await this.execute(requestParams);

        if (!result.timeSlots) return defaultResponse;

        const response = JSON.parse(result.timeSlots);

        const timeslots = response.timeslots.map(slot => ({ ...slot, endTime: new Date(slot.endTime), startTime: new Date(slot.startTime) }));

        return {
            requirementGroupId: response.requirementGroupId,
            timeslots,
        };
    }

    public async createBooking(
        startTime: Date,
        endTime: Date,
        requirementGroupId: string,
        resourceAssignments: ITimeSlotResource[],
        isOnlineMeeting?: boolean
    ): Promise<IBooking[]> {
        const requestParams: IExecuteCreateBookingRequest = {
            startTime,
            endTime,
            requirementGroupId,
            resourceAssignments: JSON.stringify(resourceAssignments),
            // isOnlineMeeting,
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        startTime: {
                            typeName: 'Edm.DateTimeOffset',
                            structuralProperty: 1,
                        },
                        endTime: {
                            typeName: 'Edm.DateTimeOffset',
                            structuralProperty: 1,
                        },
                        requirementGroupId: {
                            typeName: 'Edm.String',
                            structuralProperty: 1,
                        },
                        resourceAssignments: {
                            typeName: 'Edm.String',
                            structuralProperty: 1,
                        },
                        // isOnlineMeeting: {
                        //     "typeName": "Edm.Boolean",
                        //     "structuralProperty": 1
                        // }
                    },
                    operationType: 0,
                    operationName: SCHEDULING_CREATE_BOOKING_CUSTOM_ACTION,
                };
            },
        };

        const result = await this.execute(requestParams);

        return result.bookings ? JSON.parse(result.bookings) : [];
    }
}
