import { useEffect, useState } from 'react';
import { ITask } from '../interfaces/ITask';
import { TaskStatus } from '../constants/Fields.const';

export function useCanceledTaskGroup(tasks: ITask[], bpfStage?: string) {
    const [showCanceledTasksMessage, setShowCanceledTasksMessage] = useState(false);

    useEffect(() => {
        const canceledTasks = tasks?.find(task => task.status === TaskStatus.Canceled);
        if (canceledTasks) {
            setShowCanceledTasksMessage(true);
        } else {
            setShowCanceledTasksMessage(false);
        }
    }, [tasks, bpfStage]);

    return {
        showCanceledTasksMessage,
        setShowCanceledTasksMessage,
    };
}
