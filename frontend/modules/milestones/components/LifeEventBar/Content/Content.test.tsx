import React from 'react';
import { render } from '@testing-library/react';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import mockLifeEvents from '../../../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import Content from './Content';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import { LifeEventContext, lifeEventContextInitialValue } from '../../../LifeEvent.context';

describe('LifeEventBar - Content', () => {
    const handleCategoryClicked = jest.fn();
    const handleCloseEditDialog = jest.fn();
    const handleCloseFinancialGoalDialog = jest.fn();
    const onSave = jest.fn();
    const setPopUp = jest.fn();

    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const getContextValue = () => {
        return {
            ...lifeEventContextInitialValue,
            configuration: mockLifeEventsConf,
            categoriesCollection: categories,
        };
    };

    beforeEach(() => {
        handleCategoryClicked.mockClear();
        handleCloseEditDialog.mockClear();
        onSave.mockClear();
        setPopUp.mockClear();
    });

    it('Should render content with error state', async () => {
        const { getByText } = render(
            <Content
                handleCategoryClicked={handleCategoryClicked}
                handleCloseEditDialog={handleCloseEditDialog}
                onSave={onSave}
                configuration={mockLifeEventsConf}
                categoriesCollection={categories}
                loading={LoadingState.Error}
                handleCloseFinancialGoalsDialog={handleCloseFinancialGoalDialog}
                editPopUp={false}
                setPopUp={setPopUp}
            />
        );

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render content with loading state', async () => {
        const { getByText } = render(
            <Content
                handleCategoryClicked={handleCategoryClicked}
                handleCloseEditDialog={handleCloseEditDialog}
                onSave={onSave}
                configuration={undefined}
                categoriesCollection={categories}
                loading={LoadingState.Loading}
                handleCloseFinancialGoalsDialog={handleCloseFinancialGoalDialog}
                editPopUp={false}
                setPopUp={setPopUp}
            />
        );

        expect(getByText(commonStrings.CONNECTING_WITH_DATA)).toBeInTheDocument();
    });

    it('Should render content with empty state', async () => {
        const { getByText } = render(
            <Content
                handleCategoryClicked={handleCategoryClicked}
                handleCloseEditDialog={handleCloseEditDialog}
                onSave={onSave}
                configuration={mockLifeEventsConf}
                categoriesCollection={[]}
                loading={LoadingState.Success}
                handleCloseFinancialGoalsDialog={handleCloseFinancialGoalDialog}
                editPopUp={false}
                setPopUp={setPopUp}
            />
        );

        expect(getByText(lifeEventStrings.LIFE_EVENTS_EMPTY_STATE_TITLE)).toBeInTheDocument();
    });

    it('Should render content categories', async () => {
        const contextValue = getContextValue();

        const { getAllByTestId } = render(
            <LifeEventContext.Provider value={contextValue}>
                <Content
                    handleCategoryClicked={handleCategoryClicked}
                    handleCloseEditDialog={handleCloseEditDialog}
                    onSave={onSave}
                    configuration={mockLifeEventsConf}
                    categoriesCollection={categories}
                    loading={LoadingState.Success}
                    handleCloseFinancialGoalsDialog={handleCloseFinancialGoalDialog}
                    editPopUp={true}
                    setPopUp={setPopUp}
                />
            </LifeEventContext.Provider>
        );

        const categoryElements = getAllByTestId(/life-event-category-wrapper/i);

        expect(categoryElements.length).toEqual(10);
    });
});
