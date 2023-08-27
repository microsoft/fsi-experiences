const parameterName = 'ArtifactType';
const operationName = 'msfsi_RetrieveSupportedArtifacts';

function createRequest(artifactTypeValue: number) {
    return {
        [parameterName]: artifactTypeValue,
        getMetadata: () => {
            return {
                boundParameter: null,
                parameterTypes: {
                    [parameterName]: {
                        typeName: 'Edm.Int32',
                        structuralProperty: 1,
                    },
                },
                operationType: 0,
                operationName,
            };
        },
    };
}

async function isSectionSupported(request: any): Promise<boolean> {
    try{
        const response = await Xrm.WebApi.online.execute(request).then(response => response.json());
        return response.value.length > 0;
    }
    catch {
        return false;
    }
}

function formOnLoad(executionContext: any, tabName: string, sectionName: string, artifactTypeValue: number) {
    const formContext = executionContext.getFormContext();
    formContext.getAttribute('msfsi_fhlookupplaceholder')?.setSubmitMode('never');
}
