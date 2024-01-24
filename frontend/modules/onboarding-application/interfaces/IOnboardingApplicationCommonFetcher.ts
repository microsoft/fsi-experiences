export interface IOnboardingApplicationCommonFetcher {
    fetchBPFName(): Promise<string | undefined>;
    fetchActiveBPFStage(bpfName: string): Promise<string | undefined>;
    fetchActiveStageName(bpfstage: string): Promise<string | undefined>;
}
