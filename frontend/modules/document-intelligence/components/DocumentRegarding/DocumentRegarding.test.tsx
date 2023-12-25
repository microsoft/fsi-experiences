import React from 'react';
import { render } from '@testing-library/react';
import DocumentRegarding from './DocumentRegarding';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { IDocumentRegarding } from '../../interfaces/IDocumentRegarding';

describe('[Document Intelligence] DocumentRegarding', () => {
    const basicRegarding: IDocumentRegarding = {
        id: 'test',
        name: 'regarding name',
    };

    it('Should render basic regarding', () => {
        const { getByText, queryByText } = render(<DocumentRegarding regarding={basicRegarding} />);
        expect(getByText(basicRegarding.name)).toBeVisible();
        expect(queryByText(`(${diStrings.PRIMARY_REGARDING})`)).toBeNull();
    });

    it('Should render regarding with role', () => {
        const regarding: IDocumentRegarding = {
            ...basicRegarding,
            role: 'my role',
        };
        const { getByText, queryByText } = render(<DocumentRegarding regarding={regarding} />);
        expect(getByText(regarding.name)).toBeVisible();
        expect(getByText(`(${regarding.role})`)).toBeVisible();
        expect(queryByText(`(${diStrings.PRIMARY_REGARDING})`)).toBeNull();
    });

    it('Should render is primary regarding', () => {
        const regarding: IDocumentRegarding = {
            ...basicRegarding,
            role: 'my role',
            isPrimary: true,
        };
        const { getByText, queryByText } = render(<DocumentRegarding regarding={regarding} />);
        expect(getByText(regarding.name)).toBeVisible();
        expect(queryByText(`(${regarding.role})`)).toBeNull();
        expect(getByText(`(${diStrings.PRIMARY_REGARDING})`)).toBeVisible();
    });
});
