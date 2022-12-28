<template>
    <Form>
        <template #title>
            Edit Board
        </template>
        <template #formType>
            <FormInputField
              label="Board Name"
              for-attr="edit-board-title"
            />
            <FormInputInteractive
              label="Board Columns"
              for-attr="edit-board-input-interactive"
              :click-handler="addColumn"
              button-icon="+"
              button-label="Add New Column"
            />
        </template>
        <template #submitButton>
            <Button class="submit-button" :click-handler="editBoard">
                <template #label>
                    <span class="action-add-board-span">Save Changes</span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import Button from '@/components/common/Button.vue';

const addColumn = () => {
    console.log('add column');
}

const editBoard = () => {
    console.log('edit board');
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>