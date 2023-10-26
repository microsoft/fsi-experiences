import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import RelativeDatePicker from './RelativeDatePicker';
import { lifeEventsToCategories } from '../../utilities/LifeEventsUtils';
import mockLifeEvents from '../../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../../interfaces/mocks/LifeEventsConfigurations.mock';
import useEventForm from '../../hooks/useEventForm';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { defaultDatePattern } from '@fsi/core-components/dist/components';

const WrappedSelectEventWithData = props => {
    const onSaveMock = jest.fn();
    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const {
        onSelectedDate,
        onRelativeAmountChange,
        onRelativeDateChange,
        onRelativeRadioChange,
        relativeDateOptions,
        relativeDateRadioOptions,
        state: { relativeDateAmount, relativeDateSelectedRadio, relativeDateSelected, selectedDate },
    } = useEventForm({ configuration: mockLifeEventsConf, categoriesCollection: categories, onSave: onSaveMock, translate, visible: true });

    return (
        <RelativeDatePicker
            onSelectedDate={onSelectedDate}
            onRelativeAmountChange={onRelativeAmountChange}
            onRelativeDateChange={onRelativeDateChange}
            onRelativeRadioChange={onRelativeRadioChange}
            relativeDateOptions={relativeDateOptions}
            relativeDateRadioOptions={relativeDateRadioOptions}
            relativeDateSelectedRadio={relativeDateSelectedRadio}
            relativeDateAmount={relativeDateAmount}
            relativeDateSelected={relativeDateSelected}
            selectedDate={selectedDate}
            financialGoalFutureOnly={false}
            {...props}
        />
    );
};

describe('RelativeDatePicker', () => {
    it('Should pick date', async () => {
        const onSelectedDateMock = jest.fn();
        const { getByPlaceholderText } = render(<WrappedSelectEventWithData onSelectedDate={onSelectedDateMock} />);

        const dateInput = getByPlaceholderText(defaultDatePattern, { exact: false });

        fireEvent.click(dateInput);
        fireEvent.change(dateInput, { target: { value: '1/10/2018' } });
        fireEvent.blur(dateInput);

        expect(onSelectedDateMock).toBeCalled();
    });

    it('Should write amount', async () => {
        const handleRelativeAmountChangeMock = jest.fn();
        const { getByPlaceholderText } = render(<WrappedSelectEventWithData onRelativeAmountChange={handleRelativeAmountChangeMock} />);
        const amountInput = getByPlaceholderText(lifeEventStrings.E_G_AMOUNT.replace('{{amount}}', '4'), { exact: false });

        fireEvent.click(amountInput);
        fireEvent.change(amountInput, { target: { value: '1/10/2018' } });
        fireEvent.blur(amountInput);

        expect(handleRelativeAmountChangeMock).toBeCalled();
    });

    it('Should pick relative option', async () => {
        const onRelativeDateChangeMock = jest.fn();
        const { getByPlaceholderText, getByRole } = render(<WrappedSelectEventWithData onRelativeDateChange={onRelativeDateChangeMock} />);
        fireEvent.click(getByPlaceholderText(lifeEventStrings.E_G_YEARS));
        fireEvent.click(getByRole('option', { name: 'Years' }));

        expect(onRelativeDateChangeMock).toBeCalled();
    });

    it('Should pick relative radio option', async () => {
        const onRelativeRadioChangeMock = jest.fn();
        const { getByText } = render(<WrappedSelectEventWithData onRelativeRadioChange={onRelativeRadioChangeMock} />);
        fireEvent.click(getByText(lifeEventStrings.AGO));

        expect(onRelativeRadioChangeMock).toBeCalled();
    });
});
