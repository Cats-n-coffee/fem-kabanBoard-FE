<template>
    <div class="view-task-modal">
        <div class="task-title-actions">
            <h2>{{ title }}</h2>
            <EllipsisButton
                class="task-actions"
                :show-edit-modal="showEditTaskModal"
                :show-delete-modal="showDeleteTaskModal"
                edit-action-text="Edit Task"
                delete-action-text="Delete Task"
            />
        </div>
        <p v-if="description" class="task-description">{{ description }}</p>
        <div class="task-subtasks">
            <h3 class="form-label">Subtasks ({{ numberOfCompletedTasks }})</h3>
            <CheckboxRibbon :subtasks="subtasks" />
        </div>
        <FormSelect label="Current Status" for-attr="view-task-select" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import CheckboxRibbon from '../common/CheckboxRibbon.vue';
import EllipsisButton from '../common/EllipsisButton.vue';
import FormSelect from '../common/FormSelect.vue';
import { useCurrentTask } from '@/stores/current';
import { useAppModal } from '@/stores/appGlobals';

const currentTaskStore = useCurrentTask();
const { currentTask } = storeToRefs(currentTaskStore);
const { title, description, subtasks, status } = currentTask.value;

const appModalStore = useAppModal();
const { setModalName } = appModalStore;

const showEditTaskModal = () => {
    console.log('edit task modal');
    setModalName('editTask');
};

const showDeleteTaskModal = () => {
    console.log('delete task modal');
    setModalName('deleteTask');
};

const numberOfCompletedTasks = computed(() => {
    return 'num of total';
});
</script>

<style scoped lang="less">
.view-task-modal {
    max-width: 480px;
    width: 100%;
    margin: 0 16px;
    background-color: var(--light);
    border-radius: 16px;
    padding: 24px;

    @media screen and (min-width: 700px) {
        padding: 32px;
    }
}

.task-title-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .task-actions {
        height: 100%;
    }
}

.task-description {
    font-size: 13px;
    font-weight: 500;
    line-height: 23px;
    color: var(--font-secondary);
    padding-top: 24px;
}

.task-subtasks {
    
}
</style>