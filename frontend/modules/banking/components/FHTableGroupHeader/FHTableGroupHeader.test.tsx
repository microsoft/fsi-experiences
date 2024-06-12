import React from 'react';
import { render } from '@testing-library/react';
import { FHTableGroupHeader } from './FHTableGroupHeader';
import { IGroupHeaderProps } from '@fluentui/react/lib/components/GroupedList/GroupHeader';

const params: IGroupHeaderProps = {
    group: { startIndex: 0, count: 1, name: 'Accounts', key: '104800004' },
};

describe('FHTableGroupHeader', () => {
    it('should render header', () => {
        const { getByTestId } = render(<FHTableGroupHeader {...params} />);

        expect(getByTestId(`fh-table-group-header${params.group?.startIndex}`)).toBeVisible();
    });
});
