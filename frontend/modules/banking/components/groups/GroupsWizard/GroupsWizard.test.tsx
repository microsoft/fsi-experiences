import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GroupsContext } from '../contexts/GroupsContext';
import getGroupsContextMock from '../MockGroupContext';
import groupsTexts from '@fsi/core-components/dist/assets/strings/GroupsControl/GroupsControl.1033.json';
import GroupsWizard from './GroupsWizard';

const GroupsContextMock = getGroupsContextMock();

const modalData = {
    isOpen: false,
    step: 1,
    group: GroupsContextMock.value.groups[0],
};

describe('GroupsWizard', () => {
    it('Render GroupsWizard with 3 steps', () => {
        const currContext = getGroupsContextMock();
        const { getAllByText, getByText } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsWizard data={modalData.group} onCancelClicked={() => {}} onSaveClicked={() => {}} stepToBeOpened={0} />
            </GroupsContext.Provider>
        );

        expect(getAllByText(groupsTexts.DETAILS_WIZARD_STEP)[0]).toBeInTheDocument();
        expect(getByText(groupsTexts.MEMBERS_WIZARD_STEP)).toBeInTheDocument();
        expect(getByText(groupsTexts.HOLDING_WIZARD_STEP)).toBeInTheDocument();
    });

    it('Other steps should be enabled when editing group', () => {
        const currContext = getGroupsContextMock();
        const { getAllByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsWizard data={modalData.group} onCancelClicked={() => {}} onSaveClicked={() => {}} stepToBeOpened={0} />
            </GroupsContext.Provider>
        );

        const wizardStepBtns = getAllByTestId('wizard-step-btn');
        expect(wizardStepBtns[1]).toBeEnabled();
        expect(wizardStepBtns[2]).toBeEnabled();
    });

    it('Navigate thorugh other 3 steps', () => {
        const currContext = getGroupsContextMock();
        const { getAllByTestId, getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsWizard data={modalData.group} onCancelClicked={() => {}} onSaveClicked={() => {}} stepToBeOpened={0} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-details')).toBeInTheDocument();

        const wizardStepBtns = getAllByTestId('wizard-step-btn');
        fireEvent.click(wizardStepBtns[1]);
        expect(getByTestId('group-members')).toBeInTheDocument();

        fireEvent.click(wizardStepBtns[2]);
        expect(getByTestId('group-fh')).toBeInTheDocument();
    });

    it('Should cancel wizard', () => {
        const onCancelClicked = jest.fn();
        const currContext = getGroupsContextMock();
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsWizard data={modalData.group} onCancelClicked={onCancelClicked} onSaveClicked={() => {}} stepToBeOpened={2} />
            </GroupsContext.Provider>
        );

        fireEvent.click(getByTestId('wizard-cancel-btn'));
        expect(onCancelClicked).toBeCalled();
    });

    it('Should save wizard', () => {
        const onSaveClicked = jest.fn();
        const currContext = getGroupsContextMock();
        const { getAllByTestId, getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsWizard data={modalData.group} onCancelClicked={() => {}} onSaveClicked={onSaveClicked} stepToBeOpened={2} />
            </GroupsContext.Provider>
        );

        const wizardStepBtns = getAllByTestId('wizard-step-btn');
        fireEvent.click(wizardStepBtns[2]);
        fireEvent.click(getByTestId('wizard-done-btn'));
        expect(onSaveClicked).toBeCalled();
    });

    it('Should open create new', () => {
        const onSaveClicked = jest.fn();
        const currContext = getGroupsContextMock();
        const { getByText } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsWizard data={{ ...modalData.group, id: '' }} onCancelClicked={() => {}} onSaveClicked={onSaveClicked} stepToBeOpened={0} />
            </GroupsContext.Provider>
        );

        expect(getByText(groupsTexts.CREATE_GROUP)).toBeInTheDocument();
    });
});
