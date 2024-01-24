export const STATES = {
    Active: 0,
    Inactive: 1,
} as const;

export type StatesValues = typeof STATES[keyof typeof STATES];
