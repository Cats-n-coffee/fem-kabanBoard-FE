import { ref, type Ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useCurrentBoard } from './current';
import type {
    SubTaskType,
    TaskType,
    ColumnType,
    BoardsType,
} from '@/@types/boardTypes';

export const useBoardsStore = defineStore('boards', () => {
    const boards: Ref<BoardsType[]> = ref([]);
    const columnsAndTasks: Ref<ColumnType[]> = ref([]);

    // Other stores
    const currentBoardStore = useCurrentBoard();
    const { currentBoard } = storeToRefs(currentBoardStore);
    const { setCurrentBoard } = currentBoardStore;

    // Initial data
    const fetchBoards = async () => {
        const response = await fetch('./data.json');
        const jsonBoards = await response.json();
        boards.value = jsonBoards.boards;

        // add localStorage
        prepareStateAfterFetch();
        return jsonBoards;
    };

    // Boards only
    const getBoards = () => {
        return boards.value;
    };

    const addBoard = (board: BoardsType) => {
        boards.value.push(board);
    };

    const editBoard = (payload: BoardsType) => {
        console.log('edit', payload);
        let boardToEdit = boards.value.find(
            (board) => board.id === payload.id
        );
        const currentColumns = boardToEdit?.columns;
        // find the current columns and compare? overwrite what's changes
        boardToEdit = { ...boardToEdit, ...payload }
 
        console.log('board', boardToEdit);
    };

    const deleteBoard = (boardId: string) => {
        const remainingBoards = boards.value.filter((board) => {
            return board.id !== boardId;
        })

        boards.value = remainingBoards;
        // Set the current board in view to the first board or nothing
        if (remainingBoards.length) {
            setCurrentBoard({
                id: boards.value[0].id,
                name: boards.value[0].name,
                columns: boards.value[0].columns,
            });
        } else { // need to change when handle no boards view
            setCurrentBoard({ id: '', name: '', columns: [] });
        }
        getColumnsAndTasks();
    };

    // Columns only
    const getColumn = (columnId: string) => {
        let column: ColumnType = {
            id: '',
            name: '',
            tasks: [],
            parentBoardId: currentBoard.value.id
        };

        columnsAndTasks.value.forEach((col) => {
            if (col.id === columnId) {
                column = col;
            }
        });

        return column;
    };

    const getColumnNames = () => { // for the status dropdown
        return currentBoard.value.columns.map((col) => col.name);     
    };

    const setColumns = () => { };

    const deleteColumn = () => { };

    // Columns and Tasks
    const getColumnsAndTasks = () => {
        columnsAndTasks.value = [];
        boards.value.forEach((board) => {
            if (board.id === currentBoard.value.id) {
                columnsAndTasks.value.push(...board.columns);
            }
        })
    };

    // Tasks only
    const addTask = (newTask: TaskType) => {
        currentBoard.value.columns.forEach((col) => {
            if (col.name === newTask.status) {
                col.tasks.push(newTask);
            }
        })
    };

    // Returns the task obj and removes from original column
    const getTaskAndRemove = (taskId: string, columnId: string): TaskType => {
        let wholeTask: TaskType = {
            description: '',
            id: '',
            title: '',
            subtasks: [],
            status: '',
            parentColumnId: '',
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

    const setChangeTaskIndex = (
        taskId: string,
        column: ColumnType,
        columnId: string,
        taskIndex: number
    ) => {
        let taskToMove: TaskType;
        let taskOriginalIndex: number;

        column.tasks.forEach((task, index) => {
            if (task.id === taskId) {
                taskToMove = task;
                taskOriginalIndex = index;
            }
        })

        columnsAndTasks.value.forEach((col) => {
            if (col.id === columnId) {
                col.tasks.splice(
                    taskIndex ?? col.tasks.length,
                    0,
                    taskToMove,
                );
                col.tasks.splice(taskOriginalIndex + 1, 1);
            } 
        })

    };

    const getEditTask = (taskId: string, columnId: string): TaskType => {
        let wholeTask: TaskType = {
            description: '',
            id: '',
            title: '',
            subtasks: [],
            status: '',
            parentColumnId: '',
        };
    
        columnsAndTasks.value.forEach((column) => {
            if (columnId === column.id) {
                column.tasks.forEach((task: TaskType) => {
                    if (taskId === task.id) {
                        wholeTask = task;
                    }
                })
            }
        });

        return wholeTask;
    };

    const editTask = (updatedTask: TaskType) => {
        currentBoard.value.columns.forEach((col) => {
            if (col.name === updatedTask.status) {
                const tasks: TaskType[] = col.tasks.map((task) => {
                    if (task.id === updatedTask.id) {
                        return updatedTask;
                    }
                    return task;
                })
                col.tasks = tasks;
            }
        });
    }

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
            setCurrentBoard({
                id: boards.value[0].id,
                name: boards.value[0].name,
                columns: boards.value[0].columns,
            });
            getColumnsAndTasks();
        }
    }

    return {
        boards,
        addBoard,
        editBoard,
        deleteBoard,
        columnsAndTasks,
        fetchBoards,
        getBoards,
        getColumn,
        getColumnNames,
        getColumnsAndTasks,
        setTaskColumn,
        addTask,
        deleteTask,
        editTask,
        getEditTask,
        setChangeTaskIndex,
    };
});
