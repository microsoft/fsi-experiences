/* istanbul ignore file */
import { CollapseAllVisibility, DetailsHeader, IDetailsListProps } from '@fluentui/react/lib/components/DetailsList';
import React from 'react';

const renderDetailsHeader: ({ showCheckboxes }) => IDetailsListProps['onRenderDetailsHeader'] =
    ({ showCheckboxes }) =>
    props => {
        if (!props) {
            return null;
        }
        return <DetailsHeader {...props} collapseAllVisibility={showCheckboxes ? CollapseAllVisibility.hidden : CollapseAllVisibility.visible} />;
    };

export default renderDetailsHeader;
