function formOnLoad(executionContext: any, tabName: string, sectionName: string, artifactTypeValue: number) {
    const formContext = executionContext.getFormContext();
    formContext.getAttribute('msfsi_fhlookupplaceholder')?.setSubmitMode('never');
}
