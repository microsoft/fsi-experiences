import { SearchBox } from '@fluentui/react/lib/components/SearchBox';
import React, { FC, useCallback, useContext } from 'react';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useDebounce } from '@fsi/core-components/dist/hooks/useDebounce/useDebounce';
import { LoanOnboardingContext } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import type { IListSearchBoxProps } from './ListSearchBox.interface';
import { ListSearchboxStyles, ListSearchboxWrapper } from './ListSearchBox.style';

const ListSearchBox: FC<IListSearchBoxProps> = () => {
    const translate = useTranslation(namespaces.LOAN_ONBOARDING_CONTROL);
    const { searchTerm, setSearchTerm } = useContext(LoanOnboardingContext);
    const updateSearch = useDebounce(setSearchTerm, [], 1000);
    const onChange = useCallback((_, newValue?: string) => {
        updateSearch(newValue);
    }, []);

    return (
        <div className={ListSearchboxWrapper} data-testid="loan-list-search-wrapper">
            <SearchBox
                placeholder={translate('LOAN_LIST_SEARCH_PLACEHOLDER')}
                onChange={onChange}
                disableAnimation
                defaultValue={searchTerm || ''}
                styles={ListSearchboxStyles}
            />
        </div>
    );
};

export default ListSearchBox;
