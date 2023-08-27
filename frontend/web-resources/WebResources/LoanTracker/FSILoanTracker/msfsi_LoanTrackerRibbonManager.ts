const LOAN_TRACKER_APP_UNIQUE_NAME = 'msfsi_LoanTracker';
var ribbonDisplayManager: any = window.ribbonDisplayManager || {};

ribbonDisplayManager = {
    isLoanTracker: async function (): Promise<boolean> {
        try {
            const globalContext = Xrm.Utility?.getGlobalContext();
            if (!globalContext) {
                return false;
            }

            const appProperties = await globalContext.getCurrentAppProperties();
            if (appProperties?.uniqueName === LOAN_TRACKER_APP_UNIQUE_NAME) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    },
};
