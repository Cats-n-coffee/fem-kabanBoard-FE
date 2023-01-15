<template>
    <div class="view-task-modal" v-on-click-outside="updateAndClose">
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
            <CheckboxRibbon
              :subtasks="currentSubtasks"
              @subtask-updated="subtaskUpdated($event)"
            />
        </div>
        <FormSelect
          label="Current Status"
          for-attr="view-task-select"
          :selected-value="taskStatus"
          :values="allColumnsNames"
          @select-changed="updateStatus($event)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import CheckboxRibbon from '../common/CheckboxRibbon.vue';
import EllipsisButton from '../common/EllipsisButton.vue';
import FormSelect from '../common/FormSelect.vue';
import { useCurrentTask } from '@/stores/current';
import { useAppModal } from '@/stores/appGlobals';
import { useBoardsStore } from '@/stores/boards';
import { completedSubtasks } from '@/helpers/formatters';

const currentTaskStore = useCurrentTask();
const { getCurrentTask } = currentTaskStore;
const { id, title, description, subtasks, status, parentColumnId } = getCurrentTask();

const appModalStore = useAppModal();
const { setModalName, toggleModal } = appModalStore;

// Modal toggles
const showEditTaskModal = () => {
    setModalName('editTask');
};

const showDeleteTaskModal = () => {
    setModalName('deleteTask');
};

// Subtasks display
const numberOfCompletedTasks = computed(() => {
    const completed = completedSubtasks(subtasks);
    return `${completed} of ${subtasks.length}`;
});

const boardsStore = useBoardsStore();
const { getColumnNames, getColumnId, setTaskColumn } = boardsStore;

// Handle inputs
const currentSubtasks = ref(subtasks || []);

const subtaskUpdated = (event: any) => { // Updates state directly
    const { currentValue, title } = event;

    const updatedSubtasks = currentSubtasks.value.map((subtask) => {
        if (title === subtask.title) {
            subtask.isCompleted = currentValue;
        }
        return subtask;
    });
    currentSubtasks.value = updatedSubtasks;
};

const taskStatus = ref(status);
const allColumnsNames = getColumnNames();

const updateStatus = (option: string) => {
    taskStatus.value = option;
};

// Edit state for status and close modal
const updateAndClose = () => {
    const newColumnId = getColumnId(taskStatus.value);
    setTaskColumn(id, newColumnId, parentColumnId);
    toggleModal();
};
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
</style>