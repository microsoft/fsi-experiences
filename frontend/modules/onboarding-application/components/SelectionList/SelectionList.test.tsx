import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectionList from './SelectionList';
import applicantListStrings from '../../assets/strings/ApplicantListControl/ApplicantListControl.1033.json';
import { IApplicantWithTask } from '../../interfaces/IApplicantWithTask';

describe('SelectionList', () => {
    it('renders correctly and calls onChange function', () => {
        const onChange = jest.fn();
        const items: IApplicantWithTask[] = [
            {
                id: '1',
                name: 'name1',
                role: 'role1',
                isPrimary: false,
                task: {
                    status: 1,
                    updateStatus: jest.fn(),
                    id: '',
                    name: '',
                    state: 1,
                },
            },

            {
                id: '2',
                name: 'name2',
                role: 'role2',
                isPrimary: true,
                task: {
                    status: 1,
                    updateStatus: jest.fn(),
                    id: '',
                    name: '',
                    state: 1,
                },
            },
        ];
        const { getByText, queryByText } = render(<SelectionList style={{ background: 'white' }} applicants={items} onChange={onChange} />);

        expect(getByText('name1')).toBeInTheDocument();
        expect(getByText('name2')).toBeInTheDocument();
        expect(getByText('role1')).toBeInTheDocument();
        expect(queryByText('role2')).not.toBeInTheDocument();
        expect(getByText(applicantListStrings.PRIMARY_APPLICANT)).toBeInTheDocument();

        fireEvent.click(getByText('name1'));
        expect(onChange).toHaveBeenCalledWith(items[0]);
    });

    it('renders without itmes', () => {
        const onChange = jest.fn();
        const { queryByTestId } = render(<SelectionList style={{ background: 'white' }} onChange={onChange} />);

        expect(queryByTestId('selection-list-row')).not.toBeInTheDocument();
    });
});
