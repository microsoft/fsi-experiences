/* istanbul ignore file */
import type { DebouncedFunc } from 'lodash';
import debounce from 'lodash/debounce';
import { useCallback } from 'react';

export const useDebounce = (func: (...args: any[]) => any, dependencies: any[], timer: number): DebouncedFunc<(...args: any[]) => any> => {
    const memorizedCallback = useCallback(debounce(func, timer), dependencies);

    return memorizedCallback;
};
