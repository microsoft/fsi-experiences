import { useId } from '@fluentui/react-hooks';
import { Text } from '@fluentui/react/lib/Text';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { RefObject } from '@fluentui/react/lib/Utilities';
import { DirectionalHint } from '@fluentui/react/lib/common/DirectionalHint';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { TooltipHost } from '@fluentui/react/lib/components/Tooltip/TooltipHost';
import { TooltipOverflowMode } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { EmptyState } from '@fsi/core-components/dist/components/atoms';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection';
import { SystemColors } from '@fsi/core-components/dist/constants/Colors';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { useColorContrastListener } from '@fsi/core-components/dist/hooks/useColorContrastListener/useColorContrastListener';
import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import React, { useRef } from 'react';
import { ApplicantFinancialItemCategories as FINANCIAL_CATEGORIES } from '../../../constants/FinancialCategories.const';
import { ASSETS_AND_LIABILITIES } from '../../../constants/namespaces.const';
import { ASSET_LIABILITY_ADD_EDIT_DIALOG } from '../../FinancialItemFormDialog';
import { IAssetsAndLiabilitiesWidget } from './PartyAssetsAndLiabilities.interface';
import { LineChart } from './LineChart';
import {
    getPartyTextStyles,
    partyALEmptyStateStyles,
    rootStyles,
    srCurrencyStyle,
    textStyles,
    textsWrapperStyles,
    tooltipHostStyles,
} from './PartyAssetsAndLiabilities.style';

const linesTokens = { childrenGap: 4 };

const sectionTokens = { childrenGap: 20 };

const tooltipHostProps = {
    directionalHint: DirectionalHint.rightCenter,
    styles: tooltipHostStyles,
    overflowMode: TooltipOverflowMode.Self,
};

