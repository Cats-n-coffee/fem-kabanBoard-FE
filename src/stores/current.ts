import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useBoardsStore } from '@/stores/boards';
import type {
    TaskType,
    BoardsType,
    ColumnType,
} from '@/@types/boardTypes';

export const useCurrentBoard = defineStore('currentBoard', () => {
    const currentBoard: Ref<BoardsType> = ref({ id: '', name: '', columns: [] });

    const getCurrentBoard = () => {
        return currentBoard.value;
    };

    const setCurrentBoard = (id: string, name: string, columns: ColumnType[]) => {
        currentBoard.value = {
            id,
            name,
            columns,
        }
    };

    return {
        currentBoard,
        getCurrentBoard,
        setCurrentBoard,
    }
});

export const useCurrentTask = defineStore('currentTask', () => {
    const boardsStore = useBoardsStore();
    const { getEditTask } = boardsStore;

    const currentTask: Ref<TaskType> = ref({
        description: '',
        id: '',
        title: '',
        subtasks: [],
        status: '',
    });

    const setCurrentTask = (taskId: string, columnId: string) => {
        const fullTask = getEditTask(taskId, columnId);
        currentTask.value = fullTask;
    }; 

    return {
        currentTask,
        setCurrentTask,
    }
});
