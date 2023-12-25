/* istanbul ignore file */

import { useContext } from 'react';
import { DialogServiceContext, IDialogServiceContext } from '../../services/DialogService/DialogService';

export const useDialogService = (): IDialogServiceContext => {
    const context = useContext(DialogServiceContext);

    return context;
};

export default useDialogService;
