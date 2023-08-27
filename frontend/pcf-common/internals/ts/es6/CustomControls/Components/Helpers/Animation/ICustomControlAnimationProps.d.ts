interface ICustomControlAnimationProps {
    startWidth: number;
    startHeight: number;
    startTop: number;
    startLeft: number;
    endHeight: number;
    endWidth: number;
    endHeightInner: number;
    endWidthInner: number;
    endTop: number;
    endLeft: number;
    isRTL: boolean;
    zIndex: number;
}
declare enum SeeMoreStatus {
    NotInUse = -1,
    PopFadeOutAndMove = 0,
    PopFadeIn = 1,
    PoppedOut = 2,
    ReturnFadeOutAndMove = 3,
    ReturnFadeIn = 4
}
export { ICustomControlAnimationProps, SeeMoreStatus };
