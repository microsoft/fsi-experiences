import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { ILoanApplicationCustomer } from '../../interfaces/ILoanApplicationCustomer/ILoanApplicationCustomer';
import cellRenderer from './cellRenderer';
import { responsiveApplicantListStackStyles, responsiveApplicantListStyles, wrapperStyles } from './PartyList.style';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { Spinner } from '@fluentui/react/lib/components/Spinner/Spinner';
import { SpinnerSize } from '@fluentui/react/lib/components/Spinner/Spinner.types';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Dropdown } from '@fluentui/react/lib/components/Dropdown/Dropdown';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { Persona } from '@fluentui/react/lib/components/Persona/Persona';
import { PersonaSize } from '@fluentui/react/lib/components/Persona/Persona.types';
import { translationKeys } from './PartyList.const';
import VerificationStatus from '../VerificationStatus';
import { IComboBoxOption } from '@fluentui/react/lib/components/ComboBox/ComboBox.types';
import { ResponsiveMode } from '@fluentui/react/lib/utilities/decorators/withResponsiveMode';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { FontSizes } from '@fluentui/react/lib/Styling';
import { TooltipHost } from '@fluentui/react/lib/components/Tooltip/TooltipHost';
import useMediaQueryListener from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { CommandButton } from '@fluentui/react/lib/components/Button/CommandButton/CommandButton';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { maxWidthPartyListMediaChange } from '../../styles/Common.style';
import { VerificationStatusesValues } from '../../interfaces/IVerificationStatus/IVerificationStatusFetcher';

interface IPartyListProps {
    items?: ILoanApplicationCustomer[];
    selectedApplicantId: string;
    onChange: (memberId?: string) => void;
    onVerifyToggle: (customer: ILoanApplicationCustomer) => void;
    onAddApplicant?: () => void;
    onRemoveApplicant?: (applicantId: string) => void;
    isLoading?: boolean;
    isError?: boolean;
    isLoanLocked?: boolean;
    hasApplicantPrivilege: (operation: number) => boolean;
}

const stopPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
};

