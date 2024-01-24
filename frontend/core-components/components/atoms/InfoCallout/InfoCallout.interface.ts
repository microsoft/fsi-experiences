import { DirectionalHint } from '@fluentui/react/lib/components/Callout';
import { ICalloutContentStyles } from '@fluentui/react/lib/components/Callout/Callout.types';

export interface IInfoCalloutProps {
    iconAriaLabel?: string;
    calloutStyles?: Partial<ICalloutContentStyles>;
    hintDirection?: DirectionalHint;
}
