import { render } from '@testing-library/react';
import React from 'react';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import { lifeEventsToCategories } from '../../../utilities/LifeEventsUtils';
import useEventForm from '../../../hooks/useEventForm';
import RelativeDatePickerChoice from './RelativeDatePickerChoice';
import mockLifeEvents from '../../../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../../../interfaces/mocks/LifeEventsConfigurations.mock';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

const WrappedRelativeDatePickerChoice = financialGoalFutureOnly => {
    const onSaveMock = jest.fn();
    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const {
        onRelativeRadioChange,
        relativeDateRadioOptions,
        state: { relativeDateSelectedRadio },
    } = useEventForm({ configuration: mockLifeEventsConf, categoriesCollection: categories, onSave: onSaveMock, translate, visible: true });

    return (
        <RelativeDatePickerChoice
            financialGoalFutureOnly={financialGoalFutureOnly}
            relativeDateSelectedRadio={relativeDateSelectedRadio}
            relativeDateRadioOptions={relativeDateRadioOptions}
            onRelativeRadioChange={onRelativeRadioChange}
        />
    );
};

describe('RelativeDatePickerChoice', () => {
    it('Should pick financial goal choice', async () => {
        const { getByText } = render(<WrappedRelativeDatePickerChoice financialGoalFutureOnly />);

        expect(getByText(lifeEventStrings.FROM_TODAY)).toBeInTheDocument();
    });
});