const PartyAssetsAndLiabilities = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<IAssetsAndLiabilitiesWidget>>(
    (
        {
            allPartiesAssets,
            allPartiesLiabilities,
            applicantAssets,
            applicantLiabilities,
            applicantName,
            isLoading,
            isError,
            showOnlyCombinedData,
            hasPrivilege,
        },
        commandBtnRef
    ) => {
        const {
            palette: { themePrimary, themeDarker },
        } = useTheme();
        const translate = useTranslation(ASSETS_AND_LIABILITIES);

        const isColorContrastOn = useColorContrastListener();

        const infoSectionCommandBtnRef = useRef<HTMLButtonElement>(null);

        const partyAandLHeadingId = useId('partyAssetsAndLiabilitiesHeading');

        const { showDialog } = useDialogService();

        /* istanbul ignore next */
        const allPartiesAssetsColor = isColorContrastOn ? SystemColors.text : themePrimary;
        /* istanbul ignore next */
        const applicantAssetsColor = isColorContrastOn ? SystemColors.text : themeDarker;
        /* istanbul ignore next */
        const allPartiesLiabilitiesColor = isColorContrastOn ? SystemColors.text : NeutralColors.gray110;
        /* istanbul ignore next */
        const applicantLiabilitiesColor = isColorContrastOn ? SystemColors.text : NeutralColors.gray170;

        const maxValue = Math.max(allPartiesAssets, allPartiesLiabilities);

        const allPartiesAssetsPercent = allPartiesAssets / maxValue;
        const allPartiesLiabilitiesPercent = allPartiesLiabilities / maxValue;
        const applicantAssetsPercent = applicantAssets / maxValue;
        const applicantLiabilitiesPercent = applicantLiabilities / maxValue;

        const isEmpty = (allPartiesLiabilities === 0 && allPartiesAssets === 0) || !applicantName;

        const combinedAssetsText = translate('COMBINED_ASSETS');
        const combinedLiabilitiesText = translate('COMBINED_LIABILITIES');
        const allPartiesText = ` - ${translate('ALL_PARTIES')}`;
        const applicantTotalAssetsText = translate('APPLICANT_TOTAL_ASSETS', { applicant: applicantName || translate('PRIMARY_APPLICANT') });
        const applicantTotalLiabilitiesText = translate('APPLICANT_TOTAL_LIABILITIES', {
            applicant: applicantName || translate('PRIMARY_APPLICANT'),
        });

        const srAddNewAssetLiabilityItemText = translate('SR_ADD_NEW_ASSET_OR_LIABILITY_ITEM');

        const addAssetDisabled = !hasPrivilege?.(FINANCIAL_CATEGORIES.ASSET, PrivilegeType.Create);
        const addLiabilityDisabled = !hasPrivilege?.(FINANCIAL_CATEGORIES.LIABILITY, PrivilegeType.Create);

        return (
            <InfoSection
                mainTitle={translate('DECLARED_ASSETS_AND_LIABILITIES')}
                isError={!!isError}
                isLoading={!!isLoading}
                headingId={partyAandLHeadingId}
                ref={commandBtnRef || infoSectionCommandBtnRef}
                hideTitle={!showOnlyCombinedData}
                commandProps={
                    !showOnlyCombinedData
                        ? {
                            iconProps: {
                                iconName: 'Add',
                            },
                            text: translate('ADD_NEW_ITEM'),
                            ariaLabel: srAddNewAssetLiabilityItemText,
                            menuProps: {
                                ariaLabel: srAddNewAssetLiabilityItemText,
                                items: [
                                    {
                                        key: 'addAsset',
                                        name: translate('NEW_ASSET'),
                                        onClick: () => {
                                            /* istanbul ignore next */
                                            showDialog(ASSET_LIABILITY_ADD_EDIT_DIALOG, {
                                                category: FINANCIAL_CATEGORIES.ASSET,
                                                triggerButton: ((commandBtnRef || infoSectionCommandBtnRef) as RefObject<HTMLButtonElement>)
                                                    ?.current,
                                            });
                                        },
                                        disabled: addAssetDisabled,
                                    },
                                    {
                                        key: 'addLiability',
                                        name: translate('NEW_LIABILITY'),
                                        onClick: () => {
                                            /* istanbul ignore next */
                                            showDialog(ASSET_LIABILITY_ADD_EDIT_DIALOG, {
                                                category: FINANCIAL_CATEGORIES.LIABILITY,
                                                triggerButton: ((commandBtnRef || infoSectionCommandBtnRef) as RefObject<HTMLButtonElement>)
                                                    ?.current,
                                            });
                                        },
                                        disabled: addLiabilityDisabled,
                                    },
                                ],
                            },
                            disabled: isLoading,
                        }
                        : undefined
                }
            >
                {isEmpty ? (
                    showOnlyCombinedData && <EmptyState styles={partyALEmptyStateStyles} title={translate('EMPTY_STATE_PARTY_ASSETS')} />
                ) : (
                    <Stack horizontal styles={rootStyles} verticalAlign="center" data-testid="loan-assets-liabilities">
                        <Stack styles={textsWrapperStyles} tokens={sectionTokens}>
                            <Stack tokens={linesTokens}>
                                {!showOnlyCombinedData && (
                                    <>
                                        <Stack horizontal>
                                            <TooltipHost {...tooltipHostProps} content={applicantTotalAssetsText}>
                                                <Text styles={getPartyTextStyles} data-testid="applicant-total-assets-text">
                                                    {applicantName && applicantTotalAssetsText}
                                                </Text>
                                            </TooltipHost>
                                            <Currency compact value={applicantAssets} styles={srCurrencyStyle} />
                                        </Stack>
                                    </>
                                )}
                                <Stack horizontal>
                                    <TooltipHost {...tooltipHostProps} content={`${combinedAssetsText}${allPartiesText}`}>
                                        <Text styles={textStyles}>{combinedAssetsText}</Text>
                                        <Text styles={textStyles}>{allPartiesText}</Text>
                                    </TooltipHost>
                                    <Currency compact value={allPartiesAssets} styles={srCurrencyStyle} />
                                </Stack>
                            </Stack>

                            <Stack tokens={linesTokens}>
                                {!showOnlyCombinedData && (
                                    <>
                                        <Stack horizontal>
                                            <TooltipHost {...tooltipHostProps} content={applicantTotalLiabilitiesText}>
                                                <Text styles={getPartyTextStyles} data-testid="applicant-total-liabilities-text">
                                                    {applicantName && applicantTotalLiabilitiesText}
                                                </Text>
                                            </TooltipHost>
                                            <Currency compact value={applicantLiabilities} styles={srCurrencyStyle} />
                                        </Stack>
                                    </>
                                )}
                                <Stack horizontal>
                                    <TooltipHost {...tooltipHostProps} content={`${combinedLiabilitiesText}${allPartiesText}`}>
                                        <Text styles={textStyles}>{combinedLiabilitiesText}</Text>
                                        <Text styles={textStyles}>{allPartiesText}</Text>
                                    </TooltipHost>
                                    <Currency compact value={allPartiesLiabilities} styles={srCurrencyStyle} />
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack tokens={sectionTokens} grow={1} aria-hidden="true">
                            <Stack tokens={linesTokens}>
                                {!showOnlyCombinedData && (
                                    <LineChart value={applicantAssets} color={applicantAssetsColor} percent={applicantAssetsPercent} />
                                )}
                                <LineChart value={allPartiesAssets} color={allPartiesAssetsColor} percent={allPartiesAssetsPercent} />
                            </Stack>
                            <Stack tokens={linesTokens}>
                                {!showOnlyCombinedData && (
                                    <LineChart value={applicantLiabilities} color={applicantLiabilitiesColor} percent={applicantLiabilitiesPercent} />
                                )}
                                <LineChart value={allPartiesLiabilities} color={allPartiesLiabilitiesColor} percent={allPartiesLiabilitiesPercent} />
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </InfoSection>
        );
    }
);

export default PartyAssetsAndLiabilities;
