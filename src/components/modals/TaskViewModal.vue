<template>
    <div class="view-task-modal">
        <div>
            <h2>{{ title }}</h2>
            <EllipsisButton
                :show-edit-modal="showEditTaskModal"
                :show-delete-modal="showDeleteTaskModal"
                edit-action-text="Edit Task"
                delete-action-text="Delete Task"
            />
        </div>
        <p>{{ description }}</p>
        <div>
            <h3>Subtasks</h3>
            <CheckboxRibbon :subtasks="subtasks" />
        </div>
        <FormSelect label="Current Status" for-attr="view-task-select" />
    </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped lang="less">
.view-task-modal {
    max-width: 480px;
    margin: 0 16px;
    background-color: var(--light);
    border-radius: 16px;
    padding: 24px;

    @media screen and (min-width: 700px) {
        padding: 32px;
    }
}

.task-actions {
    z-index: 5;
}
</style>