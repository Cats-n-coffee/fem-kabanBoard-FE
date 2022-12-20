import { ref, type Ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

interface TaskType {
    description: string,
    id: string,
    title: string,
    subtasks: [],
    status: string,
}

interface ColumnType {
    id: string,
    name: string,
    tasks: TaskType[],
}

interface BoardsType {
    id: string,
    name: string,
    columns: ColumnType[],
}

interface BoardsOnlyType {
    id: string,
    name: string,
}

interface AllBoardType {
    boards: BoardsType[],
};

export const useBoardsStore = defineStore('boards', () => {
    const allBoards: Ref<AllBoardType> = ref({ boards: [] });
    const boards: Ref<BoardsOnlyType[]> = ref([]);
    const columnsAndTasks: Ref<ColumnType[]> = ref([]);

    const currentBoardStore = useCurrentBoard();
    const { currentBoard } = storeToRefs(currentBoardStore);
    const { setCurrentBoard } = currentBoardStore;

    const fetchBoards = async () => {
        const response = await fetch('./data.json');
        const jsonBoards = await response.json();
        allBoards.value = jsonBoards;

        // add localStorage
        prepareStateAfterFetch();
        return jsonBoards;
    };

    const getBoards = () => {
        allBoards.value.boards.forEach(
            (board) => boards.value.push({ id: board.id, name: board.name })
        );
    };

    const setBoards = () => {
        const currentBoardId = currentBoard.value.id;

        allBoards.value.boards.forEach((board) => {
            if (currentBoardId === board.id) {
                board.columns = columnsAndTasks.value;
            }
        })
    };

    const getColumns = () => { };

    const setColumns = () => { };

    // Returns the task obj and removes from original column
    const getTaskAndRemove = (taskId: string, columnId: string): TaskType => {
        let wholeTask: TaskType = {
            description: '',
            id: '',
            title: '',
            subtasks: [],
            status: '',
        };
    
        columnsAndTasks.value.forEach((column) => {
            if (columnId === column.id) {
                column.tasks.forEach((task: TaskType) => {
                    if (taskId === task.id) {
                        wholeTask = task;
                        deleteTask(taskId, columnId);
                    }
                })
            }
        });

        return wholeTask;
    };

    const getColumnTasks = () => {
        columnsAndTasks.value = [];
        allBoards.value.boards.forEach((board) => {
            if (board.id === currentBoard.value.id) {
                columnsAndTasks.value.push(...board.columns);
            }
        })
    };

    // updates task's column id (drag/drop or dropdown)
    // use filter to remove task from old column
    // need to take the whole task to move it
    const setTaskColumn = (
        taskId: string,
        newColumnId: string,
        oldColumnId: string
    ) => { 
        const retreivedTask: TaskType = getTaskAndRemove(taskId, oldColumnId);
        console.log(retreivedTask);
        columnsAndTasks.value.forEach((column) => {
            if (newColumnId === column.id) { // need to change the task id
                column.tasks.push(retreivedTask);
            }
        })
    }; // status

    const setTaskTitle = () => { };

    const setTaskSubtasks = () => { };

    const setTaskDescription = () => { };

    const deleteBoard = () => { };

    const deleteColumn = () => { };

    const deleteTask = (taskId: string, columnId: string) => {
        columnsAndTasks.value.forEach((column) => {
            if (columnId === column.id) {
                const filteredTasks = column.tasks.filter(
                    (task: TaskType) => task.id !== taskId,
                );
                column.tasks = filteredTasks;
            }
        })
    };

    // add more methods to get the numbers for each?
    // break for tasks/columns/boards?

    const prepareStateAfterFetch = () => {
        getBoards();

        if (boards.value.length) {
            setCurrentBoard(boards.value[0].id, boards.value[0].name);
            getColumnTasks();
        }
    }

    return {
        allBoards,
        boards,
        columnsAndTasks,
        fetchBoards,
        getBoards,
        getColumnTasks,
        setTaskColumn,
    };
});

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
