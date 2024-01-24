import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { FSIContainer } from '@fsi/core-components/dist/context/FSIContext';
import { useSupportedFileFormats } from './useSupportedFileFormats';
import { DocumentsFileFormats } from '../constants';
import { IEnvVars } from '@fsi/core-components/context/FSIContext';

describe('useSupportedFileFormats tests', () => {
    const createEnvVarse = (supportedTypesValue: string): IEnvVars => {
        return {
            supportedfiletypes: {
                defaultvalue: '',
                value: supportedTypesValue,
            },
        };
    };

    it('Env vars with valid value should return envVars value', async () => {
        const envVarJson = {
            extensions: ['pdf'],
        };
        const wrapper = ({ children }) => <FSIContainer envVars={createEnvVarse(JSON.stringify(envVarJson))}>{children}</FSIContainer>;

        const { result } = renderHook(() => useSupportedFileFormats(), { wrapper });

        expect(result.current).toEqual(envVarJson.extensions);
    });

    it('Empty env vars should return default types formats', async () => {
        const wrapper = ({ children }) => <FSIContainer envVars={{}}>{children}</FSIContainer>;

        const { result } = renderHook(() => useSupportedFileFormats(), { wrapper });

        expect(result.current).toEqual(DocumentsFileFormats);
    });

    it('Env vars missing extensions should return default types formats', async () => {
        const wrapper = ({ children }) => <FSIContainer envVars={createEnvVarse('{"field": "value"}')}>{children}</FSIContainer>;

        const { result } = renderHook(() => useSupportedFileFormats(), { wrapper });

        expect(result.current).toEqual(DocumentsFileFormats);
    });

    it('Invalid env vars should return default types formats', async () => {
        const wrapper = ({ children }) => <FSIContainer envVars={createEnvVarse('{ not a valid jason')}>{children}</FSIContainer>;

        const { result } = renderHook(() => useSupportedFileFormats(), { wrapper });

        expect(result.current).toEqual(DocumentsFileFormats);
    });
});
