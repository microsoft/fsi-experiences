import { IBooking, ILocation, IMeetingType, ITimeSlotsResponse, ITopic } from '../../entity/Scheduling';
import { mockMeetingTypes, mockTopics, mockLocations, mockTimeSlots, mockBookings } from '../../entity/Scheduling/mocks/Scheduling.mock';
import { ISchedulingFetcher } from '../ISchedulingFetcher';

export class MockSchedulingFetcher implements ISchedulingFetcher {
    async fetchTopics(): Promise<ITopic[]> {
        return mockTopics;
    }

    async fetchMeetingTypes(): Promise<IMeetingType[]> {
        return mockMeetingTypes;
    }

    async fetchLocations(): Promise<ILocation[]> {
        return mockLocations;
    }

    async fetchTimeSlots(): Promise<ITimeSlotsResponse> {
        return mockTimeSlots;
    }
    async createBooking(): Promise<IBooking[]> {
        return mockBookings;
    }
}

export default MockSchedulingFetcher;
