import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { fhRolesValues, FH_OVERVIEW_ICON_TEXT_MAP } from '../../../constants/FHValueMaps';
import { GroupsContext, initialFHPickLists } from '../contexts/GroupsContext';
import getGroupContextMock from '../MockGroupContext';
import { GROUPS_HOLDINGS_VIEW_KEYS } from './DetailedMembersGroupHoldings.const';
import { DetailedMembersGroupHoldings } from './DetailedMembersGroupHoldings';
import { IDetailedMembersGroupHoldingsProps } from './DetailedMembersGroupHoldings.interface';

let checkboxParams = {};
let detailedListParams;

jest.mock('@fluentui/react/lib/Checkbox', () => {
    return {
        Checkbox: params => {
            checkboxParams[params['data-testid']] = params;
            return <div></div>;
        },
    };
});

jest.mock('../../summaryFH/IndicatorColumn', () => params => <div data-testid="group-fh-row-indicator">{params.indicator.messageKey}</div>);

jest.mock('@fluentui/react/lib/DetailsList', () => {
    return {
        DetailsList: params => {
            detailedListParams = { ...params, onToggleCollapse: jest.fn() };
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
        ColumnActionsMode: {},
    };
});

describe('test detailed members group holdings component', () => {
    let params: IDetailedMembersGroupHoldingsProps;

    beforeEach(() => {
        checkboxParams = {};
        detailedListParams = undefined;
        const fullMock = getFullMock();
        const oldFH = fullMock.groupsArray[0].financialHoldings || [];
        const fhList = [oldFH[0]];
        params = {
            financialHoldings: fhList,
            items: fhList,
            groups: [],
            viewKey: GROUPS_HOLDINGS_VIEW_KEYS.members,
            fhPickLists: {
                ...initialFHPickLists,
                roles: new Map([[fhRolesValues.owner, 'Owner']]),
            },
        };
    });

    describe('testing render component', () => {
        it('should render detailed members group holdings component', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...params} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
            });
            expect(Object.keys(checkboxParams)).toHaveLength(0);
        });

        it('should render with unknown viewKey', async () => {
            const fncParams = { ...params, viewKey: 'mock view' };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
            });
        });
    });

    describe('testing the checkAll checkbox', () => {
        it('should render check all checkbox if onFHSelected exists', async () => {
            const currParams = { ...params, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
            });
            expect(checkboxParams['group-detailed-holdings-check-all']).not.toBeUndefined();
        });

        it('allSelected checkbox should be checked if all are checked', async () => {
            const currParams = { ...params, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);

            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
                expect(checkboxParams['group-detailed-holdings-check-all'].checked).toBeTruthy();
                expect(checkboxParams['group-detailed-holdings-check-all'].indeterminate).toBeFalsy();
            });
        });

        it('allSelected checkbox should be intermediate if some are checked', async () => {
            const groupMock = getFullMock();
            const allFh = groupMock.groupsArray[0].financialHoldings || [];
            const selectedFh = [allFh[0]];
            const currParams = { ...params, items: allFh, financialHoldings: selectedFh, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
            });
            expect(checkboxParams['group-detailed-holdings-check-all'].checked).toBeFalsy();
            expect(checkboxParams['group-detailed-holdings-check-all'].indeterminate).toBeTruthy();
        });

        it('allSelected checkbox should be empty if none are checked', async () => {
            const currParams = { ...params, financialHoldings: [], onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
            });
            expect(checkboxParams['group-detailed-holdings-check-all'].checked).toBeFalsy();
            expect(checkboxParams['group-detailed-holdings-check-all'].indeterminate).toBeFalsy();
        });

        it('allSelected checkbox should call onFHSelected when pressed', async () => {
            const currParams = { ...params, financialHoldings: [], onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
            });
            checkboxParams['group-detailed-holdings-check-all'].onChange(undefined, true);
            expect(currParams.onFHSelected).toHaveBeenCalledTimes(1);
            expect(currParams.onFHSelected.mock.calls[0][1]).toBeTruthy();
        });
    });

    describe('testing detailList header cells', () => {
        let group, currParams;
        beforeAll(() => {
            group = { key: '0', startIndex: 0, count: 1, name: 'mockGroup', isCollapsed: false };
            currParams = { ...params, groups: [group] };
        });

        it('should render detailed members group holdings component', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(async () => {
                const header = findByTestId('group-detailed-holdings-header');

                expect(header).toBeVisible();
                expect((await findByTestId('group-detailed-holdings-collapse-icon')).querySelector('i')).toHaveStyle({ transform: 'rotate(90deg)' });
            });
        });

        it('should not render anything if props are null', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                const header = findByTestId('group-detailed-holdings-header');
                expect(header).toBeVisible();
            });
            const rtVal = detailedListParams.groupProps.onRenderHeader(undefined);
            expect(rtVal).toBeNull();
        });

        it('should render detailed members group holdings component collapsed', async () => {
            group.isCollapsed = true;
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(async () => {
                const header = findByTestId('group-detailed-holdings-header');
                expect(header).toBeVisible();
                expect((await findByTestId('group-detailed-holdings-collapse-icon')).querySelector('i')).toHaveStyle({ transform: 'rotate(0deg)' });
            });
        });

        it('should not render header checkbox if onFHSelected undef', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                const header = findByTestId('group-detailed-holdings-header');
                expect(header).toBeVisible();
            });
            expect(checkboxParams['group-detailed-holdings-check-group']).toBeUndefined();
        });

        it('should render header checkbox if onFHSelected undef', async () => {
            const funcParams = { ...currParams, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...funcParams} />);
            waitFor(() => {
                const header = findByTestId('group-detailed-holdings-header');
                expect(header).toBeVisible();
                expect(checkboxParams['group-detailed-holdings-check-group']).toBeDefined();
            });
        });

        it('allSelected checkbox should be checked if all are checked', async () => {
            const fncParams = { ...currParams, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
                expect(checkboxParams['group-detailed-holdings-check-group'].checked).toBeTruthy();
                expect(checkboxParams['group-detailed-holdings-check-group'].indeterminate).toBeFalsy();
            });
        });

        it('groupSelected checkbox should be intermediate if some are checked', async () => {
            const groupMock = getFullMock();
            const allFh = groupMock.groupsArray[0].financialHoldings || [];
            const selectedFh = [allFh[0]];
            const currGroup = { ...group, count: 4 };
            const fncParams = { ...currParams, groups: [currGroup], items: allFh, financialHoldings: selectedFh, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
                expect(checkboxParams['group-detailed-holdings-check-group'].checked).toBeFalsy();
                expect(checkboxParams['group-detailed-holdings-check-group'].indeterminate).toBeTruthy();
            });
        });

        it('groupSelected checkbox should be empty if none are checked', async () => {
            const fncParams = { ...currParams, financialHoldings: [], onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
                expect(checkboxParams['group-detailed-holdings-check-group'].checked).toBeFalsy();
                expect(checkboxParams['group-detailed-holdings-check-group'].indeterminate).toBeFalsy();
            });
        });

        it('groupSelected checkbox should call onFHSelected when pressed', async () => {
            const fncParams = { ...currParams, financialHoldings: [], onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings')).toBeVisible();
                checkboxParams['group-detailed-holdings-check-group'].onChange(undefined, true);
                expect(fncParams.onFHSelected).toHaveBeenCalledTimes(1);
                expect(fncParams.onFHSelected.mock.calls[0][1]).toBeTruthy();
                expect(fncParams.onFHSelected.mock.calls[0][0]).toHaveLength(1);
            });
        });

        it('viewkey `mem` - icon not displayed', async () => {
            const { findByTestId, queryAllByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);

            expect(await findByTestId('group-detailed-holdings')).toBeVisible();
            expect(queryAllByTestId('group-detailed-holdings-category-icon')).toHaveLength(0);
        });

        it('viewkey `rlCat` - icon displayed but without any class', async () => {
            const fncParams = { ...currParams, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.roleCategory };
            const { findByTestId, queryAllByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTestId('group-detailed-holdings')).toBeVisible();
            const icons = queryAllByTestId('group-detailed-holdings-category-icon-undefined');
            expect(icons).toHaveLength(1);
        });

        it('viewkey `rlCat` - show role column', async () => {
            const fncParams = { ...currParams, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.roleCategory };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTestId('group-detailed-holdings-row-cell-role')).toBeVisible();
        });

        it('viewkey `cat` - icon displayed but without any class', async () => {
            const fncParams = { ...currParams, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category };
            const { findByTestId, queryAllByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTestId('group-detailed-holdings')).toBeVisible();
            const icons = queryAllByTestId('group-detailed-holdings-category-icon-undefined');
            expect(icons).toHaveLength(1);
        });

        it('viewkey `cat` with existing category - icon displayed', async () => {
            const fncParams = { ...currParams, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category };
            fncParams.groups[0].key = Object.keys(FH_OVERVIEW_ICON_TEXT_MAP)[0];
            const { findByTestId, getByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTestId('group-detailed-holdings')).toBeVisible();
            const icons = getByTestId(`group-detailed-holdings-category-icon-${FH_OVERVIEW_ICON_TEXT_MAP[fncParams.groups[0].key].icon}`);
            expect(icons).toBeVisible();
        });

        it('group text to be the name and count', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);

            const headerText = await findByTestId('group-detailed-holdings-header-text');
            expect(headerText).toBeVisible();
            expect(headerText).toHaveTextContent(`${group.name} (1)`);
        });

        it('group text to be the name and count when none selected', async () => {
            const groupMock = getFullMock();
            const allFh = groupMock.groupsArray[0].financialHoldings || [];
            const selectedFh = [];
            const currGroup = { ...group, count: 4 };
            const fncParams = { ...currParams, groups: [currGroup], items: allFh, financialHoldings: selectedFh, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            const headerText = await findByTestId('group-detailed-holdings-header-text');
            expect(headerText).toBeVisible();
            expect(headerText).toHaveTextContent(`${group.name} (4)`);
        });

        it('group text to be the name and selected', async () => {
            const groupMock = getFullMock();
            const allFh = groupMock.groupsArray[0].financialHoldings || [];
            const selectedFh = [allFh[0], allFh[1]];
            const currGroup = { ...group, count: 4 };
            const fncParams = { ...currParams, groups: [currGroup], items: allFh, financialHoldings: selectedFh, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            const headerText = await findByTestId('group-detailed-holdings-header-text');
            expect(headerText).toBeVisible();
            expect(headerText).toHaveTextContent(`${group.name} (2 of 4 selected)`);
        });

        it('pressing the toggle icon', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);

            const collapse = await findByTestId('group-detailed-holdings-collapse-icon');
            expect(collapse).toBeVisible();
            detailedListParams.onToggleCollapse.mockReset();
            fireEvent.click(collapse);
            expect(detailedListParams.onToggleCollapse).toHaveBeenCalledTimes(1);
            expect(detailedListParams.onToggleCollapse.mock.calls[0][0]).toEqual(currParams.groups[0]);
        });
    });

    describe('testing detailList row cells', () => {
        it('should render fh name', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...params} />);

            expect(await findByTestId('group-detailed-holdings-row-name')).toBeVisible();
        });

        it('should not render unknown columns', async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...params} />);

            const fhName = await findByTestId('group-detailed-holdings-row-name');
            expect(fhName).toBeVisible();
            expect(fhName).toHaveTextContent(params.financialHoldings[0].name);
            expect(detailedListParams.onRenderItemColumn({}, -1, { key: 'mockKey' })).toEqual('');
        });

        it("should render empty string if group doesn't exists", async () => {
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...params} />);

            expect(await findByTestId('group-detailed-holdings-row-name')).toBeVisible();
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'fhn' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'typ' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'val' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'ins' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn({}, -1, { key: 'ins' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'indicator' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn('indicator', -1, { key: 'indicator' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'cat' })).toEqual('');
        });

        it("should render empty string if group doesn't exists in category view", async () => {
            const fncParams = { ...params, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTestId('group-detailed-holdings-row-name')).toBeVisible();
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'own' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn({ owners: [] }, -1, { key: 'own' })).toEqual('');
            expect(detailedListParams.onRenderItemColumn(undefined, -1, { key: 'add' })).toEqual('');
        });

        it('should render fh type', async () => {
            const groupContextMock = getGroupContextMock();
            params.fhPickLists.fhTypeTypes.set(params.financialHoldings[0].type, 'mockType');

            const { findAllByTestId } = render(
                <GroupsContext.Provider {...groupContextMock}>
                    <DetailedMembersGroupHoldings {...params} />
                </GroupsContext.Provider>
            );
            waitFor(async () => {
                const cells = await findAllByTestId('group-detailed-holdings-row-cell-type');
                expect(cells.length).toEqual(1);
                expect(cells[0]).toHaveTextContent('mockType');
            });
        });

        it('should render fh category', async () => {
            const groupContextMock = getGroupContextMock();
            params.fhPickLists.fhCategoryTypes.set(params.financialHoldings[0].category, 'mockCategory');
            const { findAllByTestId } = render(
                <GroupsContext.Provider {...groupContextMock}>
                    <DetailedMembersGroupHoldings {...params} />
                </GroupsContext.Provider>
            );
            waitFor(async () => {
                const cells = await findAllByTestId('group-detailed-holdings-row-cell-category');
                expect(cells.length).toEqual(1);
                expect(cells[0]).toHaveTextContent('mockCategory');
            });
        });

        it('should render fh value', async () => {
            params.financialHoldings[0].balance = 100;
            params.financialHoldings[0].balanceDisplay = 100;
            const { findAllByTestId } = render(<DetailedMembersGroupHoldings {...params} />);
            waitFor(async () => {
                const cells = await findAllByTestId('group-detailed-holdings-row-cell-balance');
                expect(cells.length).toBeGreaterThan(0);
                expect(cells[cells.length - 1]).toHaveTextContent('100');
            });
        });

        it('should render fh indicator when exists', async () => {
            const fh = params.financialHoldings[0] || {};
            const indicatorText = {
                order: 1,
                messageKey: 'mock indicator',
                type: () => 'fyi',
            };
            fh['indicator'] = [indicatorText];
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...params} />);

            const indicator = await findByTestId('group-fh-row-indicator');
            expect(indicator).toBeVisible();
            expect(indicator).toHaveTextContent(indicatorText.messageKey);
        });

        it('should not render fh indicator when not exists', async () => {
            const fh = params.financialHoldings[0] || {};
            fh['indicator'] = [];
            const { findByTestId, queryByTestId } = render(<DetailedMembersGroupHoldings {...params} />);

            expect(await findByTestId('group-detailed-holdings-row')).toBeVisible();

            const indicator = await queryByTestId('group-fh-row-indicator');
            expect(indicator).toBeNull();
        });

        it('should render fh owner when exists 1', async () => {
            const fncParams = { ...params, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category };
            fncParams.financialHoldings[0].owners = [{ contact: { fullName: 'mock owner', contactId: 'mockId' }, role: fhRolesValues.owner }];
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTestId('clickable-persona')).toBeVisible();
            expect(await findByTestId('clickable-persona')).toHaveTextContent(fncParams.financialHoldings[0].owners[0].contact.fullName);
        });

        it('should render fh owner when exists multi', async () => {
            const fncParams = { ...params, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category };
            fncParams.financialHoldings[0].owners = [
                { contact: { fullName: 'mock owner 1', contactId: 'mockId' }, role: fhRolesValues.owner },
                { contact: { fullName: 'mock owner2', contactId: 'mockId2' }, role: fhRolesValues.owner },
            ];
            const { findByTitle } = render(<DetailedMembersGroupHoldings {...fncParams} />);

            expect(await findByTitle(fncParams.financialHoldings[0].owners[0].contact.fullName)).toBeVisible();
            expect(await findByTitle(fncParams.financialHoldings[0].owners[1].contact.fullName)).toBeVisible();
        });

        it('should render checked fh row', async () => {
            const currParams = { ...params, onFHSelected: jest.fn() };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings-row')).toBeVisible();
                const rowCheckbox = checkboxParams['group-detailed-holdings-row-checkbox'];
                expect(rowCheckbox.checked).toBeTruthy();
            });
        });

        it('should render unchecked fh row', async () => {
            const currParams = { ...params, onFHSelected: jest.fn(), financialHoldings: [] };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings-row')).toBeVisible();
                const rowCheckbox = checkboxParams['group-detailed-holdings-row-checkbox'];
                expect(rowCheckbox.checked).toBeFalsy();
            });
        });

        it('should render unchecked fh row and press it', async () => {
            const currParams = { ...params, onFHSelected: jest.fn(), financialHoldings: [] };
            const { findByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);

            waitFor(() => {
                expect(findByTestId('group-detailed-holdings-row')).toBeVisible();
                const rowCheckbox = checkboxParams['group-detailed-holdings-row-checkbox'];
                expect(rowCheckbox.checked).toBeFalsy();
                currParams.onFHSelected.mockReset();
                rowCheckbox.onChange(undefined, true);

                expect(currParams.onFHSelected).toHaveBeenCalledTimes(1);
                expect(currParams.onFHSelected.mock.calls[0][1]).toEqual(true);
                expect(currParams.onFHSelected.mock.calls[0][0]).toEqual([currParams.items[0]]);
            });
        });
    });

    describe('Compact Mode', () => {
        it('should not show type column', async () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2 };
            const { findByTestId, queryByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(() => {
                expect(findByTestId('group-detailed-holdings-row')).toBeVisible();
            });
            expect(queryByTestId('group-detailed-holdings-row-cell-type')).toBeNull();
        });

        it('should show description in fh name column', async () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2 };

            const groupContextMock = getGroupContextMock();
            params.financialHoldings[0].description = 'mockDescription';

            const { findByTestId, debug } = render(
                <GroupsContext.Provider {...groupContextMock}>
                    <DetailedMembersGroupHoldings {...currParams} viewKey={GROUPS_HOLDINGS_VIEW_KEYS.roleCategory} />
                </GroupsContext.Provider>
            );

            waitFor(() => {
                const desc = findByTestId('group-detailed-holdings-description');
                expect(desc).toBeVisible();
                expect(desc).toHaveTextContent('mockDescription');
            });
        });

        it('should not show description in fh name column when not view is not roleCategory', () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2 };

            const groupContextMock = getGroupContextMock();
            params.financialHoldings[0].description = 'mockDescription';

            const { queryByTestId } = render(
                <GroupsContext.Provider {...groupContextMock}>
                    <DetailedMembersGroupHoldings {...currParams} viewKey={GROUPS_HOLDINGS_VIEW_KEYS.members} />
                </GroupsContext.Provider>
            );

            expect(queryByTestId('group-detailed-holdings-description')).toBeNull();
        });

        it('should not show description in fh name column when there is no desc', () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2 };

            const groupContextMock = getGroupContextMock();
            params.financialHoldings[0].description = '';

            const { queryByTestId } = render(
                <GroupsContext.Provider {...groupContextMock}>
                    <DetailedMembersGroupHoldings {...currParams} viewKey={GROUPS_HOLDINGS_VIEW_KEYS.roleCategory} />
                </GroupsContext.Provider>
            );

            expect(queryByTestId('group-detailed-holdings-description')).toBeNull();
        });

        it('should show type in fh name column', async () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2 };

            const groupContextMock = getGroupContextMock();
            params.fhPickLists.fhTypeTypes.set(params.financialHoldings[0].type, 'mockCompactType');

            const { findByTestId, debug } = render(
                <GroupsContext.Provider {...groupContextMock}>
                    <DetailedMembersGroupHoldings {...currParams} />
                </GroupsContext.Provider>
            );

            waitFor(() => {
                const typeSubtitle = findByTestId('group-detailed-holdings-type-subtitle');
                expect(typeSubtitle).toBeVisible();
                expect(typeSubtitle).toHaveTextContent('mockCompactType');
            });
        });

        it('should not show typ, currency, indicator column', async () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category };
            const { queryAllByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);

            expect(queryAllByTestId(/group-detailed-holdings-row-cell/i)).toHaveLength(1);
        });
        it('should render fh value with currency in compact mode', async () => {
            const currParams: IDetailedMembersGroupHoldingsProps = { ...params, responsiveColumns: 2, viewKey: GROUPS_HOLDINGS_VIEW_KEYS.category };
            currParams.financialHoldings[0].balance = 100;
            currParams.financialHoldings[0].balanceDisplay = 100;
            currParams.financialHoldings[0].currencyId = 'EUR';
            const { findAllByTestId } = render(<DetailedMembersGroupHoldings {...currParams} />);
            waitFor(async () => {
                const cells = await findAllByTestId('group-detailed-holdings-row-cell-balance');
                expect(cells.length).toBeGreaterThan(0);
                const cell = cells[cells.length - 1];
                expect(cell).toHaveTextContent('100');
                expect(cell).toHaveTextContent('EUR');
            });
        });
    });
});
