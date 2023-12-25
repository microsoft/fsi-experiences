import React from "react";
import { ReactElement } from "react";
import { GroupHeader, IGroupHeaderProps } from '@fluentui/react/lib/components/GroupedList/GroupHeader';
import { StickyPositionType } from '@fluentui/react/lib/components/Sticky/Sticky.types';
import { Sticky } from '@fluentui/react/lib/components/Sticky/Sticky';

const onRenderHeader = (props?: IGroupHeaderProps): ReactElement => (
    <Sticky stickyPosition={StickyPositionType.Both}>
        <GroupHeader {...props} />
    </Sticky>
);

export default onRenderHeader;