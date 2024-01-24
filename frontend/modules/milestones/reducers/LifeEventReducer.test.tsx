import { LifeEventReducer, LifeEventsActions } from './LifeEventReducer';
import mockLifeEventsConf from '../interfaces/mocks/LifeEventsConfigurations.mock';
import mockLifeEvents from '../interfaces/mocks/LifeEvents.mock';
import { LifeEventCategory } from '../interfaces/Category';
import { lifeEventsToCategories } from '../utilities';

describe('LifeEventReducer', () => {
    let lifeEventState: LifeEventCategory[];

    const categoryCode = 104800003;
    const existingEventId = 'f022d8ec-a959-eb11-a812-000d3a1fc384';

    const testCategoryFromMock = mockLifeEventsConf.categoriesMap[categoryCode];
    const testEventsFromMock = mockLifeEvents[categoryCode];
    beforeEach(() => {
        const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

        lifeEventState = LifeEventReducer([], {
            type: LifeEventsActions.LIFE_EVENTS_LOADED,
            payload: categories,
        });
    });

    it('Should load category list correctly', () => {
        expect(lifeEventState.length).toEqual(mockLifeEventsConf.categoryConfig.length);

        const testCategory = lifeEventState.find(c => c.categoryCode === categoryCode);

        expect(testCategory).toBeDefined();

        expect(testCategory?.categoryName).toEqual(testCategoryFromMock.name);

        expect(testCategory?.lifeEvents?.length).toEqual(testEventsFromMock.length);
    });

    it('Should add new life event', () => {
        const afterAddState = LifeEventReducer(lifeEventState, {
            type: LifeEventsActions.ADD_LIFE_EVENT,
            payload: {
                categoryCode,
                created_on: new Date(),
                id: 'id',
                title: 'Test event',
                typeCode: 104800015,
            },
        });

        expect(afterAddState.length).toEqual(lifeEventState.length);

        const testCategory = lifeEventState.find(c => c.categoryCode === categoryCode);

        expect(testCategory?.lifeEvents?.length).toEqual(testEventsFromMock.length + 1);
    });

    it('Should delete life event', () => {
        const afterDeleteState = LifeEventReducer(lifeEventState, {
            type: LifeEventsActions.DELETE_LIFE_EVENT,
            payload: {
                categoryCode,
                lifeEventId: existingEventId,
            },
        });

        expect(afterDeleteState.length).toEqual(lifeEventState.length);

        const testCategory = afterDeleteState.find(c => c.categoryCode === categoryCode);

        expect(testCategory?.lifeEvents?.length).toEqual(testEventsFromMock.length - 1);
    });

    it('Should update life event', () => {
        const updatedTitle = 'Updated title';
        const updatedTypeCode = 104800008;

        const afterUpdateState = LifeEventReducer(lifeEventState, {
            type: LifeEventsActions.EDIT_LIFE_EVENT,
            payload: {
                categoryCode,
                created_on: new Date(),
                id: existingEventId,
                title: updatedTitle,
                typeCode: updatedTypeCode,
                date: undefined,
            },
        });

        const testCategory = afterUpdateState.find(c => c.categoryCode === categoryCode);

        expect(testCategory?.lifeEvents?.length).toEqual(testEventsFromMock.length);

        const updatedEvent = testCategory?.lifeEvents?.find(event => event.id === existingEventId);

        expect(updatedEvent?.title).toEqual(updatedTitle);
        expect(updatedEvent?.date).toBeUndefined();
        expect(updatedEvent?.typeCode).toEqual(updatedTypeCode);
    });
});
