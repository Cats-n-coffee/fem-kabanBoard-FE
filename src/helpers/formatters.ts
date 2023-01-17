import { v4 as uuidv4 } from 'uuid';
import type { ColumnType, SubTaskType } from '@/@types/boardTypes';
import { isNumber } from '@vueuse/core';

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

// Checks the new column name and append "-N" if duplicate
export const checkForDuplicateName = (
    values: ColumnType[],
    valueToCompare: ColumnType
) => {
    let count = 0;
    let adjustedName = '';
    const lowerCasedName = valueToCompare.name.toLowerCase();

    for (let i = 0; i < values.length; i++) {
        if (
            lowerCasedName.includes(values[i].name.toLowerCase())
            && values[i].id
        ) {
            console.log('includes')
            // Check if we already have duplicates with a number
            const hasCurrentCount = values[i].name.indexOf('-');
            if (hasCurrentCount !== -1 && isNumber(values[i].name[hasCurrentCount + 1])) {
                count = Number(values[i].name[hasCurrentCount + 1]) + 1;
            } else {
                count += 1;
            }
        }
    }

    if (count > 0) {
        adjustedName = `${valueToCompare.name}-${count}`;
    }

    return adjustedName;
};