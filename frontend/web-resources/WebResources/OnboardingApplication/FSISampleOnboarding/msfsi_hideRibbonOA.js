const OA_UNIQUE_NAME = 'msfsi_SampleOnboarding';

var ribbonManagerOA = {
    hideRibbon: async function () {
        try {
            const globalContext = Xrm.Utility?.getGlobalContext();
            if (!globalContext) {
                return true;
            }

            const appProperties = await globalContext.getCurrentAppProperties();
            if (appProperties?.uniqueName === OA_UNIQUE_NAME) {
                return false;
            }
            return true;
        } catch (e) {
            return true;
        }
    },
};
