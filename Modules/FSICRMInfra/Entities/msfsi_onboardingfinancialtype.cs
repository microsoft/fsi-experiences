namespace Microsoft.CloudForFSI.Tables
{
    using CloudForFSI.OptionSets;

    public partial class msfsi_onboardingfinancialtype : IDeactivatable
    {
        public void Deactivate()
        {
            this.StatusCode = msfsi_onboardingfinancialtype_StatusCode.Inactive;
            this.StateCode = msfsi_onboardingfinancialtypeState.Inactive;
        }
    }
}