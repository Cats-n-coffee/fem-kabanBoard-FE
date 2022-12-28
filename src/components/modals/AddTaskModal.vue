<template>
    <Form>
        <template #title>
            Add New Task
        </template>
        <template #formType>
            <FormInputField
              label="Title"
              for-attr="new-task-title"
              placeholderText="e.g. Take coffee break"
            />
            <FormTextarea
              label="Description"
              for-attr="new-task-description"
              :placeholderText="textareaPlaceholder"
            />
            <FormInputInteractive
              label="Subtasks"
              for-attr="new-task-input-interactive"
              :click-handler="addSubtask"
              button-icon="+"
              button-label="Add New Subtask"
            />
            <FormSelect label="Status" for-attr="new-task-select" />
        </template>
        <template #submitButton>
            <Button class="submit-button" :click-handler="createTask">
                <template #label>
                    <span class="action-add-task-span">Create Task</span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import FormTextarea from '@/components/common/FormTextarea.vue';
import FormSelect from '@/components/common/FormSelect.vue';
import Button from '@/components/common/Button.vue';

const textareaPlaceholder = 'e.g. It’s always good to take a break. '
    + 'This 15 minute break will recharge the batteries a little.';

const addSubtask = () => {
    console.log('add subtask');
}

const createTask = () => {
    console.log('create task');
}
</script>

<style scoped lang="less">
.add-task-modal {
    max-width: 480px;
    margin: 0 16px;
    background-color: var(--light);
    border-radius: 16px;
}

fieldset {
    display: flex;
    flex-direction: column;
}

.submit-button {
    margin-top: 24px;
}
</style>