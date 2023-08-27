import { BusinessFlowStepsMap } from '../../interfaces/ILoanOnboarding/BusinessFlowStepsMap';
import { ILoanApplication } from '../../interfaces/ILoanApplication/ILoanApplication';

export const sortByStepGroup = (applicationA: ILoanApplication, applicationB: ILoanApplication, steps: BusinessFlowStepsMap): number => {
    const stageA = steps[applicationA.stepId].order;
    const stageB = steps[applicationB.stepId].order;
    return stageA - stageB;
};

export const groupByStep = (arr: ILoanApplication[], steps: BusinessFlowStepsMap): any[] => {
    const groups = new Map();

    for (const key in steps) {
        const name = steps[key].name;

        groups.set(key, { key: key, count: 0, startIndex: -1, name });
    }

    arr.forEach((slot, index) => {
        if (!groups.has(slot.stepId)) return;

        const group = groups.get(slot.stepId);

        if (group.count === 0) {
            group.startIndex = index;
        }

        group.count++;
    });

    return Array.from(groups.values());
};

export const updateRoute = (id: string) => {
    const url = new URL(window.location as any);

    const idParams = url.searchParams.get('id');

    if (idParams === id) return;

    url.searchParams.set('id', id);
    window.history.pushState({}, '', url as any);
};
