import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC, ReactElement, useContext, useEffect, useMemo } from 'react';
import { ILoanApplication } from '../../../interfaces/ILoanApplication/ILoanApplication';
import { LoanOnboardingContext } from '../../../contexts/LoanOnboarding/LoanOnboarding.context';
import { ListGroupHeaderStyles, LoanApplicationListStyles, ScrollableListStyles } from './LoanApplicationList.style';
import type { ILoanApplicationListProps } from './LoanApplicationList.interface';
import ApplicationListRow from '../ApplicationListRow/ApplicationListRow';
import { GroupedList } from '@fluentui/react/lib/components/GroupedList/GroupedList';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import ListSearchBox from '../ListSearchBox/ListSearchBox';
import { groupByStep } from '../../../helpers/loanOnboardingHelper/loanOnboardingHelper';
import { Sticky } from '@fluentui/react/lib/components/Sticky/Sticky';
import { StickyPositionType } from '@fluentui/react/lib/components/Sticky/Sticky.types';
import { ScrollablePane } from '@fluentui/react/lib/components/ScrollablePane/ScrollablePane';
import { GroupHeader, IGroupHeaderProps } from '@fluentui/react/lib/components/GroupedList/GroupHeader';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication';
import { CLOSE_LIST_ATTR, LOAN_LIST_WRAPPER_ID, SHOW_LIST_POST_MESSAGE } from './LoanApplicationList.const';
import { LOAN_DATA_IFRAME_ID, OPEN_IFRAME_ATTR } from '../LoanEntityWidget/LoanEntityWidget.const';

const GroupListProps = {
    headerProps: {
        styles: ListGroupHeaderStyles,
        role: 'rowheader',
    },
    showEmptyGroups: true,
    onRenderHeader: (props?: IGroupHeaderProps): ReactElement => (
        <Sticky stickyPosition={StickyPositionType.Both}>
            <GroupHeader {...props} />
        </Sticky>
    ),
};

/* istanbul ignore next */
function onTransitionEnd(e: TransitionEvent) {
    const isIframeOpen = (e.currentTarget as HTMLElement)?.hasAttribute(CLOSE_LIST_ATTR);

    const iframe = document?.getElementById(LOAN_DATA_IFRAME_ID);
    const iframeBody = ((iframe as any).contentDocument as any)?.body;

    iframeBody?.toggleAttribute(OPEN_IFRAME_ATTR, isIframeOpen);
    iframe?.toggleAttribute(OPEN_IFRAME_ATTR, isIframeOpen);
}

const onRenderCell = (nestingDepth, item: ILoanApplication, itemIndex) => <ApplicationListRow application={item} />;

const isStringFound = (target: string, searchTerm: string) => target?.toLowerCase().includes(searchTerm?.toLowerCase());

export const LoanApplicationList: FC<ILoanApplicationListProps> = () => {
    const { applications, searchTerm, steps } = useContext(LoanOnboardingContext);

    const { messages: loansListMessages } = useBrowserCommunication(`loans-list-show`);

    /* istanbul ignore next */
    useEffect(() => {
        const loanListWrapper = document.getElementById(LOAN_LIST_WRAPPER_ID);

        loanListWrapper?.addEventListener('transitionend', onTransitionEnd);

        return () => {
            loanListWrapper?.removeEventListener('transitionend', onTransitionEnd);
        };
    }, []);

    /* istanbul ignore next */
    useEffect(() => {
        const loanListWrapper = document.getElementById(LOAN_LIST_WRAPPER_ID);

        if (!loanListWrapper) return;

        if (loansListMessages?.length) {
            const lastMessage = loansListMessages.pop();
            if (lastMessage === SHOW_LIST_POST_MESSAGE) {
                loanListWrapper.removeAttribute(CLOSE_LIST_ATTR);
            }
        }
    }, [loansListMessages]);

    const filteredApplications = useMemo(
        () =>
            searchTerm
                ? applications.filter(
                      (application: ILoanApplication) =>
                          isStringFound(application.name, searchTerm) || isStringFound(application.primaryApplicant, searchTerm)
                  )
                : applications,
        [applications, searchTerm]
    );

    const groups = useMemo(() => groupByStep(filteredApplications, steps), [filteredApplications]);

    return (
        <Stack styles={LoanApplicationListStyles} data-testid="loan-list-wrraper" id={LOAN_LIST_WRAPPER_ID}>
            <ListSearchBox />
            <ScrollablePane styles={ScrollableListStyles}>
                <GroupedList
                    items={filteredApplications}
                    groupProps={GroupListProps}
                    onRenderCell={onRenderCell}
                    selectionMode={SelectionMode.none}
                    groups={groups}
                />
            </ScrollablePane>
        </Stack>
    );
};

export default LoanApplicationList;
