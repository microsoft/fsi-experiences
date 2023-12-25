import React from 'react';
import { render } from '@testing-library/react';
import InfoSection from './InfoSection';
jest.mock('../../atoms/BaseCurrency/BaseCurrency', () => () => <div data-testid="currency"></div>);

const infoSection = {
    mainTitle: 'test',
    isLoading: false,
    isError: false,
};

const children = <div data-testid="component">component</div>;

describe('InfoSection', () => {
    it('should render section header', () => {
        const component = render(<InfoSection {...infoSection}>{children}</InfoSection>);

        const { getByText } = component;

        expect(getByText(infoSection.mainTitle)).toBeVisible();
    });

    it('should render section heade with currency', () => {
        const component = render(
            <InfoSection {...infoSection} currencyId="2">
                {children}
            </InfoSection>
        );

        const { getByTestId } = component;

        expect(getByTestId('currency')).toBeVisible();
    });

    it('should render loading component', () => {
        const { getByTestId } = render(
            <InfoSection {...infoSection} isLoading={true}>
                {children}
            </InfoSection>
        );

        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('should render error state', () => {
        const component = render(
            <InfoSection {...infoSection} isError={true}>
                {children}
            </InfoSection>
        );

        const { getByTestId } = component;

        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render component', () => {
        const component = render(<InfoSection {...infoSection}>{children}</InfoSection>);

        const { getByTestId } = component;

        expect(getByTestId('component')).toBeVisible();
    });

    it('should not render component if does not exist', () => {
        const component = render(<InfoSection {...infoSection} />);

        const { queryByTestId } = component;

        expect(queryByTestId('component')).toBeNull();
    });

    it('should render command button', () => {
        const component = render(
            <InfoSection {...infoSection} commandProps={{ text: 'My button' }}>
                {children}
            </InfoSection>
        );

        const { getByText } = component;

        expect(getByText('My button')).toBeVisible();
    });
});
