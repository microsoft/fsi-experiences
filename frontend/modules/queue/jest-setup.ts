import '@testing-library/jest-dom';
import { setup } from '@fsi/core-components/dist/dev-localization-setup';
import { setupMocks } from '@fsi/core-components/dist/jest-setup';
import ApplicationQueueStrings from './assets/strings/Queue/Queue.1033.json';
import { QUEUE_NAMESPACE } from './constants/Queue.const';

setup([
    {
        namespace: QUEUE_NAMESPACE,
        file: ApplicationQueueStrings,
    },
]);

setupMocks();
