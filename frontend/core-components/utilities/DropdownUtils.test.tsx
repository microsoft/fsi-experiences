import { render } from '@testing-library/react';
import { renderEmphasizedOption } from './DropdownUtils';

describe('DropdownUtils.test', () => {
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

        it('Should return text without dash', () => {
            const option = { key: '1', text: 'Primary Applicant' };

            const optionHTML = renderEmphasizedOption(option)!;

            const { container } = render(optionHTML);

            const expectedHTML = '<span>Primary Applicant</span>';

            expect(container.innerHTML).toEqual(expectedHTML);
        });
    });
});
