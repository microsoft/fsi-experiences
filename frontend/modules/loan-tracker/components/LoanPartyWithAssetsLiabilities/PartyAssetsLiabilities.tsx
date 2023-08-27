import React, { useRef } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { Text } from '@fluentui/react/lib/Text';
import { DirectionalHint } from '@fluentui/react/lib/common/DirectionalHint';
import {
    getCombinedTextStyles,
    partyALButtonIconStyles,
    partyALEmptyStateStyles,
    rootStyles,
    srCurrencyStyle,
    textStyles,
    textsWrapperStyles,
    tooltipHostStyles,
} from './PartyAssetsLiabilities.style';
import LineChart from './LineChart';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { EmptyState, Indicator } from '@fsi/core-components/dist/components/atoms';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection';
import { useColorContrastListener } from '@fsi/core-components/dist/hooks/useColorContrastListener/useColorContrastListener';
import { COLORS, SystemColors } from '@fsi/core-components/dist/constants/Colors';
import { TooltipHost } from '@fluentui/react/lib/components/Tooltip/TooltipHost';
import { TooltipOverflowMode } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import {
    ApplicantFinancialItemCategories as FINANCIAL_CATEGORIES,
    ApplicantFinancialCategoryOption,
} from '../../constants/ApplicantFinancialItemCategories.consts';
import { ASSET_LIABILITY_ADD_EDIT_DIALOG } from '../LoanFinancialItemFormDialog/LoanFinancialItemFormDialog.const';
import { RefObject } from '@fluentui/react/lib/Utilities';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

interface IPartyAssetsLiabilities {
    applicantName?: string;
    allPartiesAssets: number;
    allPartiesLiabilities: number;
    applicantAssets: number;
    applicantLiabilities: number;
    isLoading?: boolean;
    isError?: boolean;
    currencyId?: string;
    showOnlyCombinedData?: boolean;
    hasPrivilege?: (category: ApplicantFinancialCategoryOption, operation: number) => boolean;
}

const linesTokens = { childrenGap: 4 };

const sectionTokens = { childrenGap: 20 };

const tooltipHostProps = {
    directionalHint: DirectionalHint.rightCenter,
    styles: tooltipHostStyles,
    overflowMode: TooltipOverflowMode.Self,
};

const PartyAssetsLiabilities = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<IPartyAssetsLiabilities>>(
    (
        {
            allPartiesAssets,
            allPartiesLiabilities,
            applicantAssets,
            applicantLiabilities,
            applicantName,
            isLoading,
            isError,
            currencyId,
            showOnlyCombinedData,
            hasPrivilege,
        },
        commandBtnRef
    ) => {
        const {
            palette: { themePrimary, themeDarker },
        } = useTheme();
        const translate = useTranslation(namespaces.PARTY_ASSETS_AND_LIABILITIES);

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

        const showApplicantData = !showOnlyCombinedData;

        const addAssetDisabled = !hasPrivilege || !hasPrivilege(FINANCIAL_CATEGORIES.ASSET, PrivilegeType.Create);
        const addLiabilityDisabled = !hasPrivilege || !hasPrivilege(FINANCIAL_CATEGORIES.LIABILITY, PrivilegeType.Create);

        const IndicatorComponent = (
            <Indicator
                tooltipProps={{
                    content: translate('PARTIES_TOOLTIP'),
                    directionalHint: DirectionalHint.topCenter,
                }}
                size={12}
                buttonStyles={partyALButtonIconStyles}
                iconName="info"
                color={COLORS.darkGray}
                iconAriaLabel={translate('ARIA_LABEL_INFO')}
            />
        );

        return (
            <InfoSection
                mainTitle={translate('DECLARED_ASSETS_AND_LIABILITIES')}
                isError={!!isError}
                isLoading={!!isLoading}
                currencyId={currencyId}
                headingId={partyAandLHeadingId}
                ref={commandBtnRef || infoSectionCommandBtnRef}
                commandProps={
                    showApplicantData
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
                    <EmptyState styles={partyALEmptyStateStyles} title={translate('EMPTY_STATE_PARTY_ASSETS')} />
                ) : (
                    <Stack horizontal styles={rootStyles} verticalAlign="center" data-testid="loan-assets-liabilities">
                        <Stack styles={textsWrapperStyles} tokens={sectionTokens}>
                            <Stack tokens={linesTokens}>
                                <Stack horizontal>
                                    <TooltipHost {...tooltipHostProps} content={`${combinedAssetsText}${allPartiesText}`}>
                                        <Text styles={getCombinedTextStyles(showOnlyCombinedData)}>{combinedAssetsText}</Text>
                                        <Text styles={textStyles}>{allPartiesText}</Text>
                                    </TooltipHost>
                                    <Currency compact value={allPartiesAssets} styles={srCurrencyStyle} />
                                    {showOnlyCombinedData && IndicatorComponent}
                                </Stack>
                                {showApplicantData && (
                                    <>
                                        <TooltipHost {...tooltipHostProps} content={applicantTotalAssetsText}>
                                            <Text styles={textStyles} data-testid="applicant-total-assets-text">
                                                {applicantName && applicantTotalAssetsText}
                                            </Text>
                                        </TooltipHost>
                                        <Currency compact value={applicantAssets} styles={srCurrencyStyle} />
                                    </>
                                )}
                            </Stack>

                            <Stack tokens={linesTokens}>
                                <Stack horizontal>
                                    <TooltipHost {...tooltipHostProps} content={`${combinedLiabilitiesText}${allPartiesText}`}>
                                        <Text styles={getCombinedTextStyles(showOnlyCombinedData)}>{combinedLiabilitiesText}</Text>
                                        <Text styles={textStyles}>{allPartiesText}</Text>
                                    </TooltipHost>
                                    <Currency compact value={allPartiesLiabilities} styles={srCurrencyStyle} />
                                    {showOnlyCombinedData && IndicatorComponent}
                                </Stack>
                                {showApplicantData && (
                                    <>
                                        <TooltipHost {...tooltipHostProps} content={applicantTotalLiabilitiesText}>
                                            <Text styles={textStyles} data-testid="applicant-total-liabilities-text">
                                                {applicantName && applicantTotalLiabilitiesText}
                                            </Text>
                                        </TooltipHost>
                                        <Currency compact value={applicantLiabilities} styles={srCurrencyStyle} />
                                    </>
                                )}
                            </Stack>
                        </Stack>
                        <Stack tokens={sectionTokens} grow={1} aria-hidden="true">
                            <Stack tokens={linesTokens}>
                                <LineChart value={allPartiesAssets} color={allPartiesAssetsColor} percent={allPartiesAssetsPercent} />
                                {showApplicantData && (
                                    <LineChart value={applicantAssets} color={applicantAssetsColor} percent={applicantAssetsPercent} />
                                )}
                            </Stack>
                            <Stack tokens={linesTokens}>
                                <LineChart value={allPartiesLiabilities} color={allPartiesLiabilitiesColor} percent={allPartiesLiabilitiesPercent} />
                                {showApplicantData && (
                                    <LineChart value={applicantLiabilities} color={applicantLiabilitiesColor} percent={applicantLiabilitiesPercent} />
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </InfoSection>
        );
    }
);

export default PartyAssetsLiabilities;
