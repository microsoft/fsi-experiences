import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import {
    cardsBoxStyle,
    primaryHouseholdBoxStyle,
    fhSummaryBoxStyle,
    lifeEventsBoxStyle,
    leftBoxStyles,
    rightBoxStyles,
    middleBoxStyles,
    rootSummaryStyles,
} from './CustomerSummary.style';
import { SUMMARY_RESPONSIVE_CONTAINER } from './CustomerSummary.const';
import { CustomerSummaryProps } from './CustomerSummary.interface';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { baseCardStyles } from '@fsi/core-components/dist/styles/Common.style';
import CustomerSnapshot from '@fsi/core-components/dist/widgets/customerSnapshot/CustomerSnapshot';
import FHSummary from '../summaryFH/FHSummary';
import GroupsSummaryViewComponent from '../summaryGroup/GroupsSummaryViewComponent';
import BankingCards from '../bankingCards/BankingCards';
import LifeEvents from '@fsi/milestones/LifeEvents';

const CustomerSummary: React.FC<CustomerSummaryProps> = props => {
    const { customerSnapshotFetcher, contactId, lifeEventsFetcher, fhFetcher, fhCardsFetcher, pcfGroupsFetcher, formId } = props;

    return (
        <ResponsiveContainer classPrefix={SUMMARY_RESPONSIVE_CONTAINER}>
            <Stack horizontal styles={rootSummaryStyles}>
                <Stack styles={leftBoxStyles}>
                    <Stack styles={baseCardStyles}>
                        <CustomerSnapshot entityId={contactId} formId={formId} fetcher={customerSnapshotFetcher} />
                    </Stack>
                </Stack>
                <Stack styles={rightBoxStyles}>
                    <Stack styles={lifeEventsBoxStyle}>
                        <LifeEvents contactId={contactId} fetcher={lifeEventsFetcher} />
                    </Stack>
                    <Stack styles={middleBoxStyles} horizontal horizontalAlign="start">
                        <Stack styles={fhSummaryBoxStyle}>
                            <FHSummary fetcher={fhFetcher} contactId={contactId || ''} />
                        </Stack>
                        <Stack styles={primaryHouseholdBoxStyle}>
                            <GroupsSummaryViewComponent fetcher={pcfGroupsFetcher} contactId={contactId} />
                        </Stack>
                    </Stack>
                    <Stack styles={cardsBoxStyle}>
                        <BankingCards fetcher={fhCardsFetcher} contactId={contactId || ''} />
                    </Stack>
                </Stack>
            </Stack>
        </ResponsiveContainer>
    );
};
export default CustomerSummary;
