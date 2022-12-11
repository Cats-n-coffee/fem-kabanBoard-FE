import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

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

    };

    const setTaskColumn = () => { }; // status

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
            const currentBoardStore = useCurrentBoard();
            currentBoardStore.setCurrentBoard(boards.value[0].id);
        }
    }

    return {
        allBoards,
        fetchBoards,
        boards,
        getBoards,
    };
});

export const useCurrentBoard = defineStore('currentBoard', () => {
    const currentBoard: Ref<{ id: string }> = ref({ id: '' });

    const getCurrentBoard = () => {
        return currentBoard.value;
    };

    const setCurrentBoard = (id: string) => {
        currentBoard.value.id = id;
    };

    return {
        currentBoard,
        getCurrentBoard,
        setCurrentBoard,
    }
});
