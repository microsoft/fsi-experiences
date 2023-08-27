export const mockApplications = [
    {
        id: '123',
        name: 'John Smith',
        loanType: 'Personal Loan',
        status: 'Approved',
        primaryApplicant: 'Usagi Tsukino',
        stepId: '1',
    },
    {
        id: '111',
        name: 'Bart Simpson',
        loanType: 'Personal Loan',
        status: 'In Review',
        primaryApplicant: 'Usagi Tsukino',
        stepId: '1',
    },
    {
        id: '23',
        name: 'Michael Jordan',
        loanType: 'Secured',
        status: 'In Progress',
        primaryApplicant: 'Jane Eyre',
        stepId: '1',
    },
    {
        id: '1235',
        name: 'John Minnie',
        loanType: 'Secured',
        status: 'Rejected',
        primaryApplicant: 'Charles Dickens',
        stepId: '2',
    },
    {
        id: '15',
        name: 'John 2',
        loanType: 'Secured',
        status: 'On hold',
        primaryApplicant: 'John Kerner',
        stepId: '2',
    },
];

export const mockCurrentApplicationId = mockApplications[0].id;

export const mockUpdatedLoanApplication = { ...mockApplications[3], stepId: '1' };

export const stepsMock = {
    '1': { name: 'step 1', order: 0 },
    '2': { name: 'step 2', order: 1 },
};

export const loanArchiveReasonsMock = {
    '1': 'Irrelevant information',
    '2': 'Applicant has a better option ',
    '3': 'Applicant does not satisfy with the loan terms',
    '4': 'Cannot reach the primary applicant',
    '5': 'Bank refuse to handle this application',
    '6': 'Other',
};
