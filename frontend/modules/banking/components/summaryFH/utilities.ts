export const createFHCategoryValue = (count: number, sum: number, indicator: any, name: string, icon: string) => {
    /* istanbul ignore if */
    if (count > 1) {
        return { name: `${name} (${count})`, sum, indicator, type: name, icon, count };
    }

    return { name: `${name}`, sum, indicator, type: name, icon, count };
};

export const onShouldVirtualize = () => false;
