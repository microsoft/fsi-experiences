import React from 'react';

export interface IScreenReaderTextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    id: string;
    children: string;
}
