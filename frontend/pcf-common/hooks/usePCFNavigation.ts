import { CommonPCFContext } from '../common-props';
import { useMemo } from 'react';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';

export const useNavigation = (context: CommonPCFContext) => {
    const loggerService = useLoggerService();
    return useMemo(() => {
        if (!context) {
            return undefined;
        }

        return {
            openForm: (id: string, name: string, formId?: string) => {
                loggerService.logInteractionOrAction({
                    uniqueName: 'Opening form from PCF',
                });

                context.navigation.openForm({
                    formId,
                    entityId: id,
                    entityName: name,
                });
            },
        };
    }, [context, loggerService]);
};
