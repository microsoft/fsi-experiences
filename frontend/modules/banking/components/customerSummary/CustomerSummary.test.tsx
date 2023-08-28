import React from 'react';
import { render } from '@testing-library/react';
import CustomerSummary from './CustomerSummary';
import { CustomerSummaryProps } from './CustomerSummary.interface';
import { FHMetadataMock } from '../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { emptyGroupsFetcher } from '../../interfaces/Groups/mocks/MockGroupFetcher';
import { MockLifeEventsFetcher } from '@fsi/milestones/interfaces/mocks/MockLifeEventsFetcher';

let fHSummaryContactId;
let BankingCardsContactId;

jest.mock('../bankingCards/BankingCards', () => props => {
    BankingCardsContactId = props.contactId;
    return <div data-testid="mocked-banking-cards">MOCKED BANKING CARD</div>;
});

jest.mock('@fsi/milestones/LifeEvents', () => () => {
    return <div data-testid="mocked-life-events">MOCKED LIFE EVENTS</div>;
});

jest.mock('@fsi/core-components/dist/widgets/customerSnapshot/CustomerSnapshot', () => () => {
    return <div data-testid="customer-snapshot">MOCKED CUSTOMER SNAPSHOT</div>;
});

jest.mock('../../components/summaryFH/FHSummary', () => props => {
    fHSummaryContactId = props.contactId;
    return <div data-testid="mocked-fh-summary">MOCKED FH SUMMARY</div>;
});

jest.mock('../../components/summaryGroup/GroupsSummaryViewComponent', () => () => {
    return <div data-testid="mocked-group-summary">MOCKED GROUP SUMMARY</div>;
});

describe('CustomerSummary', () => {
    const props: CustomerSummaryProps = {
        contactId: 'test',
        formId: 'test-form-id',
        fhCardsFetcher: {
            fetchFHCardsData: jest.fn().mockResolvedValue(new Map()),
            fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
        },
        lifeEventsFetcher: new MockLifeEventsFetcher(),
        pcfGroupsFetcher: emptyGroupsFetcher,
        fhFetcher: {
            fetchFHData: jest.fn().mockResolvedValue({ data: new Map() }),
            fetchFHMetadata: jest.fn().mockResolvedValue({}),
        },
        customerSnapshotFetcher: {
            fetchSnapshotData: () => Promise.reject(),
            fetchSnapshotLayout: () => Promise.reject(),
            fetchSnapshotMetadata: () => Promise.reject(),
        },
    };

    beforeEach(() => {
        fHSummaryContactId = undefined;
        BankingCardsContactId = undefined;
    });

    it('Should render banking card', async () => {
        const { getByTestId } = render(<CustomerSummary {...props} />);

        expect(getByTestId('mocked-banking-cards')).toBeVisible();
    });

    it('Should render life events', async () => {
        const { getByTestId } = render(<CustomerSummary {...props} />);

        expect(getByTestId('mocked-life-events')).toBeVisible();
    });

    it('Should render customer snapshot', async () => {
        const { getByTestId } = render(<CustomerSummary {...props} />);

        expect(getByTestId('customer-snapshot')).toBeVisible();
    });

    it('Should render summary financial holding', async () => {
        const { getByTestId } = render(<CustomerSummary {...props} />);

        expect(getByTestId('mocked-fh-summary')).toBeVisible();
    });

    it('Should render groups summary', async () => {
        const { getByTestId } = render(<CustomerSummary {...props} />);

        expect(getByTestId('mocked-group-summary')).toBeVisible();
    });

    it('Should render summary without customerId', async () => {
        const { getByTestId } = render(<CustomerSummary {...props} contactId={''} />);

        expect(getByTestId('mocked-group-summary')).toBeVisible();
        expect(fHSummaryContactId).toEqual('');
        expect(BankingCardsContactId).toEqual('');
    });
});
