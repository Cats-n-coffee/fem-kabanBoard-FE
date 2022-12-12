import { ref, type Ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

interface BoardsOnlyType {
    id: string,
    name: string,
}

interface BoardsType {
    id: string,
    name: string,
    columns: [],
}

interface AllBoardType {
    boards: BoardsType[],
};

export const useBoardsStore = defineStore('boards', () => {
    const allBoards: Ref<AllBoardType> = ref({ boards: [] });
    const boards: Ref<BoardsOnlyType[]> = ref([]);
    const columnsAndTasks = ref([]);

    const currentBoardStore = useCurrentBoard();
    const { currentBoard } = storeToRefs(currentBoardStore);
    const { setCurrentBoard } = currentBoardStore;

    const fetchBoards = async () => {
        const response = await fetch('./data.json');
        const jsonBoards = await response.json();
        allBoards.value = jsonBoards;
        console.log('all', allBoards.value);
        // add localStorage
        prepareStateAfterFetch();
        return jsonBoards;
    };

    const getBoards = () => {
        allBoards.value.boards.forEach(
            (board) => boards.value.push({ id: board.id, name: board.name })
        );
    };

    const setBoards = () => { };

    const getColumns = () => { };

    const setColumns = () => { };

    const getTasks = () => { };

    const getColumnTasks = () => {
        columnsAndTasks.value = [];
        allBoards.value.boards.forEach((board) => {
            if (board.id === currentBoard.value.id) {
                columnsAndTasks.value.push(...board.columns);
            }
        })
    };

    const setTaskColumn = () => {}; // status

    const setTaskTitle = () => { };

    const setTaskSubtasks = () => { };

    const setTaskDescription = () => { };

    const deleteBoard = () => { };

    const deleteColumn = () => { };

    const deleteTask = () => { };

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
