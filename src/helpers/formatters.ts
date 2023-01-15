import { v4 as uuidv4 } from 'uuid';
import type { SubTaskType } from '@/@types/boardTypes';

export const createId = () => {
    return uuidv4();
};

export const completedSubtasks = (subtasks: SubTaskType[]) => {
    let completed = 0;

    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed += 1;
        }
    })

    return completed;
};