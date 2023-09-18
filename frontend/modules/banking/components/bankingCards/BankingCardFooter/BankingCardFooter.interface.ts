export interface ICardFooterProps {
    cardStatus: string;
    isActive: boolean;
    fhiStatus: number;
    role: string;
    cardExpiry: Date | undefined;
    embossingName?: string;
}
export interface ICardFooter {
    cardStatus: string;
    fhiStatus: number;
    isActive: boolean;
    role: string;
    cardExpiry: Date | undefined;
    embossingName?: string;
}
