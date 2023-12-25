export const useTaskPrivilege = fetcher => {
    return {
        canEditTasks: fetcher.hasTasksPrivilege(),
    };
};