const ResponsivePartyList: FC<IPartyListProps> = props => {
    const { items, onChange, selectedApplicantId, onVerifyToggle, onAddApplicant, onRemoveApplicant, hasApplicantPrivilege } = props;
    const {
        palette: { themePrimary },
    } = useTheme();

    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);
    const applicantsOptions = useMemo(() => items!.map(item => ({ key: item.id, text: item.fullName, data: item })), [items]);
    const selectedApplicant = useMemo(() => items!.find(item => item.id === selectedApplicantId), [items, selectedApplicantId]);
    const moreActionsButtonRef = useRef<HTMLButtonElement>(null);

    const addPartyDisabled = !hasApplicantPrivilege(PrivilegeType.Create);
    const editPartyDisabled = !hasApplicantPrivilege(PrivilegeType.Write);
    const deletePartyDisabled = !hasApplicantPrivilege(PrivilegeType.Delete);

    /* istanbul ignore next */
    useEffect(() => {
        let timeoutID;
        if (moreActionsButtonRef?.current) {
            // grab a screen reader's/keyboard focus after the item has been created
            timeoutID = setTimeout(() => {
                moreActionsButtonRef.current?.focus();
            }, 500);
        }
        return () => {
            clearTimeout(timeoutID);
        };
    }, [selectedApplicant]);

    /* istanbul ignore next */
    const menuProps: IContextualMenuProps = useMemo(() => {
        const items: IContextualMenuItem[] = [];
        if (onAddApplicant) {
            items.push({
                key: 'addParty',
                text: translate('ADD_NEW_PARTY_BUTTON'),
                iconProps: { iconName: 'Add', color: themePrimary },
                onClick: onAddApplicant,
                disabled: addPartyDisabled,
            });
        }
        if (!selectedApplicant?.isPrimary && onRemoveApplicant) {
            items.push({
                key: 'removeParty',
                text: translate('REMOVE_PARTY_BUTTON_TEXT'),
                ariaLabel: translate('SR_REMOVE_PARTY_NAME', { applicantFullName: selectedApplicant?.fullName || '' }),
                iconProps: { iconName: 'Delete', color: themePrimary },
                onClick: () => onRemoveApplicant?.(selectedApplicant?.id || ''),
                disabled: deletePartyDisabled,
            });
        }

        return { items, ariaLabel: translate('SR_MORE_ACTIONS_PARTY_NAME', { applicantFullName: selectedApplicant?.fullName || '' }) };
    }, [onAddApplicant, onRemoveApplicant, selectedApplicant]);

    /* istanbul ignore next */
    const onRenderOption = (option: IDropdownOption | undefined) => {
        return (
            <Persona
                data-testid="applicant-persona"
                text={option?.data.fullName}
                secondaryText={option?.data.isPrimary ? translate(translationKeys.primaryApplicant) : option?.data.role}
                size={PersonaSize.size24}
                showSecondaryText={true}
            />
        );
    };

    const onChangeCheckbox = (verificationStatus: VerificationStatusesValues) => {
        if (selectedApplicant) {
            onVerifyToggle({ ...selectedApplicant, verificationStatus });
        }
    };

    /* istanbul ignore next */
    const onRenderTitle = (options?: IComboBoxOption[]) => {
        const selectedOption = options?.[0].data;
        if (!selectedOption) return null;
        const role = selectedOption.isPrimary ? translate('PRIMARY_APPLICANT') : selectedOption.role;
        return (
            <Persona
                data-testid="title-persona"
                styles={{ root: { height: 'auto' } }}
                text={selectedOption.fullName}
                onRenderPrimaryText={() => (
                    <TooltipHost content={`${selectedOption.fullName} - ${role}`} id="applicant-data">
                        <span style={{ fontSize: FontSizes.size14 }}>
                            <b style={{ fontWeight: 600 }}>{selectedOption.fullName}</b> - {role}
                        </span>
                    </TooltipHost>
                )}
                size={PersonaSize.size24}
            />
        );
    };

    /* istanbul ignore next */
    const onClick = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => onChange(option!.key.toString());

    return (
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }} styles={responsiveApplicantListStackStyles}>
            <Dropdown
                data-testid="applicants-dropdown"
                styles={responsiveApplicantListStyles}
                options={applicantsOptions}
                onRenderOption={onRenderOption}
                onChange={onClick}
                onRenderTitle={onRenderTitle}
                responsiveMode={ResponsiveMode.unknown}
                selectedKey={selectedApplicantId}
                ariaLabel={translate('APPLICANTS')}
            />
            {selectedApplicant && (
                <Stack onClick={stopPropagation} verticalAlign="center">
                    <VerificationStatus
                        isDisabled={editPartyDisabled}
                        verificationStatus={selectedApplicant.verificationStatus}
                        onChange={onChangeCheckbox}
                        ariaLabel={translate('SR_PARTY_VERIFIED_CHECKBOX_ARIA_LABEL', { applicantFullName: selectedApplicant.fullName || '' })}
                    />
                </Stack>
            )}
            {onAddApplicant && onRemoveApplicant && (
                <CommandButton
                    elementRef={moreActionsButtonRef}
                    menuIconProps={{ iconName: 'MoreVertical', style: { fontSize: FontSizes.size16 } }}
                    menuProps={menuProps}
                    ariaDescription={translate('SR_MORE_ACTIONS_PARTY_NAME', { applicantFullName: selectedApplicant?.fullName || '' })}
                    data-testid="more-button"
                />
            )}
        </Stack>
    );
};

export const PartyList: FC<IPartyListProps> = props => {
    const { items, isLoanLocked, hasApplicantPrivilege, isLoading, isError, onChange, selectedApplicantId, onVerifyToggle, onRemoveApplicant } =
        props;

    const {
        palette: { themePrimary },
    } = useTheme();
    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);
    const onRenderCell = useCallback(
        cellRenderer({ onChange, selectedApplicantId, onVerifyToggle, onRemoveApplicant, translate, hasApplicantPrivilege, themePrimary }),
        [onChange, selectedApplicantId, isLoanLocked, onVerifyToggle, onRemoveApplicant, translate, themePrimary]
    );

    const isMediaMatched = useMediaQueryListener(`screen and (max-width: ${maxWidthPartyListMediaChange}px)`, window.parent);

    /* istanbul ignore next */
    if (isLoading) {
        return (
            <Stack styles={wrapperStyles} verticalAlign="center">
                <Spinner size={SpinnerSize.large} label={translate('CONNECTING_WITH_DATA')} />
            </Stack>
        );
    }

    /* istanbul ignore next */
    if (isError || !items) {
        return <ErrorState styles={{ container: wrapperStyles }} />;
    }

    return (
        <Stack styles={wrapperStyles}>
            <FocusZone direction={FocusZoneDirection.horizontal}>
                {isMediaMatched ? (
                    <ResponsivePartyList {...props} />
                ) : (
                    <List key={selectedApplicantId + isLoanLocked} items={items} onRenderCell={onRenderCell} />
                )}
            </FocusZone>
        </Stack>
    );
};
