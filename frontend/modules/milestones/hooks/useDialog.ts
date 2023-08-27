import { useCallback, useContext } from 'react';
import { LifeEventContext } from '../LifeEvent.context';
interface useDialogOutput {
    openAddEvent: (categoryCode: number) => void;
}

const useDialog = (): useDialogOutput => {
    const { openSidePanelCategory, setOpenSidePanelCategory, setEditDialogConfig } = useContext(LifeEventContext);

    const openAddEvent = useCallback(
        categoryCode => {
            setOpenSidePanelCategory(0);
            setEditDialogConfig({
                initialValue: {
                    categoryCode: categoryCode,
                },
            });
        },
        [openSidePanelCategory]
    );

    return { openAddEvent };
};

export default useDialog;
