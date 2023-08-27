declare class CustomControlSeeMoreStyleHelper {
    private _disablingScrollStyle;
    private _popupCount;
    static getInstance(): CustomControlSeeMoreStyleHelper;
    seeMoreOpen(): void;
    seeMoreClose(): void;
    getPopupCount(): number;
    getDisableScrollStyle(): boolean;
    setDisableScrollStyle(value: boolean): void;
}
export { CustomControlSeeMoreStyleHelper };
