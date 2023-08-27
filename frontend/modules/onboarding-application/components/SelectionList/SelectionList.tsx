import React, { FC, useMemo } from 'react';
import { List, IListProps } from '@fluentui/react/lib/List';
import { rootStyles } from './SelectionList.style';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import cellRenderer from './cellRenderer';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { APPLICANT_LIST_NAMESPACE } from '../../constants/namespaces.const';
import { IApplicantWithTask } from '../../interfaces/IApplicantWithTask';

interface ISelectionList extends IListProps {
    applicants?: IApplicantWithTask[];
    value?: string;
    onChange: (item: any) => void;
    processStage?: string;
    disableTaskUpdate?: boolean;
}

const SelectionList: FC<ISelectionList> = ({ onChange, value, applicants, processStage, disableTaskUpdate }) => {
    const translate = useTranslation(APPLICANT_LIST_NAMESPACE);

    return (
        <Stack grow>
            <FocusZone direction={FocusZoneDirection.vertical}>
                <List
                    style={{ flex: 1 }}
                    key={`${value}.${processStage}`}
                    items={applicants}
                    onRenderCell={cellRenderer({ onChange, value, translate, processStage, disableTaskUpdate })}
                />
            </FocusZone>
        </Stack>
    );
};

export default SelectionList;
