import { LifeEvent } from './LifeEvent';

/**
 * This class represents a data object for the Category display
 */

export interface LifeEventCategory {
    categoryName: string;
    categoryCode: number;
    icon: string;
    displayOrder: number;
    lifeEvents: LifeEvent[];
}
