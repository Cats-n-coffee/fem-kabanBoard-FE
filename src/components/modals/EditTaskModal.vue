<template>
    <Form>
        <template #title>
            Edit Task
        </template>
        <template #formType>
            <FormInputField
                label="Title"
                for-attr="edit-task-title"
            />
            <FormTextarea
                label="Description"
                for-attr="edit-task-description"
                :placeholder-text="textareaPlaceholder"
            />
            <FormInputInteractive
              label="Subtasks"
              for-attr="edit-task-input-interactive"
              :click-handler="addSubtask"
              button-icon="+"
              button-label="Add New Subtask"
            />
            <FormSelect label="Status" for-attr="edit-task-select" />
        </template>
        <template #submitButton>
            <Button class="submit-button" :click-handler="saveChanges">
                <template #label>
                    <span class="action-add-task-span">Save Changes</span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import FormSelect from '../common/FormSelect.vue';
import FormTextarea from '../common/FormTextarea.vue';
import Button from '@/components/common/Button.vue';

const textareaPlaceholder = 'e.g. It’s always good to take a break. '
    + 'This 15 minute break will recharge the batteries a little.';

const addSubtask = () => {
    console.log('edit task add subtask');
};

const saveChanges = () => {
    console.log('save task');
};
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>