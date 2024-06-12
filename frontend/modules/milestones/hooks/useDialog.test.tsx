import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useDialog from './useDialog';
import { lifeEventsToCategories } from '../utilities/LifeEventsUtils';
import mockLifeEvents from '../interfaces/mocks/LifeEvents.mock';
import mockLifeEventsConf from '../interfaces/mocks/LifeEventsConfigurations.mock';
import { LifeEventContext, lifeEventContextInitialValue } from '../LifeEvent.context';
import { LifeEventCategory } from '../interfaces/Category';
import { CURDOperationType } from '../interfaces/LifeEvents.interface';

describe('useDialog tests', () => {
    const setEditDialogConfig = jest.fn();
    const setOpenSidePanelCategory = jest.fn();
    const addLifeEventCallback = jest.fn();
    const editLifeEventCallback = jest.fn();
    const dummyCategoryCode = 104800002;

    const categories = lifeEventsToCategories(mockLifeEvents, mockLifeEventsConf);

    const getContextValue = (categoriesCollection: LifeEventCategory[] = categories, operationError?: CURDOperationType) => {
        return {
            ...lifeEventContextInitialValue,
            setOpenSidePanelCategory,
            setEditDialogConfig,
            operationError,
            configuration: mockLifeEventsConf,
            categoriesCollection,
            addLifeEventCallback,
            editLifeEventCallback,
        };
    };

    const wrapper = ({ children }) => <LifeEventContext.Provider value={getContextValue()}>{children}</LifeEventContext.Provider>;

    it('Should closed sidepanel and call setEditDialogConfig', async () => {
        const { result } = renderHook(() => useDialog(), { wrapper });

        act(() => {
            result.current.openAddEvent(dummyCategoryCode);
        });

        expect(setOpenSidePanelCategory).toBeCalledWith(0);
        expect(setEditDialogConfig).toBeCalledWith({
            initialValue: {
                categoryCode: dummyCategoryCode,
            },
        });
    });
});
