export interface SubTaskType {
    title: string,
    isCompleted: boolean,
}

export interface TaskType {
    description: string,
    id: string,
    title: string,
    subtasks: SubTaskType[],
    status: string,
}

export interface ColumnType {
    id: string,
    name: string,
    tasks: TaskType[],
}

export interface BoardsType {
    id: string,
    name: string,
    columns: ColumnType[],
}

export interface BoardsOnlyType {
    id: string,
    name: string,
}

export interface AllBoardType {
    boards: BoardsType[],
};