<template>
    <div
      v-for="{ id, title, subtasks } in tasks"
      :key="id"
      class="task"
      draggable="true"
      @dragstart="handleDragStart($event, id)"
    >
        <p class="task-title">{{ title }}</p>
        <p class="subtasks-count">{{ subtasks.length }} of subtasks</p>
    </div>
</template>

<script setup lang="ts">
export interface TaskType {
    title: string,
    description: string,
    id: string,
    status: string,
    subtasks: [],
}

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
target: any; preventDefault: () => void; 
}, taskId: string) => {
    event.target.classList.add('drag-enter');
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData(
        'itemId',
        JSON.stringify({ taskId, oldColumnId: props.columnId})
    );
}
</script>

<style scoped lang="less">
.task {
    background-color: var(--light);
    border-radius: 8px;
    box-shadow: var(--shadow);
    width: 100%;
    padding: 23px 16px;
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