import React from 'react';
import { render } from '@testing-library/react';
import DocumentStatusTag, { DOCUMENT_STATUS_TEST_ID } from './DocumentStatusTag';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { DocumentStatus } from '../../interfaces/IDocument';
import { approvedStatusColors, rejectedStatusColors } from './DocumentStatusTag.style';

describe('DocumentStatusTag', () => {
    it('Should Document status Approved', () => {
        const { getByText, getByTestId } = render(<DocumentStatusTag status={DocumentStatus.Approved} />);

        expect(getByText(diStrings.DOCUMENT_APPROVED)).toBeVisible();
        expect(getByTestId(DOCUMENT_STATUS_TEST_ID)).toHaveStyle({
            background: approvedStatusColors.background,
        });
    });

    it('Should Document status Auto Approved', () => {
        const { getByText, getByTestId } = render(<DocumentStatusTag status={DocumentStatus.Approved} autoUpdated />);

        expect(getByText(diStrings.DOCUMENT_AUTO_APPROVED)).toBeVisible();
        expect(getByTestId(DOCUMENT_STATUS_TEST_ID)).toHaveStyle({
            background: approvedStatusColors.background,
        });
    });

    it('Should Document status Rejected', () => {
        const { getByText, getByTestId } = render(<DocumentStatusTag status={DocumentStatus.Rejected} />);

        expect(getByText(diStrings.DOCUMENT_REJECTED)).toBeVisible();
        expect(getByTestId(DOCUMENT_STATUS_TEST_ID)).toHaveStyle({
            background: rejectedStatusColors.background,
        });
    });

    it('Should Document status Auto Rejected', () => {
        const { getByText, getByTestId } = render(<DocumentStatusTag status={DocumentStatus.Rejected} autoUpdated />);

        expect(getByText(diStrings.DOCUMENT_AUTO_REJECTED)).toBeVisible();
        expect(getByTestId(DOCUMENT_STATUS_TEST_ID)).toHaveStyle({
            background: rejectedStatusColors.background,
        });
    });

    it('Should render nothing if not approved or rejected', () => {
        const { queryByTestId } = render(<DocumentStatusTag status={DocumentStatus.MissingFile} />);

        expect(queryByTestId(diStrings.DOCUMENT_AUTO_REJECTED)).toBeNull();
    });
});
