import { ILinkProps } from '@fluentui/react/lib/components/Link/Link.types';
import { IMessageBarProps } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';

export interface IHighlightMessageBarProps extends IMessageBarProps {
    highlight?: string;
    regular?: string;
    linkProps?: ILinkProps & { text?: string };
}
