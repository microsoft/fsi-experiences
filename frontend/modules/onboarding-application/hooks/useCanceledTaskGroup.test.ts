import {
    task_Canceled_GroupCanceled_Role_NoNav_Stage1,
    task_Done_Group0_Application_ReviewForm_NoStage,
} from './../interfaces/mocks/OnboardingApplicationTask.mock';
import { renderHook } from '@testing-library/react-hooks/pure';
import { waitFor } from '@testing-library/react';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { useCanceledTaskGroup } from './useCanceledTaskGroup';

const postMessageMockFn = jest.fn();
jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () =>
    jest.fn(() => ({
        postMessage: postMessageMockFn,
    }))
);

describe('useCanceledTaskGroup', () => {
    it('should not show canceled tasks message', async () => {
        const { result } = renderHook(() => useCanceledTaskGroup([task_Done_Group0_Application_ReviewForm_NoStage]), {
            wrapper: QueryClientWrapper,
        });

        expect(result.current.setShowCanceledTasksMessage).toBeDefined();
        expect(result.current.showCanceledTasksMessage).toEqual(false);
    });

    it('should show canceled tasks message', async () => {
        const { result } = renderHook(() => useCanceledTaskGroup([task_Canceled_GroupCanceled_Role_NoNav_Stage1]), {
            wrapper: QueryClientWrapper,
        });

        await waitFor(() => {
            expect(result.current.showCanceledTasksMessage).toBeTruthy();
        });
    });
});
