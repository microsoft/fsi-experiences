import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';

import { IGroupCardProps } from '..';
import GroupCard from './GroupCard';

describe('Group card component', () => {
    const myGroup = getFullMock().groupsArray[0];
    const params: IGroupCardProps = {
        group: myGroup,
        isPrimary: false,
        isSelected: true,
        onSelected: () => {},
        onEditClick: () => {},
        onDeleteClick: () => {},
    };

    it('Should render group card', async () => {
        const { findByTestId } = render(<GroupCard {...params} />);

        expect(await findByTestId('group-card-component')).toBeVisible();
    });

    it('Should render group card renderOpenedCard part', async () => {
        const { findByText } = render(<GroupCard {...params} />);

        expect(await findByText('Group members')).toBeVisible();
        expect(await findByText(myGroup.members[0].customer.name)).toBeVisible();
    });

    it('Should render group card renderOpenedCard part empty state', async () => {
        const currMock = getFullMock().groupsArray[0];
        currMock.members = [];
        const { findByText } = render(<GroupCard {...params} group={currMock} />);

        expect(await findByText('There was a problem loading members')).toBeVisible();
    });

    it('Should render group card renderClosedCard part', async () => {
        const { findByTestId, getAllByRole } = render(<GroupCard {...params} isSelected={false} />);

        const closeState = await findByTestId('group-card-component-renderClosedCard');
        expect(closeState).toBeVisible();
        expect(getAllByRole('listitem').length).toEqual(params.group.members.length);
    });

    it('Should render group card renderClosedCard part empty state', async () => {
        const currMock = getFullMock().groupsArray[0];
        currMock.members = [];
        const { findByTestId, queryAllByRole } = render(<GroupCard {...params} group={currMock} isSelected={false} />);

        expect(await findByTestId('group-card-component-renderClosedCard')).toBeVisible();
        expect(queryAllByRole('presentation').length).toEqual(0);
    });

    it('test on selected click', done => {
        const onSelectFunc = () => {
            done();
        };

        const { findByTestId } = render(<GroupCard {...params} onSelected={onSelectFunc} />);

        findByTestId('group-card-component').then(wholeComponent => {
            expect(wholeComponent).toBeVisible();
            fireEvent.click(wholeComponent);
        });
    });

    it('test on selected send the group id', done => {
        const onSelectFunc = id => {
            expect(id).toEqual(myGroup.id);
            done();
        };

        const { findByTestId } = render(<GroupCard {...params} onSelected={onSelectFunc} />);

        findByTestId('group-card-component').then(wholeComponent => {
            expect(wholeComponent).toBeVisible();
            fireEvent.click(wholeComponent);
        });
    });

    it('test be readonly', () => {
        const onDeleteFunc = jest.fn();

        const onEditFunc = jest.fn();

        const { getByTestId } = render(<GroupCard {...params} onDeleteClick={onDeleteFunc} onEditClick={onEditFunc} readonly />);
        fireEvent.click(getByTestId('group-card-component-delete-button'));
        fireEvent.click(getByTestId('group-card-component-edit-button'));

        expect(onDeleteFunc).not.toBeCalled();
        expect(onEditFunc).not.toBeCalled();
    });

    it('should on delete click', () => {
        const onDeleteFunc = jest.fn();

        const { getByTestId } = render(<GroupCard {...params} onDeleteClick={onDeleteFunc} />);

        const deleteButton = getByTestId('group-card-component-delete-button');
        expect(deleteButton).toBeVisible();
        fireEvent.click(deleteButton);

        expect(onDeleteFunc).toBeCalled();
    });

    it('test on delete send the group', done => {
        const onDeleteFunc = group => {
            expect(group.id).toEqual(myGroup.id);
            done();
        };

        const { findByTestId } = render(<GroupCard {...params} onDeleteClick={onDeleteFunc} />);

        findByTestId('group-card-component-delete-button').then(deleteButton => {
            expect(deleteButton).toBeVisible();
            fireEvent.click(deleteButton);
        });
    });

    it('test on edit click', done => {
        const onEditFunc = () => {
            done();
        };

        const { findByTestId } = render(<GroupCard {...params} onEditClick={onEditFunc} />);

        findByTestId('group-card-component-edit-button').then(editButton => {
            expect(editButton).toBeVisible();
            fireEvent.click(editButton);
        });
    });

    it('test on edit send the group', done => {
        const onEditFunc = group => {
            expect(group.id).toEqual(myGroup.id);
            done();
        };

        const { findByTestId } = render(<GroupCard {...params} onEditClick={onEditFunc} />);

        findByTestId('group-card-component-edit-button').then(editButton => {
            expect(editButton).toBeVisible();
            fireEvent.click(editButton);
        });
    });

    it('test group members switch', async () => {
        const currGroup = getFullMock().groupsArray[1];
        const primaryMember = currGroup.members.findIndex(m => m.id === currGroup.primaryMember);
        const { findByTestId, findAllByTestId } = render(<GroupCard {...params} group={currGroup} />);

        expect(await findByTestId('group-card-component')).toBeVisible();

        const personas = await findAllByTestId(/group-card-component-persona/i);
        expect(personas[0]).toHaveTextContent(currGroup.members[primaryMember].customer.name);
    });
});
