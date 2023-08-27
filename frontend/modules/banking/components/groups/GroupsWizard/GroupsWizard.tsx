import React, { FC, useState, useContext, useMemo } from 'react';
import { mainViewContentStyles, modalStyles, rootStyle, contentStyles } from './GroupsWizard.style';
import { IGroupMember, IGroupFinancialHolding } from '../../../interfaces/Groups';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import cloneDeep from 'lodash/cloneDeep';
import { WizardMessageBar } from '@fsi/core-components/dist/components/atoms/WizardStep';
import Wizard from '@fsi/core-components/dist/components/containers/Wizard/Wizard';
import { Modal } from '@fluentui/react/lib/Modal';
import { GroupDetailsComponent } from '../GroupWizardViews/GroupDetailsComponent';
import HighlightMessageBar from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar';
import { IStep } from '@fsi/core-components/dist/components/containers/Wizard';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { GroupsContext } from '../contexts/GroupsContext';
import { GroupFinancialHoldingsComponent, GroupMembersComponent } from '../GroupWizardViews';
import { GROUPS_WIZARD_RESPONSIVE_CLASS } from './GroupsWizard.const';
import useResponsiveContainer from '@fsi/core-components/dist/context/hooks/useResponsiveContainer';

interface IGroupsWizard {
    data: any;
    stepToBeOpened: number;
    onCancelClicked: () => void;
    onSaveClicked: (beforeChange: any, afterChange: any) => void;
}

const GroupWizard: FC<IGroupsWizard> = ({ data, stepToBeOpened, onCancelClicked, onSaveClicked }) => {
    const { ref, columns: responsiveColumns, className } = useResponsiveContainer(GROUPS_WIZARD_RESPONSIVE_CLASS);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const groupsContext = useContext(GroupsContext);
    const [dataCopy, setDataCopy] = useState<any>(cloneDeep(data));
    const [messageBarData, setMessageBarData] = useState<{ type: MessageBarType; msg: WizardMessageBar }>({ type: MessageBarType.info, msg: {} });
    const [isMessageBarShown, setIsBarMessageShown] = useState<boolean>(false);

    const onSaveClick = () => {
        onSaveClicked(data, dataCopy);
        onCancelClicked();
    };

    /* istanbul ignore next*/
    const steps: IStep[] = useMemo(() => {
        const updateMessageBar = (type: MessageBarType, msg: WizardMessageBar) => {
            setIsBarMessageShown(true);
            setMessageBarData({ type, msg });
        };
        const isCustomerMainGroup = (m: IGroupMember): boolean => m.customer.id === groupsContext.mainCustomer.id && m.IsPrimaryGroup;
        const hasOtherMainGroup = (type, id) => groupsContext.groups.some(g => g.type === type && g.id !== id && g.members.some(isCustomerMainGroup));
        const isPrimaryDisabled = data.id ? data?.members.some(isCustomerMainGroup) : !hasOtherMainGroup(dataCopy.type, data.id);

        const handleDataChanged = (fields: string[], val: any[]): void => {
            const updated = {};
            fields.forEach((field, i) => (updated[field] = val[i]));
            setDataCopy(prevState => ({ ...prevState, ...updated }));
        };

        const isGroupDetailsCompleted = !!dataCopy?.name?.length;
        const isGroupMembersCompleted = !!dataCopy?.members.length && !!dataCopy?.primaryMember?.length;
        const isGroupHoldingCompleted = !!dataCopy?.members.length && !!dataCopy?.financialHoldings && !!dataCopy?.financialHoldings?.length;

        return [
            {
                name: translate('DETAILS_WIZARD_STEP'),
                isCompleted: isGroupDetailsCompleted,
                isMoveForward: isGroupDetailsCompleted,
                ViewComp: (
                    <GroupDetailsComponent
                        isPrimaryDisabled={isPrimaryDisabled}
                        isGroupsTypeDisabled={!!data.id}
                        group={dataCopy}
                        onUpdateMessageBar={updateMessageBar}
                        onDataChanged={handleDataChanged}
                        hasOtherMainGroup={hasOtherMainGroup}
                    />
                ),
            },
            {
                name: translate('MEMBERS_WIZARD_STEP'),
                isCompleted: isGroupMembersCompleted,
                isMoveForward: isGroupMembersCompleted,
                isDisabled: !isGroupDetailsCompleted,
                ViewComp: (
                    <GroupMembersComponent
                        responsiveColumns={responsiveColumns}
                        group={dataCopy}
                        onUpdateMessageBar={updateMessageBar}
                        originalPrimaryMember={data.primaryMember}
                        onDataChanged={(data: { field: string; val: any }[]) => {
                            const updatedGroup = { ...dataCopy };

                            for (const groupDataEntries of data) {
                                switch (groupDataEntries.field) {
                                    case 'members': {
                                        updatedGroup.members = groupDataEntries.val as IGroupMember[];
                                        updatedGroup.financialHoldings = dataCopy.financialHoldings?.filter(fh =>
                                            fh.owners.some(o => updatedGroup.members.find(m => m.customer.id === o.contact.contactId) !== undefined)
                                        );
                                        break;
                                    }
                                    case 'primaryMember': {
                                        updatedGroup.primaryMember = groupDataEntries.val as string;
                                        break;
                                    }
                                    default:
                                        break;
                                }
                            }

                            setDataCopy(updatedGroup);
                        }}
                    />
                ),
            },
            {
                name: translate('HOLDING_WIZARD_STEP'),
                isCompleted: isGroupHoldingCompleted,
                isDisabled: !isGroupMembersCompleted || !isGroupDetailsCompleted,
                ViewComp: (
                    <GroupFinancialHoldingsComponent
                        members={dataCopy.members}
                        groupId={dataCopy.id}
                        financialHoldings={dataCopy.financialHoldings}
                        onUpdateMessageBar={updateMessageBar}
                        onDataChanged={(financialHoldings: IGroupFinancialHolding[]) => setDataCopy({ ...dataCopy, financialHoldings })}
                    />
                ),
            },
        ];
    }, [dataCopy, responsiveColumns]);

    return (
        <Modal styles={modalStyles} titleAriaId="wizard-title" isOpen onDismiss={onCancelClicked} isBlocking={true}>
            <div ref={ref} className={className} style={rootStyle}>
                <Wizard
                    hasCloseIcon
                    firstStep={stepToBeOpened}
                    steps={steps}
                    header={data.id ? data.name : translate('CREATE_GROUP')}
                    onSave={onSaveClick}
                    onCancel={onCancelClicked}
                    showCompletedWhileDirty={!data.id}
                    mainViewContentStyles={mainViewContentStyles}
                    contentStyles={contentStyles}
                    isStepDropdown={!!responsiveColumns && responsiveColumns < 5}
                >
                    {isMessageBarShown && (
                        <HighlightMessageBar
                            styles={{ root: { minHeight: 'auto' } }}
                            messageBarType={messageBarData?.type}
                            data-testid="wizard-message-bar"
                            highlight={messageBarData.msg.bold}
                            regular={messageBarData.msg.regular}
                        />
                    )}
                </Wizard>
            </div>
        </Modal>
    );
};
export default GroupWizard;
