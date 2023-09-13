export interface ICardFooterProps {
    cardStatus: string;
    isActive: boolean;
    equalStatus: (number) => boolean;
    role: string;
    cardExpiry: Date | undefined;
    embossingName?: string;
}
export interface ICardFooter {
    cardStatus: string;
    isActive: boolean;
    equalStatus: (number) => boolean;
    role: string;
    cardExpiry: Date | undefined;
    embossingName?: string;
}
