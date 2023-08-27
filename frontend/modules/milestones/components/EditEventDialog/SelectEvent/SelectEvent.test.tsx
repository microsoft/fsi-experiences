import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SelectEvent from './SelectEvent';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import mockLifeEvents from '../../../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import useEventForm from '../../../hooks/useEventForm';
import { defaultTranslate } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

const WrappedSelectEventWithData = props => {
    const onSaveMock = jest.fn();
    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);
    const {
        hideCategory,
        categoryOptions,
        onCategoryOptionsChanged,
        onTypeOptionsChanged,
        typeOptions,
        state: { selectedCategoryCode, selectedType },
    } = useEventForm({
        configuration: mockLifeEventsConf,
        categoriesCollection: categories,
        onSave: onSaveMock,
        translate: defaultTranslate,
        visible: true,
    });

    return (
        <SelectEvent
            categoryOptions={categoryOptions}
            hideCategory={hideCategory}
            onCategoryOptionsChanged={onCategoryOptionsChanged}
            onTypeOptionsChanged={onTypeOptionsChanged}
            selectedCategoryCode={selectedCategoryCode}
            selectedType={selectedType}
            typeOptions={typeOptions}
            {...props}
        />
    );
};

describe('SelectEvent', () => {
    const testCategoryCode = 104800006;

    const testCategory = mockLifeEventsConf.categoriesMap[testCategoryCode];

    it('Should hide category', async () => {
        const { queryByPlaceholderText, queryByText } = render(<WrappedSelectEventWithData hideCategory />);

        expect(queryByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY)).toBeNull();
        expect(queryByText(lifeEventStrings.SELECT_CATEGORY_AND_TYPE)).toBeNull();
    });

    it('Should hide type', async () => {
        const { queryByPlaceholderText } = render(<WrappedSelectEventWithData hideType />);

        expect(queryByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE)).toBeNull();
    });

    it('Should show categories and types options', async () => {
        const { getByPlaceholderText, queryAllByRole, getByRole } = render(<WrappedSelectEventWithData />);

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY));

        expect(queryAllByRole('option')).toHaveLength(mockLifeEventsConf.categoryConfig.length);

        fireEvent.click(getByRole('option', { name: testCategory.name }));

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE));

        expect(queryAllByRole('option')).toHaveLength(testCategory.types.length);

        expect(getByRole('option', { name: testCategory.types[0].typeName })).toBeInTheDocument();
    });
});
