import { CommonPCFContext } from '../common-props';

interface IModelFormParams {
    displayCommandBar?: boolean;
    displayHeader?: boolean;
    displayBusinessProcessFlow?: boolean;
    displayTabs?: boolean;
}

const getBooleanParam = (bool = false): string => bool.toString();
export const createModelFromControl = ({
    context,
    instanceId,
    entityName,
    formId,
    objectId,
    params,
}: {
    context: CommonPCFContext;
    instanceId: string;
    entityName: string;
    formId: string;
    objectId?: string;
    params?: IModelFormParams;
}) =>
    context.factory.createComponent('MscrmControls.ModelForm.ModelFormControl', instanceId, {
        id: instanceId,
        key: instanceId,
        descriptor: {
            Disabled: false,
            Name: instanceId,
            Id: instanceId,
            Label: '',
            ShowLabel: false,
            Visible: true,
        },
        parameters: {
            QuickForms: {
                Usage: 1,
                Type: 'SingleLine.String',
                Primary: false,
                Static: true,
                Value: `<QuickForms><QuickFormIds><QuickFormId entityname="${entityName}">${formId}</QuickFormId></QuickFormIds></QuickForms>`,
            },

            DisplayCommandbar: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: getBooleanParam(params?.displayCommandBar),
                Usage: 1,
            },
            DisplayHeader: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: getBooleanParam(params?.displayHeader),
                Usage: 1,
            },
            DisplayBusinessProcessFlow: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: getBooleanParam(params?.displayBusinessProcessFlow),
                Usage: 1,
            },
            DisplayTabs: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: getBooleanParam(params?.displayTabs),
                Usage: 1,
            },
            ShowSectionBordersInSmallViewports: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: 'true',
                Usage: 1,
            },
            EnableBackground: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: 'true',
                Usage: 1,
            },
            SaveMode: {
                Static: true,
                Primary: false,
                Type: 'Enum', //Manifest Parameter Type
                Value: 1,
                Usage: 1,
            },
            Width: {
                Static: true,
                Primary: false,
                Type: 'SingleLine.Text', //Manifest Parameter Type
                Value: '100%',
                Usage: 1,
            },
            Height: {
                Static: true,
                Primary: false,
                Type: 'SingleLine.Text', //Manifest Parameter Type
                Value: '100%',
                Usage: 1,
            },
            value: {
                Value: [{ entityType: entityName, TypeName: entityName, id: objectId }],
                Usage: 1,
                Type: 'Lookup.Simple',
                Static: true,
                Primary: false,
            },
        },
    });
