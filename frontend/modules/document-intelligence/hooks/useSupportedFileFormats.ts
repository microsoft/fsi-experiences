import { useFSIContext } from '@fsi/core-components/dist/context/hooks/useFSIContext';
import { useMemo } from 'react';
import { DocumentsFileFormats } from '../constants/DocumentsFileFormats';

export const useSupportedFileFormats = (): string[] => {
    const context = useFSIContext();
    return useMemo(() => {
        try {
            return JSON.parse(context?.envVars?.supportedfiletypes?.value || '{}')?.extensions || DocumentsFileFormats;
        } catch {
            return DocumentsFileFormats;
        }
    }, [context]);
};
