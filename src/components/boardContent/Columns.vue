<template>
    <div
      v-for="{ id, name, tasks } in columnsAndTasks"
      :key="id"
      class="column"
    >
        <h3>{{ name }}</h3>
        <section
          class="tasks-container"
          @dragover.prevent
          @dragleave.prevent
          @dragenter="handleDragEnter($event, id)"
          @drop="handleDrop($event, id)"
        >
            <Task :tasks="tasks" :column-id="id"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBoardsStore } from '@/stores/boards';
import Task from './Task.vue';
import type { ColumnType } from '@/@types/boardTypes';

const boardsStore = useBoardsStore();
const { columnsAndTasks } = storeToRefs(boardsStore);
const { setTaskColumn, getColumn, setChangeTaskIndex } = boardsStore;

const isDroppableItemActive = ref(false)
let dropIndex: string;

const handleDrop = (event: DragEvent, columnId: string) => {
    const itemData = event.dataTransfer?.getData('itemId');
    const { taskId, oldColumnId } = JSON.parse(itemData!);

    setTaskColumn(taskId, columnId, oldColumnId);

    const column: ColumnType = getColumn(columnId);
    setChangeTaskIndex(taskId, column, columnId, Number(dropIndex));

    isDroppableItemActive.value = false;
}

const handleDragEnter = (event: {
    target: any;
    preventDefault: () => void;
}, columnId: string) => {
    event.preventDefault();
    isDroppableItemActive.value = true;

    const taskElement = event.target.closest('[data-task-hovered-index]');

    if (!taskElement) return;

    const { taskHoveredIndex } = taskElement.dataset;
    console.log('%c task hovered id', 'color: orange', taskHoveredIndex);
    
    dropIndex = taskHoveredIndex;
}
</script>

<style scoped lang="less">
.column {
    min-width: 280px;
    width: 280px;
    padding-bottom: 24px;

    h3 {
        padding-bottom: 24px;
        text-transform: uppercase;
        color: var(--font-secondary);
    }
}

.tasks-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    background-color: blue;  
}

.drag-enter {
    background: palevioletred;
}
</style>