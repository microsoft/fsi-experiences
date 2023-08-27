import React from 'react';
import { act, render } from '@testing-library/react';
import { GroupsContext } from './contexts/GroupsContext';
import getGroupsContextMock from './MockGroupContext';
import { IGroup } from '../../interfaces/Groups/IGroup';
import GroupsDialogs from './GroupsDialogs';

const GroupsContextMock = getGroupsContextMock();

let wizardParams, dialogParams;

jest.mock('./GroupsWizard', () => params => {
    wizardParams = params;
    return <div data-testid={`group-wizard-${params.stepToBeOpened}`}>{params.header}</div>;
});

jest.mock('./AsyncOperationsDialog', () => params => {
    dialogParams = params;
    return <div data-testid={`${params.isOpen ? 'group-dialog-open' : 'group-dialog-close'}`}>{...params.header} {...params.text}</div>;
});

jest.mock('./GroupWizardViews/GroupDetailsComponent', () => params => {
    wizardParams = params;
    return <div data-testid="group-details" />;
});

jest.mock('./GroupWizardViews/GroupFinancialHoldingsComponent', () => params => {
    wizardParams = params;
    return <div data-testid="group-holdings" />;
});

jest.mock('./GroupWizardViews/GroupMembersComponent', () => params => {
    wizardParams = params;
    return <div data-testid="group-members" />;
});

describe('group dialogs main component', () => {
    let dialogData: { isDeleting: boolean; isLoading: boolean; header: string; msg: string },
        isDialogOpen: boolean,
        modalData: { isOpen: boolean; group: IGroup; step: number },
        setModalData,
        saveGroup,
        deleteGroup,
        closeDialog;

    beforeEach(() => {
        dialogData = {
            isDeleting: false,
            isLoading: false,
            header: '',
            msg: '',
        };
        isDialogOpen = false;
        modalData = {
            isOpen: false,
            step: 1,
            group: GroupsContextMock.value.groups[0],
        };
    });

    beforeAll(() => {
        setModalData = jest.fn().mockImplementation(() => {
            modalData.isOpen = false;
            modalData.step = 0;
        });
        saveGroup = jest.fn();
        deleteGroup = jest.fn();
        closeDialog = jest.fn();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        dialogParams = undefined;
        wizardParams = undefined;
    });

    it('dialog close', () => {
        const currContext = getGroupsContextMock();
        const { queryByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(queryByTestId('group-dialog-close')).toBeVisible();
    });

    it('dialog open', () => {
        const currContext = getGroupsContextMock();
        isDialogOpen = true;
        const { queryByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(queryByTestId('group-dialog-open')).toBeVisible();
    });

    it('Dialog loading', () => {
        const currContext = getGroupsContextMock();
        dialogData = { header: 'Some header', msg: 'Some msg', isDeleting: false, isLoading: true };
        isDialogOpen = true;
        const { getByText } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(getByText('Some header Some msg')).toBeVisible();
    });

    it('deleteGroup call', async () => {
        dialogData.isDeleting = true;
        render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        act(() => dialogParams.onDeleteClick());
        expect(deleteGroup).toHaveBeenCalledTimes(1);
    });

    it('Render closed GroupsWizard', () => {
        modalData = { ...modalData, isOpen: false };
        const { queryByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(queryByTestId('wizard-root')).not.toBeInTheDocument();
    });

    it('Wizard open step1', async () => {
        modalData = { ...modalData, isOpen: true };
        const { getByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        const a = getByTestId('group-wizard-1');
        expect(getByTestId('group-wizard-1')).toBeInTheDocument();
    });

    it('Wizard open step2', async () => {
        modalData = { ...modalData, isOpen: true, step: 2 };
        const { getByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-wizard-2')).toBeInTheDocument();
    });

    it('Wizard open step3', async () => {
        modalData = { ...modalData, isOpen: true, step: 3 };
        const { getByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-wizard-3')).toBeInTheDocument();
    });

    it('Wizard open for create', async () => {
        modalData = { ...modalData, isOpen: true, group: { ...modalData.group, id: '' } };
        const { getByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-wizard-1')).toBeInTheDocument();
    });

    it('cancel wizard call', async () => {
        modalData = { ...modalData, isOpen: true };
        const { getByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsDialogs
                    setModalData={setModalData}
                    modalData={modalData}
                    isDialogOpen={isDialogOpen}
                    dialogData={dialogData}
                    saveGroup={saveGroup}
                    deleteGroup={deleteGroup}
                    closeDialog={closeDialog}
                />
            </GroupsContext.Provider>
        );

        await act(() => wizardParams.onCancelClicked());
        expect(modalData.isOpen).toBe(false);
        expect(modalData.step).toBe(0);
        expect(getByTestId('group-dialog-close')).toBeVisible();
    });
});
