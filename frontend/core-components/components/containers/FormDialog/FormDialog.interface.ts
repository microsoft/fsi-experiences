import { UseFormProps } from 'react-hook-form/dist/types/form';
import { UseMutationOptions } from 'react-query';
import { ICustomDialogProps } from '../Dialog';

export interface IFormDialogProps extends Omit<ICustomDialogProps, 'onAccept'> {
    onSubmit: () => Promise<any>;
    loadingProps: {
        text?: string;
    };
    errorProps: {
        title: string;
        message?: string;
    };
    mutationOptions?: UseMutationOptions<any> | UseMutationOptions<any, any, any>;
    formProps?: UseFormProps;
}
