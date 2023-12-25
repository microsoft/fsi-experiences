import { useRelatedPartyInfo } from './useRelatedPartyInfo';
import { renderHook } from '@testing-library/react-hooks/pure';

describe('useRelatedPartyInfo', () => {
    it('should return primary', async () => {
        const { result } = renderHook(() => useRelatedPartyInfo());
        expect(result.current.getRelatedPartyRole({ isPrimary: true, role: 'Co-signer', id: '123', name: '123' })).toEqual('Primary applicant');
    });

    it('should return role', () => {
        const { result } = renderHook(() => useRelatedPartyInfo());
        expect(result.current.getRelatedPartyRole({ isPrimary: false, role: 'Co-signer', id: '123', name: '123' })).toEqual('Co-signer');
    });
});
