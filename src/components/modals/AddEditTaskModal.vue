<template>
    <Form>
        <template #title>
            {{ modalInView }}
        </template>
        <template #formType>
            <FormInputField
              label="Title"
              for-attr="task-title"
              :placeholderText="inputPlaceholderText"
              :input-value="taskTitle"
              @input-value="updateTaskTitle"
              @input-error="updateTitleError"
            />
            <FormTextarea
              label="Description"
              for-attr="task-description"
              :placeholderText="textareaPlaceholder"
              :input-value="taskDescription"
              @input-value="updateTaskDescription"
            />
            <FormInputInteractive
              label="Subtasks"
              for-attr="task-input-interactive"
              button-icon="+"
              button-label="Add New Subtask"
              :placeholder-subtask="modalPlaceholderColumns"
            />
            <FormSelect
              label="Status"
              for-attr="task-select"
              :selected-value="taskStatus"
              :values="allColumnsNames"
            />
        </template>
        <template #submitButton>
            <Button
              class="submit-button"
              :click-handler="submitTask"
              :disabled="isSubmitDisabled"
            >
                <template #label>
                    <span class="action-add-task-span">
                        {{ modalSubmitButton }}
                    </span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import FormTextarea from '@/components/common/FormTextarea.vue';
import FormSelect from '@/components/common/FormSelect.vue';
import Button from '@/components/common/Button.vue';
import { useCurrentTask } from '@/stores/current';
import { useCurrentFormErrors } from '@/stores/form';
import { useAppModal } from '@/stores/appGlobals';
import { useBoardsStore } from '@/stores/boards';
import { createId } from '@/helpers/formatters';

const props = defineProps<{
    modalName: string, 
}>();

const textareaPlaceholder = 'e.g. It’s always good to take a break. '
    + 'This 15 minute break will recharge the batteries a little.';

const modalInView = computed(() => {
    return props.modalName === 'addTask'
        ? 'Add New Task'
        : 'Edit Task';
});

const inputPlaceholderText = computed(() => {
    return props.modalName === 'addTask'
     ? 'e.g. Take coffee break'
     : ''
});

const modalPlaceholderColumns = computed(() => {
    return props.modalName === 'addTask'
     ? true
     : false;
});

const modalSubmitButton = computed(() => {
    return props.modalName === 'addBoard'
     ? 'Create Task'
     : 'Save Changes';
});

// Handle input
const useBoards = useBoardsStore();
const { getColumnNames, addTask, editTask } = useBoards;

const currentTaskStore = useCurrentTask();
const { getCurrentTask } = currentTaskStore;

const { id, title, description, subtasks, status } = getCurrentTask();

const taskTitle = ref(props.modalName === 'editTask' ? title : '');
const taskDescription = ref(props.modalName === 'editTask' ? description : '');
const allColumnsNames = getColumnNames();
const taskStatus = ref(props.modalName === 'editTask' ? status : allColumnsNames[0]);

const updateTaskTitle = (value: string) => {
    taskTitle.value = value;
};

const updateTaskDescription = (value: string) => {
    taskDescription.value = value;
};

// Handle errors
const currentErrorsStore = useCurrentFormErrors();
const { currentErrors } = storeToRefs(currentErrorsStore);
const { setCurrentErrors } = currentErrorsStore;

onMounted(() => {
    setCurrentErrors({
        titleError: '',
        subtasksErrors: [],
        statusError: '',
    })
});

const updateTitleError = (value: string) => {
    setCurrentErrors({ titleError: value });
};

const isSubmitDisabled = computed(() => {
    const allErrors = Object.values(currentErrors.value);
    return allErrors.every((error) => error) || !taskTitle.value;
});

// Submit + state updates
const appModalStore = useAppModal();
const { toggleModal } = appModalStore;

const submitTask = () => {
    const task = {
        description: taskDescription.value,
        title: taskTitle.value,
        subtasks: [],
        status: taskStatus.value,
    }
    if (props.modalName === 'addTask') {
        const newId = createId();
        addTask({ ...task, id: newId });
    } else {
        editTask({ ...task, id});
    }
    toggleModal();
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>