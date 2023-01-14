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
    parentColumnId: string,
}

export interface ColumnType {
    id: string,
    name: string,
    tasks: TaskType[],
    parentBoardId: string,
}

export interface BoardsType {
    id: string,
    name: string,
    columns: ColumnType[],
}
