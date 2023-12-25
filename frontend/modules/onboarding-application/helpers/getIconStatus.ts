import { ICONS_CLASS_SUFFIX } from "../components/TaskProgressOverview/TasksProgressOverviewList/TasksProgressOverviewList.const";

export const getIconStatus = ({ completed, total }: { completed: number; total: number }) => {
    if (completed === total) return ICONS_CLASS_SUFFIX.DONE;

    if (completed === 0) return ICONS_CLASS_SUFFIX.NEW;

    return ICONS_CLASS_SUFFIX.NOT_COMPLETE;
};