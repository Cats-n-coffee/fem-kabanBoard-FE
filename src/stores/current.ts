import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useBoardsStore } from '@/stores/boards';

interface SubTaskType {
    title: string,
    isCompleted: boolean,
}

interface TaskType {
    description: string,
    id: string,
    title: string,
    subtasks: SubTaskType[],
    status: string,
}

interface BoardsOnlyType {
    id: string,
    name: string,
}

export const useCurrentBoard = defineStore('currentBoard', () => {
    const currentBoard: Ref<BoardsOnlyType> = ref({ id: '', name: '' });

    const getCurrentBoard = () => {
        return currentBoard.value;
    };

    const setCurrentBoard = (id: string, name: string) => {
        currentBoard.value.id = id;
        currentBoard.value.name = name;
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
