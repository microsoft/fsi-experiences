import React, { useEffect, useRef } from 'react';
import { CommonPCFContext } from '../../common-props';
import { createModelFromControl } from '../../factories';

export interface IFrameContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    context;
    objectId?: string;
    formId?: string;
    entityName?: string;
}

const componentStyles = { flex: 1, display: 'flex' };

const FCB_EnableFormComponentPCFEmbeddedInSA = 'EnableFormComponentPCFEmbeddedInSA';
const FCB_EnableFormComponentPCFEmbedding = 'EnableFormComponentPCFEmbedding';

const isPCFModelFormFCBEnabled = (context: CommonPCFContext) => {
    if (context.mode.label === 'TestLabel') {
        return false;
    }

    return (
        context.utils.isFeatureEnabled(FCB_EnableFormComponentPCFEmbedding) && context.utils.isFeatureEnabled(FCB_EnableFormComponentPCFEmbeddedInSA)
    );
};

export const ModelFormContainer: React.FC<IFrameContainerProps> = ({ context, objectId, formId, entityName, ...rest }) => {
    const applicationUrl = (window as any).Xrm?.Utility?.getGlobalContext?.().getCurrentAppUrl();
    const id = `${entityName}-${formId}-${objectId}`;
    const srcUrl = `${applicationUrl}&navbar=off&pagetype=entityrecord&etn=${entityName}&id=${objectId}&formid=${formId}`;
    const isValidParams = applicationUrl && formId && entityName && objectId;
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (context && entityName && formId && objectId && divRef.current) {
            const control = createModelFromControl({
                context,
                instanceId: `FSI-ModelFormControl-${entityName}-${formId}`,
                entityName,
                formId,
                objectId,
                params: {
                    displayBusinessProcessFlow: true,
                    displayCommandBar: true,
                    displayHeader: true,
                    displayTabs: true,
                },
            });
            context.factory.bindDOMComponent(control, divRef.current);
            return () => {
                context.factory.unbindDOMComponent(control.getComponentId());
            };
        }
    }, [context, entityName, formId, objectId]);

    if (!isValidParams) {
        return <></>;
    }

    if (isPCFModelFormFCBEnabled(context)) {
        return <div style={componentStyles} ref={divRef} {...rest} />;
    }

    return <iframe key={srcUrl} style={componentStyles} title={context.resources.getString('APPLICATION_DATA')} src={srcUrl} id={id} {...rest} />;
};

export default ModelFormContainer;
