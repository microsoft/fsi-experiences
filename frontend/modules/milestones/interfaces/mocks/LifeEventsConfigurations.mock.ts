import { ILifeEventConfigurations } from '../Configuration';

export default {
    birthdayCategoryCode: 104800000,
    birthdayTypeCode: 104800000,
    educationCategoryCode: 104800003,
    otherCategoryCode: 104800009,
    otherTypeCode: 104800022,
    newIndicationDisplayInDays: 8,
    focusIndicationDisplayInDays: 14,
    categoryConfig: [
        {
            categoryCode: 104800000,
            icon: 'Balloons',
            displayOrder: 1,
            name: 'Birthday',
            types: [
                {
                    typeCode: 104800000,
                    typeName: 'Birth date',
                },
            ],
        },
        {
            categoryCode: 104800001,
            icon: 'Heart',
            displayOrder: 2,
            name: 'Marital Status',
            types: [
                {
                    typeCode: 104800001,
                    typeName: 'Marriage',
                },
                {
                    typeCode: 104800002,
                    typeName: 'Divorce',
                },
                {
                    typeCode: 104800003,
                    typeName: 'Widowhood',
                },
            ],
        },
        {
            categoryCode: 104800002,
            icon: 'Family',
            displayOrder: 3,
            name: 'Family',
            types: [
                {
                    typeCode: 104800004,
                    typeName: 'Child',
                },
                {
                    typeCode: 104800005,
                    typeName: 'Grandchild',
                },
            ],
        },
        {
            categoryCode: 104800003,
            icon: 'Education',
            displayOrder: 4,
            name: 'Education',
            types: [
                {
                    typeCode: 104800007,
                    typeName: 'High school',
                    displayOrder: 2,
                },
                {
                    typeCode: 104800009,
                    typeName: 'Skills training',
                    displayOrder: 5,
                },
                {
                    typeCode: 104800010,
                    typeName: 'Associate Degree',
                    displayOrder: 6,
                },
                {
                    typeCode: 104800025,
                    typeName: 'Doctorate degree',
                    displayOrder: 7,
                },
                {
                    typeCode: 104800024,
                    typeName: 'Master’s degree',
                    displayOrder: 4,
                },
                {
                    typeCode: 104800023,
                    typeName: 'Bachelor’s degree',
                    displayOrder: 3,
                },
            ],
        },
        {
            categoryCode: 104800004,
            icon: 'Work',
            displayOrder: 5,
            name: 'Employment',
            types: [
                {
                    typeCode: 104800011,
                    typeName: 'Job Started',
                    displayOrder: 20,
                },
                {
                    typeCode: 104800012,
                    typeName: 'Job Ended',
                    displayOrder: 21,
                },
                {
                    typeCode: 104800013,
                    typeName: 'Business Started',
                    displayOrder: 22,
                },
                {
                    typeCode: 104800014,
                    typeName: 'Business Closed',
                    displayOrder: 23,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Retirement',
                    displayOrder: 24,
                },
            ],
        },
        {
            categoryCode: 104800005,
            icon: 'CityNext2',
            displayOrder: 6,
            name: 'Residence',
            types: [
                {
                    typeCode: 104800015,
                    typeName: 'Purchase',
                    displayOrder: 8,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Sale',
                    displayOrder: 9,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Renovation',
                    displayOrder: 10,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Rent',
                    displayOrder: 11,
                },
            ],
        },
        {
            categoryCode: 104800006,
            icon: 'Car',
            displayOrder: 7,
            name: 'Vehicle',
            types: [
                {
                    typeCode: 104800015,
                    typeName: 'Purchase',
                    displayOrder: 8,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Sale',
                },
            ],
        },
        {
            categoryCode: 104800008,
            icon: 'Hospital',
            displayOrder: 8,
            name: 'Health',
            types: [
                {
                    typeCode: 104800020,
                    typeName: 'Serious illness',
                    displayOrder: 12,
                },
                {
                    typeCode: 104800021,
                    typeName: 'Procedure',
                    displayOrder: 13,
                },
                {
                    typeCode: 104800019,
                    typeName: 'Loss of loved one',
                    displayOrder: 14,
                },
                {
                    typeCode: 104800021,
                    typeName: 'Hospital/facility stay',
                    displayOrder: 15,
                },
            ],
        },
        {
            categoryCode: 104800040,
            icon: 'Vacation',
            displayOrder: 9,
            name: 'Leisure',
            types: [
                {
                    typeCode: 104800050,
                    typeName: 'Celebration',
                    displayOrder: 16,
                },
                {
                    typeCode: 104800051,
                    typeName: 'Vacation',
                    displayOrder: 17,
                },
                {
                    typeCode: 104800052,
                    typeName: 'Gift',
                    displayOrder: 19,
                },
                {
                    typeCode: 104800053,
                    typeName: 'Major purchase',
                    displayOrder: 18,
                },
            ],
        },
        {
            categoryCode: 104800009,
            icon: 'CubeShape',
            displayOrder: 10,
            name: 'Other',
            types: [
                {
                    typeCode: 104800022,
                    typeName: 'Other',
                },
            ],
        },
    ],
    categoriesMap: {
        '104800000': {
            categoryCode: 104800000,
            icon: 'Balloons',
            displayOrder: 1,
            name: 'Birthday',
            types: [
                {
                    typeCode: 104800000,
                    typeName: 'Birth date',
                },
            ],
        },
        '104800001': {
            categoryCode: 104800001,
            icon: 'Heart',
            displayOrder: 2,
            name: 'Marital Status',
            types: [
                {
                    typeCode: 104800001,
                    typeName: 'Marriage',
                },
                {
                    typeCode: 104800002,
                    typeName: 'Divorce',
                },
                {
                    typeCode: 104800003,
                    typeName: 'Widowhood',
                },
            ],
        },
        '104800002': {
            categoryCode: 104800002,
            icon: 'Family',
            displayOrder: 3,
            name: 'Family',
            types: [
                {
                    typeCode: 104800004,
                    typeName: 'Child',
                },
                {
                    typeCode: 104800005,
                    typeName: 'Grandchild',
                },
            ],
        },
        '104800003': {
            categoryCode: 104800003,
            icon: 'Education',
            displayOrder: 4,
            name: 'Education',
            types: [
                {
                    typeCode: 104800007,
                    typeName: 'High school',
                    displayOrder: 2,
                },
                {
                    typeCode: 104800009,
                    typeName: 'Skills training',
                    displayOrder: 5,
                },
                {
                    typeCode: 104800010,
                    typeName: 'Associate Degree',
                    displayOrder: 6,
                },
                {
                    typeCode: 104800025,
                    typeName: 'Doctorate degree',
                    displayOrder: 7,
                },
                {
                    typeCode: 104800024,
                    typeName: 'Master’s degree',
                    displayOrder: 4,
                },
                {
                    typeCode: 104800023,
                    typeName: 'Bachelor’s degree',
                    displayOrder: 3,
                },
            ],
        },
        '104800004': {
            categoryCode: 104800004,
            icon: 'Work',
            displayOrder: 5,
            name: 'Employment',
            types: [
                {
                    typeCode: 104800011,
                    typeName: 'Job Started',
                    displayOrder: 20,
                },
                {
                    typeCode: 104800012,
                    typeName: 'Job Ended',
                    displayOrder: 21,
                },
                {
                    typeCode: 104800013,
                    typeName: 'Business Started',
                },
                {
                    typeCode: 104800014,
                    typeName: 'Business Closed',
                    displayOrder: 23,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Retirement',
                    displayOrder: 24,
                },
            ],
        },
        '104800005': {
            categoryCode: 104800005,
            icon: 'CityNext2',
            displayOrder: 6,
            name: 'Residence',
            types: [
                {
                    typeCode: 104800015,
                    typeName: 'Purchase',
                    displayOrder: 8,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Sale',
                },
                {
                    typeCode: 104800016,
                    typeName: 'Renovation',
                    displayOrder: 10,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Rent',
                    displayOrder: 11,
                },
            ],
        },
        '104800006': {
            categoryCode: 104800006,
            icon: 'Car',
            displayOrder: 7,
            name: 'Vehicle',
            types: [
                {
                    typeCode: 104800015,
                    typeName: 'Purchase',
                    displayOrder: 8,
                },
                {
                    typeCode: 104800016,
                    typeName: 'Sale',
                    displayOrder: 9,
                },
            ],
        },
        '104800008': {
            categoryCode: 104800008,
            icon: 'Hospital',
            displayOrder: 8,
            name: 'Health',
            types: [
                {
                    typeCode: 104800019,
                    typeName: 'Loss of loved one',
                    displayOrder: 14,
                },
                {
                    typeCode: 104800020,
                    typeName: 'Serious illness',
                    displayOrder: 12,
                },
                {
                    typeCode: 104800021,
                    typeName: 'Procedure',
                    displayOrder: 13,
                },
                {
                    typeCode: 104800021,
                    typeName: 'Hospital/facility stay',
                    displayOrder: 15,
                },
            ],
        },
        '104800040': {
            categoryCode: 104800040,
            icon: 'Vacation',
            displayOrder: 9,
            name: 'Leisure',
            types: [
                {
                    typeCode: 104800050,
                    typeName: 'Celebration',
                    displayOrder: 16,
                },
                {
                    typeCode: 104800053,
                    typeName: 'Major purchase',
                    displayOrder: 18,
                },
                {
                    typeCode: 104800051,
                    typeName: 'Vacation',
                    displayOrder: 17,
                },
                {
                    typeCode: 104800052,
                    typeName: 'Gift',
                    displayOrder: 19,
                },
            ],
        },
        '104800009': {
            categoryCode: 104800009,
            icon: 'CubeShape',
            displayOrder: 10,
            name: 'Other',
            types: [
                {
                    typeCode: 104800022,
                    typeName: 'Other',
                },
            ],
        },
    },
} as ILifeEventConfigurations;
