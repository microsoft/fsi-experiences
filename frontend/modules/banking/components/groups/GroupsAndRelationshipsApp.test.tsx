import React from 'react';
import { render } from '@testing-library/react';
import { emptyGroupsFetcher } from '../../interfaces/Groups/mocks/MockGroupFetcher';
let GroupsAndRelationshipsApp;

describe('Group apps component', () => {
    const params = {
        groupsFetcher: { ...emptyGroupsFetcher, id: 'mockFetcher' },
        providers: { id: 'mockProvider' },
    };

    beforeAll(() => {
        jest.mock('./contexts/GroupsContext', () => params => {
            const { fetcher } = params;
            return <div data-testid={params['data-testid']}>{fetcher.id}</div>;
        });

        jest.mock('./GroupsAndRelationshipsMainApp/GroupsAndRelationshipsMainApp', () => () => {
            return <div data-testid="group-main"></div>;
        });

        /* eslint-disable @typescript-eslint/no-var-requires */
        GroupsAndRelationshipsApp = require('./GroupsAndRelationshipsApp').default;
    });

    it('should render group apps', () => {
        const { getByTestId } = render(<GroupsAndRelationshipsApp {...params} />);

        expect(getByTestId('group-app')).toBeVisible();
    });

    it('should send the provider and fetcher to the group context', () => {
        const { getByText } = render(<GroupsAndRelationshipsApp {...params} />);

        expect(getByText(params.groupsFetcher.id)).toBeVisible();
    });
});
