import { render } from '@testing-library/react';
import { IApplicant } from '../../interfaces/ILoanApplicant/ILoanApplicant';
import { ICustomDocument } from '../../interfaces/ILoanDocument/ILoanDocument';
import { applicantsMock, customDocumentsMock } from '../../interfaces/ILoanDocument/mocks/ILoanDocument.mocks';
import { findByID, renderEmphasizedOption } from './loanDocumentHelper';

describe('AddDocumentDialogUtils.test', () => {
    describe('getApplicantById', () => {
        it('Should return found applicant', () => {
            const applicantToFind: IApplicant = applicantsMock[0];

            const applicant = findByID(applicantsMock, applicantToFind.id);

            expect(applicant).toEqual(applicantToFind);
        });

        it('Should return undefined when ID is not found', () => {
            const applicant = findByID(applicantsMock, 'invalidID');
            expect(applicant).toBeUndefined();
        });
    });

    describe('getDocumentTypeById', () => {
        it('Should return found document type', () => {
            const documentTypeToFind: ICustomDocument = customDocumentsMock[0];

            const documentType = findByID(customDocumentsMock, documentTypeToFind.id);

            expect(documentType).toEqual(documentTypeToFind);
        });

        it('Should return undefined when ID is not found', () => {
            const documentType = findByID(customDocumentsMock, 'invalidID');
            expect(documentType).toBeUndefined();
        });
    });

    describe('renderEmphasizedOption', () => {
        it('Should return correct HTML', () => {
            const option = { key: '1', text: 'Primary Applicant - John Doe' };

            const optionHTML = renderEmphasizedOption(option)!;

            const { container } = render(optionHTML);

            const expectedHTML = '<span><b>Primary Applicant</b> - John Doe</span>';

            expect(container.innerHTML).toEqual(expectedHTML);
        });

        it('Should return NULL when input parameter is invalid', () => {
            const option = undefined;

            const optionHTML = renderEmphasizedOption(option);

            expect(optionHTML).toBeNull();
        });
    });
});
