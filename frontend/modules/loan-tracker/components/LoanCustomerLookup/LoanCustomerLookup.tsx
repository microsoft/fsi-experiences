import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { useQuery } from 'react-query';
import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import { PartyList } from '../LoanPartiesList';
import { useMediaQueryListener } from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { maxWidthPartyListMediaChange } from '../../styles/Common.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import useDialogService from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { loanPartiesQuery } from '../../constants/LoanQueries.consts';
import { ILoanCustomerLookupFetcher } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomerLookupFetcher';
import { ILoanApplicationCustomer } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';
import { addPartyButtonStyles } from './LoanCustomerLookup.style';
import { AddNewPartyDialog } from './AddNewPartyDialog/AddNewPartyDialog';
import { RemovePartyDialog } from './RemovePartyDialog/RemovePartyDialog';
import { ADD_PARTY_DIALOG_ID, emptyApplicantData, REMOVE_PARTY_DIALOG_ID } from '../../constants/LoanCustomer.consts';
import useLoanCustomerLookup from '../../hooks/useLoanCustomer/useLoanCustomer';

export const customerLookupButtonFocusTimeout = 300;

interface LoanCustomerLookupProps {
    fetcher: ILoanCustomerLookupFetcher;
    loanApplicationId: string;
    onApplicantSelectCallback?: (guid: string) => void;
}

export const LoanCustomerLookup: FC<LoanCustomerLookupProps> = ({ fetcher, loanApplicationId, onApplicantSelectCallback }) => {
    const { data: roles, isError: isRolesError, isLoading: areRolesLoading } = useQuery('loan-roles-query', () => fetcher.getRoles());

    const { postMessage } = useBrowserCommunication('loan-popup-notification', window.parent);

    /* istanbul ignore next */
    const onAddApplicantSuccessCallback = (addedCustomer: ILoanApplicationCustomer) => {
        const role = roles?.find(role => role.key === addedCustomer.role);
        const addedNotificationMessage = translate('ADD_NEW_PARTY_POPUP_NOTIFICATION_TEXT', {
            role: role?.text || '',
            applicantFullName: addedCustomer.fullName,
        });
        postMessage(addedNotificationMessage);
    };

    /* istanbul ignore next */
    const onRemoveApplicantSuccessCallback = (removedApplicantfullName: string, removedApplicantRole: string) => {
        const removedNotificationMessage = translate('REMOVE_PARTY_POPUP_NOTIFICATION_TEXT', {
            role: removedApplicantRole,
            applicantFullName: removedApplicantfullName,
        });
        postMessage(removedNotificationMessage);
    };

    const {
        isLoanLocked,
        applicants,
        selectedApplicantId,
        onChangeApplicant,
        onVerifyToggle,
        addApplicantMutationFunc,
        removeApplicantMutationFunc,
        isLoading,
        isError,
        hasApplicantPrivilege,
    } = useLoanCustomerLookup({
        queryName: loanPartiesQuery,
        fetcher,
        loanApplicationId,
        onApplicantSelectCallback,
        onAddApplicantSuccessCallback,
        onRemoveApplicantSuccessCallback,
    });

    const isMediaMatched = useMediaQueryListener(`screen and (max-width: ${maxWidthPartyListMediaChange}px)`, window.parent);

    const { currentDialogId, isOpen, hideDialog, showDialog } = useDialogService();
    const customerLookupButton = useRef<HTMLButtonElement>(null);

    const [applicantIdToRemove, setApplicantIdToRemove] = useState(selectedApplicantId);

    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);

    /* istanbul ignore next */
    useEffect(() => {
        /* NOTE: This intended for `Parties information` tab where we can't control most of the HTML, doing the same in `partiesTab.css` only is not enough in this case */
        const partiesInformationTab = document.getElementById('parties_information_tab');

        if (!partiesInformationTab) return;

        if (isMediaMatched) {
            partiesInformationTab?.style.setProperty('flex-grow', '0');
            partiesInformationTab?.style.setProperty('flex-basis', '100%');
        } else {
            partiesInformationTab?.removeAttribute('style');
        }
    }, [isMediaMatched]);

    const onAddNewPartyClick = () =>
        showDialog(ADD_PARTY_DIALOG_ID, { triggerButton: customerLookupButton.current, triggerFocusTimeout: customerLookupButtonFocusTimeout });

    const onRemovePartyClick = (applicantId: string) => {
        setApplicantIdToRemove(applicantId);
        showDialog(REMOVE_PARTY_DIALOG_ID, { triggerButton: customerLookupButton.current, triggerFocusTimeout: customerLookupButtonFocusTimeout });
    };

    const onAddApplicantMutationFunc = async (newApplicantData: ILoanApplicationCustomer) => {
        await addApplicantMutationFunc!(newApplicantData);
        hideDialog();
    };

    const onRemoveApplicantMutationFunc = async (applicantId: string) => {
        await removeApplicantMutationFunc!(applicantId);
        hideDialog();
    };

    const applicantToRemove = useMemo(() => applicants?.find(applicant => applicant.id === applicantIdToRemove), [applicants, applicantIdToRemove]);

    const addPartyDisabled = !hasApplicantPrivilege(PrivilegeType.Create);
    const canShowAddPartyButton = !isError && !isRolesError && !isLoading && !areRolesLoading && !isMediaMatched;

    return (
        <>
            <Stack>
                <PartyList
                    isLoanLocked={isLoanLocked}
                    hasApplicantPrivilege={hasApplicantPrivilege}
                    items={applicants}
                    selectedApplicantId={selectedApplicantId}
                    onChange={onChangeApplicant}
                    onVerifyToggle={onVerifyToggle}
                    onAddApplicant={onAddNewPartyClick}
                    onRemoveApplicant={onRemovePartyClick}
                    isLoading={isLoading || areRolesLoading}
                    isError={isError || isRolesError}
                />
                {canShowAddPartyButton && (
                    <ActionButton
                        disabled={addPartyDisabled}
                        iconProps={{ iconName: 'Add' }}
                        onClick={onAddNewPartyClick}
                        styles={addPartyButtonStyles}
                        data-testid="add-party-button"
                        elementRef={customerLookupButton}
                    >
                        {translate('ADD_NEW_PARTY_BUTTON')}
                    </ActionButton>
                )}
            </Stack>
            <AddNewPartyDialog
                roles={roles || []}
                isOpen={isOpen && currentDialogId === ADD_PARTY_DIALOG_ID}
                title={translate('ADD_NEW_PARTY_DIALOG_TITLE')}
                onSubmitMutationFunc={onAddApplicantMutationFunc}
                onCancel={hideDialog}
                onDismiss={hideDialog}
            />
            <RemovePartyDialog
                isOpen={isOpen && currentDialogId === REMOVE_PARTY_DIALOG_ID}
                applicantToRemove={applicantToRemove || emptyApplicantData}
                title={translate('REMOVE_PARTY_CONFIRMATION_DIALOG_TITLE_TEXT')}
                onSubmitMutationFunc={onRemoveApplicantMutationFunc}
                onCancel={hideDialog}
                onDismiss={hideDialog}
            />
        </>
    );
};
export default LoanCustomerLookup;
