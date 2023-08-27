import { IBooking } from '../IBooking';
import { ILocation } from '../ILocation';
import { ITimeSlotsResponse } from '../ITimeSlot';

export const mockTopics = [
    {
        id: '1',
        name: 'Retail banking',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    },
    {
        id: '2',
        name: 'Savings',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    },
    {
        id: '3',
        name: 'Loans',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    },
];

export const mockMeetingTypes = [
    {
        id: '1',
        name: 'Person loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1', '2', '3'],
    },
    {
        id: '2',
        name: 'Boat loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
    {
        id: '3',
        name: 'Student loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1', '2'],
    },
    {
        id: '4',
        name: 'Mortgage',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
    {
        id: '5',
        name: 'Home equity loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
    {
        id: '6',
        name: 'Credit-builder loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
    {
        id: '7',
        name: 'Auto loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
    {
        id: '8',
        name: 'Payday loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
    {
        id: '9',
        name: 'Something loan',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation.',
        meetingSubjectIds: ['1'],
    },
];

export const mockLocations: ILocation[] = [
    {
        organizationalUnitId: '1',
        branchId: '1',
        branchName: 'Western Seattle Branch',
        branchAddress: '123 Main St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '2',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '2',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '3',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '4',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '5',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '6',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '7',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
    {
        organizationalUnitId: '1',
        branchId: '8',
        branchName: 'Eastern Seattle Branch',
        branchAddress: '123 Park Venue St \n Seattle, WA 19019',
        branchPhoneNumber: '(206) 555-1234',
    },
];

export const mockTimeSlots: ITimeSlotsResponse = {
    requirementGroupId: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
    timeslots: [
        {
            startTime: new Date('2021-05-23T21:38:47.183Z'),
            endTime: new Date('2021-05-23T22:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-23T22:08:47.183Z'),
            endTime: new Date('2021-05-23T22:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-23T22:38:47.183Z'),
            endTime: new Date('2021-05-23T23:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-23T23:08:47.183Z'),
            endTime: new Date('2021-05-23T23:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-23T23:38:47.183Z'),
            endTime: new Date('2021-05-24T00:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T00:08:47.183Z'),
            endTime: new Date('2021-05-24T00:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T00:38:47.183Z'),
            endTime: new Date('2021-05-24T01:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T01:08:47.183Z'),
            endTime: new Date('2021-05-24T01:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T01:38:47.183Z'),
            endTime: new Date('2021-05-24T02:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T02:08:47.183Z'),
            endTime: new Date('2021-05-24T02:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T02:38:47.183Z'),
            endTime: new Date('2021-05-24T03:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T03:08:47.183Z'),
            endTime: new Date('2021-05-24T03:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T03:38:47.183Z'),
            endTime: new Date('2021-05-24T04:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T04:08:47.183Z'),
            endTime: new Date('2021-05-24T04:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T04:38:47.183Z'),
            endTime: new Date('2021-05-24T05:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T05:08:47.183Z'),
            endTime: new Date('2021-05-24T05:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T05:38:47.183Z'),
            endTime: new Date('2021-05-24T06:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T06:08:47.183Z'),
            endTime: new Date('2021-05-24T06:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T06:38:47.183Z'),
            endTime: new Date('2021-05-24T07:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T07:08:47.183Z'),
            endTime: new Date('2021-05-24T07:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T07:38:47.183Z'),
            endTime: new Date('2021-05-24T08:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T08:08:47.183Z'),
            endTime: new Date('2021-05-24T08:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T08:38:47.183Z'),
            endTime: new Date('2021-05-24T09:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T09:08:47.183Z'),
            endTime: new Date('2021-05-24T09:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T09:38:47.183Z'),
            endTime: new Date('2021-05-24T10:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T10:08:47.183Z'),
            endTime: new Date('2021-05-24T10:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T10:38:47.183Z'),
            endTime: new Date('2021-05-24T11:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T11:08:47.183Z'),
            endTime: new Date('2021-05-24T11:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T11:38:47.183Z'),
            endTime: new Date('2021-05-24T12:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T12:08:47.183Z'),
            endTime: new Date('2021-05-24T12:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T12:38:47.183Z'),
            endTime: new Date('2021-05-24T13:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T13:08:47.183Z'),
            endTime: new Date('2021-05-24T13:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T13:38:47.183Z'),
            endTime: new Date('2021-05-24T14:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T14:08:47.183Z'),
            endTime: new Date('2021-05-24T14:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T14:38:47.183Z'),
            endTime: new Date('2021-05-24T15:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T15:08:47.183Z'),
            endTime: new Date('2021-05-24T15:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T15:38:47.183Z'),
            endTime: new Date('2021-05-24T16:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T16:08:47.183Z'),
            endTime: new Date('2021-05-24T16:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T16:38:47.183Z'),
            endTime: new Date('2021-05-24T17:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T17:08:47.183Z'),
            endTime: new Date('2021-05-24T17:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T17:38:47.183Z'),
            endTime: new Date('2021-05-24T18:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T18:08:47.183Z'),
            endTime: new Date('2021-05-24T18:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T18:38:47.183Z'),
            endTime: new Date('2021-05-24T19:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T19:08:47.183Z'),
            endTime: new Date('2021-05-24T19:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T19:38:47.183Z'),
            endTime: new Date('2021-05-24T20:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T20:08:47.183Z'),
            endTime: new Date('2021-05-24T20:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T20:38:47.183Z'),
            endTime: new Date('2021-05-24T21:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T21:08:47.183Z'),
            endTime: new Date('2021-05-24T21:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T21:38:47.183Z'),
            endTime: new Date('2021-05-24T22:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T22:08:47.183Z'),
            endTime: new Date('2021-05-24T22:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T22:38:47.183Z'),
            endTime: new Date('2021-05-24T23:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T23:08:47.183Z'),
            endTime: new Date('2021-05-24T23:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-24T23:38:47.183Z'),
            endTime: new Date('2021-05-25T00:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T00:08:47.183Z'),
            endTime: new Date('2021-05-25T00:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T00:38:47.183Z'),
            endTime: new Date('2021-05-25T01:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T01:08:47.183Z'),
            endTime: new Date('2021-05-25T01:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T01:38:47.183Z'),
            endTime: new Date('2021-05-25T02:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T02:08:47.183Z'),
            endTime: new Date('2021-05-25T02:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T02:38:47.183Z'),
            endTime: new Date('2021-05-25T03:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T03:08:47.183Z'),
            endTime: new Date('2021-05-25T03:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T03:38:47.183Z'),
            endTime: new Date('2021-05-25T04:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T04:08:47.183Z'),
            endTime: new Date('2021-05-25T04:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T04:38:47.183Z'),
            endTime: new Date('2021-05-25T05:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T05:08:47.183Z'),
            endTime: new Date('2021-05-25T05:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T05:38:47.183Z'),
            endTime: new Date('2021-05-25T06:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T06:08:47.183Z'),
            endTime: new Date('2021-05-25T06:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T06:38:47.183Z'),
            endTime: new Date('2021-05-25T07:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T07:08:47.183Z'),
            endTime: new Date('2021-05-25T07:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T07:38:47.183Z'),
            endTime: new Date('2021-05-25T08:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T08:08:47.183Z'),
            endTime: new Date('2021-05-25T08:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T08:38:47.183Z'),
            endTime: new Date('2021-05-25T09:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T09:08:47.183Z'),
            endTime: new Date('2021-05-25T09:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T09:38:47.183Z'),
            endTime: new Date('2021-05-25T10:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T10:08:47.183Z'),
            endTime: new Date('2021-05-25T10:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T10:38:47.183Z'),
            endTime: new Date('2021-05-25T11:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T11:08:47.183Z'),
            endTime: new Date('2021-05-25T11:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T11:38:47.183Z'),
            endTime: new Date('2021-05-25T12:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T12:08:47.183Z'),
            endTime: new Date('2021-05-25T12:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T12:38:47.183Z'),
            endTime: new Date('2021-05-25T13:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T13:08:47.183Z'),
            endTime: new Date('2021-05-25T13:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T13:38:47.183Z'),
            endTime: new Date('2021-05-25T14:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T14:08:47.183Z'),
            endTime: new Date('2021-05-25T14:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T14:38:47.183Z'),
            endTime: new Date('2021-05-25T15:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T15:08:47.183Z'),
            endTime: new Date('2021-05-25T15:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T15:38:47.183Z'),
            endTime: new Date('2021-05-25T16:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T16:08:47.183Z'),
            endTime: new Date('2021-05-25T16:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T16:38:47.183Z'),
            endTime: new Date('2021-05-25T17:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T17:08:47.183Z'),
            endTime: new Date('2021-05-25T17:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T17:38:47.183Z'),
            endTime: new Date('2021-05-25T18:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T18:08:47.183Z'),
            endTime: new Date('2021-05-25T18:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T18:38:47.183Z'),
            endTime: new Date('2021-05-25T19:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T19:08:47.183Z'),
            endTime: new Date('2021-05-25T19:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T19:38:47.183Z'),
            endTime: new Date('2021-05-25T20:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-25T20:08:47.183Z'),
            endTime: new Date('2021-05-25T20:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-26T18:08:47.183Z'),
            endTime: new Date('2021-05-26T18:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-26T18:38:47.183Z'),
            endTime: new Date('2021-05-26T19:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-26T19:08:47.183Z'),
            endTime: new Date('2021-05-26T19:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-26T19:38:47.183Z'),
            endTime: new Date('2021-05-26T20:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-26T20:08:47.183Z'),
            endTime: new Date('2021-05-26T20:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-27T18:08:47.183Z'),
            endTime: new Date('2021-05-27T18:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-27T18:38:47.183Z'),
            endTime: new Date('2021-05-27T19:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-27T19:08:47.183Z'),
            endTime: new Date('2021-05-27T19:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-27T19:38:47.183Z'),
            endTime: new Date('2021-05-27T20:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
        {
            startTime: new Date('2021-05-27T20:08:47.183Z'),
            endTime: new Date('2021-05-27T20:38:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
        },
    ],
};

export const mockBookings: IBooking[] = [
    {
        bookingId: '1213231',
    },
];
