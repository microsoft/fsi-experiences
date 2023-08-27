import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { FSIContainer } from '../../FSIContext';
import { useOpenForm } from './useOpenForm';

const formId = '3303e8c6-0cdc-ec11-a7b6-000d3a55e477';

describe('useOpenForm tests', () => {
    it('Should test useOpenForm with form id', async () => {
        const mockNavigation = { openForm: jest.fn() };
        const wrapper = ({ children }) => <FSIContainer navigation={mockNavigation}>{children}</FSIContainer>;
        const { result } = renderHook(() => useOpenForm({ formId, entity: 'mock' }), { wrapper });

        act(() => {
            result.current(3);
        });

        expect(mockNavigation.openForm).toBeCalledWith(3, 'mock', formId);
    });

    describe('useOpenForm tests', () => {
        it('Should test useOpenForm without form id', async () => {
            const mockNavigation = { openForm: jest.fn() };
            const wrapper = ({ children }) => <FSIContainer navigation={mockNavigation}>{children}</FSIContainer>;
            const { result } = renderHook(() => useOpenForm({ formId: undefined, entity: 'mock' }), { wrapper });

            act(() => {
                result.current(3);
            });

            expect(mockNavigation.openForm).toBeCalledWith(3, 'mock', '');
        });
    });

    it('Should test useOpenForm - navigation is undefined', async () => {
        const mockNavigation = { openForm: jest.fn() };
        const wrapper = ({ children }) => <FSIContainer navigation={undefined}>{children}</FSIContainer>;
        const { result } = renderHook(() => useOpenForm({ formId: undefined, entity: 'mock' }), { wrapper });

        act(() => {
            result.current(3);
        });

        expect(mockNavigation.openForm).toBeCalledTimes(0);
    });
});
