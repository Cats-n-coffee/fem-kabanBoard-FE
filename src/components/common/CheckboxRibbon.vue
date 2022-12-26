<template>
    <div>
        <div v-for="({ title, isCompleted }, index) in subtasks" :key="index">
            <input type="checkbox" :value="isCompleted" :id="title" />
            <label :for="title">{{ title }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface SubtaskType {
    title: string,
    isCompleted: boolean,
}

export interface Props {
    subtasks: SubtaskType[],
}

withDefaults(defineProps<Props>(), {
    subtasks: () => [],
});
</script>
