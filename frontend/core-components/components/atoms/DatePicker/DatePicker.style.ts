import { prefixClassName } from '../../../constants/prefixClassNames';
export const baseClassName = `${prefixClassName}datepicker`;
export const underlinedBaseClass = `${baseClassName}--underlined`;
import { ICalendarStyles } from '@fluentui/react/lib/components/Calendar';

export const datePickerStyles = (label?: string) => {
    const datepickerRequiredStyles = label
        ? {
              selectors: {
                  ':before': {
                      content: "''",
                  },
              },
          }
        : {};

    return {
        root: {
            width: '300px',
            selectors: {
                [` .ms-TextField-fieldGroup`]: {
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    ...datepickerRequiredStyles,
                },
            },
        },
        label: {
            marginBottom: '0.5rem',
        },
    };
};

export const calendarStyles: ICalendarStyles = {
    root: {
        height: '260px',
        ['@media (max-width: 480px)']: {
            flexDirection: 'column',
            width: '220px',
            height: 'auto',
        },
    },
    divider: {},
    goTodayButton: {},
    monthPickerWrapper: {},
    liveRegion: {},
};
