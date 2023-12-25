import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Facepile from './Facepile';
import { OverflowButtonType } from '@fluentui/react/lib/components/Facepile/Facepile.types';

const exampleData = [
    {
        personaName: 'Grace Taylor (Sample)',
    },
    {
        personaName: 'Kendall Taylor (Sample)',
    },
    {
        personaName: 'Shon (Sample)',
    },
];

describe('Facepile', () => {
    it('should show facepile with tooltip', async () => {
        const { getByText } = render(
            <Facepile maxDisplayablePersonas={1} personas={exampleData} overflowButtonType={OverflowButtonType.descriptive} />
        );
        fireEvent.mouseEnter(getByText('+2'));
        waitFor(() => {
            expect(getByText(exampleData[1].personaName)).toBeInTheDocument();
            expect(getByText(exampleData[2].personaName)).toBeInTheDocument();
        });
    });

    it('should show facepile without tooltip', async () => {
        const { queryByText, getByText } = render(
            <Facepile maxDisplayablePersonas={1} personas={exampleData} overflowButtonType={OverflowButtonType.descriptive} disableHoverCard />
        );

        fireEvent.mouseEnter(getByText('+2'));

        waitFor(() => {
            expect(queryByText(exampleData[1].personaName)).not.toBeInTheDocument();
            expect(queryByText(exampleData[2].personaName)).not.toBeInTheDocument();
        });
    });

    it('should render responsive facepile', async () => {
        const { queryByText, rerender, debug } = render(
            <div style={{ width: 100 }}>
                <Facepile personas={exampleData} overflowButtonType={OverflowButtonType.descriptive} autoSize />
            </div>
        );
        waitFor(() => {
            expect(queryByText('+1')).toBeInTheDocument();
        });

        rerender(
            <div style={{ width: 90 }}>
                <Facepile personas={exampleData} overflowButtonType={OverflowButtonType.descriptive} autoSize />
            </div>
        );

        waitFor(() => {
            expect(queryByText('+2')).toBeInTheDocument();
        });

        rerender(
            <div style={{ width: 20 }}>
                <Facepile personas={exampleData} overflowButtonType={OverflowButtonType.descriptive} autoSize />
            </div>
        );

        waitFor(() => {
            expect(queryByText('+2')).toBeInTheDocument();
        });
    });
});
