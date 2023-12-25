import { ChangeEvent, useMemo, useState } from 'react';
import { isStringNullOrEmpty } from '@fsi/core-components/dist/utilities/FormUtils';
import { IQueueListItem } from '../components/QueueList';
import { useDebounce } from '@fsi/core-components/dist/hooks/useDebounce/useDebounce';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';

export interface IUseSearchProps {
    items: IQueueListItem[];
}

export interface IUseSearchResponse {
    resultItems: IQueueListItem[];
    onChangeSearch: (event?: ChangeEvent<HTMLInputElement> | undefined, input?: string | undefined) => void;
    query: string;
}

const useSearch = ({ items }: IUseSearchProps): IUseSearchResponse => {
    const loggerService = useLoggerService();

    const [query, setQuery] = useState<string>('');

    const resultItems = useMemo(() => {
        if (isStringNullOrEmpty(query)) {
            return items;
        } else {
            return items.filter(
                item =>
                    item.data.primaryCustomer?.toLocaleLowerCase().includes(query) ||
                    item.data.itemName?.toLocaleLowerCase().includes(query) ||
                    item.data.itemText?.toLocaleLowerCase().includes(query)
            );
        }
    }, [query, items]);

    const onChangeSearch = useDebounce(
        (_, input: string) => {
            loggerService.logInteractionOrAction({ uniqueName: 'Searching in queue' });
            setQuery(input?.trim().toLocaleLowerCase());
        },
        [setQuery],
        500
    );

    return {
        resultItems,
        onChangeSearch,
        query,
    };
};

export default useSearch;
