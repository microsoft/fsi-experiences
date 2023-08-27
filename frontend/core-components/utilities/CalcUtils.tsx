export const toRate = (rate?: number): string => (rate || rate === 0 ? `${rate}%` : 'N/A');
export interface ICategoryArrayValues {
    name: string;
    sum: number;
    indicator: any;
    type: string;
    icon: string;
    count: number;
}

export const getHighestIndicator = (indicator1: any, indicator2: any) => {
    if (!indicator1) return indicator2;
    if (!indicator2) return indicator1;
    return indicator1.order < indicator2.order ? indicator1 : indicator2;
};

export const creditCardMask = (creditNumber: string, character = '*') => {
    const mask = new Array(12).fill(character);

    const digitToShow = creditNumber.substring(creditNumber.length - 4, creditNumber.length);
    const maskedNumber = mask.join('') + digitToShow;
    // add spaces
    return maskedNumber.replace(/(.{4})/g, '$1 ').trim();
};
