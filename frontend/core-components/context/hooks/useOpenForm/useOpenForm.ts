import { useCallback, useContext } from 'react';
import FSIContext from '../../FSIContext';

export const useOpenForm = ({ formId = '', entity }) => {
    const { navigation } = useContext(FSIContext);

    const openForm = useCallback(id => navigation?.openForm(id, entity, formId), [navigation, entity, formId]);

    return openForm;
};
