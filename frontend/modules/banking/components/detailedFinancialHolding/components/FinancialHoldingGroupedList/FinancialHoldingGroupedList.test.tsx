import React from 'react';
import { render } from '@testing-library/react';
import FinancialHoldingGroupedList from './FinancialHoldingGroupedList';
import { IndictableFH } from '../../../../interfaces/FHEntity/IndictableFH';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { FHMetadataMock } from '../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

let detailedListParams;
const FH_TYPE_MAP = FHMetadataMock.types.optionSet;
jest.mock('react-resize-detector', () => {
    return {
        useResizeDetector: () => ({ width: 800, height: 800 }),
    };
});

jest.mock('@fluentui/react/lib/DetailsList', () => {
    return {
        CheckboxVisibility: {
            hidden: 1,
        },
        DetailsList: params => {
            detailedListParams = params;
            detailedListParams.selection.setIndexSelected = jest.fn();
            return (
                <>
                    {detailedListParams.groups?.map((group, idx) => {
                        return (
                            <div key={idx}>
                                {detailedListParams.groupProps.onRenderHeader({ group, onToggleCollapse: detailedListParams.onToggleCollapse })}
                            </div>
                        );
                    })}
                    {detailedListParams.items?.map((item, idx) => {
                        return (
                            <div key={`1${idx}`} data-testid="group-detailed-holdings-row">
                                {detailedListParams.columns.map((column, columnIdx) => {
                                    return <div key={`2${columnIdx}`}>{detailedListParams.onRenderItemColumn(item, columnIdx, column)}</div>;
                                })}
                            </div>
                        );
                    })}
                </>
            );
        },
    };
});
jest.mock('../../../../components/summaryFH/IndicatorColumn', () => params => (
    <div data-testid="detailed-fh-table-indicator">{params.indicator?.messageKey}</div>
));

