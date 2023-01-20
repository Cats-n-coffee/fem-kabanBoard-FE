<template>
    <div
      v-for="{ id, name, tasks } in columnsAndTasks"
      :key="id"
      class="column"
    >
        <h3>
            <span class="column-dot" :style="{ backgroundColor: randomColor() }"></span>
            {{ name }} ({{ tasks.length }})
        </h3>
        <section
          class="tasks-container"
          :class="{ 'no-tasks': !tasks.length}"
          @dragover.prevent
          @dragleave.prevent
          @dragenter="handleDragEnter($event, id)"
          @drop="handleDrop($event, id)"
        >
            <Task
              v-if="tasks.length"
              :tasks="tasks"
              :column-id="id"
            />

            <div v-else class="no-tasks-view">
                <button @click="openTaskModal">
                    <span>+</span>
                    <span class="title">New Task</span>
                </button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBoardsStore } from '@/stores/boards';
import { useAppModal } from '@/stores/appGlobals';
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
    
    dropIndex = taskHoveredIndex;
}

// Random colors for dots near the column name
const randomColor = () => "#"+((1<<24)*Math.random()|0).toString(16);

// Toggle add task modal
const appModalStore = useAppModal();
const { setModalName, toggleModal } = appModalStore;

const openTaskModal = () => {
    toggleModal();
    setModalName('addTask');
}
</script>

<style scoped lang="less">
.column {
    min-width: 280px;
    width: 280px;
    padding-bottom: 24px;

    h3 {
        display: flex;
        align-items: center;
        padding-bottom: 24px;
        text-transform: uppercase;
        color: var(--font-secondary);
        font-size: 14px;
        letter-spacing: 2.4px;

        .column-dot {
            display: inline-block;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-right: 12px;
        }
    }
}

.tasks-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    
    &.no-tasks {
        height: 100%;
    }
}

.no-tasks-view {
    background: var(--medium-gradient);
    border-radius: 6px;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        color: var(--primary);
        font-size: 24px;
        font-weight: 700;
        background: none;
        border: none;

        .title {
            margin-left: 8px;
        }

        &:hover {
            cursor: pointer;
        }
    }
}

.drag-enter {
    background: palevioletred;
}
</style>