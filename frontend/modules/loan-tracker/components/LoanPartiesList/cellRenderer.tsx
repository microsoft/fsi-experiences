import React, { ReactElement } from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { ILoanApplicationCustomer } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { personaStyles, removeApplicantStackStyles, rootStyles } from './cellRenderer.style';
import { TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { translationKeys } from './PartyList.const';
import VerificationStatus from '../VerificationStatus';
import { CommandButton } from '@fluentui/react/lib/components/Button/CommandButton/CommandButton';
import { FontSizes } from '@fluentui/react/lib/Styling';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { VerificationStatusesValues } from '../../interfaces/IVerificationStatus/IVerificationStatusFetcher';

interface ICellRenderer {
    selectedApplicantId: string;
    onChange: (memberId?: string) => void;
    onVerifyToggle: (customer: ILoanApplicationCustomer) => void;
    onRemoveApplicant?: (applicantId: string) => void;
    translate: TranslationFunction;
    hasApplicantPrivilege: (operation: number) => boolean;
    themePrimary: string;
}

const stopPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
};

const cellRenderer =
    ({ onChange, selectedApplicantId, onVerifyToggle, onRemoveApplicant, translate, hasApplicantPrivilege, themePrimary }: ICellRenderer) =>
    (item?: ILoanApplicationCustomer): ReactElement | null => {
        if (!item) {
            return null;
        }

        const isSelected = item.id === selectedApplicantId;

        const editPartyDisabled = !hasApplicantPrivilege(PrivilegeType.Write);
        const deletePartyDisabled = !hasApplicantPrivilege(PrivilegeType.Delete);

        const onChangeCheckbox = (verificationStatus: VerificationStatusesValues) => {
            onVerifyToggle({ ...item, verificationStatus });
        };

        const onClick = () => onChange(item.id);

        /* istanbul ignore next */
        const menuProps = {
            ariaLabel: translate('SR_MORE_ACTIONS_PARTY_NAME', { applicantFullName: item.fullName || '' }),
            items: onRemoveApplicant
                ? [
                      {
                          key: 'removeParty',
                          text: translate('REMOVE_PARTY_BUTTON_TEXT'),
                          ariaLabel: translate('SR_REMOVE_PARTY_NAME', { applicantFullName: item.fullName || '' }),
                          iconProps: { iconName: 'Delete', color: themePrimary },
                          onClick: () => onRemoveApplicant?.(item.id),
                          isDisabled: deletePartyDisabled,
                      },
                  ]
                : [],
        };

        const verificationStatusComponent = (
            <Stack onClick={stopPropagation}>
                <VerificationStatus
                    isDisabled={editPartyDisabled}
                    verificationStatus={item.verificationStatus}
                    onChange={onChangeCheckbox}
                    ariaLabel={translate('SR_PARTY_VERIFIED_CHECKBOX_ARIA_LABEL', { applicantFullName: item.fullName || '' })}
                ></VerificationStatus>
            </Stack>
        );

        return (
            <Stack
                data-is-focusable
                onClick={onClick}
                horizontal
                verticalAlign="center"
                horizontalAlign="space-between"
                styles={rootStyles(isSelected, themePrimary)}
            >
                <Persona
                    styles={personaStyles}
                    text={item.fullName}
                    secondaryText={item.isPrimary ? translate(translationKeys.primaryApplicant) : item.role}
                    showSecondaryText
                    size={PersonaSize.size32}
                />
                {onRemoveApplicant ? (
                    <Stack horizontalAlign="space-between" horizontal styles={removeApplicantStackStyles} verticalAlign="center">
                        {verificationStatusComponent}
                        {!item.isPrimary && (
                            <CommandButton
                                menuIconProps={{ iconName: 'MoreVertical', style: { fontSize: FontSizes.size16 } }}
                                menuProps={menuProps}
                                ariaDescription={translate('SR_MORE_ACTIONS_PARTY_NAME', { applicantFullName: item.fullName || '' })}
                                data-testid="more-button"
                            />
                        )}
                    </Stack>
                ) : (
                    verificationStatusComponent
                )}
            </Stack>
        );
    };

export default cellRenderer;
