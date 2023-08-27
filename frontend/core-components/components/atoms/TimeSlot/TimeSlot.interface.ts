export interface ITimeSlotProps {
    time: Date;
    itemIndex: number;
    isSelected?: boolean;
    onSelect: () => void;
    timeFormat?: Intl.DateTimeFormatOptions;
}
