import { render, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import { lifeEventsToCategories } from '../../utilities/LifeEventsUtils';
import EditEventDialog from './EditEventDialog';
import mockLifeEventsConf from '../../interfaces/mocks/LifeEventsConfigurations.mock';
import mockLifeEvents from '../../interfaces/mocks/LifeEvents.mock';
import { LifeEventContext, lifeEventContextInitialValue } from '../../LifeEvent.context';
import { LifeEvent } from '../../interfaces/LifeEvent';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { defaultDatePattern } from '@fsi/core-components/dist/components';
import { additionalInfoTextLimit } from '../../constants/EditEventDialog.consts';

describe('EditEventDialog', () => {
    const onDialogDismiss = jest.fn();
    const onSave = jest.fn();
    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const testCategoryCode = 104800006;
    const testTypeCode = 104800015;
    const saleTypeCode = 104800016;

    const testCategory = mockLifeEventsConf.categoriesMap[testCategoryCode];

    const eventDate = new Date();

    const testEventToEdit: Partial<LifeEvent> = {
        categoryCode: testCategoryCode,
        id: 'test-id',
        title: 'test-title',
        typeCode: testTypeCode,
        date: eventDate,
    };

    const fetchLifeEventById = jest.fn().mockResolvedValue(testEventToEdit);

    const getContextValue = () => {
        return {
            ...lifeEventContextInitialValue,
            configuration: mockLifeEventsConf,
            fetchLifeEventById,
            categoriesCollection: categories,
        };
    };

    const renderEventEditDialogTestElement = (visible: boolean, initialValue?: Partial<LifeEvent>) => {
        return render(
            <LifeEventContext.Provider value={getContextValue()}>
                <EditEventDialog
                    visible={visible}
                    initialValue={initialValue}
                    categoriesCollection={categories}
                    configuration={mockLifeEventsConf}
                    onDialogDismiss={onDialogDismiss}
                    onSave={onSave}
                />
            </LifeEventContext.Provider>
        );
    };

    beforeEach(() => {
        fetchLifeEventById.mockClear();
        onDialogDismiss.mockClear();
        onSave.mockClear();
    });

    it('Should render create new event dialog with all fields', async () => {
        const { getByRole, getByPlaceholderText } = renderEventEditDialogTestElement(true, {});

        // header
        expect(getByRole('heading', { name: lifeEventStrings.CREATE_EVENT })).toBeInTheDocument();
        // add button
        const addButton = getByRole('button', { name: commonStrings.CREATE });
        expect(addButton).toBeInTheDocument();
        expect(addButton).toBeDisabled();

        //fields
        expect(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY)).toBeInTheDocument();
        expect(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE)).toBeInTheDocument();
        expect(getByPlaceholderText(defaultDatePattern, { exact: false })).toBeInTheDocument();
        expect(getByPlaceholderText(lifeEventStrings.EVENT_NOTES)).toBeInTheDocument();
    });

    it('Should render add event dialog with fixed category', async () => {
        const { getByRole } = renderEventEditDialogTestElement(true, { categoryCode: testCategoryCode });

        // header
        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();
        // add button
        expect(getByRole('button', { name: commonStrings.CREATE })).toBeInTheDocument();
    });

    it('Should render edit event dialog', async () => {
        const { getByRole } = renderEventEditDialogTestElement(true, testEventToEdit);

        // header
        expect(getByRole('heading', { name: testCategory.name })).toBeInTheDocument();
        // add button
        expect(getByRole('button', { name: lifeEventStrings.EDIT_LIFE_EVENT_BUTTON_LABEL })).toBeInTheDocument();
        expect(getByRole('button', { name: lifeEventStrings.EDIT_LIFE_EVENT_BUTTON_LABEL })).toBeEnabled();

        await waitFor(() => expect(fetchLifeEventById).toHaveBeenCalled());
    });

    it('Should call dismiss callback', async () => {
        const { getByTitle } = renderEventEditDialogTestElement(true, testEventToEdit);

        await waitFor(() => expect(fetchLifeEventById).toHaveBeenCalled());

        fireEvent.click(getByTitle('Close'));

        expect(onDialogDismiss).toHaveBeenCalled();
    });

    it('Should show categories and types options', async () => {
        const { getByPlaceholderText, queryAllByRole, getByRole } = renderEventEditDialogTestElement(true, {});

        //click on category combo
        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY));

        expect(queryAllByRole('option')).toHaveLength(mockLifeEventsConf.categoryConfig.length);

        fireEvent.click(getByRole('option', { name: testCategory.name }));
        //click on type combo
        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE));
        //check type options length
        expect(queryAllByRole('option')).toHaveLength(testCategory.types.length);
        // check single type exists
        expect(getByRole('option', { name: testCategory.types[0].typeName })).toBeInTheDocument();
    });

    it('Should call save callback with edited values for new event', async () => {
        const { getByPlaceholderText, getByRole } = renderEventEditDialogTestElement(true, {});

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY));

        fireEvent.click(getByRole('option', { name: testCategory.name }));

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeDisabled();

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE));

        fireEvent.click(getByRole('option', { name: 'Sale' }));

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeDisabled();

        const dateInput = getByPlaceholderText(defaultDatePattern, { exact: false });
        fireEvent.click(dateInput);
        fireEvent.change(dateInput, { target: { value: '1/10/2018' } });
        fireEvent.blur(dateInput);

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeEnabled();

        // enter info
        const enteredInfo = 'Subaru Crime';
        fireEvent.change(getByPlaceholderText(lifeEventStrings.EVENT_NOTES), { target: { value: enteredInfo } });

        // click add button
        fireEvent.click(getByRole('button', { name: commonStrings.CREATE }));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({
                categoryCode: testCategoryCode,
                id: '',
                title: enteredInfo,
                typeCode: saleTypeCode,
                date: new Date('1/10/2018'),
            })
        );
    });

    it('Should call save callback with edited values for old event', async () => {
        const { getByPlaceholderText, getByRole } = renderEventEditDialogTestElement(true, testEventToEdit);

        await waitFor(() => expect(fetchLifeEventById).toHaveBeenCalled());
        //click on type combo
        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE));
        // select sale
        fireEvent.click(getByRole('option', { name: 'Sale' }));

        // empty info
        fireEvent.change(getByPlaceholderText(lifeEventStrings.EVENT_NOTES), { target: { value: '' } });

        // click edit button
        fireEvent.click(getByRole('button', { name: lifeEventStrings.EDIT_LIFE_EVENT_BUTTON_LABEL }));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({
                ...testEventToEdit,
                title: '',
                typeCode: saleTypeCode,
                date: testEventToEdit.date,
            })
        );
    });

    it('When choosing other category code it should hide automaticly the type', async () => {
        const { getByPlaceholderText, queryByPlaceholderText, getByRole } = renderEventEditDialogTestElement(true, {});

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY));

        fireEvent.click(getByRole('option', { name: 'Other' }));

        expect(queryByPlaceholderText(lifeEventStrings.LIFE_EVENT_TYPE)).toBeNull();
    });

    it('When other category is selected form should be enabled only when there is additional info', async () => {
        const { getByPlaceholderText, getByRole } = renderEventEditDialogTestElement(true, {});

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY));

        fireEvent.click(getByRole('option', { name: 'Other' }));

        const dateInput = getByPlaceholderText(defaultDatePattern, { exact: false });

        fireEvent.click(dateInput);
        fireEvent.change(dateInput, { target: { value: '1/10/2018' } });
        fireEvent.blur(dateInput);

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeDisabled();

        const enteredInfo = 'Subaru Crime';

        fireEvent.change(getByPlaceholderText(lifeEventStrings.EVENT_NOTES), { target: { value: enteredInfo } });

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeEnabled();

        fireEvent.click(getByRole('button', { name: commonStrings.CREATE }));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({
                categoryCode: mockLifeEventsConf.otherCategoryCode,
                id: '',
                title: enteredInfo,
                typeCode: mockLifeEventsConf.otherTypeCode,
                date: new Date('1/10/2018'),
            })
        );
    });

    it('Submit should be enabled only when additional info is valid', async () => {
        const { getByPlaceholderText, getByRole } = renderEventEditDialogTestElement(true, {});

        fireEvent.click(getByPlaceholderText(lifeEventStrings.LIFE_EVENT_CATEGORY));

        fireEvent.click(getByRole('option', { name: 'Other' }));

        const dateInput = getByPlaceholderText(defaultDatePattern, { exact: false });

        fireEvent.click(dateInput);
        fireEvent.change(dateInput, { target: { value: '1/10/2018' } });
        fireEvent.blur(dateInput);

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeDisabled();

        const enteredInfo = 'Subaru Crime';

        fireEvent.change(getByPlaceholderText(lifeEventStrings.EVENT_NOTES), { target: { value: new Array(additionalInfoTextLimit + 2).join('a') } });

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeDisabled();

        fireEvent.change(getByPlaceholderText(lifeEventStrings.EVENT_NOTES), { target: { value: enteredInfo } });

        expect(getByRole('button', { name: commonStrings.CREATE })).toBeEnabled();

        fireEvent.click(getByRole('button', { name: commonStrings.CREATE }));

        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({
                categoryCode: mockLifeEventsConf.otherCategoryCode,
                id: '',
                title: enteredInfo,
                typeCode: mockLifeEventsConf.otherTypeCode,
                date: new Date('1/10/2018'),
            })
        );
    });
});