describe('FinancialHoldingGroupedList', () => {
    beforeEach(() => {
        detailedListParams = undefined;
    });

    describe('test the general component', () => {
        it('should render detailed FH table details', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            expect(getByTestId('detailed-fh-table')).toBeVisible();
        });

        it('test group props empty when no props', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            expect(getByTestId('detailed-fh-table')).toBeVisible();
            const result = detailedListParams.groupProps.onRenderHeader(null);
            expect(result).toEqual(null);
        });
    });

    describe('test the constructor', () => {
        it('should have the basic 5 columns', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            expect(getByTestId('detailed-fh-table')).toBeVisible();
            expect(detailedListParams.columns).toHaveLength(5);
        });

        it('should have the basic 5 columns with isCompactView', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList isCompactView {...params} />);

            expect(getByTestId('detailed-fh-table')).toBeVisible();
            expect(detailedListParams.columns).toHaveLength(5);
        });
    });

    describe('test on selection change', () => {
        it('should not run if no selection empty exists', async () => {
            const currParams = { ...params, onSelect: jest.fn() };
            const { findByTestId } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(await findByTestId('detailed-fh-table')).toBeVisible();
            detailedListParams.selection.getSelection = jest.fn().mockReturnValue([]);
            detailedListParams.selection._onSelectionChanged();
            expect(currParams.onSelect).toHaveBeenCalledTimes(0);
        });

        it('should run anc call onSelect with selected value', async () => {
            const currParams = { ...params, onSelect: jest.fn() };
            const mockItem = 'mock item';
            const { findByTestId } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(await findByTestId('detailed-fh-table')).toBeVisible();
            detailedListParams.selection.getSelection = jest.fn().mockReturnValue([mockItem]);
            detailedListParams.selection._onSelectionChanged();
            expect(currParams.onSelect).toHaveBeenCalledTimes(1);
            expect(currParams.onSelect.mock.calls[0][0]).toEqual(mockItem);
        });
    });

    describe('test render indicators', () => {
        const groups = [{ key: '0', startIndex: 0, count: 1, name: 'mockGroup', isCollapsed: false }];
        const subject = 'indicator';
        const renderColumn = { key: subject, fieldName: subject };

        const fhDefaultProps = {
            id: 'mockId',
            name: 'mock',
            category: 1,
            balance: 2,
            balanceDefault: 2,
            balanceDisplay: 2,
            balanceDefaultDisplay: 2,
            statecode: 0,
            type: 3,
            indicator: [],
            financialInstruments: [],
        };
        it('should not render indicators if content is empty array', () => {
            const items: IndictableFH[] = [fhDefaultProps];
            const currParams = { ...params, items, groups };
            const { getByTestId } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(getByTestId('detailed-fh-table-indicator').textContent).toEqual('');
            const column = detailedListParams.onRenderItemColumn({}, 1, renderColumn);
            expect(column).toEqual('');
        });

        it('should render indicators if content exists', () => {
            const items: IndictableFH[] = [
                {
                    ...fhDefaultProps,
                    indicator: [{ order: 1, messageKey: 'TEST_KEY', type: jest.fn() }],
                },
            ];
            const currParams = { ...params, items };
            const { getByTestId } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(getByTestId('detailed-fh-table-indicator').textContent).toEqual('TEST_KEY');
        });
    });

    describe('render simple fields', () => {
        const fhDefaultProps: IndictableFH = {
            id: 'mockId',
            name: 'mock',
            category: 1,
            statecode: 0,
            balance: 979,
            balanceDefault: 979,
            balanceDisplay: 979,
            balanceDefaultDisplay: 979,
            type: 3,
            indicator: [],
            financialInstruments: [{}],
        };

        it('should not render value when null', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            const subject = 'bal';
            const renderColumn = { key: subject, fieldName: subject };
            expect(getByTestId('detailed-fh-table').textContent).toEqual('');
            const column = detailedListParams.onRenderItemColumn({ [subject]: null }, 1, renderColumn);
            expect(column).toEqual('');
        });

        it('should render value if content exists', () => {
            const items: IndictableFH[] = [
                {
                    ...fhDefaultProps,
                },
            ];
            const currParams = { ...params, items };
            const { getByText } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(getByText('979')).toBeVisible();
        });

        it('should not render type when null', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            const subject = 'fht';
            const renderColumn = { key: subject, fieldName: subject };
            expect(getByTestId('detailed-fh-table').textContent).toEqual('');
            const column = detailedListParams.onRenderItemColumn({ [subject]: null }, 1, renderColumn);
            expect(column).toEqual('');
        });

        it('should render type if content exists', () => {
            const items: IndictableFH[] = [
                {
                    ...fhDefaultProps,
                    type: 104800007,
                },
            ];
            const currParams = { ...params, metadata: FHMetadataMock, items };
            const { getByText } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(getByText(FH_TYPE_MAP[items[0].type].text)).toBeVisible();
        });

        it('should not render owner when null', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            const subject = 'own';
            const renderColumn = { key: subject, fieldName: subject };
            expect(getByTestId('detailed-fh-table').textContent).toEqual('');
            const column = detailedListParams.onRenderItemColumn({ [subject]: null }, 1, renderColumn);
            expect(column).toEqual('');
        });

        it('should not render name when null', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            const subject = 'fhn';
            const renderColumn = { key: subject, fieldName: subject };
            expect(getByTestId('detailed-fh-table').textContent).toEqual('');
            const column = detailedListParams.onRenderItemColumn({ [subject]: null }, 1, renderColumn);
            expect(column).toEqual('');
        });

        it('should render name if content exists', () => {
            const items = [
                {
                    ...fhDefaultProps,
                    name: 'mock name',
                    type: 104800007,
                },
            ];
            const currParams = { ...params, items, isOwnerShown: true };
            const { getByText } = render(<FinancialHoldingGroupedList {...currParams} />);

            expect(getByText('mock name')).toBeVisible();
        });
    });

    describe('test render item column', () => {
        it('should render default column when no renderer exists', () => {
            const { getByTestId } = render(<FinancialHoldingGroupedList {...params} />);

            const subject = 'mock';
            const renderColumn = { key: subject, fieldName: subject };
            expect(getByTestId('detailed-fh-table').textContent).toEqual('');
            const column = detailedListParams.onRenderItemColumn({ [subject]: 'mockVal' }, 1, renderColumn);
            expect(column.type).toEqual('span');
            expect(column.props.children).toEqual('mockVal');
        });
    });

    describe('small Screens', () => {
        it('should collapse type, indicator, currency column', () => {
            render(
                <ResponsiveContainer>
                    <FinancialHoldingGroupedList {...params} />
                </ResponsiveContainer>
            );

            expect(detailedListParams.columns).toHaveLength(5);
            expect(detailedListParams.columns.find(column => column.key === 'type')).toBeUndefined();
        });
    });
});

const params = {
    items: [],
    groups: [],
    isOwnerShown: false,
    onSelect: jest.fn(),
    selected: undefined,
};
