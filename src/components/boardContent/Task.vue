<template>
    <div
      v-for="({ id, title, subtasks }, index) in tasks"
      :key="id"
      class="task"
      draggable="true"
      @click="viewTask(id)"
      @dragstart="handleDragStart($event, id)"
      :data-task-hovered-index="index"
    >
        <p class="task-title">{{ title }}</p>
        <p class="subtasks-count">{{ subtasks.length }} of subtasks</p>
    </div>
</template>

<script setup lang="ts">
import { useCurrentTask } from '@/stores/current';
import { useAppModal } from '@/stores/appGlobals';
import type { TaskType } from '@/@types/boardTypes';

export interface Props {
    tasks?: TaskType[],
    columnId: string,
}

const props = withDefaults(defineProps<Props>(), {
    tasks: () => [],
    columnId: '',
});

const handleDragStart = (event: {
  dataTransfer: any;
  target: any;
  preventDefault: () => void; 
}, taskId: string) => {
    event.target.classList.add('drag-enter');
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(
        'itemId',
        JSON.stringify({ taskId, oldColumnId: props.columnId})
    );
}

const currentTaskStore = useCurrentTask();
const { setCurrentTask } = currentTaskStore;

const appModalStore = useAppModal();
const { toggleModal, setModalName } = appModalStore;

const viewTask = (taskId: string) => {
    setCurrentTask(taskId, props.columnId);
    setModalName('viewTask');
    toggleModal();
};
</script>

<style scoped lang="less">
.task {
    background-color: var(--light);
    border-radius: 8px;
    box-shadow: var(--shadow);
    width: 100%;
    padding: 23px 16px;

    &:hover {
        cursor: pointer;

        .task-title {
            color: var(--primary);
        }
    }
}

.task-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--font-primary);
}

.subtasks-count {
    font-size: 12px;
    font-weight: 500;
    color: var(--font-secondary);
    padding-top: 8px;
}
</style>