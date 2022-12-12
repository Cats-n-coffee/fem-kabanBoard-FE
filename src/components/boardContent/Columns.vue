<template>
    <div v-for="{ id, name, tasks } in columnsAndTasks" :key="id" class="column">
        <h3>{{ name }}</h3>
        <section class="tasks-container">
            <Task :tasks="tasks"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBoardsStore } from '@/stores/boards';
import Task from './Task.vue';

const boardsStore = useBoardsStore();
const { columnsAndTasks } = storeToRefs(boardsStore);
</script>

<style scoped lang="less">
.column {
    max-width: 280px;
    width: 100%;

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
}
</style>