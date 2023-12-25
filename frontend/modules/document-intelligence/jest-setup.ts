import '@testing-library/jest-dom';
import { setup } from '@fsi/core-components/dist/dev-localization-setup';
import { setupMocks } from '@fsi/core-components/dist/jest-setup';
import DIStrings from './assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { DI_NAMESPACE } from './constants/DocumentIntelligence.const';

setup([{
    namespace: DI_NAMESPACE,
    file: DIStrings
}]);

setupMocks()