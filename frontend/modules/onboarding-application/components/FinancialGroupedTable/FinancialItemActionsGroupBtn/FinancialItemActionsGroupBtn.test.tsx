import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { ApplicantFinancialItemCategories } from '../../../constants/FinancialCategories.const';
import { assetsAndLiabilitiesMock } from '../../../interfaces/mocks/IAssetsAndLiabilities.mock';
import { incomeAndExpensesMock } from '../../../interfaces/mocks/IIncomeAndExpenses.mocks';
import FinancialItemActionsGroupBtn from './FinancialItemActionsGroupBtn';
import { EDIT_DIALOG_NAMES, REMOVE_FINANCIAL_ITEM_DIALOG } from '../../FinancialItemFormDialog';

jest.mock('@fsi/core-components/dist/hooks/useDialogService/useDialogService');

describe('EditFinancialItemRowBtn', () => {
    const hasPrivilege = jest.fn().mockReturnValue(true);
    const mockProps = {
        item: {
            ...assetsAndLiabilitiesMock.assets[0],
            category: ApplicantFinancialItemCategories.ASSET,
        },
        index: 0,
        hasPrivilege,
    };

    const mockShowDialog = jest.fn();

    beforeEach(() => {
        (useDialogService as any).mockReturnValue({
            showDialog: mockShowDialog,
        });
    });

    it('should render the right title', () => {
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...mockProps} />);

        const btn = getByTestId(`edit-financial-item-${mockProps.item.id}`);

        expect(btn.getAttribute('aria-label')).toEqual(`Edit ${mockProps.item.category.toLowerCase()} ${mockProps.item.name}`);
    });

    it('should render the right title for income', () => {
        const props = {
            item: {
                ...incomeAndExpensesMock.incomes[0],
                category: ApplicantFinancialItemCategories.INCOME,
            },
            hasPrivilege,
        };
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...props} />);

        const btn = getByTestId(`edit-financial-item-${props.item.id}`);
        const removeBtn = getByTestId(`remove-financial-item-${props.item.id}`);

        expect(btn.getAttribute('aria-label')).toEqual(`Edit ${props.item.category.toLowerCase()} ${props.item.name}`);
        expect(removeBtn.getAttribute('aria-label')).toEqual(`Remove ${props.item.category.toLowerCase()} ${props.item.name}`);
    });

    it('should trigger showDialog with correct params', () => {
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...mockProps} />);
        const btn = getByTestId(`edit-financial-item-${mockProps.item.id}`);

        act(() => {
            fireEvent.click(btn);
        });

        expect(mockShowDialog).toHaveBeenCalledWith(EDIT_DIALOG_NAMES.ASSET, {
            category: mockProps.item.category,
            item: mockProps.item,
            index: mockProps.index,
            triggerButton: btn,
        });
    });

    it('should trigger showDialog with correct params for remove clicked', () => {
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...mockProps} />);
        const btn = getByTestId(`remove-financial-item-${mockProps.item.id}`);

        act(() => {
            fireEvent.click(btn);
        });

        expect(mockShowDialog).toHaveBeenCalledWith(REMOVE_FINANCIAL_ITEM_DIALOG, {
            category: mockProps.item.category,
            item: mockProps.item,
            index: mockProps.index,
        });
    });

    it('should enable edit and delete buttons', () => {
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...mockProps} />);
        const editButton = getByTestId(`edit-financial-item`, { exact: false });
        const removeButton = getByTestId(`remove-financial-item`, { exact: false });

        expect(editButton).toBeEnabled();
        expect(removeButton).toBeEnabled();
    });

    it('should disable edit and delete buttons when missing privileges', () => {
        const props = {
            ...mockProps,
            hasPrivilege: jest.fn().mockReturnValue(false),
        };

        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...props} />);
        const editButton = getByTestId(`edit-financial-item`, { exact: false });
        const removeButton = getByTestId(`remove-financial-item`, { exact: false });

        expect(editButton).toBeDisabled();
        expect(removeButton).toBeDisabled();
    });

    it('should render CommandButton when compactMode is set', () => {
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...mockProps} compactMode />);

        const btn = getByTestId(`more-actions-financial-button-${mockProps.item.id}`);

        const btnSRText = btn.querySelector(`#${btn.getAttribute('aria-describedby')}`);

        expect(btnSRText?.textContent).toEqual(`More actions, ${mockProps.item.category.toLowerCase()} ${mockProps.item.name}`);
    });

    it("should render CommandButton's menu when button is clicked", () => {
        const { getByTestId } = render(<FinancialItemActionsGroupBtn {...mockProps} compactMode />);

        const btn = getByTestId(`more-actions-financial-button-${mockProps.item.id}`);

        act(() => {
            fireEvent.click(btn);
        });

        const menuElement = document.getElementById(`${btn.getAttribute('aria-controls')}`);

        expect(menuElement).toBeInTheDocument();
    });

    afterEach(() => {
        mockShowDialog.mockClear();
    });
});
