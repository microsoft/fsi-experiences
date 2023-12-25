import React, { FC } from 'react';
import { SearchBox } from '@fluentui/react/lib/components/SearchBox/SearchBox';
import type { ISearchProps } from './Search.interface';
import { getClassNames } from './Search.style';

export const Search: FC<ISearchProps> = props => {
    const { onChange, value, placeholder, id, wrapperAriaAttributes, styles, wrapperRole = 'search', ...restProps } = props;
    const searchClasses = getClassNames(styles);

    return (
        <div className={searchClasses.wrapper} data-testid="search-wrapper" id={id} role={wrapperRole} {...wrapperAriaAttributes}>
            <SearchBox
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disableAnimation
                {...restProps}
                className={searchClasses.searchbox}
                styles={searchClasses}
            />
        </div>
    );
};

export default Search;
