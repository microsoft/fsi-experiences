import '@testing-library/jest-dom';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import { setup } from './dev-localization-setup';
setup();

export const setupMocks = () =>{
    // Suppress icon warnings.
    setIconOptions({
        disableWarnings: true,
    });
    Object.defineProperty(window, 'ResizeObserver', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        })),
    });
    
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
}

setupMocks()
