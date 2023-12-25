/* istanbul ignore file */
import React from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

export const testingQueryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
});

export const QueryClientWrapper = ({ children }) => (
    <QueryClientProvider client={testingQueryClient} contextSharing={true}>
        {children}
    </QueryClientProvider>
);

const ProviderWrapper = Component => props =>
    (
        <QueryClientWrapper>
            <Component {...props} />
        </QueryClientWrapper>
    );

export default ProviderWrapper;
