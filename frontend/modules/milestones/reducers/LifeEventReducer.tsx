/* istanbul ignore file */
import { findCategoryByCode, sortObjectByDateProperty } from '../utilities/LifeEventsUtils';
import { LifeEvent, LifeEventCategory } from '../interfaces';

export const enum LifeEventsActions {
    LIFE_EVENTS_LOADED = 'LIFE_EVENTS_LOADED',
    ADD_LIFE_EVENT = 'ADD_LIFE_EVENT',
    DELETE_LIFE_EVENT = 'DELETE_LIFE_EVENT',
    EDIT_LIFE_EVENT = 'EDIT_LIFE_EVENT',
    ADD_FINANCIAL_GOAL = 'ADD_FINANCIAL_GOAL',
    DELETE_FINANCIAL_GOAL = 'DELETE_FINANCIAL_GOAL',
    EDIT_FINANCIAL_GOAL = 'EDIT_FINANCIAL_GOAL',
}

export const LifeEventReducer = (categories: LifeEventCategory[], action: any): LifeEventCategory[] => {
    switch (action.type) {
        case LifeEventsActions.LIFE_EVENTS_LOADED: {
            return [...action.payload];
        }
        case LifeEventsActions.ADD_LIFE_EVENT:
            const lifeEventToAdd: LifeEvent = action.payload;

            const searchedCategoryForAdd = findCategoryByCode(categories, lifeEventToAdd.categoryCode);
            if (!searchedCategoryForAdd) {
                // console.error('Attempt to add life event to non existing category: ' + lifeEventToAdd.categoryCode);
            } else {
                const newLifeEvents = [...searchedCategoryForAdd.lifeEvents, lifeEventToAdd];
                sortObjectByDateProperty(newLifeEvents, 'date', 'DESC');
                searchedCategoryForAdd.lifeEvents = newLifeEvents;
            }

            return [...categories];

        case LifeEventsActions.DELETE_LIFE_EVENT:
            const lifeEventIdToDelete: string = action.payload.lifeEventId;
            const associatedCategoryCode: number = action.payload.categoryCode;

            const searchedCategoryForDel = findCategoryByCode(categories, associatedCategoryCode);

            if (searchedCategoryForDel === undefined) {
                // console.error('Attempt to delete life event from non existing category: ',  associatedCategoryCode);
            } else {
                searchedCategoryForDel.lifeEvents = searchedCategoryForDel.lifeEvents.filter(item => item.id !== lifeEventIdToDelete);
            }

            return [...categories];

        case LifeEventsActions.EDIT_LIFE_EVENT:
            const id: string = action.payload.id;
            const categoryCode: number = action.payload.categoryCode;
            const typeCode: number = action.payload.typeCode;
            const date: Date = action.payload.date;
            const title: string = action.payload.title;

            const searchedCategoryForUpdate = findCategoryByCode(categories, categoryCode);
            if (searchedCategoryForUpdate === undefined) {
                // console.error('Attempt to edit life event from non existing category: ' + categoryCode);
            } else {
                const lifeEvents = searchedCategoryForUpdate.lifeEvents;
                searchedCategoryForUpdate.lifeEvents = lifeEvents.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            typeCode,
                            date,
                            title,
                        };
                    }
                    return item;
                });
                sortObjectByDateProperty(searchedCategoryForUpdate.lifeEvents, 'date', 'DESC');
            }

            return [...categories];

        default:
            /* istanbul ignore next */
            return categories;
    }
};
