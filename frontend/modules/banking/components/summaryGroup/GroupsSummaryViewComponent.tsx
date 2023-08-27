import React, { FC, useEffect, useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Separator } from '@fluentui/react/lib/Separator';
import { IGroupFetcher } from '../../interfaces/Groups/IGroupFetcher';
import { IGroup, IGroupContact } from '../../interfaces/Groups';
import GroupDetailsBar from '../../components/GroupDetailsBar/GroupDetailsBar';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { EmptyState as DefaultEmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { SectionHeader } from '@fsi/core-components/dist/components/atoms/SectionHeader/SectionHeader';
import DefaultErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { Loading } from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { MAIN_HOUSEHOLD_RESPONSIVE_CONTAINER } from './GroupsSummaryViewComponent.const';
import {
    annualAndHouseholdWrapper,
    annualHorizontalSeperatorStyles,
    annualVerticalSeperatorStyles,
    annualWrapper,
    chartRoot,
    chartsWithAnnualWrapper,
    chartsWithoutAnnualWrapper,
    columnSeperatorStyles,
    firstMainViewVerticalSeperatorStyles,
    groupDetailsWrapper,
    mainViewHorizontalSeperatorStyles,
    mainViewStyles,
    mainViewVerticallSeperatorStyles,
    responsiveContainerStyles,
} from './GroupsSummaryViewComponent.style';
import AnnualIncome from '@fsi/core-components/dist/components/containers/AnnualIncome';
import DataPieChart from '@fsi/core-components/dist/components/containers/DataPieChart/DataPieChart';
import { IGroupResponse } from '../../interfaces/Groups/IGroupResponse';
import useCalculatedFinancialProducts from '../../hooks/financialHoldings/useCalculatedFinancialProducts';
import FHHiddenMessageBar from '../FHHiddenMessageBar/FHHiddenMessageBar';

export interface IGroupsSummaryViewComponentProps {
    fetcher: IGroupFetcher;
    contactId: string;
}
const minHeight = 324;

const LoadingState = () => (
    <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { width: '100%', height: '100%', padding: '20px', minHeight } }}>
        <Loading />
    </Stack>
);

const EmptyState = () => {
    const translate = useTranslation('mainHousehold');

    return (
        <DefaultEmptyState
            icon={IMAGE_SRC.emptyState100}
            title={translate('NO_PRIMARY_GROUP_DEFINED')}
            subtitle={translate('NO_PRIMARY_GROUP_DEFINED_SUB_HEADER')}
            iconSize={100}
            styles={{ container: { minHeight } }}
        />
    );
};

const ErrorState = () => <DefaultErrorState iconSize={100} styles={{ container: { minHeight } }} />;

const getAnnualIncome = (group: IGroup) => group.members.reduce((prev, cur) => prev + cur.customer.income, 0);

type fhCategoriesType = Map<number, string>;
interface IMainView {
    group?: IGroup;
    fhCategories: fhCategoriesType;
    isLoading?: boolean;
    isError?: boolean;
}

const chartStyles = { rootStyles: chartRoot };

const CommonChartsComponents = ({ assets, liabilities }) => {
    const translate = useTranslation(namespaces.MAIN_HOUSEHOLD);

    return (
        <>
            <Separator styles={mainViewHorizontalSeperatorStyles} />
            <Separator vertical styles={firstMainViewVerticalSeperatorStyles} />
            <Stack grow={2}>
                <DataPieChart
                    showCurrency
                    isCompactView
                    header={translate('TOTAL_ASSETS')}
                    emptyStateText={translate('THERE_ARE_NO_ASSETS')}
                    data={assets}
                    styles={chartStyles}
                />
            </Stack>
            <Separator styles={mainViewHorizontalSeperatorStyles} />
            <Separator vertical styles={mainViewVerticallSeperatorStyles} />
            <Stack grow={2}>
                <DataPieChart
                    styles={chartStyles}
                    showCurrency
                    isCompactView
                    header={translate('TOTAL_LIABILITIES')}
                    emptyStateText={translate('THERE_ARE_NO_LIABILITIES')}
                    data={liabilities}
                />
            </Stack>
        </>
    );
};

const MainView: FC<IMainView> = ({ group, fhCategories, isLoading, isError }) => {
    const data = useCalculatedFinancialProducts({ categories: fhCategories, financialProducts: group?.financialHoldings });
    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return <ErrorState />;
    }

    if (!group) {
        return <EmptyState />;
    }

    return (
        <Stack grow tokens={{ childrenGap: 'initial' }} styles={mainViewStyles} data-testid="group-summary-main-view">
            <Stack grow={1} styles={annualAndHouseholdWrapper} tokens={{ childrenGap: 'initial' }}>
                <Stack styles={groupDetailsWrapper}>
                    <GroupDetailsBar group={group} isPrimary />
                </Stack>
                <Separator styles={annualHorizontalSeperatorStyles} />
                <Separator vertical styles={annualVerticalSeperatorStyles} />
                <Stack styles={annualWrapper} grow={1} tokens={{ childrenGap: 'initial' }}>
                    <AnnualIncome annualIncome={getAnnualIncome(group)} isCompact />
                    <Stack styles={chartsWithAnnualWrapper} grow={4} horizontal>
                        <CommonChartsComponents {...data} />
                    </Stack>
                </Stack>
            </Stack>
            <Separator styles={columnSeperatorStyles} />
            <Stack styles={chartsWithoutAnnualWrapper} horizontal grow={4}>
                <CommonChartsComponents {...data} />
            </Stack>
        </Stack>
    );
};
export const GroupsSummaryViewComponent: FC<IGroupsSummaryViewComponentProps> = ({ fetcher, contactId }) => {
    const [group, setGroup] = useState<IGroup | undefined>(undefined);
    const [mainCustomer, setMainCustomer] = useState<IGroupContact>({} as any);
    const [fhCategories, setfhCategories] = useState<fhCategoriesType>(new Map());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const translate = useTranslation('mainHousehold');
    const { messages } = useBrowserCommunication(`groups-listener-${contactId}`);

    useEffect(() => {
        initMainCustomer();
    }, [contactId]);

    useEffect(() => {
        initGroups();
    }, [contactId, messages]);

    useEffect(() => {
        initPicklists();
    }, []);

    const initMainCustomer = async () => {
        const customer = await fetcher.getMainCustomerDetails(contactId);
        setMainCustomer(customer);
    };

    const initPicklists = async () => {
        const fhCategoryTypes = await fetcher.getFinancialHoldingCategoryTypesMap();
        setfhCategories(fhCategoryTypes);
    };

    const initGroups = async () => {
        try {
            const res: IGroupResponse = await fetcher.getContactGroups(contactId, true);
            setGroup(res.groupsArray[0]);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ResponsiveContainer style={responsiveContainerStyles} classPrefix={MAIN_HOUSEHOLD_RESPONSIVE_CONTAINER}>
            <FHHiddenMessageBar
                requestMetadata={group?.fhRequestMetadata || {}}
                highlightedText={translate('HIDDEN_INFORMATIOM_MAIN')}
                regularText={translate('HIDDEN_INFORMATIOM_SUB')}
            />
            <Stack grow tokens={{ childrenGap: '16px' }}>
                <SectionHeader titleString={translate('MAIN_HOUSEHOLD')} />
                <MainView group={group} fhCategories={fhCategories} isLoading={isLoading} isError={isError} />
            </Stack>
        </ResponsiveContainer>
    );
};

export default GroupsSummaryViewComponent;
